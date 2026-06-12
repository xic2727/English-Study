import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, HelpCircle, GraduationCap, Check, ArrowRight, RotateCcw } from 'lucide-react';
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

interface MagicGrammarProps {
  lessonId?: 'lesson1' | 'lesson2' | 'lesson9';
}

export default function MagicGrammar({ lessonId = 'lesson1' }: MagicGrammarProps) {
  const [activeTab, setActiveTab] = useState<'question' | 'continuous'>('question');

  // ==================== LESSON 1 DATA & LOGIC ====================
  // Question words state
  const practicesL1: QuestionWordPractice[] = [
    { id: 1, question: "______ one do you like? ", response: "— I like the red one.", correctWord: "Which", hint: "询问「哪一个」", chinese: "—— 哪个是你喜欢的？\n—— 我喜欢红色的。" },
    { id: 2, question: "______ is that?", response: "— That's my sister, May.", correctWord: "Who", hint: "询问「谁」", chinese: "—— 那是谁？\n—— 那是我的妹妹阿美。" },
    { id: 3, question: "______ is he now?", response: "— He is in the living room.", correctWord: "Where", hint: "询问「在哪里」", chinese: "—— 他现在在哪里呢？\n—— 他正在客厅里。" },
    { id: 4, question: "______'s she doing?", response: "— She's driving a car.", correctWord: "What", hint: "询问「做什么事情什么」", chinese: "—— 她正在做什么呢？\n—— 她正在开车呢。" },
    { id: 5, question: "______ is she?", response: "— She is very young. She is five.", correctWord: "How old", hint: "询问「几岁了」", chinese: "—— 她几岁啦？\n—— 她还很小。她才五岁。" },
    { id: 6, question: "______ books have you got?", response: "— I've got 10.", correctWord: "How many", hint: "询问数量「多少本」", chinese: "—— 你有多少本书？\n—— 我有10本。" }
  ];

  const wordOptionsL1 = ["How many", "Who", "How old", "What", "Where", "Which"];

  // L1 Present continuous dress-up state
  const [continuousIdxL1, setContinuousIdxL1] = useState(0);
  const continuousListL1 = [
    { text: "I'm playing tennis.", verb: "playing", aux: "am", emoji: "🎾", person: "I" },
    { text: "We're singing.", verb: "singing", aux: "are", emoji: "🎤", person: "We" },
    { text: "They're swimming.", verb: "swimming", aux: "are", emoji: "🏊", person: "They" },
    { text: "He's riding a bike.", verb: "riding", aux: "is", emoji: "🚲", person: "He" },
    { text: "She's reading a book.", verb: "reading", aux: "is", emoji: "📖", person: "She" },
  ];


  // ==================== LESSON 2 DATA & LOGIC ====================
  // Articles and there be fill in blanks (From Page 53 Lucy's Diary)
  const practicesL2: QuestionWordPractice[] = [
    { id: 1, question: "Hello, I'm Lucy. I am ______ girl.", response: "I've got a big bag.", correctWord: "a", hint: "辅音音素开头用 'a'", chinese: "你好，我是Lucy。我是一个女孩。我背着个大大的包包。" },
    { id: 2, question: "There is a banana and ______ apple.", response: "My sweet fruit lunch.", correctWord: "an", hint: "元音音素(a, e, i, o, u)开头用 'an'", chinese: "包里有一个香蕉和一个苹果。我的甜美水果午餐。" },
    { id: 3, question: "There ______ some books in it.", response: "They are very interesting.", correctWord: "are", hint: "books 是复数，用 'are'", chinese: "里面还有一些书。它们非常有趣哦。" },
    { id: 4, question: "And there ______ a cute doll, too.", response: "She has beautiful eyes.", correctWord: "is", hint: "a doll 是单数，用 'is'", chinese: "里面还有一个可爱的洋娃娃哦。她的大眼睛真美丽。" },
    { id: 5, question: "______ doll's name is Lucy, too!", response: "She is my great friend.", correctWord: "The", hint: "前面提到过的doll，这里二次提到特指要用 'The'", chinese: "那只洋娃娃的名字也叫Lucy呢！她是我的好朋友。" }
  ];

  const wordOptionsL2 = ["a", "an", "The", "is", "are", "of"];

  // ==================== LESSON 9 DATA & LOGIC ====================
  const practicesL9: QuestionWordPractice[] = [
    { id: 1, question: "______ is the boy in white?", response: "— He is Jack.", correctWord: "Who", hint: "询问「谁」", chinese: "—— 那个穿白衣服的男孩是谁？\n—— 他是杰克。" },
    { id: 2, question: "______ is the zoo?", response: "— It's near the shop.", correctWord: "Where", hint: "询问「在哪里」", chinese: "—— 动物园在哪里呢？\n—— 在商店附近。" },
    { id: 3, question: "______ dress do you like?", response: "— I like the red one.", correctWord: "Which", hint: "询问「哪一个」", chinese: "—— 你喜欢哪一件连衣裙？\n—— 我喜欢红色的那件。" },
    { id: 4, question: "______ is your height?", response: "— My height is 1.3 meters.", correctWord: "What", hint: "询问「是什么」", chinese: "—— 你的身高是多少？\n—— 我的身高是1.3米。" },
    { id: 5, question: "How ______ is your sister?", response: "— She is 1.5 meters tall.", correctWord: "tall", hint: "询问「多高」", chinese: "—— 你妹妹有多高？\n—— 她有一点五米高。" }
  ];

  const wordOptionsL9 = ["Who", "Where", "Which", "What", "tall", "meters"];

  // L9 Height & Body Builder
  const [continuousIdxL9, setContinuousIdxL9] = useState(0);
  const heightListL9 = [
    { text: "I am 1.4 meters tall.", verb: "tall", aux: "am", emoji: "🦒", person: "I" },
    { text: "She is 1.5 meters tall.", verb: "tall", aux: "is", emoji: "📏", person: "She" },
    { text: "We are spelling arm.", verb: "spelling", aux: "are", emoji: "💪", person: "We" },
    { text: "He has a big face.", verb: "face", aux: "has", emoji: "🧒", person: "He" },
    { text: "They have cute ears.", verb: "ears", aux: "have", emoji: "👂", person: "They" },
  ];

  // L2 There Be dress-up state
  const [continuousIdxL2, setContinuousIdxL2] = useState(0);
  const thereBeListL2 = [
    { text: "There is a park in our town.", verb: "is", aux: "There", emoji: "🏞️", phrase: "a park" },
    { text: "There are four children in the queue.", verb: "are", aux: "There", emoji: "🧒🧒", phrase: "four children" },
    { text: "There is a mirror on the wall.", verb: "is", aux: "There", emoji: "🪞", phrase: "a mirror" },
    { text: "There are some books on the table.", verb: "are", aux: "There", emoji: "📚", phrase: "some books" },
    { text: "There is an apple in the bag.", verb: "is", aux: "There", emoji: "🍎", phrase: "an apple" },
  ];


  // ==================== SHARED STATES ====================
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [showHelper, setShowHelper] = useState(false);

  // Dress Up shared states
  const [continuousAux, setContinuousAux] = useState<string | null>(null);
  const [continuousVerb, setContinuousVerb] = useState<string | null>(null);
  const [scoreAnimation, setScoreAnimation] = useState(false);


  // ==================== HELPERS ====================
  const practices = lessonId === 'lesson9' ? practicesL9 : (lessonId === 'lesson1' ? practicesL1 : practicesL2);
  const wordOptions = lessonId === 'lesson9' ? wordOptionsL9 : (lessonId === 'lesson1' ? wordOptionsL1 : wordOptionsL2);
  const dressUpList = lessonId === 'lesson9' ? heightListL9 : (lessonId === 'lesson1' ? continuousListL1 : thereBeListL2);
  const dressUpIdx = lessonId === 'lesson9' ? continuousIdxL9 : (lessonId === 'lesson1' ? continuousIdxL1 : continuousIdxL2);
  const currentDressUpItem = dressUpList[dressUpIdx];

  const handleWordSelect = (word: string) => {
    soundFX.playPop();
    setSelectedWord(word);
  };

  const handleSlotClick = (practiceId: number, correctWord: string) => {
    if (!selectedWord) return;
    
    // Check if correct word matches (ignore case just in case "the" and "The")
    if (selectedWord.toLowerCase() === correctWord.toLowerCase()) {
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

  const handleDressUpSelect = (type: 'aux' | 'verb', value: string) => {
    soundFX.playPop();
    if (type === 'aux') {
      setContinuousAux(value);
    } else {
      setContinuousVerb(value);
    }

    // Checking answers
    const isAuxCorrect = type === 'aux' ? value.toLowerCase() === currentDressUpItem.aux.toLowerCase() : continuousAux?.toLowerCase() === currentDressUpItem.aux.toLowerCase();
    const isVerbCorrect = type === 'verb' ? value.toLowerCase() === currentDressUpItem.verb.toLowerCase() : continuousVerb?.toLowerCase() === currentDressUpItem.verb.toLowerCase();

    if (isAuxCorrect && isVerbCorrect && ((type === 'aux' && continuousVerb) || (type === 'verb' && continuousAux))) {
      soundFX.playSuccess();
      setScoreAnimation(true);
    }
  };

  const nextDressUp = () => {
    soundFX.playPop();
    setScoreAnimation(false);
    setContinuousAux(null);
    setContinuousVerb(null);
    if (lessonId === 'lesson1') {
      setContinuousIdxL1((prev) => (prev + 1) % dressUpList.length);
    } else if (lessonId === 'lesson9') {
      setContinuousIdxL9((prev) => (prev + 1) % dressUpList.length);
    } else {
      setContinuousIdxL2((prev) => (prev + 1) % dressUpList.length);
    }
  };

  return (
    <div className="w-full">
      {/* Sub Tabs Selection */}
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        <button
          id={`btn-sub-tab-question-${lessonId}`}
          onClick={() => { soundFX.playPop(); setActiveTab('question'); }}
          className={`px-5 py-3 rounded-full text-md font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer ${
            activeTab === 'question'
              ? 'bg-gradient-to-r from-purple-400 to-indigo-400 text-white scale-105 border-b-4 border-indigo-600'
              : 'bg-white hover:bg-purple-100 text-purple-600 border-2 border-purple-50'
          }`}
        >
          {lessonId === 'lesson2' ? '🧩 冠词魔法泡泡配对' : lessonId === 'lesson9' ? '🧩 疑问词与身高配对' : '🧩 疑问词气球配对'}
        </button>
        <button
          id={`btn-sub-tab-continuous-${lessonId}`}
          onClick={() => { soundFX.playPop(); setActiveTab('continuous'); }}
          className={`px-5 py-3 rounded-full text-md font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer ${
            activeTab === 'continuous'
              ? 'bg-gradient-to-r from-purple-400 to-indigo-400 text-white scale-105 border-b-4 border-indigo-600'
              : 'bg-white hover:bg-purple-100 text-purple-600 border-2 border-purple-50'
          }`}
        >
          {lessonId === 'lesson2' ? '🛋️ There be 城堡大问答' : lessonId === 'lesson9' ? '🦒 身体与身高积木换装' : '👚 现在进行时换装'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'question' && (
          <motion.div
            key={`question-${lessonId}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-2xl mx-auto"
          >
            {/* Rule Book banner */}
            <div className="bg-purple-50 border-4 border-purple-200 border-dashed rounded-3xl p-5 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="flex items-center gap-2 font-extrabold text-purple-800 text-md">
                  <GraduationCap className="h-6 w-6 text-purple-600" />
                  {lessonId === 'lesson2' ? '魔法语法本：冠词 a, an, the' : lessonId === 'lesson9' ? '魔法语法本：Where, Who, Which 疑问词与身高' : '魔法语法本：特殊疑问词的秘诀'}
                </span>
                <button
                  id={`toggle-help-${lessonId}`}
                  onClick={() => { soundFX.playPop(); setShowHelper(!showHelper); }}
                  className="text-xs px-2.5 py-1 bg-purple-200 text-purple-800 rounded-full font-bold cursor-pointer"
                >
                  {showHelper ? '收起法宝' : '查看法宝'}
                </button>
              </div>

              {showHelper ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 mt-3 text-xs">
                  {lessonId === 'lesson2' ? (
                    <>
                      <div className="bg-white p-2.5 border border-purple-100 rounded-xl shadow-sm">
                        <span className="font-bold text-indigo-600 text-sm block">a (不定冠词)</span>
                        <span className="text-gray-500 font-semibold">意为「一个」</span>
                        <p className="text-[10px] text-gray-400 leading-tight mt-1">辅音音素开头单词前。如：a ball, a book。</p>
                      </div>
                      <div className="bg-white p-2.5 border border-purple-100 rounded-xl shadow-sm">
                        <span className="font-bold text-indigo-600 text-sm block">an (不定冠词)</span>
                        <span className="text-gray-500 font-semibold">意为「一个」</span>
                        <p className="text-[10px] text-gray-400 leading-tight mt-1">元音音素(a,e,i,o,u)开头单词前。如：an apple, an hour。</p>
                      </div>
                      <div className="bg-white p-2.5 border border-purple-100 rounded-xl shadow-sm col-span-2 md:col-span-1">
                        <span className="font-bold text-indigo-600 text-sm block">the (定冠词)</span>
                        <span className="text-gray-500 font-semibold">表示「特指」</span>
                        <p className="text-[10px] text-gray-400 leading-tight mt-1">二次提到或双方皆知的特定事物。如：The doll is Lucy。</p>
                      </div>
                    </>
                  ) : lessonId === 'lesson9' ? (
                    <>
                      <div className="bg-white p-2.5 border border-purple-100 rounded-xl shadow-sm">
                        <span className="font-bold text-indigo-600 text-sm block">Where (询问地点)</span>
                        <span className="text-gray-500 font-semibold">意为「在哪里」</span>
                        <p className="text-[10px] text-gray-400 leading-tight mt-1">如：Where is the zoo? 它在商店附近。</p>
                      </div>
                      <div className="bg-white p-2.5 border border-purple-100 rounded-xl shadow-sm">
                        <span className="font-bold text-indigo-600 text-sm block">Who (询问人)</span>
                        <span className="text-gray-500 font-semibold">意为「谁」</span>
                        <p className="text-[10px] text-gray-400 leading-tight mt-1">如：Who is the boy in white? 他是杰克。</p>
                      </div>
                      <div className="bg-white p-2.5 border border-purple-100 rounded-xl shadow-sm col-span-2 md:col-span-1">
                        <span className="font-bold text-indigo-600 text-sm block">Which (特定选择)</span>
                        <span className="text-gray-500 font-semibold">意为「哪一个」</span>
                        <p className="text-[10px] text-gray-400 leading-tight mt-1">如：Which dress do you like? 我喜欢红色的。</p>
                      </div>
                    </>
                  ) : (
                    grammarLessons.questionWords.map((q: any, idx: number) => (
                      <div key={idx} className="bg-white p-2.5 border border-purple-100 rounded-xl shadow-sm">
                        <span className="font-bold text-indigo-600 text-sm block">{q.word}</span>
                        <span className="text-gray-500 font-semibold">{q.chinese}</span>
                        <p className="text-[10px] text-gray-400 leading-tight mt-1">{q.context}</p>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <p className="text-xs text-purple-700 leading-relaxed font-bold">
                  {lessonId === 'lesson2'
                    ? '快来翻开 Lucy 的包包日记！里面藏了好多冠词(a/an/the)和 there be 模型。先点击下面的词，再点击虚线格子，把它们放到正确的位置吧！'
                    : lessonId === 'lesson9'
                    ? '欢迎阅读身体与身高语法卡！先点击下方的拼写、疑问词，再点击卡片上的虚线填空，开启你的魔法挑战！'
                    : '小卡片上有好几个句子，有些词不小心溜走啦！先点击下面的疑问词，再点击卡片上的虚线，帮小词回家吧！'}
                </p>
              )}
            </div>

            {/* Bubble Selector Options */}
            <div className="bg-white rounded-3xl border-8 border-purple-100 p-6 shadow-xl mb-6 animate-[fade-in_0.3s_ease]">
              <h4 className="text-center font-extrabold text-purple-800 mb-4 text-md">
                🎈 第一步：抓一个魔法泡泡 (Bubble)
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                {wordOptions.map((word) => {
                  // We check user answers against selected words. Since duplicates can exist, compare occurrences count or simple lookup
                  const isUsed = Object.values(userAnswers).includes(word);
                  const isSelected = selectedWord === word;
                  return (
                    <button
                      id={`bubble-word-${word.toLowerCase().replace(/ /g, '-')}`}
                      key={word}
                      onClick={() => handleWordSelect(word)}
                      className={`px-5 py-3 rounded-full text-md font-extrabold font-comic shadow-md transition-all duration-300 relative cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-500 text-white scale-110 shadow-lg ring-4 ring-indigo-200'
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

            {/* Practices blank lists */}
            <div className="bg-white rounded-3xl border-8 border-purple-100 p-6 shadow-xl relative">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-extrabold text-purple-800">✍️ 第二步：将泡泡填入句子下的格子中</span>
                {Object.keys(userAnswers).length > 0 && (
                  <button
                    id="questions-reset"
                    onClick={resetQuestionPractice}
                    className="p-1 px-2.5 rounded-lg text-xs bg-purple-50 text-purple-500 hover:bg-purple-100 font-extrabold transition cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw className="h-3 w-3" /> 重置填空
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
                            <span className="text-purple-400 font-black">Line {practice.id}:</span>
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
                                {selectedWord ? '放置这里' : '❓ 冠词/be'}
                              </span>
                            )}
                            <span>{practice.question.replace('______', '')}</span>
                          </p>
                          {isMatched && (
                            <p className="text-xs text-gray-400 mt-2 whitespace-pre-line font-sans font-semibold leading-relaxed">
                              💡 翻译：{practice.chinese}
                            </p>
                          )}
                        </div>

                        {/* Speaking play */}
                        {isMatched && (
                          <div className="flex items-center gap-2">
                            <AudioPlayerButton text={practice.question.replace('______', matchText)} className="scale-90" />
                            <span className="bg-green-100 text-green-700 rounded-full p-0.5 animate-[pulse_2s_infinite]">
                              <Check className="h-4.5 w-4.5 stroke-[3.5px]" />
                            </span>
                          </div>
                        )}
                        {!isMatched && (
                          <span className="text-xs font-bold text-gray-300 italic bg-gray-50 px-2.5 py-1 rounded-lg shrink-0">
                            {practice.hint}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {Object.keys(userAnswers).length === practices.length && (
                <div className="bg-green-100 border-4 border-green-300 rounded-2xl p-6 text-center mt-6 shadow-md animate-bounce">
                  <Trophy className="h-10 w-10 text-yellow-500 mx-auto mb-2" />
                  <h4 className="text-green-800 text-xl font-extrabold">🎉 恭喜你！完成全部配对！</h4>
                  <p className="text-sm font-semibold text-green-700 mt-1">你已经学会了如何在不同语境里使用这些核心助词！100分！</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'continuous' && (
          <motion.div
            key={`continuous-${lessonId}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-xl mx-auto"
          >
            {/* Rule book formulas */}
            <div className="bg-indigo-50 border-4 border-indigo-200 border-dashed rounded-3xl p-5 mb-6 text-center">
              <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
                 🌟 城堡核心语法点 🌟
              </span>
              <h5 className="text-indigo-800 text-xl font-extrabold font-comic">
                {lessonId === 'lesson2' ? 'There Be 句型（有某个事物）' : lessonId === 'lesson9' ? '身体和身高描述 (be + height)' : '现在进行时（正在发生）'}
              </h5>
              <p className="text-xs text-indigo-600 font-bold mt-1">
                {lessonId === 'lesson2'
                  ? 'There is 后面跟单数名字(一个)；There are 后面跟复数名字(两个或两个以上)。'
                  : lessonId === 'lesson9'
                  ? '主语 I am / He is / She is + 身高描述。'
                  : '公式：主语 + am/is/are + 动词-ing'}
              </p>
            </div>

            {/* Dress Up Game Dashboards */}
            <div className="bg-white rounded-3xl border-8 border-indigo-100 p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-4 right-4 text-xs font-black text-indigo-400">
                进度 {dressUpIdx + 1} / {dressUpList.length}
              </div>

              <div className="flex flex-col items-center">
                {/* Visual emoji card */}
                <div className="h-44 w-44 rounded-full bg-gradient-to-b from-indigo-50 to-indigo-100 flex items-center justify-center relative border-4 border-white shadow-inner mb-6">
                  <span className={`text-7.5xl select-none animate-[bounce_2s_infinite] ${scoreAnimation ? 'scale-110 rotate-12 duration-500' : ''}`}>
                    {currentDressUpItem.emoji}
                  </span>
                  {scoreAnimation && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-white text-xs font-extrabold p-2 rounded-full shadow-lg"
                    >
                      👑 完美！
                    </motion.div>
                  )}
                </div>

                {/* Blanks Card */}
                <div className="bg-indigo-50/50 p-4.5 rounded-2xl w-full text-center border-2 border-indigo-100 mb-8 min-h-[105px]">
                  <p className="text-xs font-extrabold text-indigo-400 block mb-2 uppercase tracking-wide">
                     🛋️ 点击下方的小砖块拼出完整句子
                  </p>

                  <div className="flex justify-center items-center gap-2.5 flex-wrap font-comic font-extrabold text-xl md:text-2xl text-gray-700">
                    {lessonId === 'lesson2' ? (
                      <>
                        {/* There element */}
                        <span className={`px-2.5 py-1 border-2 rounded-xl transition-all shadow-sm ${
                          continuousAux === 'There'
                            ? 'bg-indigo-600 text-white border-indigo-700 scale-105 font-comic'
                            : 'bg-white border-dashed border-gray-400 text-transparent min-w-[70px] inline-block h-10'
                        }`}>
                          {continuousAux || '?'}
                        </span>

                        {/* Be block is/are */}
                        <span className={`px-2.5 py-1 border-2 rounded-xl transition-all shadow-sm ${
                          continuousVerb?.toLowerCase() === currentDressUpItem.verb.toLowerCase()
                            ? 'bg-indigo-600 text-white border-indigo-700 scale-105 font-comic'
                            : continuousVerb
                            ? 'bg-rose-100 text-rose-500 border-rose-300'
                            : 'bg-white border-dashed border-gray-400 text-transparent min-w-[50px] inline-block h-10'
                        }`}>
                          {continuousVerb || '?'}
                        </span>

                        {/* rest of phrase */}
                        <span className="text-gray-500 font-comic">{(currentDressUpItem as any).phrase} .</span>
                      </>
                    ) : (
                      <>
                        <span>{(currentDressUpItem as any).person}</span>
                        {/* Aux block */}
                        <span className={`px-3 py-1 border-2 rounded-xl transition-all shadow-sm ${
                          continuousAux === currentDressUpItem.aux
                            ? 'bg-indigo-600 text-white border-indigo-700 scale-105'
                            : 'bg-white border-dashed border-gray-400 text-transparent min-w-[50px] inline-block h-10'
                        }`}>
                          {continuousAux || '?'}
                        </span>
                        {/* Verb block */}
                        <span className={`px-3 py-1 border-2 rounded-xl transition-all shadow-sm ${
                          continuousVerb === currentDressUpItem.verb
                            ? 'bg-indigo-600 text-white border-indigo-700 scale-105'
                            : 'bg-white border-dashed border-gray-400 text-transparent min-w-[90px] inline-block h-10'
                        }`}>
                          {continuousVerb || '?'}
                        </span>
                        <span className="text-gray-500 font-comic">.</span>
                      </>
                    )}
                  </div>

                  {scoreAnimation && (
                    <div className="mt-4 pt-3 border-t border-indigo-100 flex items-center justify-center gap-2">
                      <p className="text-green-700 font-extrabold text-sm font-sans">
                        "你太棒了！拼出的句子是："
                        <span className="font-comic block font-extrabold text-base text-green-900 mt-1">
                          {currentDressUpItem.text} 
                        </span>
                      </p>
                      <AudioPlayerButton text={currentDressUpItem.text} autoplay={true} />
                    </div>
                  )}
                </div>

                {/* Sub-selectors */}
                <div className="grid grid-cols-2 gap-4 w-full">
                  {/* Left Choice Column (Aux/There) */}
                  <div className="bg-purple-50/40 p-3 rounded-2xl border border-purple-100">
                    <span className="text-xs font-bold text-purple-600 block mb-2 text-center leading-none">
                      {lessonId === 'lesson2' ? '句型主词 (There)' : lessonId === 'lesson9' ? '句子助词 (am/is/are/has)' : '助动词衣服 (am/is/are)'}
                    </span>
                    <div className="flex flex-col gap-2">
                      {(lessonId === 'lesson2' ? ['There', 'They', 'These'] : lessonId === 'lesson9' ? ['am', 'is', 'are', 'has', 'have'] : ['am', 'is', 'are']).map((item) => (
                        <button
                          id={`choice-aux-${item}`}
                          key={item}
                          onClick={() => handleDressUpSelect('aux', item)}
                          className={`py-2 px-3 rounded-xl font-bold font-comic shadow-sm border transition text-sm cursor-pointer ${
                            continuousAux === item
                              ? 'bg-purple-600 text-white border-purple-700 animate-pulse'
                              : 'bg-white hover:bg-purple-50 text-purple-700 border-purple-200'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Choice Column (Verb/Be-verb) */}
                  <div className="bg-sky-50/40 p-3 rounded-2xl border border-sky-100">
                    <span className="text-xs font-bold text-sky-600 block mb-2 text-center leading-none">
                      {lessonId === 'lesson2' ? 'Be动词选择 (is/are)' : lessonId === 'lesson9' ? '特征词 (tall/face/ears/spelling)' : '正在进行动词 (-ing)'}
                    </span>
                    <div className="flex flex-col gap-2">
                      {(lessonId === 'lesson2' ? ['is', 'are', 'am'] : lessonId === 'lesson9' ? ['tall', 'face', 'ears', 'spelling'] : ['playing', 'singing', 'swimming', 'riding', 'reading']).map((item) => (
                        <button
                          id={`choice-verb-${item}`}
                          key={item}
                          onClick={() => handleDressUpSelect('verb', item)}
                          className={`py-2 px-3 rounded-xl font-bold font-comic shadow-sm border transition text-sm cursor-pointer ${
                            continuousVerb === item
                              ? 'bg-sky-600 text-white border-sky-700 animate-pulse'
                              : 'bg-white hover:bg-sky-55 text-sky-750 border-sky-200'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Next items switcher button */}
                {scoreAnimation && (
                  <button
                    id="btn-dressup-next"
                    onClick={nextDressUp}
                    className="w-full mt-6 py-4.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-extrabold shadow-lg hover:shadow-xl transition flex justify-center items-center gap-1 cursor-pointer"
                  >
                    进行下一句语法大闯关 <ArrowRight className="h-5 w-5" />
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
