import { WordItem, StoryItem, ListeningQuestion, MatchPair, UnscrambleItem, GrammarMistakeItem } from './types';

export const wordsData: WordItem[] = [
  // Clothes category
  {
    id: 'w1',
    english: 'shirt',
    chinese: '男衬衫',
    phonetic: '/ʃɜːt/',
    category: 'clothes',
    emoji: '👔',
    sentence: 'I like her red shirt.',
    sentenceChinese: '我喜欢她的红衬衫。'
  },
  {
    id: 'w2',
    english: 'skirt',
    chinese: '短裙',
    phonetic: '/skɜːt/',
    category: 'clothes',
    emoji: '👗',
    sentence: 'She is wearing a beautiful pink skirt.',
    sentenceChinese: '她正穿着一条漂亮的粉底短裙。'
  },
  {
    id: 'w3',
    english: 'jeans',
    chinese: '牛仔裤',
    phonetic: '/dʒiːnz/',
    category: 'clothes',
    emoji: '👖',
    sentence: 'The blue jeans are very cool.',
    sentenceChinese: '那条蓝色牛仔裤非常酷。'
  },
  {
    id: 'w4',
    english: 'glasses',
    chinese: '眼镜',
    phonetic: "/ˈɡlɑːsɪz/",
    category: 'clothes',
    emoji: '👓',
    sentence: 'My dad wears black glasses.',
    sentenceChinese: '我的爸爸戴着黑色眼镜。'
  },
  // Toys category
  {
    id: 'w5',
    english: 'balloon',
    chinese: '气球',
    phonetic: '/bəˈluːn/',
    category: 'toys',
    emoji: '🎈',
    sentence: 'The red balloon is flying high.',
    sentenceChinese: '红色的气球正在高高地飞。'
  },
  {
    id: 'w6',
    english: 'robot',
    chinese: '机器人',
    phonetic: '/ˈrəʊbɒt/',
    category: 'toys',
    emoji: '🤖',
    sentence: 'The little robot can walk and talk.',
    sentenceChinese: '小机器人会走路还会说话。'
  },
  {
    id: 'w7',
    english: 'plane',
    chinese: '飞机',
    phonetic: '/pleɪn/',
    category: 'toys',
    emoji: '✈️',
    sentence: 'This is a small white toy plane.',
    sentenceChinese: '这是一架白色的小玩具飞机。'
  },
  {
    id: 'w8',
    english: 'baseball',
    chinese: '棒球',
    phonetic: '/ˈbeɪsbɔːl/',
    category: 'toys',
    emoji: '⚾',
    sentence: 'We play baseball on the grass field.',
    sentenceChinese: '我们在草地上玩棒球。'
  },
  // Food category
  {
    id: 'w9',
    english: 'hungry',
    chinese: '饥饿的',
    phonetic: '/ˈhʌŋɡri/',
    category: 'food',
    emoji: '😋',
    sentence: 'I am very hungry after school.',
    sentenceChinese: '我放学后真的很饿！'
  },
  {
    id: 'w10',
    english: 'noodles',
    chinese: '面条',
    phonetic: '/ˈnuːdlz/',
    category: 'food',
    emoji: '🍜',
    sentence: 'My mum cooks delicious chicken noodles.',
    sentenceChinese: '妈妈做了香喷喷的鸡肉面条。'
  },
  {
    id: 'w11',
    english: 'rice',
    chinese: '米饭',
    phonetic: '/raɪs/',
    category: 'food',
    emoji: '🍚',
    sentence: 'My dad likes rice and fish.',
    sentenceChinese: '我爸爸喜欢吃米饭拼鱼肉。'
  },
  {
    id: 'w12',
    english: 'fish',
    chinese: '鱼肉; 鱼',
    phonetic: '/fɪʃ/',
    category: 'food',
    emoji: '🐟',
    sentence: 'The cat likes eating fresh fish.',
    sentenceChinese: '猫咪喜欢吃新鲜的鱼。'
  },
  {
    id: 'w13',
    english: 'chicken',
    chinese: '鸡肉; 鸡',
    phonetic: '/ˈtʃɪkɪn/',
    category: 'food',
    emoji: '🍗',
    sentence: 'We like chicken soup best.',
    sentenceChinese: '我们最喜欢鸡汤啦。'
  },
  {
    id: 'w14',
    english: 'egg',
    chinese: '鸡蛋',
    phonetic: '/eɡ/',
    category: 'food',
    emoji: '🥚',
    sentence: 'My favourite food is scrambled eggs with tomatoes.',
    sentenceChinese: '我最爱的食物是西红柿炒鸡蛋。'
  },
  {
    id: 'w15',
    english: 'vegetable',
    chinese: '蔬菜',
    phonetic: '/ˈvedʒtəbl/',
    category: 'food',
    emoji: '🥗',
    sentence: 'Eat more green vegetable salad to keep healthy.',
    sentenceChinese: '多吃绿色蔬菜沙拉保持身体棒棒！'
  },
  // Animal expanding standard
  {
    id: 'w16',
    english: 'dog',
    chinese: '小狗',
    phonetic: '/dɒɡ/',
    category: 'animals',
    emoji: '🐶',
    sentence: 'This is a small golden dog.',
    sentenceChinese: '这是一只金色的小狗。'
  }
];

