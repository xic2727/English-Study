import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Award, HelpCircle, Volume2, Star } from 'lucide-react';
import { soundFX } from './utils/sound';

// Component lands
import WordCastle from './components/WordCastle';
import MagicGrammar from './components/MagicGrammar';
import StoryCorner from './components/StoryCorner';
import FunQuiz from './components/FunQuiz';

type ActiveLand = 'word' | 'grammar' | 'story' | 'quiz';

export default function App() {
  const [activeLand, setActiveLand] = useState<ActiveLand>('word');

  // Interactive guide voice bubble
  const getHelperSpeech = () => {
    switch (activeLand) {
      case 'word':
        return '哈罗！欢迎来到单词城堡！这里有可爱的衣服卡片、拼图气球、还有金毛寻回犬陪你大声朗读。快点击探索吧！';
      case 'grammar':
        return '哇！魔法语法王国到啦！我们一起来抓取特殊疑问词气球，还要帮穿着ing背心的小动物们成功换装哦！';
      case 'story':
        return '这是故事乐园学堂！你可以听Emma和爸爸聊周末安排，或者翻翻我的食物菜谱，点击每句话就能听到声音啦！';
      case 'quiz':
        return '太棒了！终极答题大冒险开始了！看图猜词和趣味配对都在等着你，快来赢得城堡给你的满分王冠吧！';
      default:
        return '快来和我一起学英语吧！';
    }
  };

  const handleLandChange = (land: ActiveLand) => {
    setActiveLand(land);
    soundFX.playPop();
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-slate-800 pb-16 font-sans relative overflow-x-hidden selection:bg-rose-100">
      
      {/* Sleek Soft Radial Blur Glow Decorators */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-rose-200/20 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute top-80 right-10 w-96 h-96 bg-sky-200/20 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute top-[600px] left-1/4 w-80 h-80 bg-purple-200/10 rounded-full filter blur-3xl pointer-events-none"></div>
      
      {/* Integrated Header Container: Space-saving layout for landscape screen utilization */}
      <header className="max-w-6xl xl:max-w-7xl mx-auto px-4 pt-4 md:pt-6 pb-4 w-full">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-100/85 p-3 md:p-4 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.04)] flex flex-col md:flex-row justify-between items-center gap-4 relative">
          
          {/* Logo, title and Star Badge grouped together to save vertical space */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-rose-400 to-pink-500 shadow-[0_8px_16px_rgba(244,63,94,0.12)] flex items-center justify-center text-2.5xl animate-[bounce_5s_infinite] select-none shrink-0">
                🏰
              </div>
              <div>
                <h1 className="text-xl md:text-2.5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-sky-500 tracking-tight font-comic leading-none">
                  快乐英语城堡
                </h1>
                <p className="text-[10px] md:text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider font-sans leading-none">
                  🍭 Happy English Land · Learning Space 👧
                </p>
              </div>
            </div>

            {/* Inline sparkly stars count badge */}
            <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 rounded-xl py-1 md:py-1.5 px-3 shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)] shrink-0 self-start sm:self-auto">
              <span className="text-base animate-spin" style={{ animationDuration: '8s' }}>⭐</span>
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider leading-none">闪亮星星</span>
                <span className="text-xs font-extrabold font-comic text-rose-500 leading-none">Perfect Score Match</span>
              </div>
            </div>
          </div>

          {/* Integrated Assistant Widget with Bunny Sunny on the right side - zero wasted vertical margins */}
          <div className="flex-1 w-full md:w-auto max-w-full md:max-w-md lg:max-w-xl flex items-center gap-3 bg-gradient-to-r from-rose-50/20 to-indigo-50/15 rounded-xl border border-rose-100/10 p-2 backdrop-blur-md self-stretch md:self-auto">
            <div className="h-9 w-9 md:h-10 md:w-10 rounded-xl bg-white shadow-sm border border-rose-100/40 flex items-center justify-center text-xl animate-bounce select-none shrink-0">
              🐰
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="inline-block bg-rose-50 text-rose-500 font-bold text-[9px] uppercase px-1.5 py-0.2 rounded border border-rose-100/10 leading-none mb-0.5">
                城堡响导 · 兔兔Sunny
              </div>
              <p className="text-[11px] md:text-xs font-semibold text-slate-600 leading-normal line-clamp-2 md:line-clamp-none">
                "{getHelperSpeech()}"
              </p>
            </div>
          </div>

        </div>
      </header>

      {/* Main Container Lands Layout - utilizes max-w-6xl/7xl for beautiful wide spatial support */}
      <main className="max-w-6xl xl:max-w-7xl mx-auto px-4 w-full">
        {/* Navigation Deck */}
        <div id="navigation-lands" className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-6">
          
          {/* Card land button */}
          <button
            id="nav-land-word"
            onClick={() => handleLandChange('word')}
            className={`p-3.5 rounded-2xl transition-all duration-300 flex flex-col items-center text-center gap-2 cursor-pointer shadow-sm transform hover:scale-[1.02] active:scale-95 ${
              activeLand === 'word'
                ? 'bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-[0_8px_20px_rgba(244,63,94,0.18)] border-b-2 border-rose-600'
                : 'bg-white hover:bg-rose-50/30 text-slate-600 hover:text-rose-500 border border-slate-100/80'
            }`}
          >
            <span className="text-3xl">🏰</span>
            <div>
              <span className="text-md font-extrabold block">单词城堡</span>
              <span className="text-[10px] opacity-75 font-semibold uppercase tracking-wider block">Words Castle</span>
            </div>
          </button>

          {/* Grammar land button */}
          <button
            id="nav-land-grammar"
            onClick={() => handleLandChange('grammar')}
            className={`p-3.5 rounded-2xl transition-all duration-300 flex flex-col items-center text-center gap-2 cursor-pointer shadow-sm transform hover:scale-[1.02] active:scale-95 ${
              activeLand === 'grammar'
                ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-[0_8px_20px_rgba(99,102,241,0.18)] border-b-2 border-indigo-700'
                : 'bg-white hover:bg-purple-50/30 text-slate-600 hover:text-purple-600 border border-slate-100/80'
            }`}
          >
            <span className="text-3xl">🔮</span>
            <div>
              <span className="text-md font-extrabold block">魔法语法</span>
              <span className="text-[10px] opacity-75 font-semibold uppercase tracking-wider block">Magic Grammar</span>
            </div>
          </button>

          {/* Story corner land button */}
          <button
            id="nav-land-story"
            onClick={() => handleLandChange('story')}
            className={`p-3.5 rounded-2xl transition-all duration-300 flex flex-col items-center text-center gap-2 cursor-pointer shadow-sm transform hover:scale-[1.02] active:scale-95 ${
              activeLand === 'story'
                ? 'bg-gradient-to-br from-teal-400 to-emerald-500 text-white shadow-[0_8px_20px_rgba(13,148,136,0.18)] border-b-2 border-emerald-600'
                : 'bg-white hover:bg-teal-50/30 text-slate-600 hover:text-teal-600 border border-slate-100/80'
            }`}
          >
            <span className="text-3xl">📚</span>
            <div>
              <span className="text-md font-extrabold block">故事乐园</span>
              <span className="text-[10px] opacity-75 font-semibold uppercase tracking-wider block">Story Corner</span>
            </div>
          </button>

          {/* Quiz land button */}
          <button
            id="nav-land-quiz"
            onClick={() => handleLandChange('quiz')}
            className={`p-3.5 rounded-2xl transition-all duration-300 flex flex-col items-center text-center gap-2 cursor-pointer shadow-sm transform hover:scale-[1.02] active:scale-95 ${
              activeLand === 'quiz'
                ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-[0_8px_20px_rgba(217,119,6,0.18)] border-b-2 border-orange-600'
                : 'bg-white hover:bg-amber-50/30 text-slate-600 hover:text-amber-600 border border-slate-100/80'
            }`}
          >
            <span className="text-3xl">🏆</span>
            <div>
              <span className="text-md font-extrabold block">开心大闯关</span>
              <span className="text-[10px] opacity-75 font-semibold uppercase tracking-wider block">Adventure Quiz</span>
            </div>
          </button>
        </div>

        {/* Content Board Section with Sleek Shadow panel */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.03)] min-h-[460px] p-6 border border-slate-100/80">
          <AnimatePresence mode="wait">
            {activeLand === 'word' && (
              <motion.div
                key="word-land"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <WordCastle />
              </motion.div>
            )}

            {activeLand === 'grammar' && (
              <motion.div
                key="grammar-land"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <MagicGrammar />
              </motion.div>
            )}

            {activeLand === 'story' && (
              <motion.div
                key="story-land"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <StoryCorner />
              </motion.div>
            )}

            {activeLand === 'quiz' && (
              <motion.div
                key="quiz-land"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <FunQuiz />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Aesthetic Bottom Footer */}
      <footer className="w-full text-center py-10 text-xs font-bold text-rose-300">
         <p className="flex items-center justify-center gap-1">
           Made with love 💖 for happy kids learning English · 快乐英语城堡
         </p>
         <p className="mt-1 font-comic uppercase tracking-widest text-[9px] opacity-60">
           © Practice 7 English Grammar Focus Applet
         </p>
      </footer>
    </div>
  );
}
