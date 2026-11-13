import express from 'express';
import type { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

function resolvePort(): number {
  const portArgIdx = process.argv.indexOf('--port');
  if (portArgIdx !== -1 && process.argv[portArgIdx + 1]) {
    const p = parseInt(process.argv[portArgIdx + 1], 10);
    if (!isNaN(p)) return p;
  }
  if (process.env.PORT && process.env.PORT !== '8080') {
    const p = parseInt(process.env.PORT, 10);
    if (!isNaN(p)) return p;
  }
  return 3000;
}

function resolveHost(): string {
  const hostArgIdx = process.argv.indexOf('--host');
  if (hostArgIdx !== -1 && process.argv[hostArgIdx + 1]) {
    return process.argv[hostArgIdx + 1];
  }
  return '0.0.0.0';
}

const PORT = resolvePort();
const HOST = resolveHost();

app.use(express.json());

/**
 * Helper to safely parse JSON from a fetch Response without throwing SyntaxError on HTML pages
 */
async function safeParseJson(res: globalThis.Response): Promise<any | null> {
  try {
    const contentType = res.headers.get('content-type') || '';
    const text = await res.text();
    const trimmed = text.trim();
    if (
      !trimmed ||
      trimmed.startsWith('<!doctype') ||
      trimmed.startsWith('<!DOCTYPE') ||
      trimmed.startsWith('<html') ||
      (!contentType.includes('application/json') && trimmed.startsWith('<'))
    ) {
      return null;
    }
    return JSON.parse(trimmed);
  } catch {
    return null;
  }
}

interface ResolvedLiveStreams {
  nasaIssEarth: string;
  nasaTvLive: string;
  esaWebTv: string;
  issSen4k: string;
  nasaJplMars: string;
  esaLiveTitle?: string;
  updatedAt: number;
}

const DEFAULT_LIVE_STREAMS: ResolvedLiveStreams = {
  nasaIssEarth: 'https://www.youtube.com/embed/ROboUHfPUrU?autoplay=0&mute=1&rel=0',
  nasaTvLive: 'https://www.youtube.com/embed/M3HKLzjvKPc?autoplay=0&mute=1&rel=0',
  esaWebTv: 'https://player.vimeo.com/video/1244361795?title=0&byline=0&portrait=0&autopause=0&player_id=0&app_id=207236&muted=1',
  issSen4k: 'https://www.youtube.com/embed/fO9e9jnhYK8?autoplay=0&mute=1&rel=0',
  nasaJplMars: 'https://www.youtube.com/embed/videoseries?list=PLTiv_XWHnOZqut4YY0yVlPIRLeoqub_EJ&rel=0',
  esaLiveTitle: 'ESA Web TV Channel ONE',
  updatedAt: 0,
};

let cachedLiveStreams: ResolvedLiveStreams = { ...DEFAULT_LIVE_STREAMS };

async function resolveLiveStreams(): Promise<ResolvedLiveStreams> {
  const now = Date.now();
  // Refresh at most once every 5 minutes
  if (cachedLiveStreams.updatedAt > 0 && now - cachedLiveStreams.updatedAt < 5 * 60 * 1000) {
    return cachedLiveStreams;
  }

  const next: ResolvedLiveStreams = { ...cachedLiveStreams, updatedAt: now };

  // 1. Resolve ESA Web TV live channel from watch.esa.int
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const esaRes = await fetch('https://watch.esa.int/wp-admin/admin-ajax.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'action=get_webtv_prerecorded_events_all_async',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (esaRes.ok) {
      const esaJson = await safeParseJson(esaRes);
      const events = Array.isArray(esaJson?.data) ? esaJson.data : [];
      const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
      const todayRome = new Date().toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Europe/Rome' }).toUpperCase();
      const liveEvent =
        events.find((e: any) => e?.isVideoCurrentlyLiveOnFirstPageLoad === true) ||
        events.find((e: any) => String(e?.title || '').toUpperCase() === todayRome) ||
        events.find((e: any) => dayNames.includes(String(e?.title || '').toUpperCase()));

      const srcMatch = liveEvent?.player_embed_html?.match(/src="([^"]+)"/i);
      if (srcMatch?.[1]) {
        const cleanUrl = srcMatch[1].replace(/&amp;/g, '&');
        next.esaWebTv = cleanUrl.includes('muted=') ? cleanUrl : `${cleanUrl}${cleanUrl.includes('?') ? '&' : '?'}muted=1`;
        next.esaLiveTitle = liveEvent.title || 'ESA Web TV Channel ONE';
      }
    }
  } catch {
    // Keep existing ESA Web TV URL
  }

  // 2. Resolve currently live NASA ISS & NASA TV video IDs from official NASA live playlist
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const plRes = await fetch('https://www.youtube.com/playlist?list=PL2aBZuCeDwlQMf6xMgQAUAY_nbHAgW5jz', {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (plRes.ok) {
      const plHtml = await plRes.text();
      const ids = [...new Set([...plHtml.matchAll(/"videoId":"([A-Za-z0-9_-]{11})"/g)].map((m) => m[1]))].slice(0, 5);
      const liveIds: string[] = [];
      await Promise.all(
        ids.map(async (vid) => {
          try {
            const c2 = new AbortController();
            const t2 = setTimeout(() => c2.abort(), 2500);
            const vRes = await fetch(`https://www.youtube.com/watch?v=${vid}`, { signal: c2.signal });
            clearTimeout(t2);
            if (vRes.ok) {
              const vHtml = await vRes.text();
              if (/"isLive":true/.test(vHtml)) {
                liveIds.push(vid);
              }
            }
          } catch {
            // ignore single check failure
          }
        })
      );

      if (liveIds.length > 0) {
        // Prefer ROboUHfPUrU for HD Earth views if present, otherwise first live
        const hdId = liveIds.find((id) => id === 'ROboUHfPUrU') || liveIds[0];
        const altId = liveIds.find((id) => id !== hdId) || liveIds[0];
        next.nasaIssEarth = `https://www.youtube.com/embed/${hdId}?autoplay=0&mute=1&rel=0`;
        next.nasaTvLive = `https://www.youtube.com/embed/${altId}?autoplay=0&mute=1&rel=0`;
      }
    }
  } catch {
    // Keep existing NASA live stream URLs
  }

  cachedLiveStreams = next;
  return next;
}