export const storiesData: StoryItem[] = [
  {
    id: 'story1',
    title: 'Friday Night with Dad',
    titleChinese: '周五晚上和爸爸一起',
    introduction: 'Emma and her dad are making plans for a magic Friday evening after school! Let\'s read their conversations.',
    type: 'dialogue',
    emoji: '👨‍👧',
    bgColor: 'border-pink-200 bg-pink-50/70 text-pink-700',
    lines: [
      {
        speaker: 'Emma',
        text: 'Dad, can you pick me up after school?',
        chinese: '爸爸，你放学后能来接我吗？'
      },
      {
        speaker: 'Dad',
        text: 'OK. A new cartoon film is on tonight. Do you want to see it?',
        chinese: '好啊！今晚有一部新的卡通电影上映呢，你想看吗？'
      },
      {
        speaker: 'Emma',
        text: 'Yes, I do! We can have some burgers and chips outside.',
        chinese: '太棒了，我想看！我们还可以在外面吃汉堡和薯盒呢。'
      }
    ]
  },
  {
    id: 'story2',
    title: 'My Favourite Food',
    titleChinese: '我最喜欢的食物',
    introduction: 'Listen and read along to schoolgirl\'s happy dinner speech. Look at what dad and mum like to eat.',
    type: 'passage',
    emoji: '🍲',
    bgColor: 'border-amber-200 bg-amber-50/70 text-amber-700',
    lines: [], // Passages represent direct paragraphs
    paragraphs: [
      "I am very hungry after school. When I come back home, my mum cooks lots of delicious food.",
      "I like chicken noodles.",
      "My dad likes rice and fish.",
      "My mum likes vegetable salad.",
      "My favourite food is scrambled eggs with tomatoes.",
      "What's your favourite food?"
    ],
    paragraphsChinese: [
      "放学后我真的很饿。当我回到家时，妈妈做好了许多美味的食物。",
      "我喜欢吃鸡肉面条。",
      "我的爸爸喜欢吃米饭和鱼肉。",
      "我的妈妈喜欢吃蔬菜沙拉。",
      "我最喜欢的食物是西红柿炒鸡蛋。",
      "你最喜欢的食物又是什么呢？"
    ]
  }
];

