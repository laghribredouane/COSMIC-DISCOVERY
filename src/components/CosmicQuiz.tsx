import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Trophy, Award, Sparkles, BookOpen } from 'lucide-react';
import { QuizQuestion, Language } from '../types/cosmic';
import { initialQuizQuestions } from '../data/cosmicData';
import { evaluateQuizPerformance } from '../utils/cosmicCalculations';
import { translations } from '../i18n/translations';

interface CosmicQuizProps {
  language: Language;
}

export const CosmicQuiz: React.FC<CosmicQuizProps> = ({ language }) => {
  const t = translations[language];

  const [difficulty, setDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const filteredQuestions = initialQuizQuestions.filter((q) => {
    if (difficulty === 'all') return true;
    return q.difficulty === difficulty;
  });

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  const performance = evaluateQuizPerformance(filteredQuestions.length, score, language);

  return (
    <section className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{t.quizTitle}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-100 to-amber-200">
            {t.quizSubtitle}
          </span>
        </h2>
      </div>

      {/* Difficulty Filter */}
      {!isCompleted && (
        <div className="flex items-center justify-center gap-2">
          {[
            { id: 'all', label: t.difficultyAll },
            { id: 'easy', label: t.difficultyEasy },
            { id: 'medium', label: t.difficultyMedium },
            { id: 'hard', label: t.difficultyHard },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => {
                setDifficulty(d.id as any);
                handleRestart();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                difficulty === d.id
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      )}

      {/* Quiz Progress & Card */}
      {!isCompleted && currentQ ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold border-b border-slate-800 pb-3">
            <span>
              {t.questionCount} {currentIndex + 1} / {filteredQuestions.length}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-300 uppercase text-[10px]">
              {currentQ.difficulty}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-cyan-400 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h3 className="text-lg sm:text-xl font-black text-white leading-relaxed">
            {currentQ.question[language] || currentQ.question.ar}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {(currentQ.options[language] || currentQ.options.ar).map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'bg-slate-950/80 border-slate-800 text-slate-200 hover:bg-slate-800/80';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold shadow-md shadow-emerald-500/10';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 font-bold';
                } else {
                  btnStyle = 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl border text-start flex items-center justify-between gap-3 text-sm transition-all ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box on Answer */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-slate-200 space-y-2 animate-in fade-in">
              <strong className="block text-cyan-300 font-bold">
                {t.scientificExplanation}
              </strong>
              <p className="leading-relaxed">
                {currentQ.explanation[language] || currentQ.explanation.ar}
              </p>
              <div className="text-[11px] text-slate-400 pt-1">
                {language === 'ar' ? 'المرجع العلمي:' : 'Source:'} {currentQ.scientificReference}
              </div>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-600/25 transition-all"
              >
                {currentIndex < filteredQuestions.length - 1 ? t.nextQuestion : t.seeResults}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Final Score Card */
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/95 border border-cyan-800/50 shadow-2xl backdrop-blur-xl text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-cyan-500 to-amber-400 flex items-center justify-center text-slate-950 shadow-xl">
            <Trophy className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              {performance.percentage >= 70 ? '🎉 مبارك إنجازك الكوني!' : 'رحلة استكشاف رائعة!'}
            </h3>
            <div className="text-4xl sm:text-5xl font-black text-cyan-300 font-mono my-4">
              {score} / {filteredQuestions.length} ({performance.percentage}%)
            </div>
            <p className="text-sm sm:text-base text-slate-200 max-w-lg mx-auto leading-relaxed">
              {performance.feedback}
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-sm shadow-lg shadow-cyan-600/25 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.retakeQuiz}</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