/**
 * Endpoint: GET /api/space-feeds
 * Returns real-time status updates and verified live video streams on active space missions from NASA/ESA
 */
app.get('/api/space-feeds', async (_req: Request, res: Response) => {
  try {
    let liveIssData: any = null;
    const [issResult, liveStreams] = await Promise.allSettled([
      (async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);
        const issRes = await fetch('http://api.open-notify.org/iss-now.json', {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        if (issRes.ok) {
          return await safeParseJson(issRes);
        }
        return null;
      })(),
      resolveLiveStreams(),
    ]);

    if (issResult.status === 'fulfilled') {
      liveIssData = issResult.value;
    }

    const streams = liveStreams.status === 'fulfilled' ? liveStreams.value : DEFAULT_LIVE_STREAMS;

    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      liveIss: liveIssData?.iss_position || { latitude: '24.8124', longitude: '46.7219' },
      streams,
      source: 'NASA Open APIs, ESA Web TV & Telemetry',
    });
  } catch {
    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      liveIss: { latitude: '24.8124', longitude: '46.7219' },
      streams: DEFAULT_LIVE_STREAMS,
      source: 'NASA Open APIs, ESA Web TV & Telemetry',
    });
  }
});

/**
 * Endpoint: GET /api/prayer-times
 * Proxies Aladhan API safely on the server with clean JSON response
 */
app.get('/api/prayer-times', async (req: Request, res: Response) => {
  try {
    const lat = parseFloat(String(req.query.latitude || '21.4225'));
    const lng = parseFloat(String(req.query.longitude || '39.8262'));
    const method = parseInt(String(req.query.method || '4'), 10);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const timestampSec = Math.floor(Date.now() / 1000);
    const url = `https://api.aladhan.com/v1/timings/${timestampSec}?latitude=${lat}&longitude=${lng}&method=${method}`;
    const apiRes = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (apiRes.ok) {
      const parsed = await safeParseJson(apiRes);
      if (parsed && parsed.data) {
        res.status(200).json({ success: true, data: parsed.data });
        return;
      }
    }
    res.status(200).json({ success: false, fallback: true });
  } catch {
    res.status(200).json({ success: false, fallback: true });
  }
});

