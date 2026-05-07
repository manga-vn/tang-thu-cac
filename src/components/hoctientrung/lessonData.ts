// ============================================================
// lessonData.ts — Chương trình học tiếng Trung giao tiếp
// Triết lý: Tình huống → câu lõi → mẫu câu → hội thoại → luyện nói → từ vựng → ôn tập
// ============================================================

export type Sentence = {
  id: string
  hanzi: string
  pinyin: string
  vi: string
  ttsText: string
}

export type SentencePattern = {
  id: string
  title: string
  pattern: string
  explanation: string
  examples: Sentence[]
}

export type DialogueLine = {
  id: string
  role: 'father' | 'mother' | 'child' | 'older_sibling' | 'younger_sibling' | 'speakerA' | 'speakerB'
  hanzi: string
  pinyin: string
  vi: string
  ttsText: string
}

export type VocabularyItem = {
  id: string
  hanzi: string
  pinyin: string
  vi: string
  type: 'family' | 'verb' | 'noun' | 'phrase' | 'pronoun' | 'question' | 'time' | 'food' | 'emotion' | 'other'
  ttsText: string
}

export type SpeakingDrill = {
  id: string
  instruction: string
  sentence: Sentence
  repeatTarget: number
  usesMic?: boolean
}

export type DailyMission = {
  id: string
  title: string
  instruction: string
}

export type QuizItem = {
  id: string
  type: 'multiple-choice' | 'listen-choice' | 'vi-to-zh'
  question: string
  options?: string[]
  answer: string
}

export type LessonPhase = 'family-life' | 'daily-communication' | 'real-world' | 'self-expression' | 'review'
export type LessonLevel = 'absolute-beginner' | 'beginner'

export type Lesson = {
  id: string
  slug: string
  day: number
  title: string
  phase: LessonPhase
  level: LessonLevel
  goal: string
  situation: string
  coreSentence: Sentence
  sentencePatterns: SentencePattern[]
  dialogue: DialogueLine[]
  vocabulary: VocabularyItem[]
  speakingDrills: SpeakingDrill[]
  dailyMission: DailyMission
  quiz: QuizItem[]
}

// ============================================================
// DỮ LIỆU 10 BÀI HỌC
// ============================================================