// Practice 7 Page 61 Listening Comprehension
export const listeningQuestions: ListeningQuestion[] = [
  // Section 1 - Find Category match (Hear a word, choose another that falls under the same category)
  {
    id: 'l1',
    audioPrompt: 'winter',
    chineseInstruction: '听录音，选出与所听单词属于同类的一项。',
    options: [
      { key: 'A', text: 'spring', label: '春季 (季节)' },
      { key: 'B', text: 'train', label: '火车 (交通工具)' }
    ],
    correctAnswer: 'A',
    type: 'category',
    hint: '听到的单词是 "winter" (冬天)，跟它同类别的自然也是季节哦！'
  },
  {
    id: 'l2',
    audioPrompt: 'three',
    chineseInstruction: '听录音，选出与所听单词属于同类的一项。',
    options: [
      { key: 'A', text: 'eleven', label: '十一 (数字)' },
      { key: 'B', text: 'warm', label: '温暖的 (天气)' }
    ],
    correctAnswer: 'A',
    type: 'category',
    hint: '听到的单词是 "three" (三)，它是数字，和 "eleven" (十一) 是一类！'
  },
  {
    id: 'l3',
    audioPrompt: 'where',
    chineseInstruction: '听录音，选出与所听单词属于同类的一项。',
    options: [
      { key: 'A', text: 'which', label: '哪一个 (特殊疑问词)' },
      { key: 'B', text: 'window', label: '窗户 (名词)' }
    ],
    correctAnswer: 'A',
    type: 'category',
    hint: '听到的单词是 "where" (在哪里)，是个特殊疑问词。'
  },
  {
    id: 'l4',
    audioPrompt: 'doll',
    chineseInstruction: '听录音，选出与所听单词属于同类的一项。',
    options: [
      { key: 'A', text: 'kite', label: '风筝 (玩具模型)' },
      { key: 'B', text: 'have', label: '有 (动词)' }
    ],
    correctAnswer: 'A',
    type: 'category',
    hint: '听到的单词是 "doll" (洋娃娃)，属于玩具，所以和 "kite" 是同类！'
  },
  {
    id: 'l5',
    audioPrompt: 'chair',
    chineseInstruction: '听录音，选出与所听单词属于同类的一项。',
    options: [
      { key: 'A', text: 'bed', label: '床 (家具用品)' },
      { key: 'B', text: 'summer', label: '夏天 (季节)' }
    ],
    correctAnswer: 'A',
    type: 'category',
    hint: '听到的单词是 "chair" (椅子)，它是一件家具，和 "bed" 同类。'
  },

  // Section 2 - Pick the matching sentence heard
  {
    id: 'l6',
    audioPrompt: 'Which season do you like best?',
    chineseInstruction: '听录音，选出你所听到的句子。',
    options: [
      { key: 'A', text: 'Which book do you like best?', label: '你最喜欢哪本书？' },
      { key: 'B', text: 'Which season do you like best?', label: '你最喜欢哪个季节？' }
    ],
    correctAnswer: 'B',
    type: 'sentence',
    hint: '仔细听 "season" (季节) 的发音。'
  },
  {
    id: 'l7',
    audioPrompt: 'We like autumn best.',
    chineseInstruction: '听录音，选出你所听到的句子。',
    options: [
      { key: 'A', text: 'We like autumn best.', label: '我们最喜欢秋天。' },
      { key: 'B', text: 'We like winter best.', label: '我们最喜欢冬天。' }
    ],
    correctAnswer: 'A',
    type: 'sentence',
    hint: '听到了 "autumn" (/ˈɔːtəm/) 指的是秋天。'
  },
  {
    id: 'l8',
    audioPrompt: 'I can have a picnic in spring.',
    chineseInstruction: '听录音，选出你所听到的句子。',
    options: [
      { key: 'A', text: 'I can have a picnic in spring.', label: '我可以在春天去野餐。' },
      { key: 'B', text: 'I can go boating in spring.', label: '我可以在春天去划船。' }
    ],
    correctAnswer: 'A',
    type: 'sentence',
    hint: '"have a picnic" 意思是去野餐哦。'
  },
  {
    id: 'l9',
    audioPrompt: "It's warm in spring.",
    chineseInstruction: '听录音，选出你所听到的句子。',
    options: [
      { key: 'A', text: "It's cold in winter.", label: '冬天很冷。' },
      { key: 'B', text: "It's warm in spring.", label: '春天很温暖。' }
    ],
    correctAnswer: 'B',
    type: 'sentence',
    hint: '仔细区分 "warm" (温暖) 和 "cold" (寒冷)。'
  },
  {
    id: 'l10',
    audioPrompt: "Let's make a snowman now.",
    chineseInstruction: '听录音，选出你所听到的句子。',
    options: [
      { key: 'A', text: "Let's fly a kite now.", label: '我们现在去放风筝吧。' },
      { key: 'B', text: "Let's make a snowman now.", label: '我们现在来堆雪人吧。' }
    ],
    correctAnswer: 'B',
    type: 'sentence',
    hint: '"make a snowman" 意思是堆雪人。'
  },

  // Practice Page 62 Part 4: Choose the correct response to question
  {
    id: 'l11',
    audioPrompt: 'Which season do you like best?',
    chineseInstruction: '听录音，选择正确的答句。',
    options: [
      { key: 'A', text: 'I like apples best.', label: '我最喜欢苹果。' },
      { key: 'B', text: 'I like summer best.', label: '我最喜欢夏天。' }
    ],
    correctAnswer: 'B',
    type: 'response',
    hint: '问句是: "你最喜欢哪个季节?", 苹果是水果，夏天 (summer) 才是季节哟。'
  },
  {
    id: 'l12',
    audioPrompt: 'What can you do in winter?',
    chineseInstruction: '听录音，选择正确的答句。',
    options: [
      { key: 'A', text: 'I can go swimming.', label: '我会去游泳。' },
      { key: 'B', text: 'I can make a snowman.', label: '我能堆雪人。' }
    ],
    correctAnswer: 'B',
    type: 'response',
    hint: '问句是: "你在冬天可以做什么?", 冬天可以堆雪人 (make a snowman) 哟。'
  },
  {
    id: 'l13',
    audioPrompt: 'Can you fly a kite?',
    chineseInstruction: '听录音，选择正确的答句。',
    options: [
      { key: 'A', text: 'Yes, I can.', label: '是的，我会。' },
      { key: 'B', text: 'Yes, I do.', label: '是的，我做。' }
    ],
    correctAnswer: 'A',
    type: 'response',
    hint: '用 "Can you...?" 提问时，回答要用 "can" 来搭配，如 "Yes, I can."。'
  },
  {
    id: 'l14',
    audioPrompt: "Is it hot in summer?",
    chineseInstruction: '听录音，选择正确的答句。',
    options: [
      { key: 'A', text: "Yes, it's hot.", label: '是的，很热。' },
      { key: 'B', text: "No. It's hot.", label: '不，很热。 (不合逻辑)' }
    ],
    correctAnswer: 'A',
    type: 'response',
    hint: '夏天热不热？是的(Yes)，它很热。B选项的No和后面的热矛盾。'
  },
  {
    id: 'l15',
    audioPrompt: 'What do you like to eat?',
    chineseInstruction: '听录音，选择正确的答句。',
    options: [
      { key: 'A', text: 'I like swimming.', label: '我喜欢游泳。' },
      { key: 'B', text: 'I like chicken.', label: '我喜欢吃鸡肉。' }
    ],
    correctAnswer: 'B',
    type: 'response',
    hint: '问句是: "你想吃点什么?", 游泳是运动，鸡肉(chicken)才是可以吃的美味。'
  }
];