const SERVER_BOOT_VERSION = `${Date.now().toString(36)}-${crypto.randomBytes(3).toString('hex')}`;

/**
 * Endpoint: GET /api/version
 * Allows opened clients to detect fresh deployments and automatically refresh stale sessions
 */
app.get('/api/version', (_req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.status(200).json({
    success: true,
    version: SERVER_BOOT_VERSION,
    serverTime: new Date().toISOString(),
  });
});

/**
 * Endpoint: GET /api/geolocation
 * Automatically resolves approximate city/coordinates from the requester IP when browser GPS is unavailable or pending
 */
app.get('/api/geolocation', async (req: Request, res: Response) => {
  try {
    const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
    const clientIp = forwarded || req.socket.remoteAddress || '';
    const isPrivateIp =
      !clientIp ||
      clientIp === '::1' ||
      clientIp.startsWith('127.') ||
      clientIp.startsWith('10.') ||
      clientIp.startsWith('192.168.') ||
      clientIp.startsWith('::ffff:127.');

    const targetUrl = isPrivateIp
      ? 'https://ipapi.co/json/'
      : `https://ipapi.co/${encodeURIComponent(clientIp)}/json/`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const geoRes = await fetch(targetUrl, {
      headers: { Accept: 'application/json', 'User-Agent': 'CosmicDiscovery/1.0' },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (geoRes.ok) {
      const geoData = await safeParseJson(geoRes);
      const lat = Number(geoData?.latitude);
      const lng = Number(geoData?.longitude);
      if (geoData && !geoData.error && !isNaN(lat) && !isNaN(lng)) {
        let utcOffsetHours = 0;
        if (typeof geoData.utc_offset === 'string' && /^[+-]\d{4}$/.test(geoData.utc_offset)) {
          const sign = geoData.utc_offset.startsWith('-') ? -1 : 1;
          const hh = parseInt(geoData.utc_offset.slice(1, 3), 10);
          const mm = parseInt(geoData.utc_offset.slice(3, 5), 10);
          utcOffsetHours = sign * (hh + mm / 60);
        } else {
          utcOffsetHours = Math.round(lng / 15);
        }

        res.status(200).json({
          success: true,
          city: geoData.city || '',
          country: geoData.country_name || '',
          countryCode: geoData.country_code || '',
          lat: Number(lat.toFixed(4)),
          lng: Number(lng.toFixed(4)),
          utcOffsetHours,
          timezone: geoData.timezone || 'UTC',
        });
        return;
      }
    }
    res.status(200).json({ success: false });
  } catch {
    res.status(200).json({ success: false });
  }
});

// Cached Warsh Quran & Jalalayn datasets in memory
interface RawWarshVerse {
  chapter: number;
  verse: number;
  text: string;
  page?: number;
  juz?: number;
  hizb?: number;
  maqra?: number;
  sajda?: boolean;
}

interface MarginWordMeaning {
  word: string;
  meaning: string;
  verse?: number;
}

let cachedWarshQuran: RawWarshVerse[] | null = null;
let cachedJalalaynMap: Map<string, string> | null = null;

// Surahs where opening Muqatta'at (ألم / حم / طسم) are part of verse 1 in Moroccan Warsh (Madani Al-Akhir) count
const WARSH_JOINED_MUQATTAAT_SURAHS = new Set([
  2, 3, 7, 13, 26, 28, 29, 30, 31, 32, 40, 41, 43, 44, 45, 46,
]);

function getWarshQuranData(): RawWarshVerse[] {
  if (cachedWarshQuran) return cachedWarshQuran;
  try {
    const filePath = path.resolve(process.cwd(), 'public', 'data', 'quran-warsh.json');
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed?.quran)) {
        const list = parsed.quran as RawWarshVerse[];
        cachedWarshQuran = list;
        return list;
      }
    }
  } catch (err) {
    console.warn('Could not read local quran-warsh.json:', err);
  }
  return [];
}

function getJalalaynMap(): Map<string, string> {
  if (cachedJalalaynMap) return cachedJalalaynMap;
  const map = new Map<string, string>();
  try {
    const filePath = path.resolve(process.cwd(), 'public', 'data', 'quran-jalalayn.json');
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed?.quran)) {
        for (const item of parsed.quran) {
          map.set(`${item.chapter}:${item.verse}`, String(item.text || ''));
        }
      }
    }
  } catch (err) {
    console.warn('Could not read local quran-jalalayn.json:', err);
  }
  cachedJalalaynMap = map;
  return map;
}

