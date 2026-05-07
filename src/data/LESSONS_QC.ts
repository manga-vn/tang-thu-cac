export interface DialogueLine {
  speaker: string
  chinese: string
  pinyin: string
  vietnamese: string
  toneNote?: string
}

export interface VocabItem {
  chinese: string
  pinyin: string
  vietnameseMeaning: string
  exampleSentenceChinese?: string
  exampleSentencePinyin?: string
  exampleSentenceVietnamese?: string
  usageNote?: string
}

export interface ReadyToUseSentence {
  chinese: string
  pinyin: string
  vietnamese: string
  useCase: string
  isTemplate?: boolean
}

export interface PolitenessVariant {
  context: string
  example: string
  note: string
}

export interface PronunciationItem {
  targetChinese: string
  pinyin: string
  vietnamese: string
  focusPoint: string
  commonMistake: string
  practiceInstruction: string
}

export interface RoleplayPrompt {
  instruction: string
  suggestedAnswer: string
}

export interface Lesson {
  id?: number
  title: string
  slug: string
  module: "A" | "B" | "C" | "D" | "E"
  moduleLabel?: string
  level: "beginner" | "elementary"
  relationshipCircle: "family" | "small-group" | "community" | "stranger"
  sceneDescription: string
  characters?: { name: string; nameVi: string; emoji: string }[]
  dialogue?: DialogueLine[]
  vocabulary?: VocabItem[]
  readyToUseSentences?: ReadyToUseSentence[]
  nativeStyleTips?: string[]
  politenessVariants?: PolitenessVariant[]
  pronunciationPractice?: PronunciationItem[]
  roleplayPractice?: { setup: string; prompts: RoleplayPrompt[] }
  dailyPracticeTask?: string
  reviewPrompt?: string
  quiz?: { question: string; options: string[]; answer: number }[]
  keyDialoguePoints?: string[]
  focusVocabulary?: string[]
  keyPhrase?: string
}

