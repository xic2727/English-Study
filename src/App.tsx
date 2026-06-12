import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Award, HelpCircle, Volume2, Star, BookOpen, ChevronLeft, ChevronRight, Menu, CheckCircle } from 'lucide-react';
import { soundFX } from './utils/sound';

// Component lands
import WordCastle from './components/WordCastle';
import MagicGrammar from './components/MagicGrammar';
import StoryCorner from './components/StoryCorner';
import FunQuiz from './components/FunQuiz';

// Multi-lesson database
import { lessonsDatabase } from './data';

type ActiveLand = 'word' | 'grammar' | 'story' | 'quiz';

export default function App() {
  const [activeLand, setActiveLand] = useState<ActiveLand>('word');
  const [currentLessonId, setCurrentLessonId] = useState<'lesson1' | 'lesson2' | 'lesson9'>('lesson1');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const lessons = [
    {
      id: 'lesson1' as const,
      num: 'Practice 7',
      title: 'Practice 7 衣服与玩具',
      desc: '特殊疑问词与现在进行时',
      emoji: '👚',
      color: 'from-pink-400 to-rose-400',
      activeColor: 'bg-gradient-to-tr from-rose-400 to-pink-500 text-white shadow-[0_8px_16px_rgba(244,63,94,0.15)] ring-4 ring-pink-100'
    },
    {
      id: 'lesson2' as const,
      num: 'Practice 8',
      title: 'Practice 8 伦敦笔友与美味午餐',
      desc: '不定冠词/the与There be句型',
      emoji: '🍛',
      color: 'from-sky-400 to-indigo-400',
      activeColor: 'bg-gradient-to-tr from-indigo-400 to-sky-500 text-white shadow-[0_8px_16px_rgba(99,102,241,0.15)] ring-4 ring-indigo-100'
    },
    {
      id: 'lesson9' as const,
      num: 'Practice 9',
      title: 'Practice 9 身体部位与身高描述',
      desc: 'Where/Who/Which疑问词与身体拼写',
      emoji: '🦒',
      color: 'from-emerald-400 to-teal-400',
      activeColor: 'bg-gradient-to-tr from-emerald-400 to-teal-500 text-white shadow-[0_8px_16px_rgba(16,185,129,0.15)] ring-4 ring-emerald-100'
    }
  ];

  const currentLessonData = lessonsDatabase[currentLessonId];

  // Interactive guide voice bubble
  const getHelperSpeech = () => {
    if (currentLessonId === 'lesson1') {
      switch (activeLand) {
        case 'word':
          return '哈罗！欢迎来到第一课单词城堡！这里有可爱的衣服卡片、拼图气球、还有金毛寻回犬陪你大声朗读。快点击探索吧！';
        case 'grammar':
          return '哇！魔法语法王国到啦！我们一起来抓取特殊疑问词气球，还要帮穿着ing背心的小动物们成功换装哦！';
        case 'story':
          return '这是故事乐园学堂！你可以听Emma和爸爸聊周末安排，或者翻翻我的食物菜谱，点击每句话就能听到声音啦！';
        case 'quiz':
          return '太棒了！第一课大闯关开始了！看图猜词 and 趣味配对都在等着你，快来赢得城堡给你的满分王冠吧！';
        default:
          return '快来和我一起学英语吧！';
      }
    } else if (currentLessonId === 'lesson9') {
      switch (activeLand) {
        case 'word':
          return '嗨！进入第九课单词城堡啦！这里有高高的长颈鹿陪伴，还有我们可爱的人体各部位拼读大冒险，一起来读吧！';
        case 'grammar':
          return '魔法语法升级啦！我们将探秘 Where, Who 和 Which 的特异功能，还要把我们的小胳膊、小耳朵完美描述出来哦！';
        case 'story':
          return '这里是第九课故事角！快来和Fred以及Tom一起打开寄自大连海滩的明信片，大声朗读各种多姿多彩的故事吧！';
        case 'quiz':
          return '第九课的终极挑战来啦！身体各部位拼写比拼，以及各种精彩的英文听音找错游戏正在等待你哦！';
        default:
          return '准备好了吗？和兔兔Sunny一起测量身高、探索大自然吧！';
      }
    } else {
      switch (activeLand) {
        case 'word':
          return '嗨！进入第二课单词城堡啦！我们要认识Rose的伦敦笔友Tina，还能煎个牛排和鸡蛋听听美味发音哦！';
        case 'grammar':
          return '魔法语法升级啦！我们将探秘不定冠词 a, an, the 的巧妙规则，还要学习 There is 和 There are 句型哦！';
        case 'story':
          return '这里是第二课故事角！快来分角色朗读"给伦敦笔友Tina的明信片"，还有全英文香气扑鼻的午餐童谣哦！';
        case 'quiz':
          return '第二课的终极挑战来啦！包含了排队、喂动物和信号灯的精美课本听力测试！小英雄快来拿下王冠吧！';
        default:
          return '准备好了吗？和兔兔Sunny一起闯荡第二课！';
      }
    }
  };

  const handleLandChange = (land: ActiveLand) => {
    setActiveLand(land);
    soundFX.playPop();
  };

  const toggleLesson = (lessonId: 'lesson1' | 'lesson2' | 'lesson9') => {
    soundFX.playSuccess();
    setCurrentLessonId(lessonId);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-slate-800 pb-16 font-sans relative overflow-x-hidden selection:bg-rose-100 flex flex-col md:flex-row">
      
      {/* Sleek Soft Radial Blur Glow Decorators */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-rose-200/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute top-80 right-10 w-96 h-96 bg-sky-200/10 rounded-full filter blur-3xl pointer-events-none"></div>
      
      {/* Collapsible Sidebar Navigation - Perfect for iPad landscape / Desktop wide screens */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <>
            {/* Mobile Backdrop Overlay - closes sidebar when clicking outside */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="md:hidden fixed inset-0 bg-black/25 backdrop-blur-sm z-40 cursor-pointer"
            />

            {/* Sidebar drawer panel */}
            <motion.aside
              initial={{ x: -280, width: 0, opacity: 0 }}
              animate={{ x: 0, width: 280, opacity: 1 }}
              exit={{ x: -280, width: 0, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed md:sticky top-0 left-0 h-screen bg-white/80 backdrop-blur-2xl border-r border-slate-100/90 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex flex-col z-50 shrink-0 select-none overflow-hidden"
            >
              <div className="p-4.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/10 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎪</span>
                  <div>
                    <span className="text-sm font-extrabold text-slate-700 block leading-none">阳光英语城堡</span>
                    <span className="text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-wider block">Course Board</span>
                  </div>
                </div>
                {/* Close sidebar control on mobile/tablet */}
                <button
                  id="sidebar-close-btn"
                  onClick={() => { soundFX.playPop(); setSidebarOpen(false); }}
                  className="p-1 px-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                >
                  <ChevronLeft className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Sidebar Content Scroll */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">
                {/* Guide BunnySunny Inline */}
                <div className="bg-gradient-to-r from-rose-50/20 to-indigo-50/20 p-3 rounded-2xl border border-rose-100/30 text-left relative flex items-start gap-2">
                  <div className="h-8 w-8 rounded-xl bg-white shadow-sm border border-rose-100/30 flex items-center justify-center text-lg shrink-0">🐰</div>
                  <div>
                    <div className="inline-block bg-rose-50 text-rose-500 font-bold text-[8px] uppercase px-1 rounded">兔兔Sunny</div>
                    <p className="text-[10.5px] font-semibold text-slate-500 mt-0.5 leading-relaxed">
                      哈罗！快切换左边的课程来体验全新魔法练习版块哦！
                    </p>
                  </div>
                </div>

                {/* Lesson Switcher Deck */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">📖 选择本周课程</span>
                  
                  {lessons.map((les) => {
                    const isSelected = currentLessonId === les.id;
                    return (
                      <button
                        id={`sidebar-select-${les.id}`}
                        key={les.id}
                        onClick={() => toggleLesson(les.id)}
                        className={`p-3.5 rounded-2xl transition-all duration-300 text-left border cursor-pointer hover:scale-[1.01] ${
                          isSelected
                            ? les.activeColor
                            : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-100/90'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-2.5xl shrink-0">{les.emoji}</span>
                          <div className="min-w-0">
                            <span className={`text-[10px] font-bold block leading-none mb-1 opacity-80 uppercase tracking-widest ${isSelected ? 'text-white' : 'text-rose-400'}`}>
                              {les.num}
                            </span>
                            <span className="text-xs font-extrabold block truncate leading-tight">
                              {les.title.split(' ')[1] || les.title}
                            </span>
                            <span className={`text-[10px] font-medium block truncate mt-1 opacity-75 ${isSelected ? 'text-white/90' : 'text-slate-400'}`}>
                              {les.desc}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Kids Learning Roadmap Checklist Progress */}
                <div className="bg-white/40 border border-slate-100/80 p-3.5 rounded-2xl">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2.5">🎒 城堡探索进度表</span>
                  <div className="flex flex-col gap-2">
                    {[
                      { l: 'word', name: '单词城堡', e: '🏰' },
                      { l: 'grammar', name: '魔法语法', e: '🔮' },
                      { l: 'story', name: '故事乐园', e: '📚' },
                      { l: 'quiz', name: '开心大闯关', e: '🏆' }
                    ].map((step) => {
                      const isCompleted = activeLand === step.l;
                      return (
                        <div key={step.l} className="flex items-center justify-between p-1.5 rounded-xl bg-slate-50/20 text-xs font-semibold">
                          <span className="flex items-center gap-1.5">
                            <span className="text-base leading-none">{step.e}</span>
                            <span className="text-slate-600 font-bold">{step.name}</span>
                          </span>
                          <span className={`h-4.5 w-4.5 rounded-full flex items-center justify-center ${isCompleted ? 'bg-green-50 text-green-500' : 'bg-slate-100 text-slate-400'}`}>
                            {isCompleted ? '●' : '○'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sidebar footer */}
              <div className="p-3 border-t border-slate-100 text-center text-[9px] font-bold text-slate-400/80 uppercase shrink-0">
                👧 English Learning Sandbox
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Pane */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        
        {/* Integrated Header Container: Space-saving layout for tablet landscape */}
        <header className="max-w-6xl xl:max-w-7xl mx-auto px-4 pt-4 md:pt-6 pb-2 w-full">
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-slate-100/80 p-3 md:p-3.5 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row justify-between items-center gap-4 relative">
            
            {/* Logo, title and Star Badge grouped together to save vertical space */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-3">
                {/* Floating sidebar toggle trigger if collapsed */}
                {!sidebarOpen && (
                  <button
                    id="sidebar-open-btn"
                    onClick={() => { soundFX.playPop(); setSidebarOpen(true); }}
                    className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100/80 border border-rose-100/30 text-rose-500 transition shadow-sm cursor-pointer hover:scale-105"
                    title="展开课程栏"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                )}

                <div className="h-10.5 w-10.5 rounded-2xl bg-gradient-to-tr from-rose-400 to-pink-500 shadow-[0_8px_16px_rgba(244,63,94,0.12)] flex items-center justify-center text-2xl animate-[bounce_5s_infinite] select-none shrink-0">
                  🏰
                </div>
                <div>
                  <h1 className="text-lg md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-sky-500 tracking-tight font-comic leading-none">
                    快乐英语城堡
                  </h1>
                  <p className="text-[9.5px] md:text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-wider font-sans leading-none flex items-center gap-1.5 flex-wrap">
                    <span>🍭 Happy English Land</span> 
                    <span className="text-slate-350">•</span>
                    <span className="text-indigo-400 font-black">{currentLessonData.practiceTitle} Active Mode</span>
                  </p>
                </div>
              </div>

              {/* Inline sparkly stars count badge */}
              <div className="flex items-center gap-2 bg-slate-50/50 border border-slate-100 rounded-xl py-1 px-3 shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)] shrink-0 self-start sm:self-auto">
                <span className="text-sm animate-spin" style={{ animationDuration: '8s' }}>⭐</span>
                <div>
                  <span className="text-[8px] font-bold text-slate-400 uppercase block tracking-wider leading-none">闪亮星星</span>
                  <span className="text-[10px] font-extrabold font-comic text-rose-500 leading-none">Perfect Score Match</span>
                </div>
              </div>
            </div>

            {/* Inline lesson dynamic selector banner for smaller devices (where sidebar is closed) */}
            <div className="flex items-center gap-2 sm:self-auto self-stretch">
              {/* Quick Lesson Switch Toggle in Header (for mobile backup) */}
              <div className="md:hidden flex-1 flex border border-slate-100 rounded-xl bg-slate-50/50 p-1">
                <button
                  id="header-tab-les1"
                  onClick={() => toggleLesson('lesson1')}
                  className={`flex-1 text-center py-1.5 text-xs font-extrabold rounded-lg transition ${currentLessonId === 'lesson1' ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-400'}`}
                >
                  【一课】服装
                </button>
                <button
                  id="header-tab-les2"
                  onClick={() => toggleLesson('lesson2')}
                  className={`flex-1 text-center py-1.5 text-xs font-extrabold rounded-lg transition ${currentLessonId === 'lesson2' ? 'bg-white text-indigo-500 shadow-sm' : 'text-slate-400'}`}
                >
                  【二课】伦敦
                </button>
                <button
                  id="header-tab-les9"
                  onClick={() => toggleLesson('lesson9')}
                  className={`flex-1 text-center py-1.5 text-xs font-extrabold rounded-lg transition ${currentLessonId === 'lesson9' ? 'bg-white text-emerald-500 shadow-sm' : 'text-slate-400'}`}
                >
                  【九课】身体
                </button>
              </div>

              {/* Inline layout trigger to manual expand/collapse */}
              <button
                id="toggle-sidebar-desktop"
                onClick={() => { soundFX.playPop(); setSidebarOpen(!sidebarOpen); }}
                className="hidden md:flex p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-500 text-xs font-bold items-center gap-1.5 transition shadow-sm cursor-pointer"
              >
                <BookOpen className="h-4 w-4" />
                <span>{sidebarOpen ? '收起左栏' : '展开左栏'}</span>
              </button>
            </div>

            {/* Bunny Sunny guide text in header (Always responsive) */}
            <div className="flex-1 w-full sm:w-auto max-w-md lg:max-w-xl flex items-center gap-2.5 bg-gradient-to-r from-rose-50/10 to-indigo-50/10 rounded-xl border border-rose-100/5 p-1.5 backdrop-blur-md self-stretch sm:self-auto">
              <div className="h-8.5 w-8.5 rounded-xl bg-white shadow-sm border border-rose-100/40 flex items-center justify-center text-lg animate-bounce select-none shrink-0">
                🐰
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="inline-block bg-rose-50 text-rose-500 font-bold text-[8px] uppercase px-1 py-0.2 rounded leading-none mb-0.5">
                  响导语
                </div>
                <p className="text-[10.5px] font-semibold text-slate-500 leading-normal line-clamp-2 sm:line-clamp-none whitespace-nowrap overflow-hidden text-ellipsis">
                  "{getHelperSpeech()}"
                </p>
              </div>
            </div>

          </div>
        </header>

        {/* Main Container Lands Layout - utilizes beautiful wide spatial support */}
        <main className="max-w-6xl xl:max-w-7xl mx-auto px-4 w-full mt-4 flex-1">
          {/* Navigation Deck */}
          <div id="navigation-lands" className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            
            {/* Card land button */}
            <button
              id="nav-land-word"
              onClick={() => handleLandChange('word')}
              className={`p-3 rounded-2xl transition-all duration-300 flex flex-col items-center text-center gap-1.5 cursor-pointer shadow-sm transform hover:scale-[1.01] active:scale-95 ${
                activeLand === 'word'
                  ? 'bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-[0_8px_20px_rgba(244,63,94,0.15)] border-b-2 border-rose-600'
                  : 'bg-white hover:bg-rose-50/30 text-slate-600 hover:text-rose-500 border border-slate-100/80'
              }`}
            >
              <span className="text-2.5xl">🏰</span>
              <div>
                <span className="text-sm font-extrabold block">单词城堡</span>
                <span className="text-[9px] opacity-75 font-semibold uppercase tracking-wider block leading-none mt-0.5">Words Castle</span>
              </div>
            </button>

            {/* Grammar land button */}
            <button
              id="nav-land-grammar"
              onClick={() => handleLandChange('grammar')}
              className={`p-3 rounded-2xl transition-all duration-300 flex flex-col items-center text-center gap-1.5 cursor-pointer shadow-sm transform hover:scale-[1.01] active:scale-95 ${
                activeLand === 'grammar'
                  ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-[0_8px_20px_rgba(99,102,241,0.15)] border-b-2 border-indigo-700'
                  : 'bg-white hover:bg-purple-50/30 text-slate-600 hover:text-purple-600 border border-slate-100/80'
              }`}
            >
              <span className="text-2.5xl">🔮</span>
              <div>
                <span className="text-sm font-extrabold block">魔法语法</span>
                <span className="text-[9px] opacity-75 font-semibold uppercase tracking-wider block leading-none mt-0.5">Magic Grammar</span>
              </div>
            </button>

            {/* Story corner land button */}
            <button
              id="nav-land-story"
              onClick={() => handleLandChange('story')}
              className={`p-3 rounded-2xl transition-all duration-300 flex flex-col items-center text-center gap-1.5 cursor-pointer shadow-sm transform hover:scale-[1.01] active:scale-95 ${
                activeLand === 'story'
                  ? 'bg-gradient-to-br from-teal-400 to-emerald-500 text-white shadow-[0_8px_20px_rgba(13,148,136,0.15)] border-b-2 border-emerald-600'
                  : 'bg-white hover:bg-teal-50/30 text-slate-600 hover:text-teal-600 border border-slate-100/80'
              }`}
            >
              <span className="text-2.5xl">📚</span>
              <div>
                <span className="text-sm font-extrabold block">故事乐园</span>
                <span className="text-[9px] opacity-75 font-semibold uppercase tracking-wider block leading-none mt-0.5">Story Corner</span>
              </div>
            </button>

            {/* Quiz land button */}
            <button
              id="nav-land-quiz"
              onClick={() => handleLandChange('quiz')}
              className={`p-3 rounded-2xl transition-all duration-300 flex flex-col items-center text-center gap-1.5 cursor-pointer shadow-sm transform hover:scale-[1.01] active:scale-95 ${
                activeLand === 'quiz'
                  ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-[0_8px_20px_rgba(217,119,6,0.15)] border-b-2 border-orange-600'
                  : 'bg-white hover:bg-amber-50/30 text-slate-600 hover:text-amber-600 border border-slate-100/80'
              }`}
            >
              <span className="text-2.5xl">🏆</span>
              <div>
                <span className="text-sm font-extrabold block">开心大闯关</span>
                <span className="text-[9px] opacity-75 font-semibold uppercase tracking-wider block leading-none mt-0.5">Adventure Quiz</span>
              </div>
            </button>
          </div>

          {/* Content Board Section with Sleek Shadow panel - Keyed by currentLessonId to reset children states correctly! */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_16px_48px_-20px_rgba(0,0,0,0.02)] min-h-[440px] p-5 md:p-6 border border-slate-100/70">
            <AnimatePresence mode="wait text-center">
              {activeLand === 'word' && (
                <motion.div
                  key={`word-land-${currentLessonId}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <WordCastle words={currentLessonData.wordsData} lessonId={currentLessonId} />
                </motion.div>
              )}

              {activeLand === 'grammar' && (
                <motion.div
                  key={`grammar-land-${currentLessonId}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <MagicGrammar lessonId={currentLessonId} />
                </motion.div>
              )}

              {activeLand === 'story' && (
                <motion.div
                  key={`story-land-${currentLessonId}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <StoryCorner stories={currentLessonData.storiesData} lessonId={currentLessonId} />
                </motion.div>
              )}

              {activeLand === 'quiz' && (
                <motion.div
                  key={`quiz-land-${currentLessonId}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <FunQuiz listening={currentLessonData.listeningQuestions} mistakes={currentLessonData.grammarMistakes} lessonId={currentLessonId} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Aesthetic Bottom Footer */}
        <footer className="w-full text-center py-8 text-[11px] font-bold text-rose-300">
           <p className="flex items-center justify-center gap-1">
             Made with love 💖 for happy kids learning English · 快乐英语城堡
           </p>
           <p className="mt-1 font-comic uppercase tracking-widest text-[9px] opacity-60">
             © Practice {currentLessonId === 'lesson1' ? '7' : currentLessonId === 'lesson9' ? '9' : '8'} English Grammar Focus Applet
           </p>
        </footer>
      </div>
    </div>
  );
}