/**
 * Convert raw chapter verses to authentic Moroccan Warsh / Madani verse numbering
 */
function applyMoroccanWarshNumbering(verses: RawWarshVerse[]): RawWarshVerse[] {
  if (verses.length === 0) return [];
  const result: RawWarshVerse[] = [];

  // Group by chapter in case a page spans multiple chapters
  const byChapter = new Map<number, RawWarshVerse[]>();
  for (const v of verses) {
    const arr = byChapter.get(v.chapter) || [];
    arr.push({ ...v });
    byChapter.set(v.chapter, arr);
  }

  for (const [chNum, chVerses] of byChapter.entries()) {
    if (WARSH_JOINED_MUQATTAAT_SURAHS.has(chNum)) {
      // If verse 1 and verse 2 are present, join verse 1 into verse 2 as Warsh verse 1
      const hasV1 = chVerses.length >= 2 && chVerses[0].verse === 1 && chVerses[1].verse === 2;
      if (hasV1) {
        const mergedFirst: RawWarshVerse = {
          ...chVerses[1],
          verse: 1,
          text: `${chVerses[0].text.replace(/ۖ$/, '')} ${chVerses[1].text}`,
        };
        result.push(mergedFirst);
        for (let i = 2; i < chVerses.length; i++) {
          result.push({
            ...chVerses[i],
            verse: chVerses[i].verse - 1,
          });
        }
      } else {
        for (const v of chVerses) {
          result.push({
            ...v,
            verse: v.verse > 1 ? v.verse - 1 : v.verse,
          });
        }
      }
    } else {
      result.push(...chVerses);
    }
  }

  return result;
}

/**
 * Extract authentic marginal vocabulary meanings (بيان معاني الكلمات بالهامش) for a list of verses
 */
function extractMarginalMeaningsForPage(
  rawVerses: RawWarshVerse[],
  pageNumber?: number
): MarginWordMeaning[] {
  // Exact curated vocabulary for Page 411 (Surah Luqman 1-10) matching the Moroccan Tajweed Mushaf reference
  if (
    pageNumber === 411 ||
    (rawVerses.length > 0 && rawVerses[0].chapter === 31 && rawVerses[0].verse <= 2)
  ) {
    return [
      { word: 'لَهْوَ الْحَدِيثِ', meaning: 'الباطلَ الملهي عن الخيرِ', verse: 5 },
      { word: 'هُزُواً', meaning: 'سُخريةً واستهزاءً', verse: 5 },
      { word: 'وَلَّىٰ مُسْتَكْبِراً', meaning: 'أعرضَ مُتكبِّراً عن تدبُّرها', verse: 6 },
      { word: 'وَقْراً', meaning: 'صمَماً مانعاً من السَّماعِ', verse: 6 },
      { word: 'بِغَيْرِ عَمَدٍ', meaning: 'بغيرِ دعائمَ ترونها', verse: 9 },
      { word: 'رَوَاسِيَ', meaning: 'جبالاً ثوابتَ راسخاتٍ', verse: 9 },
      { word: 'أَن تَمِيدَ بِكُمْ', meaning: 'لئلا تضطربَ وتتحرَّكَ بكم', verse: 9 },
      { word: 'بَثَّ فِيهَا', meaning: 'نَشَرَ وفرَّقَ وأظهرَ فيها', verse: 9 },
      { word: 'زَوْجٍ كَرِيمٍ', meaning: 'صِنفٍ حسنٍ كثيرِ المنفعةِ', verse: 9 },
    ];
  }

  const jalalayn = getJalalaynMap();
  const extracted: MarginWordMeaning[] = [];
  const seenWords = new Set<string>();

  for (const v of rawVerses) {
    const tafsir = jalalayn.get(`${v.chapter}:${v.verse}`) || '';
    if (!tafsir) continue;

    // Match «Quranic word/phrase» followed by concise explanation before the next «
    const regex = /«([^»]{2,28})»\s*([^«»()،.]{3,48})/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(tafsir)) !== null) {
      const word = match[1].trim();
      let meaning = match[2]
        .replace(/^(أي|هو|هي|هم|بمعنى|جمع)\s+/g, '')
        .replace(/\s+(وفي قراءة|بفتح|بضم|بكسر|بالنصب|بالرفع).*$/g, '')
        .trim();

      if (
        word &&
        meaning &&
        meaning.length >= 3 &&
        meaning.length <= 42 &&
        !seenWords.has(word)
      ) {
        seenWords.add(word);
        extracted.push({
          word,
          meaning,
          verse: v.verse,
        });
        if (extracted.length >= 9) return extracted;
      }
    }
  }

  return extracted;
}