export const matchPairs: MatchPair[] = [
  {
    id: 'mp1',
    character: { name: '莉莉', avatar: '👧', gender: 'girl', index: 1 },
    activity: {
      description: 'boating in spring',
      chinese: '春天划船',
      emoji: '🚣',
      imagePlaceholder: 'boat'
    },
    key: 'A'
  },
  {
    id: 'mp2',
    character: { name: '玛丽', avatar: '👩', gender: 'girl', index: 2 },
    activity: {
      description: 'autumn blowing leaves',
      chinese: '秋天赏落叶',
      emoji: '🍁',
      imagePlaceholder: 'leaves'
    },
    key: 'B'
  },
  {
    id: 'mp3',
    character: { name: '艾丽斯', avatar: '👧', gender: 'girl', index: 3 },
    activity: {
      description: 'having a picnic',
      chinese: '在公园野餐',
      emoji: '🧺',
      imagePlaceholder: 'picnic'
    },
    key: 'C'
  },
  {
    id: 'mp4',
    character: { name: '杰克', avatar: '👦', gender: 'boy', index: 4 },
    activity: {
      description: 'making a snowman',
      chinese: '冬天堆雪人',
      emoji: '⛄',
      imagePlaceholder: 'snowman'
    },
    key: 'D'
  },
  {
    id: 'mp5',
    character: { name: '小本', avatar: '👦', gender: 'boy', index: 5 },
    activity: {
      description: 'climbing mountains in spring',
      chinese: '春天去爬山',
      emoji: '🧗',
      imagePlaceholder: 'hiking'
    },
    key: 'E'
  }
];