export const LESSONS: Lesson[] = [

  // ──────────────────────────────────────────────────────────
  // BÀI 1: Xin chào!
  // ──────────────────────────────────────────────────────────
  {
    id: 'lesson-01',
    slug: 'xin-chao',
    day: 1,
    title: 'Xin chào!',
    phase: 'family-life',
    level: 'absolute-beginner',
    goal: 'Biết chào hỏi buổi sáng, buổi tối và nói "cảm ơn", "tạm biệt"',
    situation: 'Con thức dậy sáng sớm, bước ra phòng khách và gặp ba đang uống cà phê. Hai ba con chào nhau bắt đầu một ngày mới.',
    coreSentence: {
      id: 'cs-01', hanzi: '早上好，爸爸！', pinyin: 'Zǎo shàng hǎo, bàba!',
      vi: 'Buổi sáng tốt lành, ba!', ttsText: '早上好，爸爸！',
    },
    sentencePatterns: [
      {
        id: 'sp-01-1', title: 'Chào theo buổi trong ngày',
        pattern: '[buổi] + 好 (hǎo)',
        explanation: '好 (hǎo) nghĩa là "tốt/tốt lành". Ghép với buổi trong ngày để chào nhau.',
        examples: [
          { id: 'ex-01-1-1', hanzi: '早上好！', pinyin: 'Zǎo shàng hǎo!', vi: 'Buổi sáng tốt lành!', ttsText: '早上好！' },
          { id: 'ex-01-1-2', hanzi: '晚上好！', pinyin: 'Wǎn shàng hǎo!', vi: 'Buổi tối tốt lành!', ttsText: '晚上好！' },
          { id: 'ex-01-1-3', hanzi: '你好！', pinyin: 'Nǐ hǎo!', vi: 'Xin chào! (bất kỳ lúc nào)', ttsText: '你好！' },
        ],
      },
      {
        id: 'sp-01-2', title: 'Cảm ơn và đáp lại',
        pattern: '谢谢 (xièxie) → 不客气 (bú kèqi)',
        explanation: '谢谢 là "cảm ơn". Khi được cảm ơn, trả lời 不客气 — "không có gì / đừng khách sáo".',
        examples: [
          { id: 'ex-01-2-1', hanzi: '谢谢！', pinyin: 'Xièxie!', vi: 'Cảm ơn!', ttsText: '谢谢！' },
          { id: 'ex-01-2-2', hanzi: '不客气！', pinyin: 'Bú kèqi!', vi: 'Không có gì!', ttsText: '不客气！' },
        ],
      },
    ],
    dialogue: [
      { id: 'dl-01-1', role: 'child', hanzi: '爸爸，早上好！', pinyin: 'Bàba, zǎo shàng hǎo!', vi: 'Ba ơi, buổi sáng tốt lành!', ttsText: '爸爸，早上好！' },
      { id: 'dl-01-2', role: 'father', hanzi: '早上好！睡得好吗？', pinyin: 'Zǎo shàng hǎo! Shuì de hǎo ma?', vi: 'Buổi sáng tốt lành! Con ngủ ngon không?', ttsText: '早上好！睡得好吗？' },
      { id: 'dl-01-3', role: 'child', hanzi: '睡得很好，谢谢爸爸！', pinyin: 'Shuì de hěn hǎo, xièxie bàba!', vi: 'Con ngủ rất ngon, cảm ơn ba!', ttsText: '睡得很好，谢谢爸爸！' },
      { id: 'dl-01-4', role: 'father', hanzi: '不客气！来，吃早饭吧。', pinyin: 'Bú kèqi! Lái, chī zǎofàn ba.', vi: 'Không có gì! Nào, ăn sáng đi.', ttsText: '不客气！来，吃早饭吧。' },
      { id: 'dl-01-5', role: 'child', hanzi: '好的！再见！', pinyin: 'Hǎo de! Zàijiàn!', vi: 'Vâng ạ! Tạm biệt!', ttsText: '好的！再见！' },
    ],
    vocabulary: [
      { id: 'v-01-1', hanzi: '早上好', pinyin: 'zǎo shàng hǎo', vi: 'buổi sáng tốt lành', type: 'phrase', ttsText: '早上好' },
      { id: 'v-01-2', hanzi: '晚上好', pinyin: 'wǎn shàng hǎo', vi: 'buổi tối tốt lành', type: 'phrase', ttsText: '晚上好' },
      { id: 'v-01-3', hanzi: '你好', pinyin: 'nǐ hǎo', vi: 'xin chào', type: 'phrase', ttsText: '你好' },
      { id: 'v-01-4', hanzi: '谢谢', pinyin: 'xièxie', vi: 'cảm ơn', type: 'phrase', ttsText: '谢谢' },
      { id: 'v-01-5', hanzi: '不客气', pinyin: 'bú kèqi', vi: 'không có gì', type: 'phrase', ttsText: '不客气' },
      { id: 'v-01-6', hanzi: '再见', pinyin: 'zàijiàn', vi: 'tạm biệt', type: 'phrase', ttsText: '再见' },
      { id: 'v-01-7', hanzi: '爸爸', pinyin: 'bàba', vi: 'ba / bố', type: 'family', ttsText: '爸爸' },
    ],
    speakingDrills: [
      { id: 'sd-01-1', instruction: 'Nghe và đọc to 3 lần — câu chào buổi sáng', sentence: { id: 'sds-01-1', hanzi: '早上好！', pinyin: 'Zǎo shàng hǎo!', vi: 'Buổi sáng tốt lành!', ttsText: '早上好！' }, repeatTarget: 3 },
      { id: 'sd-01-2', instruction: 'Chào ba bằng tên — thêm 爸爸 vào sau', sentence: { id: 'sds-01-2', hanzi: '爸爸，早上好！', pinyin: 'Bàba, zǎo shàng hǎo!', vi: 'Ba ơi, buổi sáng tốt lành!', ttsText: '爸爸，早上好！' }, repeatTarget: 3 },
      { id: 'sd-01-3', instruction: 'Nói cảm ơn tự nhiên nhất có thể', sentence: { id: 'sds-01-3', hanzi: '谢谢你！', pinyin: 'Xièxie nǐ!', vi: 'Cảm ơn bạn!', ttsText: '谢谢你！' }, repeatTarget: 3 },
      { id: 'sd-01-4', instruction: 'Tập nói tạm biệt — thử với giọng thật vui', sentence: { id: 'sds-01-4', hanzi: '再见！', pinyin: 'Zàijiàn!', vi: 'Tạm biệt!', ttsText: '再见！' }, repeatTarget: 3 },
    ],
    dailyMission: {
      id: 'dm-01', title: 'Chào ba buổi sáng bằng tiếng Trung',
      instruction: 'Sáng mai, khi gặp ba (hoặc người thân), hãy nói "早上好！" thay vì chào bằng tiếng Việt. Xem ba có hiểu không!',
    },
    quiz: [
      { id: 'q-01-1', type: 'multiple-choice', question: '"Buổi tối tốt lành" nói thế nào?', options: ['早上好', '你好', '晚上好', '再见'], answer: '晚上好' },
      { id: 'q-01-2', type: 'multiple-choice', question: 'Khi được cảm ơn, bạn đáp lại bằng gì?', options: ['谢谢', '不客气', '再见', '你好'], answer: '不客气' },
      { id: 'q-01-3', type: 'vi-to-zh', question: '"Tạm biệt" viết thế nào bằng tiếng Trung?', options: ['谢谢', '你好', '再见', '早上好'], answer: '再见' },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // BÀI 2: Gia đình tôi
  // ──────────────────────────────────────────────────────────
  {
    id: 'lesson-02',
    slug: 'gia-dinh-toi',
    day: 2,
    title: 'Gia đình tôi',
    phase: 'family-life',
    level: 'absolute-beginner',
    goal: 'Gọi tên các thành viên gia đình và giới thiệu "Đây là... của tôi"',
    situation: 'Ba dẫn con đến gặp bạn. Con muốn giới thiệu ba với mọi người bằng tiếng Trung.',
    coreSentence: {
      id: 'cs-02', hanzi: '这是我的爸爸。', pinyin: 'Zhè shì wǒ de bàba.',
      vi: 'Đây là ba của tôi.', ttsText: '这是我的爸爸。',
    },
    sentencePatterns: [
      {
        id: 'sp-02-1', title: 'Giới thiệu ai đó — 这是... (đây là...)',
        pattern: '这是 + [người/vật]',
        explanation: '这 (zhè) = đây/này. 是 (shì) = là. Dùng để giới thiệu người hoặc vật.',
        examples: [
          { id: 'ex-02-1-1', hanzi: '这是我的妈妈。', pinyin: 'Zhè shì wǒ de māma.', vi: 'Đây là mẹ của tôi.', ttsText: '这是我的妈妈。' },
          { id: 'ex-02-1-2', hanzi: '这是我的哥哥。', pinyin: 'Zhè shì wǒ de gēge.', vi: 'Đây là anh trai của tôi.', ttsText: '这是我的哥哥。' },
        ],
      },
      {
        id: 'sp-02-2', title: 'Sở hữu — 我的 (của tôi)',
        pattern: '我的 + [danh từ]',
        explanation: '的 (de) là từ chỉ sở hữu, giống như "của" trong tiếng Việt. 我的 = của tôi.',
        examples: [
          { id: 'ex-02-2-1', hanzi: '我的家人', pinyin: 'Wǒ de jiārén', vi: 'Gia đình của tôi', ttsText: '我的家人' },
          { id: 'ex-02-2-2', hanzi: '我的妹妹', pinyin: 'Wǒ de mèimei', vi: 'Em gái của tôi', ttsText: '我的妹妹' },
        ],
      },
    ],
    dialogue: [
      { id: 'dl-02-1', role: 'child', hanzi: '这是我的爸爸，这是我的妈妈。', pinyin: 'Zhè shì wǒ de bàba, zhè shì wǒ de māma.', vi: 'Đây là ba của con, đây là mẹ của con.', ttsText: '这是我的爸爸，这是我的妈妈。' },
      { id: 'dl-02-2', role: 'speakerB', hanzi: '你好！你们家有几个人？', pinyin: 'Nǐ hǎo! Nǐmen jiā yǒu jǐ gè rén?', vi: 'Xin chào! Nhà bạn có mấy người?', ttsText: '你好！你们家有几个人？' },
      { id: 'dl-02-3', role: 'child', hanzi: '我们家有四个人：爸爸、妈妈、哥哥和我。', pinyin: 'Wǒmen jiā yǒu sì gè rén: bàba, māma, gēge hé wǒ.', vi: 'Nhà con có bốn người: ba, mẹ, anh và con.', ttsText: '我们家有四个人：爸爸、妈妈、哥哥和我。' },
      { id: 'dl-02-4', role: 'speakerB', hanzi: '哦，你们家真幸福！', pinyin: 'Ō, nǐmen jiā zhēn xìngfú!', vi: 'Ồ, nhà bạn thật hạnh phúc!', ttsText: '哦，你们家真幸福！' },
    ],
    vocabulary: [
      { id: 'v-02-1', hanzi: '爸爸', pinyin: 'bàba', vi: 'ba / bố', type: 'family', ttsText: '爸爸' },
      { id: 'v-02-2', hanzi: '妈妈', pinyin: 'māma', vi: 'mẹ', type: 'family', ttsText: '妈妈' },
      { id: 'v-02-3', hanzi: '哥哥', pinyin: 'gēge', vi: 'anh trai', type: 'family', ttsText: '哥哥' },
      { id: 'v-02-4', hanzi: '姐姐', pinyin: 'jiějie', vi: 'chị gái', type: 'family', ttsText: '姐姐' },
      { id: 'v-02-5', hanzi: '弟弟', pinyin: 'dìdi', vi: 'em trai', type: 'family', ttsText: '弟弟' },
      { id: 'v-02-6', hanzi: '妹妹', pinyin: 'mèimei', vi: 'em gái', type: 'family', ttsText: '妹妹' },
      { id: 'v-02-7', hanzi: '这是', pinyin: 'zhè shì', vi: 'đây là', type: 'phrase', ttsText: '这是' },
      { id: 'v-02-8', hanzi: '我的', pinyin: 'wǒ de', vi: 'của tôi', type: 'pronoun', ttsText: '我的' },
    ],
    speakingDrills: [
      { id: 'sd-02-1', instruction: 'Giới thiệu ba của bạn — nói to và tự tin', sentence: { id: 'sds-02-1', hanzi: '这是我的爸爸。', pinyin: 'Zhè shì wǒ de bàba.', vi: 'Đây là ba của tôi.', ttsText: '这是我的爸爸。' }, repeatTarget: 3 },
      { id: 'sd-02-2', instruction: 'Giới thiệu mẹ — đổi 爸爸 thành 妈妈', sentence: { id: 'sds-02-2', hanzi: '这是我的妈妈。', pinyin: 'Zhè shì wǒ de māma.', vi: 'Đây là mẹ của tôi.', ttsText: '这是我的妈妈。' }, repeatTarget: 3 },
      { id: 'sd-02-3', instruction: 'Thử câu dài hơn — giới thiệu hai người', sentence: { id: 'sds-02-3', hanzi: '这是我的爸爸，这是我的妈妈。', pinyin: 'Zhè shì wǒ de bàba, zhè shì wǒ de māma.', vi: 'Đây là ba, đây là mẹ của tôi.', ttsText: '这是我的爸爸，这是我的妈妈。' }, repeatTarget: 3, usesMic: true },
    ],
    dailyMission: {
      id: 'dm-02', title: 'Giới thiệu ảnh gia đình bằng tiếng Trung',
      instruction: 'Mở ảnh gia đình trên điện thoại, chỉ vào từng người và nói "这是我的..." bằng tiếng Trung. Làm với ba cùng nghe!',
    },
    quiz: [
      { id: 'q-02-1', type: 'multiple-choice', question: '"Mẹ" trong tiếng Trung là gì?', options: ['爸爸', '妈妈', '哥哥', '妹妹'], answer: '妈妈' },
      { id: 'q-02-2', type: 'multiple-choice', question: '"Đây là anh trai của tôi" — câu nào đúng?', options: ['这是我的妹妹', '这是我的哥哥', '这是你的爸爸', '这是我妈妈'], answer: '这是我的哥哥' },
      { id: 'q-02-3', type: 'vi-to-zh', question: '"Em gái" tiếng Trung là?', options: ['姐姐', '妹妹', '弟弟', '哥哥'], answer: '妹妹' },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // BÀI 3: Tôi đang làm gì?
  // ──────────────────────────────────────────────────────────
  {
    id: 'lesson-03',
    slug: 'toi-dang-lam-gi',
    day: 3,
    title: 'Tôi đang làm gì?',
    phase: 'daily-communication',
    level: 'absolute-beginner',
    goal: 'Nói được mình đang làm gì và hỏi người khác đang làm gì',
    situation: 'Ba gọi con từ phòng trong ra. Con đang xem TV. Ba muốn biết con đang làm gì.',
    coreSentence: {
      id: 'cs-03', hanzi: '我在看电视。', pinyin: 'Wǒ zài kàn diànshì.',
      vi: 'Tôi đang xem TV.', ttsText: '我在看电视。',
    },
    sentencePatterns: [
      {
        id: 'sp-03-1', title: 'Đang làm gì — 在 + động từ',
        pattern: '我在 + [động từ]',
        explanation: '在 (zài) trước động từ nghĩa là "đang". Giống như "-ing" trong tiếng Anh.',
        examples: [
          { id: 'ex-03-1-1', hanzi: '我在吃饭。', pinyin: 'Wǒ zài chī fàn.', vi: 'Tôi đang ăn cơm.', ttsText: '我在吃饭。' },
          { id: 'ex-03-1-2', hanzi: '我在做作业。', pinyin: 'Wǒ zài zuò zuòyè.', vi: 'Tôi đang làm bài tập.', ttsText: '我在做作业。' },
        ],
      },
      {
        id: 'sp-03-2', title: 'Hỏi đang làm gì — 你在做什么？',
        pattern: '你在做什么 (nǐ zài zuò shénme)?',
        explanation: '什么 (shénme) = gì/cái gì. Câu hỏi "bạn đang làm gì?" là câu cực kỳ thông dụng.',
        examples: [
          { id: 'ex-03-2-1', hanzi: '你在做什么？', pinyin: 'Nǐ zài zuò shénme?', vi: 'Bạn đang làm gì?', ttsText: '你在做什么？' },
          { id: 'ex-03-2-2', hanzi: '你在看什么？', pinyin: 'Nǐ zài kàn shénme?', vi: 'Bạn đang xem gì?', ttsText: '你在看什么？' },
        ],
      },
    ],
    dialogue: [
      { id: 'dl-03-1', role: 'father', hanzi: '你在做什么？', pinyin: 'Nǐ zài zuò shénme?', vi: 'Con đang làm gì vậy?', ttsText: '你在做什么？' },
      { id: 'dl-03-2', role: 'child', hanzi: '我在看电视。', pinyin: 'Wǒ zài kàn diànshì.', vi: 'Con đang xem TV ạ.', ttsText: '我在看电视。' },
      { id: 'dl-03-3', role: 'father', hanzi: '功课做完了吗？', pinyin: 'Gōngkè zuò wán le ma?', vi: 'Bài tập làm xong chưa?', ttsText: '功课做完了吗？' },
      { id: 'dl-03-4', role: 'child', hanzi: '还没，我待会儿做。', pinyin: 'Hái méi, wǒ dāihuìr zuò.', vi: 'Chưa ạ, con làm lát nữa.', ttsText: '还没，我待会儿做。' },
      { id: 'dl-03-5', role: 'father', hanzi: '好，先吃饭吧。', pinyin: 'Hǎo, xiān chī fàn ba.', vi: 'Ừ, ăn cơm trước đi.', ttsText: '好，先吃饭吧。' },
    ],
    vocabulary: [
      { id: 'v-03-1', hanzi: '在', pinyin: 'zài', vi: 'đang (tiếp diễn)', type: 'verb', ttsText: '在' },
      { id: 'v-03-2', hanzi: '看', pinyin: 'kàn', vi: 'xem / nhìn', type: 'verb', ttsText: '看' },
      { id: 'v-03-3', hanzi: '电视', pinyin: 'diànshì', vi: 'tivi / truyền hình', type: 'noun', ttsText: '电视' },
      { id: 'v-03-4', hanzi: '吃饭', pinyin: 'chī fàn', vi: 'ăn cơm', type: 'verb', ttsText: '吃饭' },
      { id: 'v-03-5', hanzi: '做作业', pinyin: 'zuò zuòyè', vi: 'làm bài tập', type: 'verb', ttsText: '做作业' },
      { id: 'v-03-6', hanzi: '什么', pinyin: 'shénme', vi: 'gì / cái gì', type: 'question', ttsText: '什么' },
    ],
    speakingDrills: [
      { id: 'sd-03-1', instruction: 'Nói bạn đang xem TV', sentence: { id: 'sds-03-1', hanzi: '我在看电视。', pinyin: 'Wǒ zài kàn diànshì.', vi: 'Tôi đang xem TV.', ttsText: '我在看电视。' }, repeatTarget: 3 },
      { id: 'sd-03-2', instruction: 'Nói bạn đang ăn cơm', sentence: { id: 'sds-03-2', hanzi: '我在吃饭。', pinyin: 'Wǒ zài chī fàn.', vi: 'Tôi đang ăn cơm.', ttsText: '我在吃饭。' }, repeatTarget: 3 },
      { id: 'sd-03-3', instruction: 'Hỏi ba đang làm gì — dùng giọng tự nhiên', sentence: { id: 'sds-03-3', hanzi: '爸爸，你在做什么？', pinyin: 'Bàba, nǐ zài zuò shénme?', vi: 'Ba ơi, ba đang làm gì vậy?', ttsText: '爸爸，你在做什么？' }, repeatTarget: 3, usesMic: true },
    ],
    dailyMission: {
      id: 'dm-03', title: 'Thông báo mình đang làm gì bằng tiếng Trung',
      instruction: 'Hôm nay, mỗi khi bắt đầu làm gì (ăn, xem TV, làm bài...), hãy tự thông báo to bằng tiếng Trung. Ví dụ: khi bắt đầu ăn tối, nói "我在吃饭！"',
    },
    quiz: [
      { id: 'q-03-1', type: 'multiple-choice', question: '"Tôi đang làm bài tập" là câu nào?', options: ['我在看电视', '我在吃饭', '我在做作业', '我在喝水'], answer: '我在做作业' },
      { id: 'q-03-2', type: 'vi-to-zh', question: '"Bạn đang làm gì?" tiếng Trung là?', options: ['你好吗？', '你在做什么？', '你吃了吗？', '你去哪里？'], answer: '你在做什么？' },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // BÀI 4: Ăn sáng cùng gia đình
  // ──────────────────────────────────────────────────────────
  {
    id: 'lesson-04',
    slug: 'an-sang-cung-gia-dinh',
    day: 4,
    title: 'Ăn sáng cùng gia đình',
    phase: 'daily-communication',
    level: 'absolute-beginner',
    goal: 'Hỏi và trả lời "muốn ăn gì" — dùng được trong bữa ăn hàng ngày',
    situation: 'Buổi sáng cả gia đình ngồi vào bàn ăn. Ba hỏi mọi người muốn ăn gì hôm nay.',
    coreSentence: {
      id: 'cs-04', hanzi: '你想吃什么？', pinyin: 'Nǐ xiǎng chī shénme?',
      vi: 'Bạn muốn ăn gì?', ttsText: '你想吃什么？',
    },
    sentencePatterns: [
      {
        id: 'sp-04-1', title: 'Muốn làm gì — 想 + động từ',
        pattern: '我想 + [động từ] + [tân ngữ]',
        explanation: '想 (xiǎng) = muốn / nghĩ đến. "Tôi muốn ăn phở" = 我想吃河粉 (Wǒ xiǎng chī hépěn).',
        examples: [
          { id: 'ex-04-1-1', hanzi: '我想喝茶。', pinyin: 'Wǒ xiǎng hē chá.', vi: 'Tôi muốn uống trà.', ttsText: '我想喝茶。' },
          { id: 'ex-04-1-2', hanzi: '我想吃面条。', pinyin: 'Wǒ xiǎng chī miàntiáo.', vi: 'Tôi muốn ăn mì.', ttsText: '我想吃面条。' },
        ],
      },
      {
        id: 'sp-04-2', title: 'Khen đồ ăn ngon — 好吃！',
        pattern: '好 + [tính từ]',
        explanation: '好吃 (hǎo chī) = ngon. 好 kết hợp với nhiều tính từ: 好喝 = ngon (uống), 好看 = đẹp.',
        examples: [
          { id: 'ex-04-2-1', hanzi: '这个很好吃！', pinyin: 'Zhège hěn hǎo chī!', vi: 'Cái này rất ngon!', ttsText: '这个很好吃！' },
          { id: 'ex-04-2-2', hanzi: '妈妈做的菜真好吃！', pinyin: 'Māma zuò de cài zhēn hǎo chī!', vi: 'Món mẹ nấu thật ngon!', ttsText: '妈妈做的菜真好吃！' },
        ],
      },
    ],
    dialogue: [
      { id: 'dl-04-1', role: 'father', hanzi: '早上好！你们想吃什么？', pinyin: 'Zǎo shàng hǎo! Nǐmen xiǎng chī shénme?', vi: 'Buổi sáng tốt lành! Các con muốn ăn gì?', ttsText: '早上好！你们想吃什么？' },
      { id: 'dl-04-2', role: 'child', hanzi: '我想吃面条！', pinyin: 'Wǒ xiǎng chī miàntiáo!', vi: 'Con muốn ăn mì!', ttsText: '我想吃面条！' },
      { id: 'dl-04-3', role: 'older_sibling', hanzi: '我想喝粥。', pinyin: 'Wǒ xiǎng hē zhōu.', vi: 'Anh/Chị muốn ăn cháo.', ttsText: '我想喝粥。' },
      { id: 'dl-04-4', role: 'father', hanzi: '好，我来做。', pinyin: 'Hǎo, wǒ lái zuò.', vi: 'Được, ba làm cho.', ttsText: '好，我来做。' },
      { id: 'dl-04-5', role: 'child', hanzi: '谢谢爸爸！好吃！', pinyin: 'Xièxie bàba! Hǎo chī!', vi: 'Cảm ơn ba! Ngon quá!', ttsText: '谢谢爸爸！好吃！' },
    ],
    vocabulary: [
      { id: 'v-04-1', hanzi: '想', pinyin: 'xiǎng', vi: 'muốn / nghĩ', type: 'verb', ttsText: '想' },
      { id: 'v-04-2', hanzi: '吃', pinyin: 'chī', vi: 'ăn', type: 'verb', ttsText: '吃' },
      { id: 'v-04-3', hanzi: '喝', pinyin: 'hē', vi: 'uống', type: 'verb', ttsText: '喝' },
      { id: 'v-04-4', hanzi: '面条', pinyin: 'miàntiáo', vi: 'mì sợi', type: 'food', ttsText: '面条' },
      { id: 'v-04-5', hanzi: '粥', pinyin: 'zhōu', vi: 'cháo', type: 'food', ttsText: '粥' },
      { id: 'v-04-6', hanzi: '茶', pinyin: 'chá', vi: 'trà', type: 'food', ttsText: '茶' },
      { id: 'v-04-7', hanzi: '好吃', pinyin: 'hǎo chī', vi: 'ngon (ăn)', type: 'phrase', ttsText: '好吃' },
    ],
    speakingDrills: [
      { id: 'sd-04-1', instruction: 'Hỏi ba muốn ăn gì — câu hỏi tự nhiên', sentence: { id: 'sds-04-1', hanzi: '你想吃什么？', pinyin: 'Nǐ xiǎng chī shénme?', vi: 'Bạn muốn ăn gì?', ttsText: '你想吃什么？' }, repeatTarget: 3 },
      { id: 'sd-04-2', instruction: 'Nói bạn muốn ăn mì', sentence: { id: 'sds-04-2', hanzi: '我想吃面条！', pinyin: 'Wǒ xiǎng chī miàntiáo!', vi: 'Tôi muốn ăn mì!', ttsText: '我想吃面条！' }, repeatTarget: 3 },
      { id: 'sd-04-3', instruction: 'Khen ngon to và vui — như đang ăn thật', sentence: { id: 'sds-04-3', hanzi: '真好吃！谢谢爸爸！', pinyin: 'Zhēn hǎo chī! Xièxie bàba!', vi: 'Ngon thật! Cảm ơn ba!', ttsText: '真好吃！谢谢爸爸！' }, repeatTarget: 3, usesMic: true },
    ],
    dailyMission: {
      id: 'dm-04', title: 'Đặt hàng bữa sáng bằng tiếng Trung',
      instruction: 'Buổi sáng, khi ba/mẹ hỏi ăn gì, hãy trả lời bằng tiếng Trung: "我想吃..." và khen ngon sau khi ăn xong: "好吃！"',
    },
    quiz: [
      { id: 'q-04-1', type: 'multiple-choice', question: '"Tôi muốn uống trà" là câu nào?', options: ['我想吃面条', '我想喝茶', '我在喝茶', '我不吃茶'], answer: '我想喝茶' },
      { id: 'q-04-2', type: 'vi-to-zh', question: '"Ngon quá!" tiếng Trung là?', options: ['很漂亮', '好吃', '不客气', '真好喝'], answer: '好吃' },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // BÀI 5: Đi học! Đi làm!
  // ──────────────────────────────────────────────────────────
  {
    id: 'lesson-05',
    slug: 'di-hoc-di-lam',
    day: 5,
    title: 'Đi học! Đi làm!',
    phase: 'daily-communication',
    level: 'absolute-beginner',
    goal: 'Nói "Con đi học đây / Ba đi làm đây" và chào tạm biệt trước khi ra ngoài',
    situation: 'Buổi sáng, mọi người tất bật chuẩn bị. Con xách cặp chạy ra cửa, chào ba trước khi đi.',
    coreSentence: {
      id: 'cs-05', hanzi: '爸爸，我上学去了！', pinyin: 'Bàba, wǒ shàng xué qù le!',
      vi: 'Ba ơi, con đi học đây!', ttsText: '爸爸，我上学去了！',
    },
    sentencePatterns: [
      {
        id: 'sp-05-1', title: 'Báo hiệu sắp rời đi — 去了 (đi rồi/đây)',
        pattern: '我 + [nơi chốn/hành động] + 去了',
        explanation: '去了 ở cuối câu báo hiệu bạn sắp đi hoặc vừa đi. Rất thông dụng khi ra khỏi nhà.',
        examples: [
          { id: 'ex-05-1-1', hanzi: '我上班去了！', pinyin: 'Wǒ shàng bān qù le!', vi: 'Tôi đi làm đây!', ttsText: '我上班去了！' },
          { id: 'ex-05-1-2', hanzi: '我出去了！', pinyin: 'Wǒ chū qù le!', vi: 'Tôi ra ngoài đây!', ttsText: '我出去了！' },
        ],
      },
      {
        id: 'sp-05-2', title: 'Chúc nhau đi đường bình an',
        pattern: '路上小心 (lù shàng xiǎo xīn)',
        explanation: '路上 = trên đường. 小心 = cẩn thận. Câu chào rất thân thiện khi tiễn người đi.',
        examples: [
          { id: 'ex-05-2-1', hanzi: '路上小心！', pinyin: 'Lù shàng xiǎo xīn!', vi: 'Đi đường cẩn thận!', ttsText: '路上小心！' },
          { id: 'ex-05-2-2', hanzi: '早点回来！', pinyin: 'Zǎo diǎn huí lái!', vi: 'Về sớm nhé!', ttsText: '早点回来！' },
        ],
      },
    ],
    dialogue: [
      { id: 'dl-05-1', role: 'child', hanzi: '爸爸，我上学去了！', pinyin: 'Bàba, wǒ shàng xué qù le!', vi: 'Ba ơi, con đi học đây!', ttsText: '爸爸，我上学去了！' },
      { id: 'dl-05-2', role: 'father', hanzi: '好，路上小心！', pinyin: 'Hǎo, lù shàng xiǎo xīn!', vi: 'Ừ, đi đường cẩn thận nhé!', ttsText: '好，路上小心！' },
      { id: 'dl-05-3', role: 'child', hanzi: '爸爸今天上班吗？', pinyin: 'Bàba jīntiān shàng bān ma?', vi: 'Ba hôm nay đi làm không ạ?', ttsText: '爸爸今天上班吗？' },
      { id: 'dl-05-4', role: 'father', hanzi: '对，我也要去上班了。', pinyin: 'Duì, wǒ yě yào qù shàng bān le.', vi: 'Đúng vậy, ba cũng sắp đi làm.', ttsText: '对，我也要去上班了。' },
      { id: 'dl-05-5', role: 'child', hanzi: '爸爸也路上小心！再见！', pinyin: 'Bàba yě lù shàng xiǎo xīn! Zàijiàn!', vi: 'Ba cũng đi đường cẩn thận nhé! Tạm biệt!', ttsText: '爸爸也路上小心！再见！' },
    ],
    vocabulary: [
      { id: 'v-05-1', hanzi: '上学', pinyin: 'shàng xué', vi: 'đi học', type: 'verb', ttsText: '上学' },
      { id: 'v-05-2', hanzi: '上班', pinyin: 'shàng bān', vi: 'đi làm', type: 'verb', ttsText: '上班' },
      { id: 'v-05-3', hanzi: '去了', pinyin: 'qù le', vi: 'đi rồi / đây (báo hiệu)', type: 'phrase', ttsText: '去了' },
      { id: 'v-05-4', hanzi: '路上小心', pinyin: 'lù shàng xiǎo xīn', vi: 'đi đường cẩn thận', type: 'phrase', ttsText: '路上小心' },
      { id: 'v-05-5', hanzi: '今天', pinyin: 'jīntiān', vi: 'hôm nay', type: 'time', ttsText: '今天' },
      { id: 'v-05-6', hanzi: '也', pinyin: 'yě', vi: 'cũng', type: 'other', ttsText: '也' },
    ],
    speakingDrills: [
      { id: 'sd-05-1', instruction: 'Báo ba bạn đi học — nói to như thật sự ra cửa', sentence: { id: 'sds-05-1', hanzi: '爸爸，我上学去了！', pinyin: 'Bàba, wǒ shàng xué qù le!', vi: 'Ba ơi, con đi học đây!', ttsText: '爸爸，我上学去了！' }, repeatTarget: 3 },
      { id: 'sd-05-2', instruction: 'Chúc ba đi đường cẩn thận', sentence: { id: 'sds-05-2', hanzi: '路上小心！', pinyin: 'Lù shàng xiǎo xīn!', vi: 'Đi đường cẩn thận!', ttsText: '路上小心！' }, repeatTarget: 3 },
      { id: 'sd-05-3', instruction: 'Đóng vai: Bạn là ba, tiễn con đi học', sentence: { id: 'sds-05-3', hanzi: '好，路上小心！早点回来！', pinyin: 'Hǎo, lù shàng xiǎo xīn! Zǎo diǎn huí lái!', vi: 'Ừ, đi đường cẩn thận! Về sớm nhé!', ttsText: '好，路上小心！早点回来！' }, repeatTarget: 3, usesMic: true },
    ],
    dailyMission: {
      id: 'dm-05', title: 'Nói câu tiễn người đi mỗi buổi sáng',
      instruction: 'Sáng mai, khi ba hoặc ai đó ra khỏi nhà, hãy nói "路上小心！" — thay vì chỉ vẫy tay. Xem phản ứng của họ!',
    },
    quiz: [
      { id: 'q-05-1', type: 'multiple-choice', question: '"Con đi học đây!" tiếng Trung là?', options: ['我上学了！', '我上学去了！', '我去学校！', '我在上学！'], answer: '我上学去了！' },
      { id: 'q-05-2', type: 'vi-to-zh', question: '"Đi đường cẩn thận" là?', options: ['再见', '你好', '路上小心', '早点回来'], answer: '路上小心' },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // BÀI 6: Hôm nay thế nào?
  // ──────────────────────────────────────────────────────────
  {
    id: 'lesson-06',
    slug: 'hom-nay-the-nao',
    day: 6,
    title: 'Hôm nay thế nào?',
    phase: 'daily-communication',
    level: 'absolute-beginner',
    goal: 'Hỏi thăm và chia sẻ cảm nhận về ngày hôm nay',
    situation: 'Con vừa tan học về nhà. Ba đang ngồi chờ, hỏi thăm con hôm nay ở trường như thế nào.',
    coreSentence: {
      id: 'cs-06', hanzi: '今天学校怎么样？', pinyin: 'Jīntiān xuéxiào zěnmeyàng?',
      vi: 'Hôm nay ở trường thế nào?', ttsText: '今天学校怎么样？',
    },
    sentencePatterns: [
      {
        id: 'sp-06-1', title: 'Hỏi cảm nhận — ...怎么样？',
        pattern: '[chủ đề] + 怎么样？',
        explanation: '怎么样 (zěnmeyàng) = thế nào / như thế nào. Dùng để hỏi cảm nhận, nhận xét.',
        examples: [
          { id: 'ex-06-1-1', hanzi: '今天怎么样？', pinyin: 'Jīntiān zěnmeyàng?', vi: 'Hôm nay thế nào?', ttsText: '今天怎么样？' },
          { id: 'ex-06-1-2', hanzi: '饭怎么样？', pinyin: 'Fàn zěnmeyàng?', vi: 'Cơm ăn thấy thế nào?', ttsText: '饭怎么样？' },
        ],
      },
      {
        id: 'sp-06-2', title: 'Diễn đạt mức độ — 很/还/有点',
        pattern: '很好 / 还好 / 有点累',
        explanation: '很 (hěn) = rất. 还好 (hái hǎo) = tạm ổn. 有点 (yǒudiǎn) = hơi/một chút.',
        examples: [
          { id: 'ex-06-2-1', hanzi: '今天很开心！', pinyin: 'Jīntiān hěn kāixīn!', vi: 'Hôm nay rất vui!', ttsText: '今天很开心！' },
          { id: 'ex-06-2-2', hanzi: '我有点累。', pinyin: 'Wǒ yǒudiǎn lèi.', vi: 'Tôi hơi mệt.', ttsText: '我有点累。' },
        ],
      },
    ],
    dialogue: [
      { id: 'dl-06-1', role: 'father', hanzi: '回来了！今天学校怎么样？', pinyin: 'Huí lái le! Jīntiān xuéxiào zěnmeyàng?', vi: 'Về rồi! Hôm nay ở trường thế nào?', ttsText: '回来了！今天学校怎么样？' },
      { id: 'dl-06-2', role: 'child', hanzi: '还好，不过有点累。', pinyin: 'Hái hǎo, búguò yǒudiǎn lèi.', vi: 'Tạm ổn ạ, nhưng hơi mệt.', ttsText: '还好，不过有点累。' },
      { id: 'dl-06-3', role: 'father', hanzi: '今天学了什么？', pinyin: 'Jīntiān xué le shénme?', vi: 'Hôm nay học gì vậy?', ttsText: '今天学了什么？' },
      { id: 'dl-06-4', role: 'child', hanzi: '学了数学和英语，还有体育课，很好玩！', pinyin: 'Xué le shùxué hé yīngyǔ, hái yǒu tǐyù kè, hěn hǎo wán!', vi: 'Học toán và tiếng Anh, còn có thể dục, vui lắm!', ttsText: '学了数学和英语，还有体育课，很好玩！' },
      { id: 'dl-06-5', role: 'father', hanzi: '太好了！先休息一下吧。', pinyin: 'Tài hǎo le! Xiān xiūxi yīxià ba.', vi: 'Tuyệt! Nghỉ ngơi tí đi.', ttsText: '太好了！先休息一下吧。' },
    ],
    vocabulary: [
      { id: 'v-06-1', hanzi: '今天', pinyin: 'jīntiān', vi: 'hôm nay', type: 'time', ttsText: '今天' },
      { id: 'v-06-2', hanzi: '怎么样', pinyin: 'zěnmeyàng', vi: 'thế nào', type: 'question', ttsText: '怎么样' },
      { id: 'v-06-3', hanzi: '很好', pinyin: 'hěn hǎo', vi: 'rất tốt', type: 'phrase', ttsText: '很好' },
      { id: 'v-06-4', hanzi: '还好', pinyin: 'hái hǎo', vi: 'tạm ổn', type: 'phrase', ttsText: '还好' },
      { id: 'v-06-5', hanzi: '有点累', pinyin: 'yǒudiǎn lèi', vi: 'hơi mệt', type: 'phrase', ttsText: '有点累' },
      { id: 'v-06-6', hanzi: '开心', pinyin: 'kāixīn', vi: 'vui / vui vẻ', type: 'emotion', ttsText: '开心' },
    ],
    speakingDrills: [
      { id: 'sd-06-1', instruction: 'Hỏi thăm con/ba hôm nay thế nào', sentence: { id: 'sds-06-1', hanzi: '今天怎么样？', pinyin: 'Jīntiān zěnmeyàng?', vi: 'Hôm nay thế nào?', ttsText: '今天怎么样？' }, repeatTarget: 3 },
      { id: 'sd-06-2', instruction: 'Trả lời: tạm ổn, hơi mệt', sentence: { id: 'sds-06-2', hanzi: '还好，有点累。', pinyin: 'Hái hǎo, yǒudiǎn lèi.', vi: 'Tạm ổn, hơi mệt.', ttsText: '还好，有点累。' }, repeatTarget: 3 },
      { id: 'sd-06-3', instruction: 'Trả lời vui vẻ: hôm nay rất vui!', sentence: { id: 'sds-06-3', hanzi: '今天很开心！', pinyin: 'Jīntiān hěn kāixīn!', vi: 'Hôm nay rất vui!', ttsText: '今天很开心！' }, repeatTarget: 3, usesMic: true },
    ],
    dailyMission: {
      id: 'dm-06', title: 'Hỏi thăm nhau buổi tối',
      instruction: 'Tối nay, sau bữa cơm, hỏi ba (hoặc con) bằng tiếng Trung: "今天怎么样？" và cố gắng trả lời bằng tiếng Trung luôn.',
    },
    quiz: [
      { id: 'q-06-1', type: 'multiple-choice', question: '"Hôm nay thế nào?" tiếng Trung là?', options: ['你好吗？', '今天学校怎么样？', '你在做什么？', '你吃了吗？'], answer: '今天学校怎么样？' },
      { id: 'q-06-2', type: 'vi-to-zh', question: '"Hơi mệt" tiếng Trung là?', options: ['很好', '还好', '有点累', '太累了'], answer: '有点累' },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // BÀI 7: Tôi thích...
  // ──────────────────────────────────────────────────────────
  {
    id: 'lesson-07',
    slug: 'toi-thich',
    day: 7,
    title: 'Tôi thích...',
    phase: 'self-expression',
    level: 'absolute-beginner',
    goal: 'Nói được sở thích cá nhân và hỏi người khác thích gì',
    situation: 'Cả gia đình đang nói chuyện về món ăn yêu thích. Ai cũng muốn nói sở thích của mình.',
    coreSentence: {
      id: 'cs-07', hanzi: '我喜欢吃火锅！', pinyin: 'Wǒ xǐhuān chī huǒguō!',
      vi: 'Tôi thích ăn lẩu!', ttsText: '我喜欢吃火锅！',
    },
    sentencePatterns: [
      {
        id: 'sp-07-1', title: 'Diễn đạt sở thích — 喜欢 + động từ/danh từ',
        pattern: '我喜欢 + [điều thích]',
        explanation: '喜欢 (xǐhuān) = thích. Dùng được với cả động từ (thích làm gì) và danh từ (thích cái gì).',
        examples: [
          { id: 'ex-07-1-1', hanzi: '我喜欢看电影。', pinyin: 'Wǒ xǐhuān kàn diànyǐng.', vi: 'Tôi thích xem phim.', ttsText: '我喜欢看电影。' },
          { id: 'ex-07-1-2', hanzi: '我喜欢打篮球。', pinyin: 'Wǒ xǐhuān dǎ lánqiú.', vi: 'Tôi thích chơi bóng rổ.', ttsText: '我喜欢打篮球。' },
        ],
      },
      {
        id: 'sp-07-2', title: 'Hỏi lại — 你呢？(còn bạn thì sao?)',
        pattern: '[câu trả lời của tôi]. 你呢？',
        explanation: '你呢 (nǐ ne) = còn bạn thì sao? Rất tự nhiên và thân thiện để hỏi ngược lại.',
        examples: [
          { id: 'ex-07-2-1', hanzi: '我喜欢火锅。你呢？', pinyin: 'Wǒ xǐhuān huǒguō. Nǐ ne?', vi: 'Tôi thích lẩu. Còn bạn?', ttsText: '我喜欢火锅。你呢？' },
          { id: 'ex-07-2-2', hanzi: '我不太喜欢。你呢？', pinyin: 'Wǒ bú tài xǐhuān. Nǐ ne?', vi: 'Tôi không thích lắm. Còn bạn?', ttsText: '我不太喜欢。你呢？' },
        ],
      },
    ],
    dialogue: [
      { id: 'dl-07-1', role: 'father', hanzi: '你们最喜欢吃什么？', pinyin: 'Nǐmen zuì xǐhuān chī shénme?', vi: 'Các con thích ăn gì nhất?', ttsText: '你们最喜欢吃什么？' },
      { id: 'dl-07-2', role: 'child', hanzi: '我最喜欢吃火锅！你呢，爸爸？', pinyin: 'Wǒ zuì xǐhuān chī huǒguō! Nǐ ne, bàba?', vi: 'Con thích ăn lẩu nhất! Còn ba?', ttsText: '我最喜欢吃火锅！你呢，爸爸？' },
      { id: 'dl-07-3', role: 'father', hanzi: '我喜欢吃饺子。你们知道吗？', pinyin: 'Wǒ xǐhuān chī jiǎozi. Nǐmen zhīdào ma?', vi: 'Ba thích ăn sủi cảo. Các con có biết không?', ttsText: '我喜欢吃饺子。你们知道吗？' },
      { id: 'dl-07-4', role: 'older_sibling', hanzi: '我也喜欢饺子！下次我们一起做吧！', pinyin: 'Wǒ yě xǐhuān jiǎozi! Xià cì wǒmen yīqǐ zuò ba!', vi: 'Con cũng thích sủi cảo! Lần sau mình cùng làm nhé!', ttsText: '我也喜欢饺子！下次我们一起做吧！' },
      { id: 'dl-07-5', role: 'father', hanzi: '好主意！', pinyin: 'Hǎo zhǔyi!', vi: 'Ý kiến hay đấy!', ttsText: '好主意！' },
    ],
    vocabulary: [
      { id: 'v-07-1', hanzi: '喜欢', pinyin: 'xǐhuān', vi: 'thích', type: 'verb', ttsText: '喜欢' },
      { id: 'v-07-2', hanzi: '不喜欢', pinyin: 'bù xǐhuān', vi: 'không thích', type: 'phrase', ttsText: '不喜欢' },
      { id: 'v-07-3', hanzi: '最', pinyin: 'zuì', vi: 'nhất (mức độ cao nhất)', type: 'other', ttsText: '最' },
      { id: 'v-07-4', hanzi: '火锅', pinyin: 'huǒguō', vi: 'lẩu', type: 'food', ttsText: '火锅' },
      { id: 'v-07-5', hanzi: '饺子', pinyin: 'jiǎozi', vi: 'sủi cảo / bánh chẻo', type: 'food', ttsText: '饺子' },
      { id: 'v-07-6', hanzi: '你呢', pinyin: 'nǐ ne', vi: 'còn bạn?', type: 'phrase', ttsText: '你呢' },
    ],
    speakingDrills: [
      { id: 'sd-07-1', instruction: 'Nói món bạn thích nhất — hét to cho vui', sentence: { id: 'sds-07-1', hanzi: '我最喜欢吃火锅！', pinyin: 'Wǒ zuì xǐhuān chī huǒguō!', vi: 'Tôi thích ăn lẩu nhất!', ttsText: '我最喜欢吃火锅！' }, repeatTarget: 3 },
      { id: 'sd-07-2', instruction: 'Nói và hỏi ngược lại — thêm 你呢？', sentence: { id: 'sds-07-2', hanzi: '我喜欢吃饺子。你呢？', pinyin: 'Wǒ xǐhuān chī jiǎozi. Nǐ ne?', vi: 'Tôi thích ăn sủi cảo. Còn bạn?', ttsText: '我喜欢吃饺子。你呢？' }, repeatTarget: 3, usesMic: true },
    ],
    dailyMission: {
      id: 'dm-07', title: 'Hỏi sở thích của nhau',
      instruction: 'Tối nay, hỏi từng người trong gia đình: "你最喜欢吃什么？" và xem mọi người trả lời gì. Cố gắng tổng kết bằng tiếng Trung!',
    },
    quiz: [
      { id: 'q-07-1', type: 'multiple-choice', question: '"Tôi thích xem phim" là câu nào?', options: ['我在看电影', '我喜欢看电影', '我想看电影', '我不看电影'], answer: '我喜欢看电影' },
      { id: 'q-07-2', type: 'vi-to-zh', question: '"Còn bạn?" tiếng Trung là?', options: ['你好吗', '你呢', '你是谁', '你怎么样'], answer: '你呢' },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // BÀI 8: Cuối tuần đi đâu?
  // ──────────────────────────────────────────────────────────
  {
    id: 'lesson-08',
    slug: 'cuoi-tuan-di-dau',
    day: 8,
    title: 'Cuối tuần đi đâu?',
    phase: 'real-world',
    level: 'beginner',
    goal: 'Lên kế hoạch đi chơi cuối tuần — đề xuất, đồng ý, phân công',
    situation: 'Tối thứ Sáu, cả gia đình ngồi lại lên kế hoạch cho cuối tuần. Ai cũng có ý kiến riêng.',
    coreSentence: {
      id: 'cs-08', hanzi: '周末我们去公园吧！', pinyin: 'Zhōumò wǒmen qù gōngyuán ba!',
      vi: 'Cuối tuần chúng ta đi công viên nhé!', ttsText: '周末我们去公园吧！',
    },
    sentencePatterns: [
      {
        id: 'sp-08-1', title: 'Rủ nhau cùng làm — 我们...吧！',
        pattern: '我们 + [hành động] + 吧！',
        explanation: '吧 (ba) ở cuối câu mang tính đề nghị/rủ rê, giống "nhé" trong tiếng Việt.',
        examples: [
          { id: 'ex-08-1-1', hanzi: '我们一起去吧！', pinyin: 'Wǒmen yīqǐ qù ba!', vi: 'Chúng ta cùng đi nhé!', ttsText: '我们一起去吧！' },
          { id: 'ex-08-1-2', hanzi: '我们吃火锅吧！', pinyin: 'Wǒmen chī huǒguō ba!', vi: 'Mình ăn lẩu nhé!', ttsText: '我们吃火锅吧！' },
        ],
      },
      {
        id: 'sp-08-2', title: 'Đồng ý và khen ý kiến — 好啊！/ 好主意！',
        pattern: '好啊！ / 好主意！',
        explanation: '好啊 (hǎo a) = được/hay đấy. 好主意 (hǎo zhǔyi) = ý kiến hay. Cả hai đều biểu hiện sự đồng ý vui vẻ.',
        examples: [
          { id: 'ex-08-2-1', hanzi: '好啊！我也想去！', pinyin: 'Hǎo a! Wǒ yě xiǎng qù!', vi: 'Hay đấy! Tôi cũng muốn đi!', ttsText: '好啊！我也想去！' },
          { id: 'ex-08-2-2', hanzi: '好主意！我们走吧！', pinyin: 'Hǎo zhǔyi! Wǒmen zǒu ba!', vi: 'Ý kiến hay! Đi thôi!', ttsText: '好主意！我们走吧！' },
        ],
      },
    ],
    dialogue: [
      { id: 'dl-08-1', role: 'child', hanzi: '爸爸，周末我们去哪儿？', pinyin: 'Bàba, zhōumò wǒmen qù nǎr?', vi: 'Ba ơi, cuối tuần chúng ta đi đâu?', ttsText: '爸爸，周末我们去哪儿？' },
      { id: 'dl-08-2', role: 'father', hanzi: '你想去哪儿？', pinyin: 'Nǐ xiǎng qù nǎr?', vi: 'Con muốn đi đâu?', ttsText: '你想去哪儿？' },
      { id: 'dl-08-3', role: 'child', hanzi: '我想去公园！我们去公园吧！', pinyin: 'Wǒ xiǎng qù gōngyuán! Wǒmen qù gōngyuán ba!', vi: 'Con muốn đi công viên! Mình đi công viên nhé!', ttsText: '我想去公园！我们去公园吧！' },
      { id: 'dl-08-4', role: 'older_sibling', hanzi: '好主意！我也想去！', pinyin: 'Hǎo zhǔyi! Wǒ yě xiǎng qù!', vi: 'Ý kiến hay! Anh/Chị cũng muốn đi!', ttsText: '好主意！我也想去！' },
      { id: 'dl-08-5', role: 'father', hanzi: '好啊！明天早上我们一起去！', pinyin: 'Hǎo a! Míngtiān zǎoshàng wǒmen yīqǐ qù!', vi: 'Hay đấy! Sáng mai chúng ta cùng đi!', ttsText: '好啊！明天早上我们一起去！' },
    ],
    vocabulary: [
      { id: 'v-08-1', hanzi: '周末', pinyin: 'zhōumò', vi: 'cuối tuần', type: 'time', ttsText: '周末' },
      { id: 'v-08-2', hanzi: '公园', pinyin: 'gōngyuán', vi: 'công viên', type: 'noun', ttsText: '公园' },
      { id: 'v-08-3', hanzi: '哪儿', pinyin: 'nǎr', vi: 'ở đâu / đi đâu', type: 'question', ttsText: '哪儿' },
      { id: 'v-08-4', hanzi: '一起', pinyin: 'yīqǐ', vi: 'cùng nhau', type: 'other', ttsText: '一起' },
      { id: 'v-08-5', hanzi: '好啊', pinyin: 'hǎo a', vi: 'hay đấy / được', type: 'phrase', ttsText: '好啊' },
      { id: 'v-08-6', hanzi: '好主意', pinyin: 'hǎo zhǔyi', vi: 'ý kiến hay', type: 'phrase', ttsText: '好主意' },
      { id: 'v-08-7', hanzi: '明天', pinyin: 'míngtiān', vi: 'ngày mai', type: 'time', ttsText: '明天' },
    ],
    speakingDrills: [
      { id: 'sd-08-1', instruction: 'Rủ cả nhà đi công viên — thật hào hứng!', sentence: { id: 'sds-08-1', hanzi: '周末我们去公园吧！', pinyin: 'Zhōumò wǒmen qù gōngyuán ba!', vi: 'Cuối tuần chúng ta đi công viên nhé!', ttsText: '周末我们去公园吧！' }, repeatTarget: 3 },
      { id: 'sd-08-2', instruction: 'Đáp lại với giọng phấn khích', sentence: { id: 'sds-08-2', hanzi: '好主意！我也想去！', pinyin: 'Hǎo zhǔyi! Wǒ yě xiǎng qù!', vi: 'Ý kiến hay! Tôi cũng muốn đi!', ttsText: '好主意！我也想去！' }, repeatTarget: 3, usesMic: true },
    ],
    dailyMission: {
      id: 'dm-08', title: 'Lên kế hoạch cuối tuần bằng tiếng Trung',
      instruction: 'Rủ người thân đi chơi cuối tuần bằng tiếng Trung: "周末我们去___吧！" (điền vào chỗ trống: 公园, 超市, 餐厅...)',
    },
    quiz: [
      { id: 'q-08-1', type: 'multiple-choice', question: '"Cuối tuần" tiếng Trung là?', options: ['今天', '明天', '周末', '昨天'], answer: '周末' },
      { id: 'q-08-2', type: 'vi-to-zh', question: '"Ý kiến hay!" tiếng Trung là?', options: ['好啊', '好主意', '不客气', '没问题'], answer: '好主意' },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // BÀI 9: Cảm ơn & Xin lỗi
  // ──────────────────────────────────────────────────────────
  {
    id: 'lesson-09',
    slug: 'cam-on-xin-loi',
    day: 9,
    title: 'Cảm ơn & Xin lỗi',
    phase: 'real-world',
    level: 'beginner',
    goal: 'Biết cảm ơn, xin lỗi và nhờ giúp đỡ một cách tự nhiên',
    situation: 'Con đang làm bài khó, nhờ ba giúp. Ba giúp xong, hai cha con trao đổi ân tình.',
    coreSentence: {
      id: 'cs-09', hanzi: '谢谢你帮我，爸爸！', pinyin: 'Xièxie nǐ bāng wǒ, bàba!',
      vi: 'Cảm ơn ba đã giúp con!', ttsText: '谢谢你帮我，爸爸！',
    },
    sentencePatterns: [
      {
        id: 'sp-09-1', title: 'Nhờ giúp đỡ lịch sự — 请帮我... (làm ơn giúp tôi...)',
        pattern: '请 + [yêu cầu]',
        explanation: '请 (qǐng) = xin / làm ơn. Đặt đầu câu để lịch sự hơn. 请帮我 = làm ơn giúp tôi.',
        examples: [
          { id: 'ex-09-1-1', hanzi: '请帮我看一下。', pinyin: 'Qǐng bāng wǒ kàn yīxià.', vi: 'Làm ơn xem giúp tôi một chút.', ttsText: '请帮我看一下。' },
          { id: 'ex-09-1-2', hanzi: '请等一下。', pinyin: 'Qǐng děng yīxià.', vi: 'Xin chờ một chút.', ttsText: '请等一下。' },
        ],
      },
      {
        id: 'sp-09-2', title: 'Xin lỗi và tha thứ',
        pattern: '对不起 → 没关系',
        explanation: '对不起 (duìbuqǐ) = xin lỗi. 没关系 (méi guānxi) = không sao / không có gì.',
        examples: [
          { id: 'ex-09-2-1', hanzi: '对不起，我来晚了。', pinyin: 'Duìbuqǐ, wǒ lái wǎn le.', vi: 'Xin lỗi, tôi đến trễ.', ttsText: '对不起，我来晚了。' },
          { id: 'ex-09-2-2', hanzi: '没关系，没事的。', pinyin: 'Méi guānxi, méi shì de.', vi: 'Không sao, không có gì cả.', ttsText: '没关系，没事的。' },
        ],
      },
    ],
    dialogue: [
      { id: 'dl-09-1', role: 'child', hanzi: '爸爸，你可以帮我吗？这道题我不会。', pinyin: 'Bàba, nǐ kěyǐ bāng wǒ ma? Zhè dào tí wǒ bú huì.', vi: 'Ba ơi, ba có thể giúp con không? Con không biết làm bài này.', ttsText: '爸爸，你可以帮我吗？这道题我不会。' },
      { id: 'dl-09-2', role: 'father', hanzi: '当然可以！来，我看看。', pinyin: 'Dāngrán kěyǐ! Lái, wǒ kànkan.', vi: 'Tất nhiên rồi! Nào, ba xem nào.', ttsText: '当然可以！来，我看看。' },
      { id: 'dl-09-3', role: 'child', hanzi: '哦，我明白了！谢谢你帮我，爸爸！', pinyin: 'Ō, wǒ míngbái le! Xièxie nǐ bāng wǒ, bàba!', vi: 'Ồ, con hiểu rồi! Cảm ơn ba đã giúp con!', ttsText: '哦，我明白了！谢谢你帮我，爸爸！' },
      { id: 'dl-09-4', role: 'father', hanzi: '不客气！有问题随时来找我。', pinyin: 'Bú kèqi! Yǒu wèntí suíshí lái zhǎo wǒ.', vi: 'Không có gì! Có vấn đề gì cứ tìm ba nhé.', ttsText: '不客气！有问题随时来找我。' },
    ],
    vocabulary: [
      { id: 'v-09-1', hanzi: '谢谢', pinyin: 'xièxie', vi: 'cảm ơn', type: 'phrase', ttsText: '谢谢' },
      { id: 'v-09-2', hanzi: '帮', pinyin: 'bāng', vi: 'giúp / hỗ trợ', type: 'verb', ttsText: '帮' },
      { id: 'v-09-3', hanzi: '请', pinyin: 'qǐng', vi: 'xin / làm ơn / mời', type: 'other', ttsText: '请' },
      { id: 'v-09-4', hanzi: '对不起', pinyin: 'duìbuqǐ', vi: 'xin lỗi', type: 'phrase', ttsText: '对不起' },
      { id: 'v-09-5', hanzi: '没关系', pinyin: 'méi guānxi', vi: 'không sao', type: 'phrase', ttsText: '没关系' },
      { id: 'v-09-6', hanzi: '可以', pinyin: 'kěyǐ', vi: 'có thể / được', type: 'verb', ttsText: '可以' },
    ],
    speakingDrills: [
      { id: 'sd-09-1', instruction: 'Xin lỗi ba một cách thật lòng', sentence: { id: 'sds-09-1', hanzi: '爸爸，对不起！', pinyin: 'Bàba, duìbuqǐ!', vi: 'Ba ơi, xin lỗi ba!', ttsText: '爸爸，对不起！' }, repeatTarget: 3 },
      { id: 'sd-09-2', instruction: 'Tha thứ và an ủi nhẹ nhàng', sentence: { id: 'sds-09-2', hanzi: '没关系，没事的。', pinyin: 'Méi guānxi, méi shì de.', vi: 'Không sao, không có gì cả.', ttsText: '没关系，没事的。' }, repeatTarget: 3 },
      { id: 'sd-09-3', instruction: 'Cảm ơn ba đã giúp — thật cảm xúc', sentence: { id: 'sds-09-3', hanzi: '谢谢你帮我，爸爸！', pinyin: 'Xièxie nǐ bāng wǒ, bàba!', vi: 'Cảm ơn ba đã giúp con!', ttsText: '谢谢你帮我，爸爸！' }, repeatTarget: 3, usesMic: true },
    ],
    dailyMission: {
      id: 'dm-09', title: 'Nói xin lỗi hoặc cảm ơn bằng tiếng Trung hôm nay',
      instruction: 'Hôm nay, ít nhất một lần nói 谢谢 hoặc 对不起 với người thân bằng tiếng Trung. Nhỏ thôi nhưng có giá trị!',
    },
    quiz: [
      { id: 'q-09-1', type: 'multiple-choice', question: '"Không sao / không có gì" tiếng Trung là?', options: ['对不起', '谢谢', '没关系', '不客气'], answer: '没关系' },
      { id: 'q-09-2', type: 'vi-to-zh', question: '"Xin lỗi" tiếng Trung là?', options: ['谢谢', '没关系', '对不起', '请'], answer: '对不起' },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // BÀI 10: Tôi muốn mua...
  // ──────────────────────────────────────────────────────────
  {
    id: 'lesson-10',
    slug: 'toi-muon-mua',
    day: 10,
    title: 'Tôi muốn mua...',
    phase: 'real-world',
    level: 'beginner',
    goal: 'Hỏi giá, nói muốn mua gì khi đi siêu thị hoặc cửa hàng',
    situation: 'Cuối tuần, cả nhà đi siêu thị. Con muốn mua một thứ nhưng không biết giá. Con hỏi người bán bằng tiếng Trung.',
    coreSentence: {
      id: 'cs-10', hanzi: '这个多少钱？', pinyin: 'Zhège duōshǎo qián?',
      vi: 'Cái này bao nhiêu tiền?', ttsText: '这个多少钱？',
    },
    sentencePatterns: [
      {
        id: 'sp-10-1', title: 'Hỏi giá — 多少钱？',
        pattern: '[thứ muốn mua] + 多少钱？',
        explanation: '多少 (duōshǎo) = bao nhiêu. 钱 (qián) = tiền. Cặp từ siêu quan trọng khi mua sắm.',
        examples: [
          { id: 'ex-10-1-1', hanzi: '那个多少钱？', pinyin: 'Nàge duōshǎo qián?', vi: 'Cái đó bao nhiêu tiền?', ttsText: '那个多少钱？' },
          { id: 'ex-10-1-2', hanzi: '一共多少钱？', pinyin: 'Yīgòng duōshǎo qián?', vi: 'Tổng cộng bao nhiêu tiền?', ttsText: '一共多少钱？' },
        ],
      },
      {
        id: 'sp-10-2', title: 'Nói muốn mua — 我要买...',
        pattern: '我要买 + [thứ muốn mua]',
        explanation: '要 (yào) = muốn / sẽ. 买 (mǎi) = mua. 我要买 = tôi muốn mua (dứt khoát hơn 想).',
        examples: [
          { id: 'ex-10-2-1', hanzi: '我要买这个。', pinyin: 'Wǒ yào mǎi zhège.', vi: 'Tôi muốn mua cái này.', ttsText: '我要买这个。' },
          { id: 'ex-10-2-2', hanzi: '我要买两个。', pinyin: 'Wǒ yào mǎi liǎng gè.', vi: 'Tôi muốn mua hai cái.', ttsText: '我要买两个。' },
        ],
      },
    ],
    dialogue: [
      { id: 'dl-10-1', role: 'child', hanzi: '爸爸，这个多少钱？', pinyin: 'Bàba, zhège duōshǎo qián?', vi: 'Ba ơi, cái này bao nhiêu tiền?', ttsText: '爸爸，这个多少钱？' },
      { id: 'dl-10-2', role: 'father', hanzi: '让我看看……二十块钱。', pinyin: 'Ràng wǒ kànkan… Èrshí kuài qián.', vi: 'Để ba xem nào... Hai mươi tệ.', ttsText: '让我看看……二十块钱。' },
      { id: 'dl-10-3', role: 'child', hanzi: '便宜吗？', pinyin: 'Piányí ma?', vi: 'Rẻ không ba?', ttsText: '便宜吗？' },
      { id: 'dl-10-4', role: 'father', hanzi: '还可以，不贵。你想买吗？', pinyin: 'Hái kěyǐ, bú guì. Nǐ xiǎng mǎi ma?', vi: 'Cũng được, không đắt. Con muốn mua không?', ttsText: '还可以，不贵。你想买吗？' },
      { id: 'dl-10-5', role: 'child', hanzi: '我要买这个！谢谢爸爸！', pinyin: 'Wǒ yào mǎi zhège! Xièxie bàba!', vi: 'Con muốn mua cái này! Cảm ơn ba!', ttsText: '我要买这个！谢谢爸爸！' },
    ],
    vocabulary: [
      { id: 'v-10-1', hanzi: '多少钱', pinyin: 'duōshǎo qián', vi: 'bao nhiêu tiền', type: 'phrase', ttsText: '多少钱' },
      { id: 'v-10-2', hanzi: '买', pinyin: 'mǎi', vi: 'mua', type: 'verb', ttsText: '买' },
      { id: 'v-10-3', hanzi: '这个', pinyin: 'zhège', vi: 'cái này', type: 'other', ttsText: '这个' },
      { id: 'v-10-4', hanzi: '那个', pinyin: 'nàge', vi: 'cái đó / cái kia', type: 'other', ttsText: '那个' },
      { id: 'v-10-5', hanzi: '便宜', pinyin: 'piányí', vi: 'rẻ', type: 'other', ttsText: '便宜' },
      { id: 'v-10-6', hanzi: '贵', pinyin: 'guì', vi: 'đắt', type: 'other', ttsText: '贵' },
      { id: 'v-10-7', hanzi: '块', pinyin: 'kuài', vi: 'tệ (đơn vị tiền)', type: 'other', ttsText: '块' },
    ],
    speakingDrills: [
      { id: 'sd-10-1', instruction: 'Hỏi giá tự nhiên như đang ở cửa hàng', sentence: { id: 'sds-10-1', hanzi: '这个多少钱？', pinyin: 'Zhège duōshǎo qián?', vi: 'Cái này bao nhiêu tiền?', ttsText: '这个多少钱？' }, repeatTarget: 3 },
      { id: 'sd-10-2', instruction: 'Nói bạn muốn mua cái này', sentence: { id: 'sds-10-2', hanzi: '我要买这个！', pinyin: 'Wǒ yào mǎi zhège!', vi: 'Tôi muốn mua cái này!', ttsText: '我要买这个！' }, repeatTarget: 3 },
      { id: 'sd-10-3', instruction: 'Đóng vai người mua hàng — câu đầy đủ', sentence: { id: 'sds-10-3', hanzi: '这个多少钱？我要买两个。', pinyin: 'Zhège duōshǎo qián? Wǒ yào mǎi liǎng gè.', vi: 'Cái này bao nhiêu tiền? Tôi muốn mua hai cái.', ttsText: '这个多少钱？我要买两个。' }, repeatTarget: 3, usesMic: true },
    ],
    dailyMission: {
      id: 'dm-10', title: 'Thực hành mua hàng tiếng Trung',
      instruction: 'Lần tới khi đi mua đồ (dù là mua online), hãy thử đọc to câu hỏi giá: "这个多少钱？" Nếu mua ở cửa hàng người Hoa, hãy thử hỏi thật!',
    },
    quiz: [
      { id: 'q-10-1', type: 'multiple-choice', question: '"Cái này bao nhiêu tiền?" là câu nào?', options: ['这个在哪儿？', '这个多少钱？', '这个好吃吗？', '这个是什么？'], answer: '这个多少钱？' },
      { id: 'q-10-2', type: 'vi-to-zh', question: '"Rẻ" tiếng Trung là?', options: ['贵', '便宜', '多少', '买'], answer: '便宜' },
    ],
  },
]

// Helper
export function getLessonBySlug(slug: string): Lesson | undefined {
  return LESSONS.find(l => l.slug === slug)
}

export const PHASE_LABELS: Record<LessonPhase, string> = {
  'family-life': '🏠 Gia đình',
  'daily-communication': '💬 Giao tiếp hàng ngày',
  'real-world': '🌏 Thực tế',
  'self-expression': '💡 Tự thể hiện',
  'review': '🔁 Ôn tập',
}

export const ROLE_LABELS: Record<DialogueLine['role'], string> = {
  father: 'Ba',
  mother: 'Mẹ',
  child: 'Con',
  older_sibling: 'Anh/Chị',
  younger_sibling: 'Em',
  speakerA: 'Người A',
  speakerB: 'Người B',
}