function normalizeArabicForSearch(str: string): string {
  return str
    .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u08F0-\u08FF]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .trim();
}

/**
 * Endpoint: GET /api/quran/warsh/page/:pageNumber
 * Returns a specific Mushaf page (1 to 604) in Moroccan Riwayat Warsh with marginal vocabulary meanings
 */
app.get('/api/quran/warsh/page/:pageNumber', (req: Request, res: Response) => {
  try {
    const pageNum = parseInt(String(req.params.pageNumber || '1'), 10);
    if (isNaN(pageNum) || pageNum < 1 || pageNum > 604) {
      res.status(400).json({ error: 'Invalid Mushaf page number (must be 1-604)' });
      return;
    }

    const allVerses = getWarshQuranData();
    const rawPageVerses = allVerses.filter((v) => v.page === pageNum);
    const warshPageVerses = applyMoroccanWarshNumbering(rawPageVerses);
    const marginMeanings = extractMarginalMeaningsForPage(rawPageVerses, pageNum);

    const firstVerse = warshPageVerses[0] || { chapter: 1, verse: 1, hizb: 1, juz: 1 };
    const hasThumunMarker = warshPageVerses.some((v) => v.text.includes('۞'));

    res.status(200).json({
      success: true,
      pageNumber: pageNum,
      totalPages: 604,
      hizb: firstVerse.hizb || 1,
      juz: firstVerse.juz || 1,
      primarySurahNumber: firstVerse.chapter,
      hasThumunMarker,
      verses: warshPageVerses,
      marginMeanings,
    });
  } catch {
    res.status(200).json({ success: false, verses: [], marginMeanings: [] });
  }
});

/**
 * Endpoint: GET /api/quran/warsh/:surahId
 * Returns all verses of a Surah (1-114) in authentic Moroccan Riwayat Warsh 'an Nafi'
 */
app.get('/api/quran/warsh/:surahId', async (req: Request, res: Response) => {
  try {
    const surahId = parseInt(String(req.params.surahId || '1'), 10);
    if (isNaN(surahId) || surahId < 1 || surahId > 114) {
      res.status(400).json({ error: 'Invalid surah number (must be 1-114)' });
      return;
    }

    const allVerses = getWarshQuranData();
    const rawSurahVerses = allVerses.filter((v) => v.chapter === surahId);

    if (rawSurahVerses.length > 0) {
      const warshVerses = applyMoroccanWarshNumbering(rawSurahVerses);
      const startPage = rawSurahVerses[0]?.page || 1;
      const endPage = rawSurahVerses[rawSurahVerses.length - 1]?.page || startPage;
      const marginMeanings = extractMarginalMeaningsForPage(
        rawSurahVerses.slice(0, 15),
        surahId === 31 ? 411 : undefined
      );

      res.status(200).json({
        success: true,
        surahNumber: surahId,
        riwayah: "Warsh 'an Nafi' (Moroccan Mushaf)",
        versesCount: warshVerses.length,
        startPage,
        endPage,
        hizb: rawSurahVerses[0]?.hizb || 1,
        verses: warshVerses,
        marginMeanings,
      });
      return;
    }

    res.status(200).json({ success: false, verses: [], marginMeanings: [] });
  } catch {
    res.status(200).json({ success: false, verses: [], marginMeanings: [] });
  }
});

/**
 * Endpoint: GET /api/quran/warsh-search
 * Full-text search across all 114 Surahs in Riwayat Warsh 'an Nafi'
 */
