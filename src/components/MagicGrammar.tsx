import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, HelpCircle, GraduationCap, Check, ArrowRight } from 'lucide-react';
import { grammarLessons } from '../data';
import AudioPlayerButton from './AudioPlayerButton';
import { soundFX } from '../utils/sound';

interface QuestionWordPractice {
  id: number;
  question: string;
  response: string;
  correctWord: string;
  hint: string;
  chinese: string;
}

export default function MagicGrammar() {
  const [activeTab, setActiveTab] = useState<'question' | 'continuous'>('question');

  // Question words state
  const practices: QuestionWordPractice[] = [
    { id: 1, question: "______ one do you like? ", response: "— I like the red one.", correctWord: "Which", hint: "询问「哪一个」", chinese: "—— 哪个是你喜欢的？\n—— 我喜欢红色的。" },
    { id: 2, question: "______ is that?", response: "— That's my sister, May.", correctWord: "Who", hint: "询问「谁」", chinese: "—— 那是谁？\n—— 那是我的妹妹阿美。" },
    { id: 3, question: "______ is he now?", response: "— He is in the living room.", correctWord: "Where", hint: "询问「在哪里」", chinese: "—— 他现在在哪里呢？\n—— 他正在客厅里。" },
    { id: 4, question: "______'s she doing?", response: "— She's driving a car.", correctWord: "What", hint: "询问「做什么事情什么」", chinese: "—— 她正在做什么呢？\n—— 她正在开车呢。" },
    { id: 5, question: "______ is she?", response: "— She is very young. She is five.", correctWord: "How old", hint: "询问「几岁了」", chinese: "—— 她几岁啦？\n—— 她还很小。她才五岁。" },
    { id: 6, question: "______ books have you got?", response: "— I've got 10.", correctWord: "How many", hint: "询问数量「多少本」", chinese: "—— 你有多少本书？\n—— 我有10本。" }
  ];

  const wordOptions = ["How many", "Who", "How old", "What", "Where", "Which"];

  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [showHelper, setShowHelper] = useState(false);

  // Present continuous dress-up state
  const [continuousIdx, setContinuousIdx] = useState(0);
  const continuousList = [
    { text: "I'm playing tennis.", verb: "playing", aux: "am", emoji: "🎾", person: "I" },
    { text: "We're singing.", verb: "singing", aux: "are", emoji: "🎤", person: "We" },
    { text: "They're swimming.", verb: "swimming", aux: "are", emoji: "🏊", person: "They" },
    { text: "He's riding a bike.", verb: "riding", aux: "is", emoji: "🚲", person: "He" },
    { text: "She's reading a book.", verb: "reading", aux: "is", emoji: "📖", person: "She" },
  ];
  const [continuousAux, setContinuousAux] = useState<string | null>(null);
  const [continuousVerb, setContinuousVerb] = useState<string | null>(null);
  const [scoreAnimation, setScoreAnimation] = useState(false);

  const handleWordSelect = (word: string) => {
    soundFX.playPop();
    setSelectedWord(word);
  };

  const handleSlotClick = (practiceId: number, correctWord: string) => {
    if (!selectedWord) return;
    
    if (selectedWord === correctWord) {
      soundFX.playSuccess();
      setUserAnswers(prev => ({ ...prev, [practiceId]: selectedWord }));
      setSelectedWord(null);
    } else {
      soundFX.playBoop();
      setSelectedWord(null);
    }
  };

  const resetQuestionPractice = () => {
    soundFX.playPop();
    setUserAnswers({});
    setSelectedWord(null);
  };

  // continuous dress up logic
  const handleContinuousSelect = (type: 'aux' | 'verb', value: string) => {
    soundFX.playPop();
    if (type === 'aux') {
      setContinuousAux(value);
    } else {
      setContinuousVerb(value);
    }

    const correctItem = continuousList[continuousIdx];
    const isAuxCorrect = type === 'aux' ? value === correctItem.aux : continuousAux === correctItem.aux;
    const isVerbCorrect = type === 'verb' ? value === correctItem.verb : continuousVerb === correctItem.verb;

    if (isAuxCorrect && isVerbCorrect && ((type === 'aux' && continuousVerb) || (type === 'verb' && continuousAux))) {
      soundFX.playSuccess();
      setScoreAnimation(true);
    }
  };

  const currentContinuousItem = continuousList[continuousIdx];

  const nextContinuous = () => {
    soundFX.playPop();
    setScoreAnimation(false);
    setContinuousAux(null);
    setContinuousVerb(null);
    setContinuousIdx((prev) => (prev + 1) % continuousList.length);
  };

  return (
    <div className="w-full">
      {/* Sub Tabs */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          id="btn-sub-tab-question"
          onClick={() => { soundFX.playPop(); setActiveTab('question'); }}
          className={`px-5 py-3 rounded-full text-md font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer ${
            activeTab === 'question'
              ? 'bg-gradient-to-r from-purple-400 to-indigo-400 text-white scale-105 border-b-4 border-indigo-600'
              : 'bg-white hover:bg-purple-50 text-purple-500 border-2 border-purple-50'
          }`}
        >
          🧩 疑问词气球配对
        </button>
        <button
          id="btn-sub-tab-continuous"
          onClick={() => { soundFX.playPop(); setActiveTab('continuous'); }}
          className={`px-5 py-3 rounded-full text-md font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer ${
            activeTab === 'continuous'
              ? 'bg-gradient-to-r from-purple-400 to-indigo-400 text-white scale-105 border-b-4 border-indigo-600'
              : 'bg-white hover:bg-purple-50 text-purple-500 border-2 border-purple-50'
          }`}
        >
          👚 现在进行时换装
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'question' && (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-2xl mx-auto"
          >
            {/* Rule book */}
            <div className="bg-purple-50 border-4 border-purple-200 border-dashed rounded-3xl p-5 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="flex items-center gap-2 font-extrabold text-purple-800 text-md">
                  <GraduationCap className="h-6 w-6 text-purple-600" />
                  魔法语法本：特殊疑问词的秘诀
                </span>
                <button
                  id="toggle-help"
                  onClick={() => { soundFX.playPop(); setShowHelper(!showHelper); }}
                  className="text-xs px-2.5 py-1 bg-purple-200 text-purple-800 rounded-full font-bold cursor-pointer"
                >
                  {showHelper ? '收起法宝' : '查看法宝'}
                </button>
              </div>

              {showHelper ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 mt-3 text-xs">
                  {grammarLessons.questionWords.map((q, idx) => (
                    <div key={idx} className="bg-white p-2.5 border border-purple-100 rounded-xl shadow-sm">
                      <span className="font-bold text-indigo-600 text-sm block">{q.word}</span>
                      <span className="text-gray-500 font-semibold">{q.chinese}</span>
                      <p className="text-[10px] text-gray-400 leading-tight mt-1">{q.context}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-purple-700 leading-relaxed font-bold">
                  小卡片上有好几个句子，有些词不小心溜走啦！先点击下面的疑问词，再点击卡片上的虚线，帮小词回家吧！
                </p>
              )}
            </div>

            {/* Balloons Option selector */}
            <div className="bg-white rounded-3xl border-8 border-purple-100 p-6 shadow-xl mb-6">
              <h4 className="text-center font-extrabold text-purple-800 mb-4 text-md">🎈 第一步：抓一个疑问词气球</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {wordOptions.map((word) => {
                  const isUsed = Object.values(userAnswers).includes(word);
                  const isSelected = selectedWord === word;
                  return (
                    <button
                      id={`bubble-word-${word.toLowerCase().replace(/ /g, '-')}`}
                      key={word}
                      disabled={isUsed}
                      onClick={() => handleWordSelect(word)}
                      className={`px-4 py-2.5 rounded-full text-md font-extrabold font-comic shadow-md transition-all duration-300 relative cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-500 text-white scale-110 shadow-lg ring-4 ring-indigo-200'
                          : isUsed
                          ? 'bg-gray-100 text-gray-300 pointer-events-none line-through'
                          : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200'
                      }`}
                    >
                      {word}
                      {isSelected && <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-400 rounded-full animate-ping"></span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Questions slots list */}
            <div className="bg-white rounded-3xl border-8 border-purple-100 p-6 shadow-xl relative">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-extrabold text-purple-800">✍️ 第二步：将气球填入下方的问句里</span>
                {Object.keys(userAnswers).length > 0 && (
                  <button
                    id="btn-questions-reset"
                    onClick={resetQuestionPractice}
                    className="text-xs text-purple-500 font-extrabold cursor-pointer hover:underline"
                  >
                    重置
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-4">
                {practices.map((practice) => {
                  const isMatched = !!userAnswers[practice.id];
                  const matchText = userAnswers[practice.id];
                  return (
                    <div
                      id={`practice-box-${practice.id}`}
                      key={practice.id}
                      className={`p-4 rounded-2xl border-2 transition duration-300 relative ${
                        isMatched
                          ? 'border-green-300 bg-green-50/40'
                          : selectedWord
                          ? 'border-dashed border-indigo-300 bg-indigo-50/10 cursor-pointer hover:bg-indigo-50/20'
                          : 'border-dashed border-purple-200 bg-white'
                      }`}
                      onClick={() => !isMatched && handleSlotClick(practice.id, practice.correctWord)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="flex-1 font-comic font-extrabold md:text-lg text-gray-800 leading-normal">
                          <p className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-purple-400">Q:</span>
                            {isMatched ? (
                              <motion.span
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className="bg-green-500 text-white font-extrabold font-comic px-3 py-1 rounded-lg inline-block shadow-sm"
                              >
                                {matchText}
                              </motion.span>
                            ) : (
                              <span className={`inline-block px-4 py-1 rounded-lg border-2 border-dashed font-bold min-w-[70px] text-center text-sm transition-all ${
                                selectedWord 
                                  ? 'border-indigo-400 bg-indigo-50 text-indigo-400 animate-pulse'
                                  : 'border-purple-300 bg-purple-50 text-purple-300'
                              }`}>
                                {selectedWord ? '点击此空' : '❔ 疑问词'}
                              </span>
                            )}
                            {practice.question.replace('______', '')}
                          </p>
                          <p className="text-gray-500 font-semibold mt-1 flex items-center gap-1">
                            <span className="text-indigo-400">A:</span> {practice.response}
                          </p>
                          
                          {/* Chinese translation */}
                          {isMatched && (
                            <p className="text-xs text-gray-400 mt-2 whitespace-pre-line font-sans font-semibold leading-relaxed">
                              {practice.chinese}
                            </p>
                          )}
                        </div>

                        {/* Speaking and check badges */}
                        <div className="flex items-center gap-2">
                          {isMatched ? (
                            <>
                              <AudioPlayerButton text={practice.question.replace('______', matchText) + ' ' + practice.response} className="scale-90" />
                              <span className="bg-green-100 text-green-700 rounded-full p-1 animate-pulse">
                                <Check className="h-4 w-4 stroke-[3px]" />
                              </span>
                            </>
                          ) : (
                            <span className="text-xs font-bold text-gray-300 italic bg-gray-50 px-2.5 py-1 rounded-lg">
                              {practice.hint}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {Object.keys(userAnswers).length === practices.length && (
                <div className="bg-green-100 border-4 border-green-300 rounded-2xl p-6 text-center mt-6 shadow-md animate-bounce">
                  <Trophy className="h-10 w-10 text-yellow-500 mx-auto mb-2 animate-pulse" />
                  <h4 className="text-green-800 text-xl font-extrabold">🎉 恭喜你！疑问词配对大满贯！</h4>
                  <p className="text-sm font-semibold text-green-700 mt-1">你百分之百掌握了这些最常用的词汇气球！太聪明了！</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'continuous' && (
          <motion.div
            key="continuous"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-xl mx-auto"
          >
            {/* Formula box */}
            <div className="bg-indigo-50 border-4 border-indigo-200 border-dashed rounded-3xl p-5 mb-6 text-center">
              <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
                 🌟 核心小公式 🌟
              </span>
              <h5 className="text-indigo-800 text-xl font-extrabold font-comic">
                {grammarLessons.presentContinuousForm.formula}
              </h5>
              <p className="text-xs text-gray-400 font-semibold mt-1">
                {grammarLessons.presentContinuousForm.usage}
              </p>
            </div>

            {/* Dress Up Dashboard */}
            <div className="bg-white rounded-3xl border-8 border-indigo-100 p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-4 right-4 text-xs font-extrabold text-indigo-400">
                进度 {continuousIdx + 1} / {continuousList.length}
              </div>

              <div className="flex flex-col items-center">
                {/* Character Action Panel */}
                <div className="h-44 w-44 rounded-full bg-gradient-to-b from-indigo-50 to-indigo-100 flex items-center justify-center relative border-4 border-white shadow-inner mb-6">
                  {/* Animating action emoji */}
                  <span className={`text-7xl select-none animate-[bounce_2s_infinite] ${scoreAnimation ? 'scale-110 rotate-12 duration-500' : ''}`}>
                    {currentContinuousItem.emoji}
                  </span>
                  {scoreAnimation && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-white text-xs font-extrabold p-2 rounded-full shadow-lg"
                    >
                      👑 美美哒!
                    </motion.div>
                  )}
                </div>

                {/* Cloze test block */}
                <div className="bg-indigo-50/50 p-4 rounded-2xl w-full text-center border-2 border-indigo-100 mb-8 min-h-[100px]">
                  <p className="text-xs font-extrabold text-indigo-400 block mb-2 uppercase tracking-wide">
                     👗 点击下方的小砖块，帮衣服配对
                  </p>
                  
                  <div className="flex justify-center items-center gap-2 flex-wrap font-comic font-extrabold text-xl md:text-2xl text-gray-700">
                    <span>{currentContinuousItem.person}</span>
                    
                    {/* Aux Blank slot */}
                    <span className={`px-3 py-1 border-2 rounded-xl transition-all shadow-sm ${
                      continuousAux === currentContinuousItem.aux
                        ? 'bg-green-500 text-white border-green-600 scale-105'
                        : continuousAux
                        ? 'bg-rose-100 text-rose-500 border-rose-300'
                        : 'bg-white border-dashed border-gray-400 text-transparent min-w-[50px] inline-block h-10'
                    }`}>
                      {continuousAux || '?'}
                    </span>

                    {/* Verb Blank slot */}
                    <span className={`px-3 py-1 border-2 rounded-xl transition-all shadow-sm ${
                      continuousVerb === currentContinuousItem.verb
                        ? 'bg-green-500 text-white border-green-600 scale-105'
                        : continuousVerb
                        ? 'bg-rose-100 text-rose-500 border-rose-300'
                        : 'bg-white border-dashed border-gray-400 text-transparent min-w-[90px] inline-block h-10'
                    }`}>
                      {continuousVerb || '?'}
                    </span>

                    <span className="text-gray-400">.</span>
                  </div>

                  {scoreAnimation && (
                    <div className="mt-4 pt-3 border-t border-indigo-100 flex items-center justify-center gap-2">
                      <p className="text-green-700 font-extrabold text-sm">
                        "你太棒了！拼出了： {currentContinuousItem.text}"
                      </p>
                      <AudioPlayerButton text={currentContinuousItem.text} autoplay={true} />
                    </div>
                  )}
                </div>

                {/* Interactive dress selections */}
                <div className="grid grid-cols-2 gap-4 w-full">
                  {/* Aux choice group */}
                  <div className="bg-purple-50/40 p-3 rounded-2xl border border-purple-100">
                    <span className="text-xs font-bold text-purple-600 block mb-2 text-center">
                      第一件：系助动词衣服 (am/is/are)
                    </span>
                    <div className="flex flex-col gap-2">
                      {["am", "is", "are"].map((aux) => (
                        <button
                          id={`aux-choice-${aux}`}
                          key={aux}
                          onClick={() => handleContinuousSelect('aux', aux)}
                          className={`py-2 px-3 rounded-xl font-bold font-comic shadow-sm border transition text-sm cursor-pointer ${
                            continuousAux === aux
                              ? 'bg-purple-600 text-white border-purple-700'
                              : 'bg-white hover:bg-purple-50 text-purple-700 border-purple-200'
                          }`}
                        >
                          {aux}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Verb choice group */}
                  <div className="bg-sky-50/40 p-3 rounded-2xl border border-sky-100">
                    <span className="text-xs font-bold text-sky-600 block mb-2 text-center">
                      第二件：正在进行动词 (-ing)
                    </span>
                    <div className="flex flex-col gap-2">
                      {["playing", "singing", "swimming", "riding", "reading"].map((verb) => (
                        <button
                          id={`verb-choice-${verb}`}
                          key={verb}
                          onClick={() => handleContinuousSelect('verb', verb)}
                          className={`py-2 px-3 rounded-xl font-bold font-comic shadow-sm border transition text-sm cursor-pointer ${
                            continuousVerb === verb
                              ? 'bg-sky-600 text-white border-sky-700'
                              : 'bg-white hover:bg-sky-50 text-sky-750 border-sky-200'
                          }`}
                        >
                          {verb}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Next button */}
                {scoreAnimation && (
                  <button
                    id="btn-continuous-next"
                    onClick={nextContinuous}
                    className="w-full mt-6 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-extrabold shadow-lg hover:shadow-xl transition flex justify-center items-center gap-1 cursor-pointer"
                  >
                    帮下一个动物换装 <ArrowRight className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
