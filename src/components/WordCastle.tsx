import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, ArrowRight, ArrowLeft, Heart, CheckCircle2, RotateCcw } from 'lucide-react';
import { WordItem } from '../types';
import { wordsData } from '../data';
import AudioPlayerButton from './AudioPlayerButton';
import { soundFX } from '../utils/sound';

export default function WordCastle() {
  const [activeTab, setActiveTab] = useState<'cards' | 'spell' | 'dog'>('cards');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [learnedWords, setLearnedWords] = useState<string[]>([]);
  
  // States for spelling game
  const [spellList] = useState<WordItem[]>(() => {
    // Select 6 interesting words for kids
    return wordsData.filter(w => ['shirt', 'balloon', 'robot', 'plane', 'skirt', 'noodles', 'fish', 'dog'].includes(w.english));
  });
  const [spellIndex, setSpellIndex] = useState(0);
  const [currentSpellWord, setCurrentSpellWord] = useState<WordItem>(spellList[0]);
  const [userLetters, setUserLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>(() => {
    return spellList[0].english.split('').sort(() => Math.random() - 0.5);
  });
  const [spellSuccess, setSpellSuccess] = useState(false);
  const [spellShake, setSpellShake] = useState(false);

  // States for Dog sentence builders
  const [dogStep, setDogStep] = useState(0);
  const dogSentences = [
    { text: "Dog", chinese: "狗" },
    { text: "A dog", chinese: "一只狗" },
    { text: "A small dog", chinese: "一只小狗" },
    { text: "This is a small dog.", chinese: "这是一只小狗。" },
    { text: "The small dog is very cute.", chinese: "这只小狗非常可爱。" },
    { text: "The small dog is my good friend.", chinese: "这只小狗是我的好朋友。" }
  ];

  const handleNextWord = () => {
    soundFX.playPop();
    setCurrentWordIndex((prev) => (prev + 1) % wordsData.length);
  };

  const handlePrevWord = () => {
    soundFX.playPop();
    setCurrentWordIndex((prev) => (prev - 1 + wordsData.length) % wordsData.length);
  };

  const toggleLearn = (wordId: string) => {
    soundFX.playSuccess();
    setLearnedWords(prev => {
      if (prev.includes(wordId)) {
        return prev.filter(id => id !== wordId);
      } else {
        return [...prev, wordId];
      }
    });
  };

  // Spelling logic
  const handleLetterClick = (letter: string, index: number) => {
    if (spellSuccess) return;
    soundFX.playChime();
    
    const nextUserLetters = [...userLetters, letter];
    setUserLetters(nextUserLetters);
    
    // Remove only one instance of the letter
    const nextAvail = [...availableLetters];
    nextAvail.splice(index, 1);
    setAvailableLetters(nextAvail);

    // Check if word is complete
    const targetWord = currentSpellWord.english;
    if (nextUserLetters.length === targetWord.length) {
      if (nextUserLetters.join('') === targetWord) {
        // Success!
        soundFX.playSuccess();
        setSpellSuccess(true);
      } else {
        // Failure!
        soundFX.playBoop();
        setSpellShake(true);
        setTimeout(() => {
          setSpellShake(false);
          // Auto reset
          setUserLetters([]);
          setAvailableLetters(targetWord.split('').sort(() => Math.random() - 0.5));
        }, 800);
      }
    }
  };

  const resetSpell = () => {
    soundFX.playPop();
    setUserLetters([]);
    setAvailableLetters(currentSpellWord.english.split('').sort(() => Math.random() - 0.5));
    setSpellSuccess(false);
  };

  const nextSpellWord = () => {
    soundFX.playPop();
    const nextIdx = (spellIndex + 1) % spellList.length;
    setSpellIndex(nextIdx);
    setCurrentSpellWord(spellList[nextIdx]);
    setUserLetters([]);
    setAvailableLetters(spellList[nextIdx].english.split('').sort(() => Math.random() - 0.5));
    setSpellSuccess(false);
  };

  return (
    <div className="w-full">
      {/* Tab Selectors */}
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        <button
          id="tab-btn-cards"
          onClick={() => { soundFX.playPop(); setActiveTab('cards'); }}
          className={`px-5 py-3 rounded-full text-md font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer ${
            activeTab === 'cards'
              ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white scale-105 border-b-4 border-rose-600'
              : 'bg-white hover:bg-pink-100 text-pink-500 border-2 border-pink-100'
          }`}
        >
          🏰 单词魔法卡
        </button>
        <button
          id="tab-btn-spell"
          onClick={() => { soundFX.playPop(); setActiveTab('spell'); }}
          className={`px-5 py-3 rounded-full text-md font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer ${
            activeTab === 'spell'
              ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white scale-105 border-b-4 border-orange-600'
              : 'bg-white hover:bg-amber-100 text-amber-500 border-2 border-amber-100'
          }`}
        >
          🧩 巧手拼拼乐
        </button>
        <button
          id="tab-btn-dog"
          onClick={() => { soundFX.playPop(); setActiveTab('dog'); }}
          className={`px-5 py-3 rounded-full text-md font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer ${
            activeTab === 'dog'
              ? 'bg-gradient-to-r from-sky-400 to-indigo-400 text-white scale-105 border-b-4 border-sky-600'
              : 'bg-white hover:bg-sky-100 text-sky-500 border-2 border-sky-100'
          }`}
        >
          🐶 小狗魔法句组
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'cards' && (
          <motion.div
            key="cards"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-xl mx-auto"
          >
            {/* Word Card Panel */}
            <div className="bg-white rounded-3xl border-8 border-pink-100 shadow-xl overflow-hidden p-6 relative">
              {/* Cute corner badge */}
              <div className="absolute top-4 right-4 bg-pink-100 text-pink-600 font-bold px-3 py-1.5 rounded-full text-xs">
                {currentWordIndex + 1} / {wordsData.length}
              </div>

              {/* Progress counter */}
              <div className="mb-4 text-center">
                <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                  ⭐ 已经学会了 {learnedWords.length} 个单词 
                </span>
              </div>

              {/* Card Main */}
              <div className="flex flex-col items-center py-6 text-center">
                <motion.div 
                  key={wordsData[currentWordIndex].english}
                  className="text-8xl mb-6 select-none animate-bounce"
                  style={{ animationDuration: '3s' }}
                >
                  {wordsData[currentWordIndex].emoji}
                </motion.div>

                <h3 className="text-4xl font-extrabold text-gray-800 tracking-wide font-comic flex items-center gap-2 justify-center mb-1">
                  {wordsData[currentWordIndex].english}
                  <AudioPlayerButton text={wordsData[currentWordIndex].english} className="scale-110 ml-1" />
                </h3>

                <p className="font-mono text-sm text-pink-400 font-bold mb-4">
                  {wordsData[currentWordIndex].phonetic}
                </p>

                <span className="text-xl font-bold bg-pink-50 text-pink-600 px-5 py-2.5 rounded-2xl mb-6 inline-block">
                  {wordsData[currentWordIndex].chinese}
                </span>

                {/* Example speech sentence box */}
                {wordsData[currentWordIndex].sentence && (
                  <div className="bg-amber-50/70 border-2 border-dashed border-amber-200 rounded-2xl p-4 w-full mb-6 relative">
                    <p className="text-gray-700 italic font-semibold text-lg flex items-center justify-center gap-2">
                       "{wordsData[currentWordIndex].sentence}"
                       <AudioPlayerButton text={wordsData[currentWordIndex].sentence} className="scale-90" />
                    </p>
                    <p className="text-sm text-gray-500 font-bold mt-1">
                      {wordsData[currentWordIndex].sentenceChinese}
                    </p>
                  </div>
                )}

                {/* Mark as read */}
                <button
                  id={`btn-learn-${wordsData[currentWordIndex].english}`}
                  onClick={() => toggleLearn(wordsData[currentWordIndex].id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition cursor-pointer ${
                    learnedWords.includes(wordsData[currentWordIndex].id)
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'bg-rose-50 text-rose-500 hover:bg-rose-100'
                  }`}
                >
                  <CheckCircle2 className="h-5 w-5" />
                  {learnedWords.includes(wordsData[currentWordIndex].id) ? '我已经学会了啦！' : '标为已学会'}
                </button>
              </div>

              {/* Navigation controls */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-rose-50">
                <button
                  id="btn-prev-word"
                  onClick={handlePrevWord}
                  className="p-3 bg-rose-50 hover:bg-rose-100 rounded-2xl text-rose-500 transition cursor-pointer"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
                <span className="text-sm font-bold text-gray-400 capitalize">
                  分类: {wordsData[currentWordIndex].category}
                </span>
                <button
                  id="btn-next-word"
                  onClick={handleNextWord}
                  className="p-3 bg-rose-50 hover:bg-rose-100 rounded-2xl text-rose-500 transition cursor-pointer2"
                >
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'spell' && (
          <motion.div
            key="spell"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-xl mx-auto"
          >
            <div className="bg-white rounded-3xl border-8 border-amber-100 shadow-xl p-6 relative">
              <div className="flex justify-between items-center mb-6">
                <span className="bg-amber-100 text-amber-700 font-bold px-3 py-1 rounded-full text-xs">
                  闯关中 {spellIndex + 1} / {spellList.length}
                </span>
                <h4 className="text-xl font-extrabold text-amber-600">🧩 巧手拼单词</h4>
                <button
                  id="spell-reset"
                  onClick={resetSpell}
                  className="p-2 text-gray-400 hover:bg-gray-50 rounded-full cursor-pointer"
                  title="再试一次"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col items-center">
                {/* Image & Cue */}
                <div className="text-7xl mb-4 select-none animate-bounce">{currentSpellWord.emoji}</div>
                <div className="bg-amber-50 text-amber-800 font-bold px-4 py-2 rounded-xl text-lg mb-6 max-w-sm text-center">
                  中文意思：{currentSpellWord.chinese}
                </div>

                {/* Text boxes showing user choices */}
                <div className={`flex gap-2.5 min-h-[50px] items-center mb-8 bg-gray-50/50 p-4 rounded-2xl border-2 border-dashed border-gray-200 w-full justify-center ${spellShake ? 'animate-bounce border-red-300 bg-red-50/30' : ''}`}>
                  {currentSpellWord.english.split('').map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-11 w-11 rounded-xl flex items-center justify-center font-bold font-comic text-2xl shadow-sm border-2 transform transition-all uppercase ${
                        userLetters[idx]
                          ? 'bg-amber-400 text-white border-amber-500 scale-105'
                          : 'bg-white border-dashed border-gray-300 text-transparent'
                      }`}
                    >
                      {userLetters[idx] || ''}
                    </div>
                  ))}
                </div>

                {/* Interactive scrambled bubbles */}
                {!spellSuccess ? (
                  <div className="flex flex-wrap justify-center gap-3 mb-6 w-full">
                    {availableLetters.map((char, charIdx) => (
                      <button
                        id={`letter-bubble-${charIdx}`}
                        key={charIdx + '-' + char}
                        onClick={() => handleLetterClick(char, charIdx)}
                        className="h-14 w-14 rounded-full bg-amber-50/80 hover:bg-amber-100/90 active:scale-90 border-2 border-amber-200 shadow-md flex items-center justify-center text-2xl font-extrabold font-comic text-amber-700 transition cursor-pointer"
                      >
                        {char.toUpperCase()}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="bg-green-50 animate-bounce border-2 border-dashed border-green-200 rounded-3xl p-6 text-center w-full mb-6">
                    <Trophy className="h-8 w-8 text-green-500 mx-auto mb-2 animate-pulse" />
                    <h5 className="text-green-600 font-extrabold text-xl flex items-center justify-center gap-1">
                      拼写正确！ 太厉害了！ <Sparkles className="h-5 w-5 text-amber-400 fill-amber-300" />
                    </h5>
                    <p className="text-lg font-comic font-extrabold text-green-800 uppercase tracking-widest mt-1 flex items-center justify-center gap-1">
                      {currentSpellWord.english}
                      <AudioPlayerButton text={currentSpellWord.english} autoplay={true} />
                    </p>
                  </div>
                )}

                {/* Show Next Word buttons */}
                {spellSuccess && (
                  <button
                    id="spell-next-level"
                    onClick={nextSpellWord}
                    className="w-full py-4.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white font-extrabold shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 text-md cursor-pointer"
                  >
                    下一个单词 <ArrowRight className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'dog' && (
          <motion.div
            key="dog"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-xl mx-auto"
          >
            <div className="bg-white rounded-3xl border-8 border-sky-100 shadow-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-xl">🐶</div>
                <div>
                  <h4 className="text-xl font-extrabold text-sky-700">小狗魔法句组 (Pyramid)</h4>
                  <p className="text-xs text-sky-500 font-bold">源自课本第37天·和可爱的金毛寻回犬一起朗读句子积木！</p>
                </div>
              </div>

              {/* Incremental Read Along Layout */}
              <div className="flex flex-col gap-3 py-2 mb-6">
                {dogSentences.map((sentence, sIdx) => {
                  const isActive = sIdx === dogStep;
                  const isUnlocked = sIdx <= dogStep;
                  return (
                    <motion.div
                      id={`dog-sentence-${sIdx}`}
                      key={sIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isUnlocked ? { opacity: 1, x: 0 } : { opacity: 0.25, x: 0 }}
                      onClick={() => {
                        if (isUnlocked) {
                          soundFX.playPop();
                          setDogStep(sIdx);
                        }
                      }}
                      className={`p-3 rounded-2xl border-2 transition cursor-pointer flex justify-between items-center ${
                        isActive
                          ? 'border-sky-400 bg-sky-50 shadow-md scale-[1.02]'
                          : isUnlocked
                          ? 'border-dashed border-sky-100 bg-white hover:bg-sky-50/50'
                          : 'border-transparent bg-gray-50'
                      }`}
                    >
                      <div className="flex-1">
                        <p className={`font-comic font-extrabold text-md md:text-lg leading-tight uppercase ${
                          isActive ? 'text-sky-700' : 'text-gray-400'
                        }`}>
                          {sentence.text}
                        </p>
                        <p className={`text-xs font-bold ${
                          isActive ? 'text-sky-500' : 'text-transparent'
                        }`}>
                          翻译：{sentence.chinese}
                        </p>
                      </div>
                      
                      {isUnlocked && (
                        <div className="flex items-center gap-1.5">
                          <AudioPlayerButton text={sentence.text} autoplay={isActive} className="scale-90" />
                          {isActive && (
                            <span className="h-2 w-2 rounded-full bg-sky-500 animate-ping"></span>
                          )}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress Slider Button control */}
              <div className="flex md:flex-row flex-col justify-between items-center gap-4 bg-sky-50/50 p-4.5 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="text-3xl animate-bounce">🦮</div>
                  <div>
                    <span className="text-xs font-extrabold text-sky-500 uppercase block">小狗成长等级</span>
                    <span className="text-sm font-bold text-gray-700">金牌小学者 · 第 {dogStep + 1} 句</span>
                  </div>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                  <button
                    id="dog-btn-prev"
                    disabled={dogStep === 0}
                    onClick={() => { soundFX.playPop(); setDogStep(curr => Math.max(0, curr - 1)); }}
                    className="flex-1 md:flex-none py-2 px-4 rounded-xl bg-white border border-sky-200 text-sky-600 hover:bg-sky-50 disabled:opacity-30 disabled:pointer-events-none font-bold text-sm cursor-pointer"
                  >
                    上一步
                  </button>
                  <button
                    id="dog-btn-next"
                    disabled={dogStep === dogSentences.length - 1}
                    onClick={() => { soundFX.playSuccess(); setDogStep(curr => Math.min(dogSentences.length - 1, curr + 1)); }}
                    className="flex-1 md:flex-none py-2 px-4 rounded-xl bg-sky-400 text-white hover:bg-sky-500 disabled:opacity-30 disabled:pointer-events-none font-bold text-sm shadow-md cursor-pointer"
                  >
                    更长一句 🚀
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
