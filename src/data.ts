import { WordItem, StoryItem, ListeningQuestion, MatchPair, UnscrambleItem, GrammarMistakeItem } from './types';

export const lessonsDatabase = {
  lesson1: {
    id: 'lesson1',
    name: '第一课：Practice 7 语法乐学园',
    practiceTitle: 'Practice 7',
    wordsData: [
      // Clothes category
      {
        id: 'w1',
        english: 'shirt',
        chinese: '男衬衫',
        phonetic: '/ʃɜːt/',
        category: 'clothes',
        emoji: '👔',
        sentence: 'I will put on my red shirt.',
        sentenceChinese: '我要穿上我的红衬衫。'
      },
      {
        id: 'w2',
        english: 'skirt',
        chinese: '短裙',
        phonetic: '/skɜːt/',
        category: 'clothes',
        emoji: '👗',
        sentence: 'She is wearing a pink skirt.',
        sentenceChinese: '她正穿着一条粉红色短裙。'
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
    ],
    storiesData: [
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
            chinese: '太棒了，我想看！我们还可以在外面吃汉堡和薯框呢。'
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
        lines: [],
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
    ],
    listeningQuestions: [
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
          { key: 'B', text: "No. It's hot.", label: '不，很热。' }
        ],
        correctAnswer: 'A',
        type: 'response',
        hint: '夏天热不热？是的(Yes)，它很热。B选项矛盾。'
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
        hint: '问句是: "你想吃点什么?", 游泳是运动，鸡肉(chicken)才是食物。'
      }
    ],
    matchPairs: [
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
    ],
    unscrambleItems: [
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
    ],
    grammarMistakes: [
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
    ],
    grammarLessons: {
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
        usage: "说明此时此刻「正在发生的事情」哦！我们在动词后面穿上可爱小外套 \'-ing\'吧！"
      }
    }
  },

  lesson2: {
    id: 'lesson2',
    name: '第二课：Practice 8 伦敦笔友与美味午餐',
    practiceTitle: 'Practice 8',
    wordsData: [
      // Section A: Vocabulary & Situational Dialogue
      {
        id: 'w2-1',
        english: 'postcard',
        chinese: '明信片',
        phonetic: '/ˈpəʊstkɑːd/',
        category: 'general',
        emoji: '✉️',
        sentence: 'I will write Tina a beautiful postcard.',
        sentenceChinese: '我将给Tina写一张漂亮的明信片。'
      },
      {
        id: 'w2-2',
        english: 'send',
        chinese: '寄，送',
        phonetic: '/send/',
        category: 'general',
        emoji: '📮',
        sentence: 'Who are you sending the postcard to?',
        sentenceChinese: '你打算把这张明信片寄给谁呢？'
      },
      {
        id: 'w2-3',
        english: 'pen pal',
        chinese: '笔友',
        phonetic: '/ˈpen pæl/',
        category: 'general',
        emoji: '🤝',
        sentence: 'My pen pal is a cute girl named Tina.',
        sentenceChinese: '我的笔友是一个叫Tina的可爱女孩。'
      },
      {
        id: 'w2-4',
        english: 'London',
        chinese: '伦敦',
        phonetic: '/ˈlʌndən/',
        category: 'general',
        emoji: '🎡',
        sentence: 'Tina lives in London, the capital of UK.',
        sentenceChinese: 'Tina住在伦敦，也就是英国的首都。'
      },
      {
        id: 'w2-5',
        english: 'Chinese',
        chinese: '中文的，中国人的',
        phonetic: '/ˌtʃaɪˈniːz/',
        category: 'grammar',
        emoji: '🐼',
        sentence: 'She likes our rich Chinese culture very much.',
        sentenceChinese: '她非常喜欢我们博大精深的中华文化。'
      },
      {
        id: 'w2-6',
        english: 'school',
        chinese: '学校',
        phonetic: '/skuːl/',
        category: 'general',
        emoji: '🏫',
        sentence: 'We often go to school together.',
        sentenceChinese: '我们经常一起去上学。'
      },
      {
        id: 'w2-7',
        english: 'student',
        chinese: '学生',
        phonetic: '/ˈstjuːdnt/',
        category: 'general',
        emoji: '🎒',
        sentence: 'She is a clever primary school student.',
        sentenceChinese: '她是一个聪明的小学生。'
      },
      // Section B: Dinner & Lunch Song Vocabulary
      {
        id: 'w2-8',
        english: 'lunch',
        chinese: '午餐',
        phonetic: '/lʌntʃ/',
        category: 'food',
        emoji: '🍱',
        sentence: 'Mummy, Daddy, it is time for lunch!',
        sentenceChinese: '妈妈，爸爸，午饭时间到啦！'
      },
      {
        id: 'w2-9',
        english: 'mummy',
        chinese: '妈妈',
        phonetic: '/ˈmʌmi/',
        category: 'general',
        emoji: '👩',
        sentence: 'My mummy is the best helper in the world.',
        sentenceChinese: '我的妈妈是世界上最好的帮手。'
      },
      {
        id: 'w2-10',
        english: 'fry',
        chinese: '油煎，油炸',
        phonetic: '/fraɪ/',
        category: 'food',
        emoji: '🍳',
        sentence: 'I am frying three delicious eggs.',
        sentenceChinese: '我正在煎三个美味的鸡蛋。'
      },
      {
        id: 'w2-11',
        english: 'daddy',
        chinese: '爸爸',
        phonetic: '/ˈdædi/',
        category: 'general',
        emoji: '👨',
        sentence: 'Daddy, Daddy! Come and eat frying steaks!',
        sentenceChinese: '爸爸爸爸！快来吃美味的煎牛排！'
      },
      {
        id: 'w2-12',
        english: 'steak',
        chinese: '牛排',
        phonetic: '/steɪk/',
        category: 'food',
        emoji: '🥩',
        sentence: 'The frying beef steak is smelling extremely good.',
        sentenceChinese: '煎牛排闻起来可真香啊！'
      },
      // Scrambled review words from page 50 diagram
      {
        id: 'w2-13',
        english: 'skateboard',
        chinese: '滑板',
        phonetic: '/ˈskeɪtbɔːd/',
        category: 'toys',
        emoji: '🛹',
        sentence: 'Look! Lily is playing on the blue skateboard page.',
        sentenceChinese: '看！莉莉正在玩那块蓝色滑板。'
      },
      {
        id: 'w2-14',
        english: 'room',
        chinese: '房间/卧室',
        phonetic: '/ruːm/',
        category: 'general',
        emoji: '🛌',
        sentence: 'There is a comfy bed in my room.',
        sentenceChinese: '我的房间里有一张舒服的床。'
      },
      {
        id: 'w2-15',
        english: 'guitar',
        chinese: '吉他',
        phonetic: '/ɡɪˈtɑː(r)//',
        category: 'toys',
        emoji: '🎸',
        sentence: 'He can play the electric guitar very well.',
        sentenceChinese: '他吉他弹得极其好听。'
      },
      {
        id: 'w2-16',
        english: 'lamp',
        chinese: '台灯',
        phonetic: '/læmp/',
        category: 'general',
        emoji: '💡',
        sentence: 'Please turn on the desk lamp when reading.',
        sentenceChinese: '看书的时候请把书桌台灯打开。'
      },
      {
        id: 'w2-17',
        english: 'piano',
        chinese: '钢琴',
        phonetic: '/piˈænəʊ/',
        category: 'toys',
        emoji: '🎹',
        sentence: 'She practices playing the piano every afternoon.',
        sentenceChinese: '她每天下午都练习弹钢琴。'
      },
      {
        id: 'w2-18',
        english: 'rug',
        chinese: '地毯',
        phonetic: '/rʌɡ/',
        category: 'general',
        emoji: '🧼',
        sentence: 'The cute little puppy sleeping on the rug.',
        sentenceChinese: '可爱的小狗正在地毯上舒舒服服地睡觉。'
      },
      {
        id: 'w2-19',
        english: 'sofa',
        chinese: '沙发',
        phonetic: '/ˈsəʊfə/',
        category: 'general',
        emoji: '🛋️',
        sentence: 'Mummy and Daddy are sitting on the soft sofa.',
        sentenceChinese: '妈妈和爸爸正坐在松软的沙发上。'
      },
      {
        id: 'w2-20',
        english: 'mirror',
        chinese: '镜子',
        phonetic: '/ˈmɪrə(r)/',
        category: 'general',
        emoji: '🪞',
        sentence: 'Is there a mirror in your bathroom?',
        sentenceChinese: '你的洗手间里有一面镜子吗？'
      }
    ],
    storiesData: [
      {
        id: 'story1',
        title: 'A Postcard for Tina',
        titleChinese: '寄给缇娜的明信片',
        introduction: 'Rose is writing an exciting letter to her new British pen pal in London! Let\'s listen to her conversation with Mum.',
        type: 'dialogue',
        emoji: '✉️',
        bgColor: 'border-pink-200 bg-pink-50/70 text-pink-700',
        lines: [
          {
            speaker: 'Mum',
            text: 'Who are you sending the postcard to?',
            chinese: '妈妈：你正在给谁寄明信片呢？'
          },
          {
            speaker: 'Rose',
            text: 'My pen pal. Her name is Tina. She is in London. She likes our Chinese culture.',
            chinese: '露丝：给我的笔友。她叫缇娜。她住在伦敦哦。她可喜欢我们中华文化了！'
          },
          {
            speaker: 'Mum',
            text: 'Is she a primary school student?',
            chinese: '妈妈：那她是一个小学生吗？'
          },
          {
            speaker: 'Rose',
            text: 'Yes, she is. We often send emails to each other.',
            chinese: '露丝：是的，她是。我们经常在电脑上互相发邮件呢。'
          }
        ]
      },
      {
        id: 'story2',
        title: 'Children\'s Dinner Song',
        titleChinese: '经典童谣：午饭时间到啦',
        introduction: 'It is time for lunch! Sing along with Mummy and Daddy to hear what yummy steaks and eggs they are preparing!',
        type: 'passage',
        emoji: '🍳',
        bgColor: 'border-amber-200 bg-amber-50/70 text-amber-700',
        lines: [],
        paragraphs: [
          "Mummy, Mummy, it's time for lunch.",
          "Eggs, eggs. I am frying eggs. Here you are, my baby.",
          "Daddy, Daddy, it's time for lunch.",
          "Steaks, steaks. I am frying steaks. Here you are, my baby."
        ],
        paragraphsChinese: [
          "妈妈，妈妈，午饭时间到了咯！",
          "鸡蛋，鸡蛋。我正在给你煎金黄的鸡蛋。接好啦，我的心肝小宝贝！",
          "爸爸，爸爸，午饭时间到了咯！",
          "牛排，牛排。我正在滋滋地煎多汁的牛排。接好啦，我的心肝小宝贝！"
        ]
      }
    ],
    listeningQuestions: [
      {
        id: 'l2-1',
        audioPrompt: 'Please queue up to get on the bus.',
        chineseInstruction: '听录音，选出与所听内容相符的图片。',
        options: [
          { key: 'A', text: 'Please queue up.', label: '按顺序在排队 🧑‍🤝‍🧑' },
          { key: 'B', text: 'Please don\'t talk in class.', label: '在教室捂耳朵不要大声 🙉' }
        ],
        correctAnswer: 'A',
        type: 'category',
        hint: '录音听到 "queue up" 就是排队的意思！图片A是四个小孩排着长队很听话。'
      },
      {
        id: 'l2-2',
        audioPrompt: 'We often send emails to each other on the compute.',
        chineseInstruction: '听录音，选出与所听内容相符的图片。',
        options: [
          { key: 'A', text: 'We send emails to each other.', label: '开开心心写信用电脑发邮件 ✉️' },
          { key: 'B', text: 'I go to bed at nine clock.', label: '乖乖盖被子躺在床上睡觉 🛌' }
        ],
        correctAnswer: 'A',
        type: 'category',
        hint: '录音里听到 "send emails" 是发邮件交流，选电脑窗口A！'
      },
      {
        id: 'l2-3',
        audioPrompt: 'There are four obedient children in the queue right now.',
        chineseInstruction: '听录音，选出与所听内容相符的图片。',
        options: [
          { key: 'A', text: 'Four children are in the queue.', label: '四位小朋友在排队 A' },
          { key: 'B', text: 'Two children playing board games.', label: '两位小孩在课桌前玩游戏 B' }
        ],
        correctAnswer: 'A',
        type: 'category',
        hint: '录音听到 "four children in the queue"，对应图片A排队场景。'
      },
      {
        id: 'l2-4',
        audioPrompt: 'Please don\'t feed animals in the zoo.',
        chineseInstruction: '听录音，选出与所听内容相符的图片。',
        options: [
          { key: 'A', text: 'I am giving pink flowers to teacher.', label: '双手拿着一捧大红花 A' },
          { key: 'B', text: 'Please don\'t feed the animals here.', label: '拿骨头喂狗，旁边有醒目的禁止红牌 B' }
        ],
        correctAnswer: 'B',
        type: 'category',
        hint: '听到 "don\'t feed animals" (不要喂动物)，图片B有小男孩拿骨头喂食和指示牌！'
      },
      {
        id: 'l2-5',
        audioPrompt: 'Who are you sending the postcard to?',
        chineseInstruction: '听录音，选出与所听内容相符的图片。',
        options: [
          { key: 'A', text: 'He is taking beautiful camera photos.', label: '端起照相机咔嚓照相 A' },
          { key: 'B', text: 'Who are you sending postcard to.', label: '拿着淡黄明信片信封准备邮寄 B' }
        ],
        correctAnswer: 'B',
        type: 'category',
        hint: '听到 "sending the postcard" 就是和明信片相关的啦，选B！'
      },
      {
        id: 'l2-6',
        audioPrompt: 'Look at the traffic light. It is green. Please go.',
        chineseInstruction: '听录音，选出与所听内容相符的图片。',
        options: [
          { key: 'A', text: 'The light is yellow. Please wait.', label: '黄色信号灯亮起 A' },
          { key: 'B', text: 'The light is green. Please go.', label: '绿色信号灯亮起 B' }
        ],
        correctAnswer: 'B',
        type: 'category',
        hint: '听到 "green" (绿色)！绿灯行，所以答案选B信号灯！'
      },
      // Sentence questions
      {
        id: 'l2-7',
        audioPrompt: 'Who are you sending the postcard to?',
        chineseInstruction: '听录音，选出你所听到的句子。',
        options: [
          { key: 'A', text: 'Who is writing a letter?', label: '谁正在写信？' },
          { key: 'B', text: 'Who are you sending the postcard to?', label: '你在给谁寄明信片呢？' }
        ],
        correctAnswer: 'B',
        type: 'sentence',
        hint: '听到 "sending the postcard" 的发音。'
      },
      {
        id: 'l2-8',
        audioPrompt: 'My pen pal lives in London.',
        chineseInstruction: '听录音，选出你所听到的句子。',
        options: [
          { key: 'A', text: 'My pen pal lives in London.', label: '我的笔友住在伦敦。' },
          { key: 'B', text: 'My friend lives in China.', label: '我的朋友住在中国。' }
        ],
        correctAnswer: 'A',
        type: 'sentence',
        hint: '听到 "pen pal" 和英国城市 "London"。'
      },
      {
        id: 'l2-9',
        audioPrompt: 'Mummy is frying eggs for lunch.',
        chineseInstruction: '听录音，选出你所听到的句子。',
        options: [
          { key: 'A', text: 'Mummy is frying eggs for lunch.', label: '妈妈正在煎蛋做午餐。' },
          { key: 'B', text: 'Daddy is frying steaks for dinner.', label: '爸爸正在煎牛排做晚餐。' }
        ],
        correctAnswer: 'A',
        type: 'sentence',
        hint: '听到煎蛋 "frying eggs" 而不是煎牛排哦。'
      },
      // Response questions
      {
        id: 'l2-10',
        audioPrompt: 'Is Tina a primary school student?',
        chineseInstruction: '听录音，选择正确的答句。',
        options: [
          { key: 'A', text: 'Yes, she is.', label: '是的，她是。' },
          { key: 'B', text: 'No, she does.', label: '不，她做。 (助动词不搭配)' }
        ],
        correctAnswer: 'A',
        type: 'response',
        hint: '用 "Is she...?" 提问小学生，回答匹配 "Yes, she is."！'
      },
      {
        id: 'l2-11',
        audioPrompt: 'Where does your pen pal Tina come from?',
        chineseInstruction: '听录音，选择正确的答句。',
        options: [
          { key: 'A', text: 'She is in London. She is from UK.', label: '她在伦敦。她来自英国。' },
          { key: 'B', text: 'She behaves like a good child of China.', label: '她是个中国的好孩子。' }
        ],
        correctAnswer: 'A',
        type: 'response',
        hint: 'Tina 住在英国伦敦，也就是 "from UK"！所以选择A。'
      }
    ],
    matchPairs: [
      {
        id: 'mp2-1',
        character: { name: 'Tina', avatar: '👧', gender: 'girl', index: 1 },
        activity: {
          description: 'Tina in London',
          chinese: '缇娜在英国伦敦',
          emoji: '🎡',
          imagePlaceholder: 'london_eye'
        },
        key: 'A'
      },
      {
        id: 'mp2-2',
        character: { name: 'Mummy', avatar: '👩', gender: 'girl', index: 2 },
        activity: {
          description: 'frying eggs',
          chinese: '在厨房煎鸡蛋',
          emoji: '🍳',
          imagePlaceholder: 'fry_eggs'
        },
        key: 'B'
      },
      {
        id: 'mp2-3',
        character: { name: 'Daddy', avatar: '👨', gender: 'boy', index: 3 },
        activity: {
          description: 'frying steaks',
          chinese: '在餐桌煎牛排',
          emoji: '🥩',
          imagePlaceholder: 'fry_steak'
        },
        key: 'C'
      }
    ],
    unscrambleItems: [
      { id: 'u2-1', correctWord: 'skateboard', scrambled: 'bdorasktea', chinese: '滑板', emoji: '🛹', category: '玩具' },
      { id: 'u2-2', correctWord: 'house', scrambled: 'esuoh', chinese: '房子', emoji: '🏠', category: '单词' },
      { id: 'u2-3', correctWord: 'kite', scrambled: 'ktie', chinese: '风筝', emoji: '🪁', category: '玩具' },
      { id: 'u2-4', correctWord: 'room', scrambled: 'moro', chinese: '房间', emoji: '🛌', category: '家居' },
      { id: 'u2-5', correctWord: 'guitar', scrambled: 'ratgiu', chinese: '吉他', emoji: '🎸', category: '乐器' },
      { id: 'u2-6', correctWord: 'lamp', scrambled: 'plam', chinese: '台灯', emoji: '💡', category: '灯具' },
      { id: 'u2-7', correctWord: 'piano', scrambled: 'aniop', chinese: '钢琴', emoji: '🎹', category: '乐器' },
      { id: 'u2-8', correctWord: 'rug', scrambled: 'ugr', chinese: '地毯', emoji: '🧼', category: '家居' },
      { id: 'u2-9', correctWord: 'run', scrambled: 'nur', chinese: '跑步', emoji: '🏃', category: '动作' },
      { id: 'u2-10', correctWord: 'sofa', scrambled: 'fosa', chinese: '沙发', emoji: '🛋️', category: '家具' },
      { id: 'u2-11', correctWord: 'sing', scrambled: 'gnis', chinese: '唱歌', emoji: '🎤', category: '动作' },
      { id: 'u2-12', correctWord: 'mirror', scrambled: 'rrromi', chinese: '镜子', emoji: '🪞', category: '家居' }
    ],
    grammarMistakes: [
      {
        id: 'gm2-1',
        wrongSentence: 'She are a primary school student.',
        wrongWord: 'are',
        correctedWord: 'is',
        fullCorrectSentence: 'She is a primary school student.',
        chinese: '她是一个小学生。(单数第三人称she要配is哦！)',
        emoji: '🎒'
      },
      {
        id: 'gm2-2',
        wrongSentence: 'There is three books in my bag.',
        wrongWord: 'is',
        correctedWord: 'are',
        fullCorrectSentence: 'There are three books in my bag.',
        chinese: '我的书包里有三本书。(复数名词three books应该搭配are哦！)',
        emoji: '💼'
      },
      {
        id: 'gm2-3',
        wrongSentence: 'He likes eating a apple.',
        wrongWord: 'a',
        correctedWord: 'an',
        fullCorrectSentence: 'He likes eating an apple.',
        chinese: '他最喜欢吃苹果啦。(以元音音素开头的单词apple前要用an！)',
        emoji: '🍎'
      },
      {
        id: 'gm2-4',
        wrongSentence: 'Who are you send the postcard to?',
        wrongWord: 'send',
        correctedWord: 'sending',
        fullCorrectSentence: 'Who are you sending the postcard to?',
        chinese: '你在给谁寄明信片呢？(正在进行时 be + 动词ing)。',
        emoji: '📮'
      },
      {
        id: 'gm2-5',
        wrongSentence: 'The blue bird am flying in the sky.',
        wrongWord: 'am',
        correctedWord: 'is',
        fullCorrectSentence: 'The blue bird is flying in the sky.',
        chinese: '那只蓝鸟正在空中飞翔。(单数 subject a bird 必须要配 is！)',
        emoji: '🐦'
      }
    ],
    grammarLessons: {
      articlesLesson: [
        { word: 'a', chinese: '一个', example: 'This is a bag / a dog.', context: '用在辅音音素开头的单词前面。' },
        { word: 'an', chinese: '一个', example: 'This is an apple / an elephant.', context: '用在元音音素开头的单词前面。' },
        { word: 'the', chinese: '这/那(个)', example: 'The doll\'s name is Lucy, too.', context: '表示特指说话双方都明白的人或物。' }
      ],
      thereBeLesson: [
        { word: 'There is', chinese: '有一个...', example: 'There is a park in our town. / There is a doll.', context: '后面接单数可数名词。' },
        { word: 'There are', chinese: '有几个...', example: 'There are some books in my bag.', context: '后面接复数名词。' }
      ]
    }
  },

  lesson9: {
    id: 'lesson9',
    name: '第九课：Practice 9 身体、衣服与身高',
    practiceTitle: 'Practice 9',
    wordsData: [
      {
        id: 'w9-1',
        english: 'arm',
        chinese: '手臂',
        phonetic: '/ɑːm/',
        category: 'body',
        emoji: '💪',
        sentence: 'He has two strong arms.',
        sentenceChinese: '他有两条强壮的手臂。'
      },
      {
        id: 'w9-2',
        english: 'eye',
        chinese: '眼睛',
        phonetic: '/aɪ/',
        category: 'body',
        emoji: '👁️',
        sentence: 'She has big beautiful eyes.',
        sentenceChinese: '她长着一双美丽的大眼睛。'
      },
      {
        id: 'w9-3',
        english: 'ear',
        chinese: '耳朵',
        phonetic: '/ɪə(r)/',
        category: 'body',
        emoji: '👂',
        sentence: 'An ear can hear soft music.',
        sentenceChinese: '耳朵能听到轻柔的音乐。'
      },
      {
        id: 'w9-4',
        english: 'foot',
        chinese: '脚 (单数)',
        phonetic: '/fʊt/',
        category: 'body',
        emoji: '🦶',
        sentence: 'This is my left foot.',
        sentenceChinese: '这是我的左脚。'
      },
      {
        id: 'w9-5',
        english: 'feet',
        chinese: '双脚 (复数)',
        phonetic: '/fiːt/',
        category: 'body',
        emoji: '👣',
        sentence: 'We stand on our feet.',
        sentenceChinese: '我们用双脚站立。'
      },
      {
        id: 'w9-6',
        english: 'face',
        chinese: '脸',
        phonetic: '/feɪs/',
        category: 'body',
        emoji: '👧',
        sentence: 'She has a round sweet face.',
        sentenceChinese: '她有一张圆圆可爱的脸。'
      },
      {
        id: 'w9-7',
        english: 'hair',
        chinese: '头发',
        phonetic: '/heə(r)/',
        category: 'body',
        emoji: '💇',
        sentence: 'Anna has got long black hair.',
        sentenceChinese: '安娜留着黑色长发。'
      },
      {
        id: 'w9-8',
        english: 'hand',
        chinese: '手',
        phonetic: '/hænd/',
        category: 'body',
        emoji: '✋',
        sentence: 'Wave your hand and say goodbye.',
        sentenceChinese: '挥挥手，说声再见。'
      },
      {
        id: 'w9-9',
        english: 'head',
        chinese: '头',
        phonetic: '/hed/',
        category: 'body',
        emoji: '🧑',
        sentence: 'Shake your head to say no.',
        sentenceChinese: '摇头表示否定。'
      },
      {
        id: 'w9-10',
        english: 'leg',
        chinese: '腿',
        phonetic: '/leɡ/',
        category: 'body',
        emoji: '🦵',
        sentence: 'The runner has got long legs.',
        sentenceChinese: '跑步运动员长着一双大长腿。'
      },
      {
        id: 'w9-11',
        english: 'mouth',
        chinese: '嘴',
        phonetic: '/maʊθ/',
        category: 'body',
        emoji: '👄',
        sentence: 'Open your mouth and drink water.',
        sentenceChinese: '张嘴喝口水。'
      },
      {
        id: 'w9-12',
        english: 'nose',
        chinese: '鼻子',
        phonetic: '/nəʊz/',
        category: 'body',
        emoji: '👃',
        sentence: 'I can smell flowers with my nose.',
        sentenceChinese: '我可以用鼻子闻到花香。'
      },
      {
        id: 'w9-13',
        english: 'smile',
        chinese: '微笑',
        phonetic: '/smaɪl/',
        category: 'body',
        emoji: '😊',
        sentence: 'A sweet smile is on her face.',
        sentenceChinese: '她的脸上洋溢着甜美的微笑。'
      },
      {
        id: 'w9-14',
        english: 'tall',
        chinese: '高的 (身高)',
        phonetic: '/tɔːl/',
        category: 'height',
        emoji: '🦒',
        sentence: 'I am 1.4 meters tall.',
        sentenceChinese: '我有一点四米高。'
      },
      {
        id: 'w9-15',
        english: 'height',
        chinese: '身高',
        phonetic: '/haɪt/',
        category: 'height',
        emoji: '📏',
        sentence: 'My height is 1.3 meters.',
        sentenceChinese: '我的身高是一点三米。'
      },
      {
        id: 'w9-16',
        english: 'meter',
        chinese: '米',
        phonetic: '/ˈmiːtə(r)/',
        category: 'height',
        emoji: '📐',
        sentence: 'She is 1.5 meters tall.',
        sentenceChinese: '她是一点五米高。'
      }
    ],
    storiesData: [
      {
        id: 'story1',
        title: 'How Tall Are You?',
        titleChinese: '你有多高呀？',
        introduction: 'Let\'s talk about heights together! We can ask "How tall are you?" or "What\'s your height?". Let\'s hear the dialogue.',
        type: 'dialogue',
        emoji: '📏',
        bgColor: 'border-pink-200 bg-pink-50/70 text-pink-700',
        lines: [
          {
            speaker: 'Emma',
            text: 'How tall are you?',
            chinese: '你多高呀？'
          },
          {
            speaker: 'Tom',
            text: 'I\'m 1.4 meters tall. What\'s your height?',
            chinese: '我身高1.4米。你的身高是多少呢？'
          },
          {
            speaker: 'Emma',
            text: 'My height is 1.3 meters. How tall is your sister?',
            chinese: '我的身高是1.3米。你妹妹有多高哇？'
          },
          {
            speaker: 'Tom',
            text: 'She\'s 1.5 meters tall. She is taller than me.',
            chinese: '她身高1.5米。她比我还要高呢。'
          }
        ]
      },
      {
        id: 'story2',
        title: 'A Letter from Fred',
        titleChinese: '弗雷德的一封来信',
        introduction: 'Read the letter that Fred sent from the beautiful beach in Dalian! True/False assessment is waiting below.',
        type: 'passage',
        emoji: '✉️',
        bgColor: 'border-amber-200 bg-amber-50/70 text-amber-700',
        lines: [],
        paragraphs: [
          "Dear David, How are you? I am in Dalian. I am at the beach. It's sunny today. It's very hot.",
          "The beach is very beautiful. The sky is blue and the water is clean. The sand is yellow.",
          "Look at the clouds! There is a big white cloud. It looks like a cloud rabbit. It is very cute.",
          "I like swimming. Blue is my favourite colour. What is your favourite colour? Write to me soon! Yours, Fred."
        ],
        paragraphsChinese: [
          "亲爱的戴维：你还好吗？我现在大连呢。我正在沙滩旁边玩耍。今天天气晴空万里，真的很热唷。",
          "沙滩真是太美丽了，天空蔚蓝，海水很乾净。沙子也是金黄透亮的。",
          "你看天空的那些云朵！有一朵好大的白云，它看起来简直太像一只活蹦乱跳的白兔了，真是太可爱了！",
          "我特别喜欢去海里游泳。蓝色是我最爱的颜色。那你最中意的颜色是什么呢？快点给我回信吧！你的，弗雷德。"
        ]
      }
    ],
    listeningQuestions: [
      {
        id: 'l9-1',
        audioPrompt: 'ear',
        chineseInstruction: '听录音，选出与所听内容相同品类的一项。',
        options: [
          { key: 'A', text: 'eye', label: '眼睛 (属于身体部位) 👁️' },
          { key: 'B', text: 'dress', label: '连衣裙 (属于衣服类别) 👗' }
        ],
        correctAnswer: 'A',
        type: 'category',
        hint: '录音听到 "ear" (耳朵) 属于身体部位，和 "eye" 是一类！'
      },
      {
        id: 'l9-2',
        audioPrompt: 'shorts',
        chineseInstruction: '听录音，选出与所听内容相同品类的一项。',
        options: [
          { key: 'A', text: 'face', label: '脸部 (属于身体部位) 👧' },
          { key: 'B', text: 'jacket', label: '夹克 (属于衣服类别) 🧥' }
        ],
        correctAnswer: 'B',
        type: 'category',
        hint: '录音听到 "shorts" (短裤) 属于衣服类，和 "jacket" (夹克) 是一类！'
      },
      {
        id: 'l9-3',
        audioPrompt: 'trousers',
        chineseInstruction: '听录音，选出与所听内容相同品类的一项。',
        options: [
          { key: 'A', text: 'T-shirt', label: 'T恤 (所属衣服类别) 👕' },
          { key: 'B', text: 'mouth', label: '嘴巴 (所属身体部位) 👄' }
        ],
        correctAnswer: 'A',
        type: 'category',
        hint: '听到的单词是 "trousers" (裤子) 属于衣服分类哦，和 "T-shirt" 是一组！'
      },
      {
        id: 'l9-4',
        audioPrompt: 'How tall is your sister?',
        chineseInstruction: '听录音，选出你所听到的句子。',
        options: [
          { key: 'A', text: 'How old is your sister?', label: '你妹妹几岁了？ 🎂' },
          { key: 'B', text: 'How tall is your sister?', label: '你妹妹有多高？ 📏' }
        ],
        correctAnswer: 'B',
        type: 'sentence',
        hint: '仔细辩听 "tall" (身高的) 的发音。'
      },
      {
        id: 'l9-5',
        audioPrompt: 'My height is 1.3 meters.',
        chineseInstruction: '听录音，选出你所听到的句子。',
        options: [
          { key: 'A', text: 'My height is 1.3 meters.', label: '我的身高是1.3米。 📏' },
          { key: 'B', text: 'My height is 1.4 meters.', label: '我的身高是1.4米。 📏' }
        ],
        correctAnswer: 'A',
        type: 'sentence',
        hint: '关键听数字音 "one point three" (1.3) 米哦！'
      },
      {
        id: 'l9-6',
        audioPrompt: 'Who is on the motorbike?',
        chineseInstruction: '听问句，选择最恰当的答语。',
        options: [
          { key: 'A', text: 'She is at the bus stop.', label: '她正在公共汽车站。 🛑' },
          { key: 'B', text: 'My little sister is on the motorbike.', label: '我的小妹妹正在摩托车上呢。 🏍️' }
        ],
        correctAnswer: 'B',
        type: 'response',
        hint: '问句是: "摩托车上那是谁啊?", 故回答关于人 "My little sister..."！'
      },
      {
        id: 'l9-7',
        audioPrompt: 'Where is the zoo?',
        chineseInstruction: '听问句，选择最恰当的答语。',
        options: [
          { key: 'A', text: 'He is Jack.', label: '他是杰克。 👦' },
          { key: 'B', text: 'It\'s near the shop.', label: '它和商店靠得很近。 🏪' }
        ],
        correctAnswer: 'B',
        type: 'response',
        hint: '问句是: "动物园在哪里呢?", 代表要回答具体的地点、方位 "near the shop"！'
      }
    ],
    matchPairs: [
      {
        id: 'mp9-1',
        character: { name: 'Jack', avatar: '👦', gender: 'boy', index: 1 },
        activity: {
          description: 'arms muscle',
          chinese: '强壮的双臂',
          emoji: '💪',
          imagePlaceholder: 'arms'
        },
        key: 'A'
      },
      {
        id: 'mp9-2',
        character: { name: 'Tom', avatar: '👦', gender: 'boy', index: 2 },
        activity: {
          description: 'how tall 1.4m',
          chinese: '身高有1.4米高哦',
          emoji: '🦒',
          imagePlaceholder: 'tall'
        },
        key: 'B'
      },
      {
        id: 'mp9-3',
        character: { name: 'Sister', avatar: '👧', gender: 'girl', index: 3 },
        activity: {
          description: 'long brown hair',
          chinese: '漂亮的长发和裙子',
          emoji: '💇',
          imagePlaceholder: 'hair'
        },
        key: 'C'
      }
    ],
    unscrambleItems: [
      { id: 'u9-1', correctWord: 'morning', scrambled: 'ninmorg', chinese: '早上，上午', emoji: '🌅', category: '时间' },
      { id: 'u9-2', correctWord: 'year', scrambled: 'eayr', chinese: '年，年份', emoji: '📅', category: '时间' },
      { id: 'u9-3', correctWord: 'night', scrambled: 'ghtni', chinese: '夜晚，夜间', emoji: '🌙', category: '时间' },
      { id: 'u9-4', correctWord: 'day', scrambled: 'dya', chinese: '白昼，天', emoji: '☀️', category: '时间' },
      { id: 'u9-5', correctWord: 'arm', scrambled: 'ram', chinese: '手臂', emoji: '💪', category: '身体部位' },
      { id: 'u9-6', correctWord: 'face', scrambled: 'cfae', chinese: '脸蛋', emoji: '👧', category: '身体部位' },
      { id: 'u9-7', correctWord: 'ear', scrambled: 'aer', chinese: '耳朵', emoji: '👂', category: '身体部位' },
      { id: 'u9-8', correctWord: 'foot', scrambled: 'ooft', chinese: '脚巴牙', emoji: '🦶', category: '身体部位' }
    ],
    grammarMistakes: [
      {
        id: 'gm9-1',
        wrongSentence: 'I is 1.4 meters tall.',
        wrongWord: 'is',
        correctedWord: 'am',
        fullCorrectSentence: 'I am 1.4 meters tall.',
        chinese: '我身高1.4米高。(第一人称主格 I 无论如何要搭配 am 动词。)',
        emoji: '🦒'
      },
      {
        id: 'gm9-2',
        wrongSentence: 'Who are the boy in white?',
        wrongWord: 'are',
        correctedWord: 'is',
        fullCorrectSentence: 'Who is the boy in white?',
        chinese: '穿白衣的小孩是谁？(the boy in white 是第三人称单数，故搭配 is。)',
        emoji: '👦'
      },
      {
        id: 'gm9-3',
        wrongSentence: 'There are many book on the shelf.',
        wrongWord: 'book',
        correctedWord: 'books',
        fullCorrectSentence: 'There are many books on the shelf.',
        chinese: '书架上有许许多多书。(many后面修饰名片要用复数 books 哦！)',
        emoji: '📚'
      },
      {
        id: 'gm9-4',
        wrongSentence: 'Sally likes play the piano.',
        wrongWord: 'play',
        correctedWord: 'playing',
        fullCorrectSentence: 'Sally likes playing the piano.',
        chinese: '萨莉中意于弹钢琴。(like后面接正在进行的习惯操作，采用 playing 形式！)',
        emoji: '🎹'
      },
      {
        id: 'gm9-5',
        wrongSentence: 'Where are the zoo?',
        wrongWord: 'are',
        correctedWord: 'is',
        fullCorrectSentence: 'Where is the zoo?',
        chinese: '动物园今天开在哪呢？(单数 the zoo 只需要配单数谓语 is 就可以啦。)',
        emoji: '🦁'
      }
    ],
    grammarLessons: {
      articlesLesson: [], // unused but satisfies logic shape
      thereBeLesson: []   // unused but satisfies logic shape
    }
  }
};

// Backward compatibility exports
export const wordsData = lessonsDatabase.lesson1.wordsData;
export const storiesData = lessonsDatabase.lesson1.storiesData;
export const listeningQuestions = lessonsDatabase.lesson1.listeningQuestions;
export const matchPairs = lessonsDatabase.lesson1.matchPairs;
export const unscrambleItems = lessonsDatabase.lesson1.unscrambleItems;
export const grammarMistakes = lessonsDatabase.lesson1.grammarMistakes;
export const grammarLessons = lessonsDatabase.lesson1.grammarLessons;