export const unscrambleItems: UnscrambleItem[] = [
  { id: 'u1', correctWord: 'shirt', scrambled: 'irsht', chinese: '衬衫', emoji: '👔', category: '衣服' },
  { id: 'u2', correctWord: 'balloon', scrambled: 'llobaon', chinese: '气球', emoji: '🎈', category: '玩具' },
  { id: 'u3', correctWord: 'robot', scrambled: 'borot', chinese: '机器人', emoji: '🤖', category: '玩具' },
  { id: 'u4', correctWord: 'plane', scrambled: 'pelan', chinese: '飞机', emoji: '✈️', category: '玩具' },
  { id: 'u5', correctWord: 'baseball', scrambled: 'balsebal', chinese: '棒球', emoji: '⚾', category: '玩具/运动' },
  { id: 'u6', correctWord: 'skirt', scrambled: 'stkir', chinese: '短裙', emoji: '👗', category: '衣服' },
  { id: 'u7', correctWord: 'glasses', scrambled: 'sesglas', chinese: '眼镜', emoji: '👓', category: '饰品' },
  { id: 'u8', correctWord: 'jeans', scrambled: 'jneas', chinese: '牛仔裤', emoji: '👖', category: '衣服' },
  { id: 'u9', correctWord: 'noodles', scrambled: 'noodles', chinese: '面条', emoji: '🍜', category: '食物' },
  { id: 'u10', correctWord: 'chicken', scrambled: 'chicken', chinese: '鸡肉', emoji: '🍗', category: '食物' }
];

export const grammarMistakes: GrammarMistakeItem[] = [
  {
    id: 'gm1',
    wrongSentence: 'I like her red trouser.',
    wrongWord: 'trouser',
    correctedWord: 'trousers',
    fullCorrectSentence: 'I like her red trousers.',
    chinese: '我喜欢她的红裤子。(裤子trousers应该用复数形式哦。)',
    emoji: '👖'
  },
  {
    id: 'gm2',
    wrongSentence: 'A woman are reading.',
    wrongWord: 'are',
    correctedWord: 'is',
    fullCorrectSentence: 'A woman is reading.',
    chinese: '一位女士正在读书。(单数主语a woman要搭配is。)',
    emoji: '📖'
  },
  {
    id: 'gm3',
    wrongSentence: 'There are three chair.',
    wrongWord: 'chair',
    correctedWord: 'chairs',
    fullCorrectSentence: 'There are three chairs.',
    chinese: '这里有三把椅子。(three后面名词chair要加s变复数)。',
    emoji: '🪑'
  },
  {
    id: 'gm4',
    wrongSentence: 'Look! They are play a board game.',
    wrongWord: 'play',
    correctedWord: 'playing',
    fullCorrectSentence: 'Look! They are playing a board game.',
    chinese: '看！他们正在玩桌游。(进行时am/is/are + v-ing)。',
    emoji: '🎲'
  },
  {
    id: 'gm5',
    wrongSentence: 'He likes swim in the sea.',
    wrongWord: 'swim',
    correctedWord: 'swimming',
    fullCorrectSentence: 'He likes swimming in the sea.',
    chinese: '他喜欢在海里游泳。(like后面接动做要用v-ing形式！)',
    emoji: '🏊'
  }
];

export const grammarLessons = {
  questionWords: [
    { word: 'Which', chinese: '哪个', example: 'Which one do you like? — I like the red one.', context: '表示在有限范围里进行选择。' },
    { word: 'Who', chinese: '谁', example: "Who is that? — That's my sister, May.", context: '询问人是谁。' },
    { word: 'Where', chinese: '在哪里', example: 'Where is he now? — He is in the living room.', context: '询问地点、位置。' },
    { word: 'What', chinese: '什么', example: "What's she doing? — She's driving a car.", context: '询问事物或正在进行的动作。' },
    { word: 'How old', chinese: '几岁', example: 'How old is she? — She is five.', context: '询问年龄大小。' },
    { word: 'How many', chinese: '多少', example: 'How many books have you got? — I have got 10.', context: '询问数量(修饰可数名词复数哦)。' }
  ],
  presentContinuous: [
    { text: "I'm playing tennis.", translation: "我正在打网球。" },
    { text: "We're singing.", translation: "我们正在唱歌。" },
    { text: "You're dancing.", translation: "你正在跳舞。" },
    { text: "They're swimming.", translation: "他们正在游泳。" },
    { text: "He's riding a bike.", translation: "他正在骑自行车。" },
    { text: "She's reading a book.", translation: "她正在看书。" },
    { text: "It's running.", translation: "它正在奔跑。" }
  ],
  presentContinuousForm: {
    formula: "主语 + am/is/are + 动词-ing",
    usage: "说明此时此刻「正在发生的事情」哦！我们在动词后面穿上可爱小外套 '-ing'吧！"
  }
};