export const LESSONS_QC: Lesson[] = [
{
    "title": "Cả nhà ăn tối cùng nhau",
    "slug": "ca-nha-an-toi-cung-nhau",
    "module": "B",
    "moduleLabel": "Bữa ăn gia đình",
    "level": "beginner",
    "relationshipCircle": "family",
    "sceneDescription": "Gia đình quây quần bên mâm cơm tối. Họ hỏi thăm nhau về một ngày vừa qua, chia sẻ những câu chuyện đơn giản và động viên nhau ăn uống.",
    "keyDialoguePoints": [
      "Mẹ nói: '都来吃饭吧，菜要凉了。'",
      "Bố khen: '今天的菜真香。'",
      "Con nói: '妈妈做的菜最好吃！'",
      "Mẹ hỏi: '你们吃饱了吗？'"
    ],
    "focusVocabulary": ["都 (dōu)", "香 (xiāng)", "最好吃 (zuì hǎochī)", "饱 (bǎo)"],
    "keyPhrase": "都来吃饭吧。"
  },
  {
    "title": "Con không thích ăn rau củ",
    "slug": "con-khong-thich-an-rau-cu",
    "module": "B",
    "level": "beginner",
    "relationshipCircle": "family",
    "sceneDescription": "Trong bữa ăn, con trai không muốn ăn rau củ. Mẹ và bố khuyên con và giải thích tại sao nên ăn rau.",
    "keyDialoguePoints": [
      "Mẹ nói: '多吃点蔬菜，有营养。'",
      "Con đáp: '我不喜欢吃青菜。'",
      "Bố nói: '吃了身体才会好。'",
      "Con từ chối: '可是不好吃。'",
      "Mẹ động viên: '试一下，很好吃。'"
    ],
    "focusVocabulary": ["蔬菜 (shūcài)", "营养 (yíngyǎng)", "身体 (shēntǐ)", "试一下 (shì yīxià)"],
    "keyPhrase": "多吃点蔬菜。"
  },
  {
    "title": "Bữa cơm cuối tuần với ông bà",
    "slug": "bua-com-cuoi-tuan-vo-ong-ba",
    "module": "B",
    "level": "elementary",
    "relationshipCircle": "family",
    "sceneDescription": "Gia đình 5 người (ông bà, bố mẹ, con) cùng ăn cơm Chủ Nhật. Ông bà khen bữa ăn và hỏi thăm cuộc sống của con cháu.",
    "keyDialoguePoints": [
      "Ông nói: '这顿饭真好吃。'",
      "Bà hỏi: '你在学校学习怎么样？'",
      "Con trả lời: '挺好的，老师也很好。'",
      "Mẹ nói: '爸妈，你们多吃点。'"
    ],
    "focusVocabulary": ["顿饭 (càn fàn)", "学习 (xuéxí)", "老师 (lǎoshī)", "爸妈 (bàmā)"],
    "keyPhrase": "这顿饭真好吃。"
  },
  {
    "title": "Rủ con đi ăn ngoài",
    "slug": "ru-con-di-an-ngoai",
    "module": "B",
    "level": "beginner",
    "relationshipCircle": "family",
    "sceneDescription": "Bố mẹ rủ con trai đi ăn ngoài cuối tuần. Con hào hứng và chọn món ăn yêu thích.",
    "keyDialoguePoints": [
      "Bố đề xuất: '周末我们去吃肯德基吧？'",
      "Con reo: '好呀！我想吃炸鸡。'",
      "Mẹ hỏi: '还要喝可乐吗？'",
      "Con đáp: '要！谢谢妈妈！'"
    ],
    "focusVocabulary": ["周末 (zhōumò)", "去 (qù)", "炸鸡 (zhájī)", "可乐 (kělè)"],
    "keyPhrase": "我们去...吧？"
  },
  {
    "title": "Mẹ dặn con uống thuốc",
    "slug": "me-dan-con-uong-thuoc",
    "module": "B",
    "level": "beginner",
    "relationshipCircle": "family",
    "sceneDescription": "Con trai đang cảm thấy không khỏe, mẹ cho con uống thuốc và dặn dò khi ăn cơm.",
    "keyDialoguePoints": [
      "Mẹ nói: '你该喝药了。'",
      "Con hỏi: '药苦不苦？'",
      "Mẹ động viên: '有点苦，但是对身体好。'",
      "Con uống xong: '我喝完了，谢谢妈妈。'"
    ],
    "focusVocabulary": ["该 (gāi)", "喝药 (hē yào)", "苦 (kǔ)", "身体 (shēntǐ)"],
    "keyPhrase": "你该...了。"
  },
  // ========== MODULE C: Hỏi thăm trong ngày (thêm 4 bài) ==========
  {
    "title": "Hỏi thăm bạn qua điện thoại",
    "slug": "hoi-tham-ban-qua-dien-thoai",
    "module": "C",
    "level": "beginner",
    "relationshipCircle": "small-group",
    "sceneDescription": "Hai bạn bè (Minh và Lan) gọi điện thoại cho nhau để hỏi thăm sau nhiều ngày không gặp. Họ hỏi về công việc, sức khỏe và kế hoạch gặp mặt.",
    "keyDialoguePoints": [
      "Minh chào: '喂，你好吗？'",
      "Lan trả lời: '我很好，谢谢。你呢？'",
      "Minh hỏi: '最近工作怎么样？'",
      "Lan nói: '还行，就是有点忙。我们什么时候见面？'"
    ],
    "focusVocabulary": ["喂 (wèi)", "好吗 (hǎo ma)", "最近 (zuìjìn)", "见面 (jiànmiàn)"],
    "keyPhrase": "最近怎么样？"
  },
  {
    "title": "Hỏi thăm đồng nghiệp tại công ty",
    "slug": "hoi-tham-dong-nghiep-tai-cong-ty",
    "module": "C",
    "level": "elementary",
    "relationshipCircle": "small-group",
    "sceneDescription": "Trong giờ nghỉ trưa, hai đồng nghiệp (An và Bình) gặp nhau và hỏi thăm về công việc, dự án đang thực hiện.",
    "keyDialoguePoints": [
      "An hỏi: '最近项目进展怎么样？'",
      "Bình trả lời: '还不错，快完成了。'",
      "An hỏi thêm: '你累不累？'",
      "Bình cười: '不累，就是有点忙。'"
    ],
    "focusVocabulary": ["项目 (xiàngmù)", "进展 (jìnzhǎn)", "完成 (wánchéng)", "忙 (máng)"],
    "keyPhrase": "项目进展怎么样？"
  },
  {
    "title": "Hỏi thăm bạn qua tin nhắn",
    "slug": "hoi-tham-ban-qua-tin-nhan",
    "module": "C",
    "level": "beginner",
    "relationshipCircle": "small-group",
    "sceneDescription": "Gửi tin nhắn WeChat cho bạn để hỏi thăm và lập kế hoạch gặp mặt. Sử dụng ngôn ngữ thân mật, có emoji.",
    "keyDialoguePoints": [
      "Tin nhắn: '在吗？最近怎么样？😊'",
      "Bạn trả lời: '在呢！挺好的。你呢？'",
      "Gửi tiếp: '周末有空吗？一起吃饭吧！'",
      "Bạn đồng ý: '好啊！什么时候？'"
    ],
    "focusVocabulary": ["在吗 (zài ma)", "有空 (yǒu kòng)", "周末 (zhōumò)", "一起 (yīqǐ)"],
    "keyPhrase": "在吗？"
  },
  {
    "title": "Hỏi thăm người lớn tuổi về sức khỏe",
    "slug": "hoi-tham-nguoi-lon-tuoi-ve-suc-khoe",
    "module": "C",
    "level": "elementary",
    "relationshipCircle": "family",
    "sceneDescription": "Con hỏi thăm ông bà hoặc cha mẹ lớn tuổi về sức khỏe một cách tôn trọng và quan tâm.",
    "keyDialoguePoints": [
      "Con hỏi: '爷爷/奶奶，您身体怎么样？'",
      "Ông/bà trả lời: '身体还可以，就是有点累。'",
      "Con hỏi thêm: '今天吃药了吗？'",
      "Ông/bà cảm động: '吃了，谢谢关心。'"
    ],
    "focusVocabulary": ["您 (nín)", "身体 (shēntǐ)", "吃药 (chī yào)", "关心 (guānxīn)"],
    "keyPhrase": "您身体怎么样？"
  },
  {
    "title": "Hỏi thăm sau khi ai đó ốm",
    "slug": "hoi-tham-sau-khi-ai-do-om",
    "module": "C",
    "level": "elementary",
    "relationshipCircle": "family",
    "sceneDescription": "Hỏi thăm bạn bè hoặc người thân sau khi họ vừa ốm dậy. Thể hiện sự quan tâm và mong họ mau khỏe lại.",
    "keyDialoguePoints": [
      "Hỏi: '你好点了吗？'",
      "Trả lời: '好多了，谢谢。'",
      "Hỏi tiếp: '还能咳嗽吗？'",
      "Trả lời: '不咳嗽了，就是有点没力气。'"
    ],
    "focusVocabulary": ["好点 (hǎo diǎn)", "咳嗽 (késòu)", "没力气 (méi lìqì)", "休息 (xiūxí)"],
    "keyPhrase": "你好点了吗？"
  },
  // ========== MODULE D: Khách đến nhà (thêm 4 bài) ==========
  {
    "title": "Khách đến nhà lần đầu tiên",
    "slug": "khach-den-nha-lan-dau-tien",
    "module": "D",
    "level": "beginner",
    "relationshipCircle": "community",
    "sceneDescription": "Bạn mới làm quen đến nhà chơi lần đầu tiên. Chủ nhà tiếp đón lịch sự và giới thiệu gia đình.",
    "keyDialoguePoints": [
      "Chủ nhà chào: '欢迎！快请进。'",
      "Khách nói: '打扰了！'",
      "Chủ nhà giới thiệu: '这是我爱人/这是我先生。'",
      "Khách chào: '你好！很高兴认识你。'"
    ],
    "focusVocabulary": ["欢迎 (huānyíng)", "打扰 (dǎrǎo)", "爱人 (ài rén)", "认识 (rènshi)"],
    "keyPhrase": "打扰了！"
  },
  {
    "title": "Chủ nhà mời khách ăn uống",
    "slug": "chu-nha-moi-khach-an-uong",
    "module": "D",
    "level": "beginner",
    "relationshipCircle": "community",
    "sceneDescription": "Khách đến chơi nhà vào buổi chiều, chủ nhà mời khách ăn bánh, uống trà và ăn cơm tối.",
    "keyDialoguePoints": [
      "Chủ nhà nói: '请喝茶，吃点水果。'",
      "Khách đáp: '谢谢，你太客气了。'",
      "Chủ nhà mời: '晚上在我们家吃饭吧？'",
      "Khách từ chối: '不用了，谢谢。下次吧。'"
    ],
    "focusVocabulary": ["请 (qǐng)", "客气 (kèqi)", "晚上 (wǎnshang)", "下次 (xià cì)"],
    "keyPhrase": "你太客气了。"
  },
  {
    "title": "Khách tạm biệt chủ nhà",
    "slug": "khach-tam-biet-chu-nha",
    "module": "D",
    "level": "beginner",
    "relationshipCircle": "community",
    "sceneDescription": "Khi ra về, khách cảm ơn sự tiếp đãi và tạm biệt chủ nhà. Chủ nhà mời khách quay lại lần sau.",
    "keyDialoguePoints": [
      "Khách nói: '今天谢谢你们的招待！'",
      "Chủ nhà đáp: '别客气，欢迎下次再来。'",
      "Khách tạm biệt: '慢走，再见！'",
      "Chủ nhà nói: '好的，路上小心！'"
    ],
    "focusVocabulary": ["招待 (zhāodài)", "下次再来 (xià cì zài lái)", "慢走 (màn zǒu)", "再见 (zàijiàn)"],
    "keyPhrase": "欢迎下次再来。"
  },
  {
    "title": "Chủ nhà giới thiệu người thân",
    "slug": "chu-nha-gioi-thieu-nguoi-than",
    "module": "D",
    "level": "elementary",
    "relationshipCircle": "community",
    "sceneDescription": "Khi khách đến nhà, chủ nhà giới thiệu từng người trong gia đình và cho biết mối quan hệ.",
    "keyDialoguePoints": [
      "Chủ nhà nói: '这是我爸爸/这是我妈妈。'",
      "Khách chào: '叔叔/阿姨好！'",
      "Chủ nhà giới thiệu thêm: '这是我爱人。'",
      "Khách nói: '你们一家人真幸福！'"
    ],
    "focusVocabulary": ["这是 (zhè shì)", "爸爸 (bàba)", "妈妈 (māma)", "一家人 (yījiārén)"],
    "keyPhrase": "这是..."
  },
  {
    "title": "Khách hỏi mượn đồ dùng",
    "slug": "khach-hoi-muon-do-dung",
    "module": "D",
    "level": "elementary",
    "relationshipCircle": "community",
    "sceneDescription": "Khách đến nhà cần mượn nhà vệ sinh hoặc hỏi mượn đồ dùng (bút, giấy). Cách hỏi một cách lịch sự.",
    "keyDialoguePoints": [
      "Khách hỏi: '请问，洗手间在哪里？'",
      "Chủ nhà trả lời: '在那边，请便。'",
      "Khách hỏi thêm: '能借我一张纸吗？'",
      "Chủ nhà đáp: '当然，给你。'"
    ],
    "focusVocabulary": ["请问 (qǐng wèn)", "洗手间 (xǐshǒujiān)", "能...吗 (néng... ma)", "借 (jiè)"],
    "keyPhrase": "请问...在哪里？"
  },
  // ========== MODULE E: Nhóm nhỏ / Hàng xóm / Bạn bè (thêm 4 bài) ==========
  {
    "title": "Hàng xóm trò chuyện ở thang máy",
    "slug": "hang-xom-tro-chuyen-o-thang-may",
    "module": "E",
    "level": "beginner",
    "relationshipCircle": "community",
    "sceneDescription": "Hai hàng xóm gặp nhau trong thang máy chung cư. Họ chào hỏi và nói về thời tiết, việc sắp tới.",
    "keyDialoguePoints": [
      "Hàng xóm A chào: '你好！'",
      "Hàng xóm B đáp: '你好！你去哪里？'",
      "A trả lời: '我去买菜。你去上班吗？'",
      "B nói: '是啊，再见！'"
    ],
    "focusVocabulary": ["你好 (nǐ hǎo)", "哪里 (nǎlǐ)", "买菜 (mǎicài)", "上班 (shàngbān)"],
    "keyPhrase": "你去哪里？"
  },
  {
    "title": "Bạn bè hẹn đi xem phim",
    "slug": "ban-be-hen-di-xem-phim",
    "module": "E",
    "level": "elementary",
    "relationshipCircle": "small-group",
    "sceneDescription": "Hai bạn (Hoa và Mai) hẹn nhau đi xem phim cuối tuần. Họ thảo luận về phim và thời gian gặp mặt.",
    "keyDialoguePoints": [
      "Hoa đề xuất: '周末我们去看电影吧？'",
      "Mai đồng ý: '好啊！看什么电影？'",
      "Hoa nói: '我想看最新的电影。'",
      "Mai hỏi: '几点开始？'"
    ],
    "focusVocabulary": ["电影 (diànyǐng)", "最新 (zuì xīn)", "几点 (jǐ diǎn)", "开始 (kāishǐ)"],
    "keyPhrase": "我们去看电影吧？"
  },
  {
    "title": "Hỏi mượn đồ từ hàng xóm",
    "slug": "hoi-muon-do-tu-hang-xom",
    "module": "E",
    "level": "beginner",
    "relationshipCircle": "community",
    "sceneDescription": "Hỏi mượn đồ dùng nhỏ (muối, dầu, bút) từ hàng xóm. Cách hỏi lịch sự và biết ơn.",
    "keyDialoguePoints": [
      "Hỏi: '请问，你有盐吗？'",
      "Hàng xóm trả lời: '有，给你。'",
      "Cảm ơn: '太好了，谢谢！'",
      "Hứa trả: '我明天还给你。'"
    ],
    "focusVocabulary": ["有 (yǒu)", "给 (gěi)", "明天 (míngtiān)", "还 (huán)"],
    "keyPhrase": "请问，你有...吗？"
  },
  {
    "title": "Bạn bè chia sẻ tin tức",
    "slug": "ban-be-chia-se-tin-tuc",
    "module": "E",
    "level": "elementary",
    "relationshipCircle": "small-group",
    "sceneDescription": "Hai bạn gặp nhau và chia sẻ tin tức về công việc, sức khỏe và kế hoạch sắp tới. Cuộc trò chuyện thân mật, tự nhiên.",
    "keyDialoguePoints": [
      "A hỏi: '最近怎么样？'",
      "B trả lời: '还行，刚换工作了。'",
      "A hỏi thêm: '新工作好吗？'",
      "B nói: '挺好的，就是有点忙。你呢？'"
    ],
    "focusVocabulary": ["换工作 (huàn gōngzuò)", "新 (xīn)", "挺好的 (tǐng hǎo de)", "呢 (ne)"],
    "keyPhrase": "最近怎么样？"
  },
  {
    "title": "Hội nhóm bạn cũ gặp lại",
    "slug": "hoi-nhom-ban-cu-gap-lai",
    "module": "E",
    "level": "elementary",
    "relationshipCircle": "small-group",
    "sceneDescription": "Nhóm bạn cũ (4-5 người) gặp lại sau nhiều năm không gặp. Họ hỏi thăm, chia sẻ kỷ niệm và lập kế hoạch gặp lại.",
    "keyDialoguePoints": [
      "Người A: '好久不见！你最近怎么样？'",
      "Người B: '好久不见！我挺好的。'",
      "Người C: '你现在在哪里工作？'",
      "Người A: '我在北京。我们下次再聚！'"
    ],
    "focusVocabulary": ["好久不见 (hǎojiǔ bùjiàn)", "现在 (xiànzài)", "工作 (gōngzuò)", "再聚 (zài jù)"],
    "keyPhrase": "好久不见！"
  }
]
