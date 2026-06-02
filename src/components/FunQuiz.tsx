import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, Play, Check, AlertCircle, ArrowRight, User, Award } from 'lucide-react';
import { ListeningQuestion, GrammarMistakeItem } from '../types';
import { listeningQuestions, grammarMistakes } from '../data';
import AudioPlayerButton from './AudioPlayerButton';
import { soundFX } from '../utils/sound';

interface FunQuizProps {
  listening?: ListeningQuestion[];
  mistakes?: GrammarMistakeItem[];
  lessonId?: 'lesson1' | 'lesson2';
}

export default function FunQuiz({
  listening = listeningQuestions,
  mistakes = grammarMistakes,
  lessonId = 'lesson1'
}: FunQuizProps) {
  const [learnerName, setLearnerName] = useState('李容与'); // Inspired by kid's handwritten name in screenshots
  const [quizStep, setQuizStep] = useState<number>(0); // 0: intro, 1: category, 2: sentence, 3: response, 4: grammar, 5: reward

  // Score states
  const [answers, setAnswers] = useState<{ [qId: string]: string }>({});
  const [grammarFixed, setGrammarFixed] = useState<{ [gmId: string]: boolean }>({});
  const [showAnswerFeedback, setShowAnswerFeedback] = useState<string | null>(null);

  // Sub indices
  const [listeningIdx, setListeningIdx] = useState(0);
  const [grammarIdx, setGrammarIdx] = useState(0);

  // Filter questions for sections dynamically from incoming props
  const categoryQuestions = listening.filter(q => q.type === 'category');
  const sentenceQuestions = listening.filter(q => q.type === 'sentence');
  const responseQuestions = listening.filter(q => q.type === 'response');

  const startAdventure = () => {
    soundFX.playSuccess();
    setAnswers({});
    setGrammarFixed({});
    setListeningIdx(0);
    setGrammarIdx(0);
    setQuizStep(1); // Go to Section A
  };

  const handleSelectAnswer = (qId: string, choice: string, correctChoice: string) => {
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
      // Transition to next land module
      setListeningIdx(0);
      setQuizStep(nextStepNum);
    }
  };

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
    if (grammarIdx + 1 < mistakes.length) {
      setGrammarIdx(gIdx => gIdx + 1);
    } else {
      soundFX.playFanfare();
      setQuizStep(5); // Go to Medal board!
    }
  };

  // Performance calculations
  const totalCorrectListening = listening.filter(
    q => answers[q.id] === q.correctAnswer
  ).length;

  const totalFixedGrammar = Object.values(grammarFixed).filter(v => v).length;
  
  const score = Math.round(
    ((totalCorrectListening + totalFixedGrammar) / (listening.length + mistakes.length)) * 100
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
            <div className="bg-white rounded-3xl border-8 border-rose-100 p-6 md:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-pink-400 via-amber-300 to-sky-400"></div>
              
              <div className="text-8xl mb-6 select-none animate-[bounce_2s_infinite]">🏆</div>
              
              <h3 className="text-2xl md:text-3xl font-extrabold text-rose-500 font-comic tracking-wide mb-2">
                英语大闯关冒险!
              </h3>
              
              <p className="text-sm font-semibold text-gray-500 leading-relaxed mb-6 px-1">
                {lessonId === 'lesson2'
                  ? '哈罗小勇士！今天我们将开启第二课 (Practice 8) 的终极听力与语法纠错测验！准备好和小伙伴Tina、还有美味牛排一起冲关，赢取专属金牌证书吧！'
                  : '哈罗小天使！我们将进行第一课 (Practice 7) 的听力魔法、影子句子、口语回答和找错纠错四大硬核挑战，快来带上冠冕吧！'}
              </p>

              {/* Enter User Name */}
              <div className="max-w-xs mx-auto mb-8 bg-pink-50/50 p-4 rounded-2xl border-2 border-dashed border-pink-200">
                <label className="text-xs font-black text-pink-600 uppercase block mb-2 tracking-widest flex items-center justify-center gap-1">
                  <User className="h-4 w-4" /> 选手登记名字 (Who is Playing)
                </label>
                <input
                  id="input-learner-name"
                  type="text"
                  value={learnerName}
                  onChange={(e) => setLearnerName(e.target.value)}
                  className="w-full text-center py-2.5 px-4 outline-none rounded-xl border-2 border-pink-300 text-pink-700 bg-white font-extrabold focus:border-rose-400 focus:ring-4 focus:ring-pink-100 transition shadow-sm text-md"
                  placeholder="输入你的名字"
                />
              </div>

              <button
                id="btn-start-adventure"
                onClick={startAdventure}
                className="w-full py-4.5 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-extrabold shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-95 transition flex justify-center items-center gap-2 cursor-pointer text-md text-amber-50"
              >
                开启奇幻闯关之旅 <ArrowRight className="h-5 w-5" />
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
            {/* Step 1 - Categories listening */}
            {categoryQuestions.length > 0 ? (
              <div className="bg-white rounded-3xl border-8 border-pink-100 p-6 shadow-xl relative">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-extrabold text-pink-500 bg-pink-50 px-3 py-1.5 rounded-full">
                    第一关：听力单词分类
                  </span>
                  <span className="text-xs text-gray-400 font-bold">
                    第 {listeningIdx + 1} / {categoryQuestions.length} 题
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="bg-pink-50/70 border-4 border-dashed border-pink-200 rounded-3xl p-6 text-center w-full mb-6 relative">
                    <span className="text-6xl select-none block mb-3">🧚</span>
                    <p className="text-md font-extrabold text-pink-700 leading-snug">
                      {categoryQuestions[listeningIdx].chineseInstruction}
                    </p>
                    
                    <div className="flex justify-center items-center gap-2.5 mt-4">
                      <span className="text-xs font-bold text-gray-400">听发音 (Click Play)：</span>
                      <AudioPlayerButton
                        text={categoryQuestions[listeningIdx].audioPrompt}
                        autoplay={true}
                        className="scale-120"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3.5 w-full mb-6">
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
                            <span className="inline-block bg-pink-100/60 text-pink-700 rounded-lg py-1 px-3.5 mr-3 text-sm">
                              {option.key}
                            </span>
                            {option.text}
                            <span className="text-xs text-gray-400 block mt-1 font-sans">
                              {option.label}
                            </span>
                          </div>

                          {isSelected && (
                            <span className="font-sans">
                              {isCorrect ? (
                                <span className="text-green-600 text-sm font-black">回答正确！ 🌟</span>
                              ) : (
                                <span className="text-red-500 text-sm font-black">别灰心，选错啦</span>
                              )}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {showAnswerFeedback === categoryQuestions[listeningIdx].id && (
                    <div className="bg-yellow-50 border-2 border-dashed border-yellow-200 p-4 rounded-2xl w-full text-center text-xs text-gray-650 font-bold mb-6">
                      💡 【魔法提示】：{categoryQuestions[listeningIdx].hint}
                    </div>
                  )}

                  {answers[categoryQuestions[listeningIdx].id] && (
                    <button
                      id="btn-next-category"
                      onClick={() => handleNextListeningQuestion(categoryQuestions.length, 2)}
                      className="w-full py-4.5 bg-pink-400 hover:bg-pink-500 text-white font-extrabold rounded-full shadow-md transition flex justify-center items-center gap-1.5 cursor-pointer text-sm"
                    >
                      下一题 <ArrowRight className="h-4.5 w-4.5" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center p-8 bg-white rounded-2xl">
                 <p className="text-gray-400 font-bold">没有配对题目，请直接跳到下一关</p>
                 <button onClick={() => setQuizStep(2)} className="mt-4 px-4 py-2 bg-pink-400 text-white rounded">继续</button>
              </div>
            )}
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
            {/* Step 2 - Sentence listen */}
            <div className="bg-white rounded-3xl border-8 border-amber-100 p-6 shadow-xl relative">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full">
                  第二关：课本听音辨别
                </span>
                <span className="text-xs text-gray-400 font-bold">
                  第 {listeningIdx + 1} / {sentenceQuestions.length} 题
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-amber-50/70 border-4 border-dashed border-amber-200 rounded-3xl p-6 text-center w-full mb-6 relative">
                  <span className="text-6xl select-none block mb-3">☁️</span>
                  <p className="text-md font-extrabold text-amber-700 leading-snug">
                    {sentenceQuestions[listeningIdx].chineseInstruction}
                  </p>
                  
                  <div className="flex justify-center items-center gap-2.5 mt-4">
                    <span className="text-xs font-bold text-gray-400">听录音女声：</span>
                    <AudioPlayerButton
                      text={sentenceQuestions[listeningIdx].audioPrompt}
                      autoplay={true}
                      className="scale-120"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3.5 w-full mb-6">
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
                          <span className="inline-block bg-amber-100/60 text-amber-700 rounded-lg py-1 px-3.5 mr-3 text-sm">
                            {option.key}
                          </span>
                          {option.text}
                          <span className="text-xs text-gray-400 block mt-1 font-sans">
                            {option.label}
                          </span>
                        </div>

                        {isSelected && (
                          <span className="font-sans">
                            {isCorrect ? (
                              <span className="text-green-600 text-sm font-black">选对啦！ 👍</span>
                            ) : (
                              <span className="text-red-500 text-sm font-black">差一丢丢哦</span>
                            )}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {showAnswerFeedback === sentenceQuestions[listeningIdx].id && (
                  <div className="bg-yellow-50 border-2 border-dashed border-yellow-250 p-4 rounded-2xl w-full text-center text-xs text-gray-650 font-bold mb-6">
                    💡 【点津学堂】：{sentenceQuestions[listeningIdx].hint}
                  </div>
                )}

                {answers[sentenceQuestions[listeningIdx].id] && (
                  <button
                    id="btn-next-sentence"
                    onClick={() => handleNextListeningQuestion(sentenceQuestions.length, 3)}
                    className="w-full py-4.5 bg-amber-400 hover:bg-amber-500 text-white font-extrabold rounded-full shadow-md transition flex justify-center items-center gap-1.5 cursor-pointer text-sm"
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
            {/* Step 3 - Intelligent dialogues replies */}
            <div className="bg-white rounded-3xl border-8 border-sky-100 p-6 shadow-xl relative">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-extrabold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-full">
                  第三关：小学者智慧对答
                </span>
                <span className="text-xs text-gray-400 font-bold">
                  第 {listeningIdx + 1} / {responseQuestions.length} 题
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-sky-50/70 border-4 border-dashed border-sky-200 rounded-3xl p-6 text-center w-full mb-6 relative">
                  <span className="text-6xl select-none block mb-3">🐿️</span>
                  <p className="text-md font-extrabold text-sky-700 leading-snug">
                    {responseQuestions[listeningIdx].chineseInstruction}
                  </p>
                  
                  <div className="flex justify-center items-center gap-2.5 mt-4">
                    <span className="text-xs font-bold text-gray-400">听会话问句：</span>
                    <AudioPlayerButton
                      text={responseQuestions[listeningIdx].audioPrompt}
                      autoplay={true}
                      className="scale-120"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3.5 w-full mb-6">
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
                          <span className="inline-block bg-sky-100/60 text-sky-700 rounded-lg py-1 px-3.5 mr-3 text-sm">
                            {option.key}
                          </span>
                          {option.text}
                          <span className="text-xs text-gray-400 block mt-1 font-sans">
                            {option.label}
                          </span>
                        </div>

                        {isSelected && (
                          <span className="font-sans">
                            {isCorrect ? (
                              <span className="text-green-600 text-sm font-black">太牛了！100分 🥇</span>
                            ) : (
                              <span className="text-red-500 text-sm font-black">可以做得更好哦</span>
                            )}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {showAnswerFeedback === responseQuestions[listeningIdx].id && (
                  <div className="bg-yellow-50 border-2 border-dashed border-yellow-250 p-4 rounded-2xl w-full text-center text-xs text-gray-650 font-bold mb-6">
                    💡 【名师解析】：{responseQuestions[listeningIdx].hint}
                  </div>
                )}

                {answers[responseQuestions[listeningIdx].id] && (
                  <button
                    id="btn-next-response"
                    onClick={() => handleNextListeningQuestion(responseQuestions.length, 4)}
                    className="w-full py-4.5 bg-sky-400 hover:bg-sky-500 text-white font-extrabold rounded-full shadow-md transition flex justify-center items-center gap-1.5 cursor-pointer text-sm"
                  >
                    下一大关 🚪
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
            {/* Step 4 - Grammar debug */}
            <div className="bg-white rounded-3xl border-8 border-purple-100 p-6 shadow-xl relative">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-extrabold text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full">
                  第四关：语法纠错小雷达
                </span>
                <span className="text-xs text-gray-400 font-bold">
                  第 {grammarIdx + 1} / {mistakes.length} 句
                </span>
              </div>

              <div className="flex flex-col items-center animate-[fade-in_0.3s_ease]">
                <div className="bg-purple-50/70 border-4 border-dashed border-purple-200 rounded-3xl p-6 text-center w-full mb-6 relative">
                  <div className="text-6xl select-none block mb-2">🔍🐛</div>
                  <h5 className="font-extrabold text-purple-800 text-lg leading-tight">
                    发现这个句子里的“小错毛毛虫”吗？
                  </h5>
                  <p className="text-xs text-gray-500 font-bold mt-1">
                    点击那一个拼写或单负数、系动词错误的单词，让它立刻变成正确的！
                  </p>
                </div>

                <div className="bg-gray-50/50 p-6 border rounded-2xl w-full text-center relative mb-6">
                  <div className="flex flex-wrap justify-center gap-2 items-center text-lg md:text-xl font-comic font-extrabold text-gray-700">
                    {mistakes[grammarIdx].wrongSentence.split(' ').map((word, wIdx) => {
                      const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
                      const targetWrongWord = mistakes[grammarIdx].wrongWord.toLowerCase();
                      const isBug = cleanWord === targetWrongWord;
                      const isFixed = grammarFixed[mistakes[grammarIdx].id];

                      return (
                        <span
                          id={`word-bubble-${word.toLowerCase().replace(/[^a-z]/g, '')}`}
                          key={wIdx}
                          onClick={() => handleFixWord(mistakes[grammarIdx].id, isBug)}
                          className={`px-3 py-1 rounded-xl cursor-pointer transition-all duration-300 relative border-2 ${
                            isFixed && isBug
                              ? 'bg-green-500 text-white border-green-600 scale-105 shadow-md line-throughDecoration'
                              : isBug
                              ? 'bg-red-50 hover:bg-red-100 text-red-650 border-red-200 border-dashed animate-pulse'
                              : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-100/60'
                          }`}
                        >
                          {isBug && isFixed ? mistakes[grammarIdx].correctedWord : word}
                          
                          {isBug && !isFixed && (
                            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-400"></span>
                          )}
                        </span>
                      );
                    })}
                  </div>

                  {grammarFixed[mistakes[grammarIdx].id] && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 pt-4 border-t border-dashed border-gray-200 text-center"
                    >
                      <p className="text-green-600 font-extrabold text-sm flex items-center justify-center gap-1">
                         毛毛虫被赶跑了！： <Sparkles className="h-4 w-4 text-amber-400 fill-amber-300" />
                        "{mistakes[grammarIdx].fullCorrectSentence}"
                      </p>
                      
                      <p className="text-xs text-gray-400 font-bold mt-1">
                        意思：{mistakes[grammarIdx].chinese}
                      </p>

                      <div className="flex justify-center mt-3">
                        <AudioPlayerButton text={mistakes[grammarIdx].fullCorrectSentence} autoplay={true} />
                      </div>
                    </motion.div>
                  )}
                </div>

                {grammarFixed[mistakes[grammarIdx].id] && (
                  <button
                    id="btn-next-grammar"
                    onClick={handleNextGrammarQuestion}
                    className="w-full py-4.5 bg-purple-500 hover:bg-purple-600 text-white font-extrabold rounded-full shadow-md transition flex justify-center items-center gap-1.5 cursor-pointer text-sm"
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
            {/* Rewards certificate matching current lesson and name */}
            <div className="bg-gradient-to-b from-amber-50 to-orange-50 border-[12px] border-amber-200 rounded-3xl p-5 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-10 left-10 text-3xl animate-bounce">✨</div>
              <div className="absolute top-20 right-10 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>🎈</div>
              <div className="absolute bottom-10 left-12 text-3xl animate-bounce" style={{ animationDelay: '1.5s' }}>⭐</div>

              <div className="bg-white rounded-2xl p-5 md:p-6 border-4 border-amber-300 relative shadow-inner text-center">
                <Award className="h-16 w-16 text-yellow-500 mx-auto mb-3 animate-[spin_8s_linear_infinite]" />
                
                <span className="font-comic font-extrabold text-amber-600 tracking-widest text-xs block mb-1">
                  ENGLISH MAGIC CASTLE CHAMPION CERTIFICATE
                </span>
                
                <h2 className="text-2xl md:text-3xl font-extrabold text-yellow-600 font-comic mb-4">
                  {lessonId === 'lesson2' ? '⭐ 第二课荣誉小奖牌' : '⭐ 第一课荣誉小角标'}
                </h2>

                <div className="h-1 bg-yellow-100 max-w-xs mx-auto mb-6 rounded-full"></div>

                <p className="text-sm font-semibold text-gray-500 leading-relaxed mb-4">
                  兹证明聪明的英语小探险手
                </p>

                <h3 className="text-3xl md:text-4xl font-extrabold text-indigo-700 tracking-wide font-comic underline decoration-amber-400 decoration-wavy underline-offset-8 mb-4">
                  {learnerName || '小精灵'} 👧
                </h3>

                <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-sm mx-auto mb-6 font-semibold">
                  {lessonId === 'lesson2'
                    ? '在城堡的"Practice 8 伦敦笔友与美味午餐词句大闯关"中，成功攻克了排队、信号灯、a/an冠词和there structures的所有大冒险！'
                    : '在城堡的"Practice 7 衣服与玩具词名大闯关"中，成功通过了听力、字母jaws、进行时语法等所有艰难试炼，满载而归！'}
                </p>

                {/* Score badge */}
                <div className="bg-amber-100/50 p-4 rounded-2xl max-w-xs mx-auto border-2 border-dashed border-amber-300 mb-6">
                  <span className="text-xs text-amber-700 font-extrabold uppercase tracking-widest block mb-0.5">城堡大合战成绩</span>
                  <span className="text-3xl md:text-4xl font-extrabold font-comic text-orange-500">{score} 分 👑</span>
                </div>

                {/* Rewards collection */}
                <div className="flex justify-center gap-2.5 mb-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-600 font-bold text-[10px] md:text-xs py-1.5 px-3 rounded-xl border border-rose-100/40">
                    💅 伦敦通晓王
                  </span>
                  <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-600 font-bold text-[10px] md:text-xs py-1.5 px-3 rounded-xl border border-sky-100/40">
                    🍔 营养午餐星
                  </span>
                  <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-600 font-bold text-[10px] md:text-xs py-1.5 px-3 rounded-xl border border-purple-100/40">
                    🔮 there be大满贯
                  </span>
                </div>
              </div>

              {/* Reset handlers */}
              <div className="flex gap-3 mt-6">
                <button
                  id="btn-quiz-restart"
                  onClick={startAdventure}
                  className="flex-1 py-4 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-extrabold shadow-md hover:shadow-lg transition text-sm cursor-pointer"
                >
                  再次挑战 🎯
                </button>
                <button
                  id="btn-quiz-home"
                  onClick={() => { soundFX.playPop(); setQuizStep(0); }}
                  className="px-6 py-4 rounded-full bg-white hover:bg-gray-50 border border-amber-200 text-amber-700 font-extrabold text-sm cursor-pointer"
                >
                  更换选手名字
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