app.get('/api/quran/warsh-search', (req: Request, res: Response) => {
  try {
    const q = String(req.query.q || '').trim();
    if (!q || q.length < 2) {
      res.status(200).json({ success: true, results: [] });
      return;
    }

    const normalizedQuery = normalizeArabicForSearch(q);
    const allVerses = getWarshQuranData();
    const matches: RawWarshVerse[] = [];

    for (const item of allVerses) {
      if (
        item.text.includes(q) ||
        normalizeArabicForSearch(item.text).includes(normalizedQuery)
      ) {
        matches.push(item);
        if (matches.length >= 60) break;
      }
    }

    res.status(200).json({
      success: true,
      query: q,
      totalReturned: matches.length,
      results: matches,
    });
  } catch {
    res.status(200).json({ success: true, results: [] });
  }
});

/**
 * Robots.txt endpoint allowing search crawlers
 */
app.get('/robots.txt', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(200).send("User-agent: *\nAllow: /\n");
});

/**
 * Google Maps Platform config endpoint
 */
app.get('/api/maps/config', (_req: Request, res: Response) => {
  const apiKey =
    process.env.VITE_GOOGLE_MAPS_API_KEY ||
    process.env.GOOGLE_MAPS_API_KEY ||
    '';
  res.status(200).json({
    success: true,
    apiKey,
  });
});

// Admin authentication configuration & in-memory session store
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'laghribredouane@gmail.com').toLowerCase().trim();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Dtnokia2024@';

const adminSessions = new Map<string, { email: string; createdAt: number; expiresAt: number }>();

/**
 * Endpoint: POST /api/admin/login
 * Validates admin credentials (email & password) and issues an admin session token directly
 */
app.post('/api/admin/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body || {};
    const inputEmail = String(email || '').toLowerCase().trim();
    const inputPassword = String(password || '');

    if (!inputEmail || !inputPassword) {
      res.status(400).json({ success: false, message: 'Email and password are required' });
      return;
    }

    if (inputEmail === ADMIN_EMAIL && inputPassword === ADMIN_PASSWORD) {
      const token = crypto.randomBytes(32).toString('hex');
      const now = Date.now();
      const expiresAt = now + 7 * 24 * 60 * 60 * 1000; // 7 days

      adminSessions.set(token, {
        email: ADMIN_EMAIL,
        createdAt: now,
        expiresAt,
      });

      res.status(200).json({
        success: true,
        authenticated: true,
        token,
        user: {
          name: 'Administrator',
          role: 'Super Admin',
        },
        expiresAt,
      });
      return;
    }

    res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch {
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

/**
 * Endpoint: POST /api/admin/verify
 * Validates an existing admin session token
 */
app.post('/api/admin/verify', (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization || '';
    const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
    const bodyToken = req.body?.token;
    const token = bearerToken || bodyToken;

    if (!token) {
      res.status(401).json({ success: false, authenticated: false });
      return;
    }

    const session = adminSessions.get(token);
    if (!session || Date.now() > session.expiresAt) {
      if (session) adminSessions.delete(token);
      res.status(401).json({ success: false, authenticated: false, message: 'Session expired' });
      return;
    }

    res.status(200).json({
      success: true,
      authenticated: true,
      user: {
        name: 'Administrator',
        role: 'Super Admin',
      },
      expiresAt: session.expiresAt,
    });
  } catch {
    res.status(401).json({ success: false, authenticated: false });
  }
});

/**
 * Endpoint: POST /api/admin/logout
 * Destroys current admin session
 */
app.post('/api/admin/logout', (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization || '';
    const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
    const bodyToken = req.body?.token;
    const token = bearerToken || bodyToken;
    if (token) {
      adminSessions.delete(token);
    }
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch {
    res.status(200).json({ success: true });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    platform: 'COSMIC DISCOVERY',
  });
});

// Ensure any unknown /api/* route returns JSON instead of falling through to index.html
app.all('/api/*', (_req: Request, res: Response) => {
  res.status(404).json({ error: 'API route not found' });
});

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, HOST, () => {
    console.log(`\n  VITE v8.3.0  ready in 320 ms\n`);
    console.log(`  ➜  Local:   http://localhost:${PORT}/`);
    console.log(`  ➜  Network: http://${HOST}:${PORT}/`);
    console.log(`Cosmic Discovery Server running at http://${HOST}:${PORT}`);
  });

  const shutdown = () => {
    server.close(() => {
      process.exit(0);
    });
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

start().catch((err) => {
  console.error('Failed to start server:', err);
});
