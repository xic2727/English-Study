import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, Play, Check, AlertTriangle, ArrowRight, BookOpen, User, Star, Award, Heart } from 'lucide-react';
import { listeningQuestions, grammarMistakes } from '../data';
import AudioPlayerButton from './AudioPlayerButton';
import { soundFX } from '../utils/sound';

export default function FunQuiz() {
  const [learnerName, setLearnerName] = useState('李容与'); // Inspired by kid's handwritten name in screenshots!
  const [quizStep, setQuizStep] = useState<number>(0); // 0: intro, 1: category, 2: sentence, 3: response, 4: grammar, 5: reward

  // Score states
  const [answers, setAnswers] = useState<{ [qId: string]: 'A' | 'B' }>({});
  const [grammarFixed, setGrammarFixed] = useState<{ [gmId: string]: boolean }>({});
  const [showAnswerFeedback, setShowAnswerFeedback] = useState<string | null>(null);

  // Sub indices
  const [listeningIdx, setListeningIdx] = useState(0);
  const [grammarIdx, setGrammarIdx] = useState(0);

  // Filter questions for sections
  const categoryQuestions = listeningQuestions.filter(q => q.type === 'category');
  const sentenceQuestions = listeningQuestions.filter(q => q.type === 'sentence');
  const responseQuestions = listeningQuestions.filter(q => q.type === 'response');

  const startAdventure = () => {
    soundFX.playSuccess();
    setAnswers({});
    setGrammarFixed({});
    setListeningIdx(0);
    setGrammarIdx(0);
    setQuizStep(1); // Go to section 1
  };

  const handleSelectAnswer = (qId: string, choice: 'A' | 'B', correctChoice: 'A' | 'B') => {
    if (answers[qId]) return; // Already answered

    const tempAnswers = { ...answers, [qId]: choice };
    setAnswers(tempAnswers);
    setShowAnswerFeedback(qId);

    if (choice === correctChoice) {
      soundFX.playSuccess();
    } else {
      soundFX.playBoop();
    }
  };

  const handleNextListeningQuestion = (totalInSec: number, nextStepNum: number) => {
    soundFX.playPop();
    setShowAnswerFeedback(null);
    if (listeningIdx + 1 < totalInSec) {
      setListeningIdx(lIdx => lIdx + 1);
    } else {
      // Move to next adventure step
      setListeningIdx(0);
      setQuizStep(nextStepNum);
    }
  };

  // Grammar Clicking logic
  const handleFixWord = (gmId: string, correct: boolean) => {
    if (grammarFixed[gmId]) return;

    if (correct) {
      soundFX.playSuccess();
      setGrammarFixed(prev => ({ ...prev, [gmId]: true }));
    } else {
      soundFX.playBoop();
    }
  };

  const handleNextGrammarQuestion = () => {
    soundFX.playPop();
    if (grammarIdx + 1 < grammarMistakes.length) {
      setGrammarIdx(gIdx => gIdx + 1);
    } else {
      soundFX.playFanfare();
      setQuizStep(5); // Go to rewards chart!
    }
  };

  // Calculate final performance stats
  const totalCorrectListening = listeningQuestions.filter(
    q => answers[q.id] === q.correctAnswer
  ).length;

  const totalFixedGrammar = Object.values(grammarFixed).filter(v => v).length;
  
  const score = Math.round(
    ((totalCorrectListening + totalFixedGrammar) / (listeningQuestions.length + grammarMistakes.length)) * 100
  );

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {quizStep === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center max-w-lg mx-auto"
          >
            {/* Castle visual */}
            <div className="bg-white rounded-3xl border-8 border-rose-100 p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-pink-400 via-amber-300 to-sky-400"></div>
              
              <div className="text-8xl mb-6 select-none animate-[bounce_2s_infinite]">🏆</div>
              
              <h3 className="text-3xl font-extrabold text-rose-500 font-comic tracking-wide mb-2">
                英语大闯关冒险 Trail!
              </h3>
              
              <p className="text-sm font-semibold text-gray-500 leading-relaxed mb-6">
                哈罗小天使！我们将进行“听力魔法森林”、“句子梦幻云彩”和“纠错小侦探”四大难关的奇妙大冒险，快输入你的名字来挑战，领取你专属的金牌奖章吧！
              </p>

              {/* Enter name */}
              <div className="max-w-xs mx-auto mb-8 bg-pink-50/50 p-4 rounded-2xl border-2 border-dashed border-pink-200">
                <label className="text-xs font-bold text-pink-600 uppercase block mb-2 tracking-widest flex items-center justify-center gap-1">
                  <User className="h-3.5 w-3.5" /> 选手登记名字 (Your Name)
                </label>
                <input
                  id="input-learner-name"
                  type="text"
                  value={learnerName}
                  onChange={(e) => setLearnerName(e.target.value)}
                  className="w-full text-center py-2.5 px-4 outline-none rounded-xl border-2 border-pink-300 text-pink-700 bg-white font-extrabold focus:border-rose-400 focus:ring-4 focus:ring-pink-100 transition shadow-sm text-md"
                  placeholder="输入你的中文或英文名字"
                />
              </div>

              <button
                id="btn-start-adventure"
                onClick={startAdventure}
                className="w-full py-4 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-extrabold shadow-lg hover:shadow-xl transition-all duration-300 flex justify-center items-center gap-2 cursor-pointer text-md"
              >
                开启奇幻能量之旅 <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}

        {quizStep === 1 && (
          <motion.div
            key="category"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-xl mx-auto"
          >
            {/* Step 1 - Listening Categories */}
            <div className="bg-white rounded-3xl border-8 border-pink-100 p-6 shadow-xl relative">
              {/* Progress Tracker */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-extrabold text-pink-500 bg-pink-50 px-3 py-1.5 rounded-full">
                  第一关：听力魔法森林
                </span>
                <span className="text-xs text-gray-400 font-bold">
                  第 {listeningIdx + 1} / {categoryQuestions.length} 题
                </span>
              </div>

              {/* Listening Question Content */}
              <div className="flex flex-col items-center">
                {/* Visual Speaker Box */}
                <div className="bg-pink-50 border-4 border-dashed border-pink-200 rounded-3xl p-6 text-center w-full mb-6 relative">
                  <span className="text-6xl select-none block mb-3">🧚</span>
                  <p className="text-md font-extrabold text-pink-700">
                    {categoryQuestions[listeningIdx].chineseInstruction}
                  </p>
                  
                  {/* Speakers triggers */}
                  <div className="flex justify-center items-center gap-3 mt-4">
                    <span className="text-xs font-bold text-gray-400">听发音：</span>
                    <AudioPlayerButton
                      text={categoryQuestions[listeningIdx].audioPrompt}
                      autoplay={true}
                      className="scale-125"
                    />
                  </div>
                </div>

                {/* Question Option Buttons */}
                <div className="flex flex-col gap-3 w-full mb-6">
                  {categoryQuestions[listeningIdx].options.map((option) => {
                    const isAnswered = !!answers[categoryQuestions[listeningIdx].id];
                    const choice = answers[categoryQuestions[listeningIdx].id];
                    const isSelected = choice === option.key;
                    const isCorrect = option.key === categoryQuestions[listeningIdx].correctAnswer;

                    return (
                      <button
                        id={`category-opt-${option.key}`}
                        key={option.key}
                        disabled={isAnswered}
                        onClick={() => handleSelectAnswer(categoryQuestions[listeningIdx].id, option.key, categoryQuestions[listeningIdx].correctAnswer)}
                        className={`p-4 rounded-2xl border-2 font-comic font-extrabold text-md md:text-lg transition flex justify-between items-center cursor-pointer text-left ${
                          isSelected
                            ? isCorrect
                              ? 'border-green-400 bg-green-50 text-green-700'
                              : 'border-red-300 bg-red-50 text-red-600'
                            : isAnswered && isCorrect
                            ? 'border-green-200 bg-green-50/50 text-green-700 scale-[0.98]'
                            : 'border-pink-100 bg-white hover:bg-pink-50/50 text-gray-700'
                        }`}
                      >
                        <div>
                          <span className="inline-block bg-pink-100 text-pink-700 rounded-lg py-1 px-3.5 mr-3 text-sm">
                            {option.key}
                          </span>
                          {option.text}
                          <span className="text-xs text-gray-400 block mt-1 leading-none">
                            {option.label}
                          </span>
                        </div>

                        {isSelected && (
                          <span>
                            {isCorrect ? (
                              <span className="text-green-600 text-lg font-bold">🌟 回答正确！</span>
                            ) : (
                              <span className="text-red-500 text-lg font-bold">💔 选错了哟</span>
                            )}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation text box */}
                {showAnswerFeedback === categoryQuestions[listeningIdx].id && (
                  <div className="bg-yellow-50 border-2 border-dashed border-yellow-250 p-4.5 rounded-2xl w-full text-center text-xs text-gray-600 font-semibold mb-6">
                    💡 【魔法提示】：{categoryQuestions[listeningIdx].hint}
                  </div>
                )}

                {/* Next button */}
                {answers[categoryQuestions[listeningIdx].id] && (
                  <button
                    id="btn-next-category"
                    onClick={() => handleNextListeningQuestion(categoryQuestions.length, 2)}
                    className="w-full py-4 bg-pink-400 hover:bg-pink-500 text-white font-extrabold rounded-full shadow-md transition flex justify-center items-center gap-1.5 cursor-pointer text-sm"
                  >
                    下一题 <ArrowRight className="h-4.5 w-4.5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {quizStep === 2 && (
          <motion.div
            key="sentence"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-xl mx-auto"
          >
            {/* Step 2 - Sentence Matching */}
            <div className="bg-white rounded-3xl border-8 border-amber-100 p-6 shadow-xl relative">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full">
                  第二关：句子梦幻云彩
                </span>
                <span className="text-xs text-gray-400 font-bold">
                  第 {listeningIdx + 1} / {sentenceQuestions.length} 题
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-amber-50 border-4 border-dashed border-amber-200 rounded-3xl p-6 text-center w-full mb-6 relative">
                  <span className="text-6xl select-none block mb-3">☁️</span>
                  <p className="text-md font-extrabold text-amber-700">
                    {sentenceQuestions[listeningIdx].chineseInstruction}
                  </p>
                  
                  <div className="flex justify-center items-center gap-3 mt-4">
                    <span className="text-xs font-bold text-gray-400">听录音：</span>
                    <AudioPlayerButton
                      text={sentenceQuestions[listeningIdx].audioPrompt}
                      autoplay={true}
                      className="scale-125"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full mb-6">
                  {sentenceQuestions[listeningIdx].options.map((option) => {
                    const isAnswered = !!answers[sentenceQuestions[listeningIdx].id];
                    const choice = answers[sentenceQuestions[listeningIdx].id];
                    const isSelected = choice === option.key;
                    const isCorrect = option.key === sentenceQuestions[listeningIdx].correctAnswer;

                    return (
                      <button
                        id={`sentence-opt-${option.key}`}
                        key={option.key}
                        disabled={isAnswered}
                        onClick={() => handleSelectAnswer(sentenceQuestions[listeningIdx].id, option.key, sentenceQuestions[listeningIdx].correctAnswer)}
                        className={`p-4 rounded-2xl border-2 font-comic font-extrabold text-md md:text-lg transition flex justify-between items-center cursor-pointer text-left ${
                          isSelected
                            ? isCorrect
                              ? 'border-green-400 bg-green-50 text-green-700'
                              : 'border-red-300 bg-red-50 text-red-600'
                            : isAnswered && isCorrect
                            ? 'border-green-200 bg-green-50/50 text-green-700 scale-[0.98]'
                            : 'border-amber-100 bg-white hover:bg-amber-50/50 text-gray-700'
                        }`}
                      >
                        <div>
                          <span className="inline-block bg-amber-100 text-amber-700 rounded-lg py-1 px-3.5 mr-3 text-sm">
                            {option.key}
                          </span>
                          {option.text}
                          <span className="text-xs text-gray-400 block mt-1 leading-none">
                            {option.label}
                          </span>
                        </div>

                        {isSelected && (
                          <span>
                            {isCorrect ? (
                              <span className="text-green-600 text-lg font-bold">✨ 真好听！对啦</span>
                            ) : (
                              <span className="text-red-500 text-lg font-bold">🥀 差一点点哦</span>
                            )}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {showAnswerFeedback === sentenceQuestions[listeningIdx].id && (
                  <div className="bg-yellow-50 border-2 border-dashed border-yellow-250 p-4.5 rounded-2xl w-full text-center text-xs text-gray-600 font-semibold mb-6">
                    💡 【点津】：{sentenceQuestions[listeningIdx].hint}
                  </div>
                )}

                {answers[sentenceQuestions[listeningIdx].id] && (
                  <button
                    id="btn-next-sentence"
                    onClick={() => handleNextListeningQuestion(sentenceQuestions.length, 3)}
                    className="w-full py-4 bg-amber-400 hover:bg-amber-505 text-white font-extrabold rounded-full shadow-md transition flex justify-center items-center gap-1.5 cursor-pointer text-sm"
                  >
                    下一题 <ArrowRight className="h-4.5 w-4.5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {quizStep === 3 && (
          <motion.div
            key="response"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-xl mx-auto"
          >
            {/* Step 3 - Dialogue Responses */}
            <div className="bg-white rounded-3xl border-8 border-sky-100 p-6 shadow-xl relative">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-extrabold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-full">
                  第三关：口语智慧对话
                </span>
                <span className="text-xs text-gray-400 font-bold">
                  第 {listeningIdx + 1} / {responseQuestions.length} 题
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-sky-50 border-4 border-dashed border-sky-200 rounded-3xl p-6 text-center w-full mb-6 relative">
                  <span className="text-6xl select-none block mb-3">🐿️</span>
                  <p className="text-md font-extrabold text-sky-700">
                    {responseQuestions[listeningIdx].chineseInstruction}
                  </p>
                  
                  <div className="flex justify-center items-center gap-3 mt-4">
                    <span className="text-xs font-bold text-gray-400">听问句：</span>
                    <AudioPlayerButton
                      text={responseQuestions[listeningIdx].audioPrompt}
                      autoplay={true}
                      className="scale-125"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full mb-6">
                  {responseQuestions[listeningIdx].options.map((option) => {
                    const isAnswered = !!answers[responseQuestions[listeningIdx].id];
                    const choice = answers[responseQuestions[listeningIdx].id];
                    const isSelected = choice === option.key;
                    const isCorrect = option.key === responseQuestions[listeningIdx].correctAnswer;

                    return (
                      <button
                        id={`response-opt-${option.key}`}
                        key={option.key}
                        disabled={isAnswered}
                        onClick={() => handleSelectAnswer(responseQuestions[listeningIdx].id, option.key, responseQuestions[listeningIdx].correctAnswer)}
                        className={`p-4 rounded-2xl border-2 font-comic font-extrabold text-md md:text-lg transition flex justify-between items-center cursor-pointer text-left ${
                          isSelected
                            ? isCorrect
                              ? 'border-green-400 bg-green-50 text-green-700'
                              : 'border-red-300 bg-red-50 text-red-600'
                            : isAnswered && isCorrect
                            ? 'border-green-200 bg-green-50/50 text-green-700 scale-[0.98]'
                            : 'border-sky-100 bg-white hover:bg-sky-50/50 text-gray-700'
                        }`}
                      >
                        <div>
                          <span className="inline-block bg-sky-100 text-sky-700 rounded-lg py-1 px-3.5 mr-3 text-sm">
                            {option.key}
                          </span>
                          {option.text}
                          <span className="text-xs text-gray-400 block mt-1 leading-none">
                            {option.label}
                          </span>
                        </div>

                        {isSelected && (
                          <span>
                            {isCorrect ? (
                              <span className="text-green-600 text-lg font-bold">🥇 贴心回答！对</span>
                            ) : (
                              <span className="text-red-500 text-lg font-bold">☔ 仔细再想想哦</span>
                            )}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {showAnswerFeedback === responseQuestions[listeningIdx].id && (
                  <div className="bg-yellow-50 border-2 border-dashed border-yellow-250 p-4.5 rounded-2xl w-full text-center text-xs text-gray-600 font-semibold mb-6">
                    💡 【解释】：{responseQuestions[listeningIdx].hint}
                  </div>
                )}

                {answers[responseQuestions[listeningIdx].id] && (
                  <button
                    id="btn-next-response"
                    onClick={() => handleNextListeningQuestion(responseQuestions.length, 4)}
                    className="w-full py-4 bg-sky-400 hover:bg-sky-500 text-white font-extrabold rounded-full shadow-md transition flex justify-center items-center gap-1.5 cursor-pointer text-sm"
                  >
                    下一题 <ArrowRight className="h-4.5 w-4.5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {quizStep === 4 && (
          <motion.div
            key="grammar"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-xl mx-auto"
          >
            {/* Step 4 - Grammar Mistake Catching */}
            <div className="bg-white rounded-3xl border-8 border-purple-100 p-6 shadow-xl relative">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-extrabold text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full">
                  第四关：语法找错纠错小侦探
                </span>
                <span className="text-xs text-gray-400 font-bold">
                  第 {grammarIdx + 1} / {grammarMistakes.length} 句
                </span>
              </div>

              {/* Catch the bug panel */}
              <div className="flex flex-col items-center">
                <div className="bg-purple-50 border-4 border-dashed border-purple-200 rounded-3xl p-6 text-center w-full mb-6 relative">
                  <div className="text-6xl select-none block mb-2">🔍🐛</div>
                  <h5 className="font-extrabold text-purple-800 text-lg">
                    发现这个句子里的“小错毛毛虫”吗？
                  </h5>
                  <p className="text-xs text-gray-500 font-bold mt-1">
                    点击那个错误的单词，让它立刻变成正确的！
                  </p>
                </div>

                {/* Split sentence elements into active word balloons */}
                <div className="bg-gray-50/50 p-6 border rounded-2xl w-full text-center relative mb-6">
                  <div className="flex flex-wrap justify-center gap-2 items-center text-lg md:text-xl font-comic font-extrabold text-gray-700">
                    {grammarMistakes[grammarIdx].wrongSentence.split(' ').map((word, wIdx) => {
                      const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
                      const targetWrongWord = grammarMistakes[grammarIdx].wrongWord.toLowerCase();
                      const isBug = cleanWord === targetWrongWord;
                      const isFixed = grammarFixed[grammarMistakes[grammarIdx].id];

                      return (
                        <span
                          id={`word-bubble-${word.toLowerCase().replace(/[^a-z]/g, '')}`}
                          key={wIdx}
                          onClick={() => handleFixWord(grammarMistakes[grammarIdx].id, isBug)}
                          className={`px-3 py-1 rounded-xl cursor-pointer transition-all duration-300 relative border-2 ${
                            isFixed && isBug
                              ? 'bg-green-500 text-white border-green-600 scale-105 shadow-md line-throughDecoration'
                              : isBug
                              ? 'bg-red-50 hover:bg-red-100 text-red-600 border-red-200 border-dashed animate-pulse'
                              : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-100'
                          }`}
                        >
                          {isBug && isFixed ? grammarMistakes[grammarIdx].correctedWord : word}
                          
                          {/* Animated pointer helper */}
                          {isBug && !isFixed && (
                            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-400"></span>
                          )}
                        </span>
                      );
                    })}
                  </div>

                  {/* Positive correction translations */}
                  {grammarFixed[grammarMistakes[grammarIdx].id] && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 pt-4 border-t border-dashed border-gray-200 text-center"
                    >
                      <p className="text-green-600 font-extrabold text-sm flex items-center justify-center gap-1">
                         虫子被清理啦： <Sparkles className="h-4.5 w-4.5 text-amber-400 fill-amber-300" />
                        "{grammarMistakes[grammarIdx].fullCorrectSentence}"
                      </p>
                      
                      <p className="text-xs text-gray-400 font-bold mt-1">
                        意思：{grammarMistakes[grammarIdx].chinese}
                      </p>

                      <div className="flex justify-center mt-3">
                        <AudioPlayerButton text={grammarMistakes[grammarIdx].fullCorrectSentence} autoplay={true} />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Progress Forward button */}
                {grammarFixed[grammarMistakes[grammarIdx].id] && (
                  <button
                    id="btn-next-grammar"
                    onClick={handleNextGrammarQuestion}
                    className="w-full py-4 bg-purple-500 hover:bg-purple-600 text-white font-extrabold rounded-full shadow-md transition flex justify-center items-center gap-1.5 cursor-pointer text-sm"
                  >
                    下一题 <ArrowRight className="h-4.5 w-4.5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {quizStep === 5 && (
          <motion.div
            key="reward"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-xl mx-auto text-center"
          >
            {/* Castle visual certificates */}
            <div className="bg-gradient-to-b from-amber-50 to-orange-50 border-[12px] border-amber-200 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              {/* Confetti decoration */}
              <div className="absolute top-10 left-10 text-3xl animate-bounce">✨</div>
              <div className="absolute top-20 right-10 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>🎈</div>
              <div className="absolute bottom-10 left-12 text-3xl animate-bounce" style={{ animationDelay: '1.5s' }}>⭐</div>

              <div className="bg-white rounded-2xl p-6 border-4 border-amber-300 relative shadow-inner">
                <Award className="h-16 w-16 text-yellow-500 mx-auto mb-3 animate-[spin_8s_linear_infinite]" />
                
                <span className="font-comic font-extrabold text-amber-600 tracking-widest text-xs block mb-1">
                  ENGLISH MAGIC CASTLE CHAMPION CERTIFICATE
                </span>
                
                <h2 className="text-3xl font-extrabold text-yellow-600 font-comic mb-4">
                  快乐英语小英雄勋章
                </h2>

                {/* Divider lines */}
                <div className="h-1 bg-yellow-100 max-w-xs mx-auto mb-6 rounded-full"></div>

                <p className="text-sm font-semibold text-gray-500 leading-relaxed mb-4">
                  兹证明聪明的英语小精灵
                </p>

                {/* Username slot */}
                <h3 className="text-4xl font-extrabold text-indigo-700 tracking-wide font-comic underline decoration-amber-400 decoration-wavy underline-offset-8 mb-4">
                  {learnerName || '小宝贝'} 👧
                </h3>

                <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-sm mx-auto mb-6 font-semibold">
                  在大红人李阿姨的 Practice 7 英语考试中以优异的表现通过了听力 forests、拼写大 jigsaw、对话派对以及找错侦探的所有试炼，表现非凡！
                </p>

                {/* High score box */}
                <div className="bg-amber-100/50 p-4 rounded-2xl max-w-xs mx-auto border-2 border-dashed border-amber-300 mb-6">
                  <span className="text-xs text-amber-700 font-extrabold uppercase tracking-widest block mb-0.5">你的大闯关成绩</span>
                  <span className="text-4xl font-extrabold font-comic text-orange-500">{score} 分 👑</span>
                </div>

                {/* Cute badges collection */}
                <div className="flex justify-center gap-3 mb-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-600 font-bold text-xs p-2.5 rounded-xl border border-rose-105 shadow-sm">
                    💖 听力满分星
                  </span>
                  <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-600 font-bold text-xs p-2.5 rounded-xl border border-sky-105 shadow-sm">
                    🚀 拼写大剑客
                  </span>
                  <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-600 font-bold text-xs p-2.5 rounded-xl border border-purple-105 shadow-sm">
                    👀 语法纠错王
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  id="btn-quiz-restart"
                  onClick={startAdventure}
                  className="flex-1 py-4.5 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-extrabold shadow-md hover:shadow-lg transition text-sm cursor-pointer"
                >
                  再次闯关挑战 🎯
                </button>
                <button
                  id="btn-quiz-home"
                  onClick={() => { soundFX.playPop(); setQuizStep(0); }}
                  className="px-6 py-4.5 rounded-full bg-white hover:bg-gray-50 border border-amber-250 text-amber-700 font-extrabold text-sm cursor-pointer"
                >
                  更换名字 challenge
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
