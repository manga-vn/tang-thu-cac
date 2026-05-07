// ============================================================
// LESSONS_QC.ts — Dữ liệu đã QC xong
// Sửa: 5 lỗi logic + 4 lỗi toneNote/tip + 2 dòng dialogue bổ sung
// ============================================================

export interface DialogueLine {
  speaker: string;
  chinese: string;
  pinyin: string;
  vietnamese: string;
  toneNote: string;
}

export interface VocabItem {
  chinese: string;
  pinyin: string;
  vietnameseMeaning: string;
  exampleSentenceChinese: string;
  exampleSentencePinyin: string;
  exampleSentenceVietnamese: string;
  usageNote: string;
}

export interface ReadyToUseSentence {
  chinese: string;
  pinyin: string;
  vietnamese: string;
  useCase: string;
  isTemplate?: boolean;
}

export interface PolitenessVariant {
  context: string;
  example: string;
  note: string;
}

export interface PronunciationItem {
  targetChinese: string;
  pinyin: string;
  vietnamese: string;
  focusPoint: string;
  commonMistake: string;
  practiceInstruction: string;
}

export interface RoleplayPrompt {
  instruction: string;
  suggestedAnswer: string;
}

export interface Lesson {
  id: number;
  title: string;
  slug: string;
  module: "A" | "B" | "C" | "D" | "E";
  moduleLabel: string;
  level: "beginner" | "elementary";
  relationshipCircle: "family" | "small-group" | "community" | "stranger";
  sceneDescription: string;
  characters: { name: string; nameVi: string; emoji: string }[];
  dialogue: DialogueLine[];
  vocabulary: VocabItem[];
  readyToUseSentences: ReadyToUseSentence[];
  nativeStyleTips: string[];
  politenessVariants: PolitenessVariant[];
  pronunciationPractice: PronunciationItem[];
  roleplayPractice: { setup: string; prompts: RoleplayPrompt[] };
  dailyPracticeTask: string;
  reviewPrompt: string;
  quiz: { question: string; options: string[]; answer: number }[];
}

export const LESSONS_QC: Lesson[] = [

  // ================================================================
  // BÀI 1 — Buổi sáng: Cả nhà chuẩn bị đi làm, đi học
  // MODULE A | beginner | family
  // QC: sửa toneNote L1, nativeStyleTips[0], politenessVariants[0], readyToUse[3]
  // ================================================================
  {
    id: 1,
    title: "Buổi sáng — Cả nhà chuẩn bị đi làm, đi học",
    slug: "buoi-sang-ca-nha",
    module: "A",
    moduleLabel: "Buổi sáng trong gia đình",
    level: "beginner",
    relationshipCircle: "family",
    sceneDescription: "7 giờ sáng. Mẹ gọi con dậy, bố đang tìm chìa khóa, em nhỏ chưa mặc xong áo. Không khí hối hả nhưng ấm áp — cái hối hả quen thuộc của mỗi gia đình buổi sáng.",
    characters: [
      { name: "妈妈", nameVi: "Mẹ", emoji: "👩" },
      { name: "小明", nameVi: "Tiểu Minh (con trai 12 tuổi)", emoji: "👦" },
      { name: "爸爸", nameVi: "Bố", emoji: "👨" },
      { name: "妹妹", nameVi: "Em gái 7 tuổi", emoji: "👧" },
    ],
    dialogue: [
      {
        speaker: "妈妈",
        chinese: "小明，快起来！都七点了！",
        pinyin: "Xiǎo Míng, kuài qǐlái! Dōu qī diǎn le!",
        vietnamese: "Tiểu Minh ơi, dậy nhanh lên! Bảy giờ rồi đó!",
        // QC FIX: giải thích 都 rõ hơn, đúng hơn về chức năng ngữ pháp
        toneNote: "都七点了 — 都 nhấn mạnh 'đã ... rồi mà vẫn chưa dậy'. Gần nghĩa 已经 nhưng tự nhiên hơn trong khẩu ngữ hàng ngày.",
      },
      {
        speaker: "小明",
        chinese: "知道了，妈，再睡五分钟。",
        pinyin: "Zhīdào le, mā, zài shuì wǔ fēnzhōng.",
        vietnamese: "Biết rồi mẹ ơi, ngủ thêm năm phút nữa thôi.",
        toneNote: "知道了 trong gia đình nghe như 'OK OK' — bình thường hoàn toàn. Đây là cách đứa trẻ thật sự trả lời.",
      },
      {
        speaker: "妈妈",
        chinese: "不行！饭已经好了，快来吃饭！",
        pinyin: "Bù xíng! Fàn yǐjīng hǎo le, kuài lái chīfàn!",
        vietnamese: "Không được! Cơm xong rồi, ra ăn cơm nhanh lên!",
        toneNote: "快来吃饭 là câu mẹ Trung Quốc nói mỗi sáng — nghe câu này là biết đang ở nhà.",
      },
      {
        speaker: "爸爸",
        chinese: "有没有人看见我的钥匙？",
        pinyin: "Yǒu méiyǒu rén kànjiàn wǒ de yàoshi?",
        vietnamese: "Có ai thấy chìa khóa của tôi không?",
        toneNote: "",
      },
      {
        speaker: "妹妹",
        chinese: "爸爸，在沙发上！",
        pinyin: "Bàba, zài shāfā shang!",
        vietnamese: "Bố ơi, trên ghế sofa kìa!",
        toneNote: "在...上/下/里 — chỉ vị trí, dùng hằng ngày. 沙发上 = trên sofa, 桌子上 = trên bàn.",
      },
      {
        speaker: "爸爸",
        chinese: "哎，找到了。谢谢宝贝。出门了，路上小心！",
        pinyin: "Āi, zhǎodào le. Xièxiè bǎobèi. Chūmén le, lùshang xiǎoxīn!",
        vietnamese: "Ồ, tìm ra rồi. Cảm ơn con yêu. Bố đi đây, đi đường cẩn thận nhé!",
        toneNote: "路上小心 — câu tiễn người ra ngoài. Người Trung dùng câu này thay cho 'tôi yêu bạn' khi tiễn nhau.",
      },
      {
        speaker: "小明",
        chinese: "爸，再见！妈，我书包在哪儿？",
        pinyin: "Bà, zàijiàn! Mā, wǒ shūbāo zài nǎr?",
        vietnamese: "Bố, tạm biệt! Mẹ ơi, cặp của con đâu rồi?",
        toneNote: "哪儿 — cách nói phương Bắc, tự nhiên hơn 哪里 trong hội thoại. Văn viết vẫn dùng 哪里.",
      },
      {
        speaker: "妈妈",
        chinese: "在你房间门口，昨晚自己放的！",
        pinyin: "Zài nǐ fángjiān ménkǒu, zuówǎn zìjǐ fàng de!",
        vietnamese: "Ở trước cửa phòng con, tối qua tự con để đó mà!",
        toneNote: "",
      },
      {
        speaker: "小明",
        chinese: "哦，对！妈，我走了，拜拜！",
        pinyin: "Ó, duì! Mā, wǒ zǒu le, báibái!",
        vietnamese: "Ồ đúng rồi! Mẹ ơi, con đi học rồi nhé!",
        toneNote: "拜拜 phổ biến trong gia đình trẻ — tự nhiên hơn 再见 với người thân.",
      },
      {
        speaker: "妈妈",
        chinese: "去吧，路上小心，别跑！",
        pinyin: "Qù ba, lùshang xiǎoxīn, bié pǎo!",
        vietnamese: "Đi đi, đường cẩn thận, đừng có chạy!",
        toneNote: "别 + động từ = đừng làm gì. 别跑 = đừng chạy. Câu căn dặn quen thuộc của mẹ.",
      },
    ],
    vocabulary: [
      {
        chinese: "快起来",
        pinyin: "kuài qǐlái",
        vietnameseMeaning: "Dậy nhanh lên",
        exampleSentenceChinese: "七点了，快起来！",
        exampleSentencePinyin: "Qī diǎn le, kuài qǐlái!",
        exampleSentenceVietnamese: "Bảy giờ rồi, dậy nhanh lên!",
        usageNote: "Thân mật — chỉ dùng với người thân hoặc bạn rất thân. Không nói 请起床 — nghe như khách sạn.",
      },
      {
        chinese: "快来吃饭",
        pinyin: "kuài lái chīfàn",
        vietnameseMeaning: "Ra ăn cơm nhanh lên",
        exampleSentenceChinese: "饭好了，快来吃饭！",
        exampleSentencePinyin: "Fàn hǎo le, kuài lái chīfàn!",
        exampleSentenceVietnamese: "Cơm xong rồi, ra ăn nhanh lên!",
        usageNote: "Câu cửa miệng mỗi ngày của mẹ — nghe là biết đang ở nhà, rất đặc trưng văn hóa.",
      },
      {
        chinese: "路上小心",
        pinyin: "lùshang xiǎoxīn",
        vietnameseMeaning: "Đi đường cẩn thận",
        exampleSentenceChinese: "出门了，路上小心！",
        exampleSentencePinyin: "Chūmén le, lùshang xiǎoxīn!",
        exampleSentenceVietnamese: "Ra cửa rồi, đi đường cẩn thận nhé!",
        usageNote: "Nói khi tiễn người ra khỏi nhà — ấm áp, quan tâm. Người ở lại nói với người ra đi.",
      },
      {
        chinese: "找到了",
        pinyin: "zhǎodào le",
        vietnameseMeaning: "Tìm thấy rồi",
        exampleSentenceChinese: "终于找到了！",
        exampleSentencePinyin: "Zhōngyú zhǎodào le!",
        exampleSentenceVietnamese: "Cuối cùng tìm thấy rồi!",
        usageNote: "了 là trợ từ hoàn thành — việc đã xong. Nói ngắn gọn, tự nhiên. Trái với 没找到 (chưa tìm thấy).",
      },
      {
        chinese: "在哪儿",
        pinyin: "zài nǎr",
        vietnameseMeaning: "Ở đâu",
        exampleSentenceChinese: "我的钱包在哪儿？",
        exampleSentencePinyin: "Wǒ de qiánbāo zài nǎr?",
        exampleSentenceVietnamese: "Ví của tôi đâu rồi?",
        usageNote: "哪儿 — phong cách nói Bắc Kinh, tự nhiên hơn 哪里 trong hội thoại. Văn viết vẫn dùng 哪里.",
      },
      {
        chinese: "我走了",
        pinyin: "wǒ zǒu le",
        vietnameseMeaning: "Tôi/Con đi rồi",
        exampleSentenceChinese: "妈，我走了，拜拜！",
        exampleSentencePinyin: "Mā, wǒ zǒu le, báibái!",
        exampleSentenceVietnamese: "Mẹ ơi, con đi rồi nhé!",
        usageNote: "Câu thông báo trước khi ra khỏi nhà — không nói mà đi là bất lịch sự trong gia đình Trung Quốc.",
      },
    ],
    readyToUseSentences: [
      {
        chinese: "快来吃饭！",
        pinyin: "Kuài lái chīfàn!",
        vietnamese: "Ra ăn cơm nhanh lên!",
        useCase: "Gọi cả nhà vào ăn cơm",
      },
      {
        chinese: "路上小心！",
        pinyin: "Lùshang xiǎoxīn!",
        vietnamese: "Đi đường cẩn thận!",
        useCase: "Tiễn người thân ra khỏi nhà",
      },
      {
        chinese: "我走了，拜拜！",
        pinyin: "Wǒ zǒu le, báibái!",
        vietnamese: "Con/Tôi đi rồi, tạm biệt!",
        useCase: "Thông báo khi ra khỏi nhà",
      },
      {
        // QC FIX: thêm isTemplate và đổi Vietnamese cho rõ đây là mẫu câu
        chinese: "有没有人看见我的手机？",
        pinyin: "Yǒu méiyǒu rén kànjiàn wǒ de shǒujī?",
        vietnamese: "Có ai thấy điện thoại của tôi không?",
        useCase: "Tìm đồ vật trong nhà — đổi 手机 thành tên đồ vật cần tìm (钥匙 chìa khóa, 钱包 ví, 书包 cặp sách...)",
        isTemplate: true,
      },
      {
        chinese: "知道了！",
        pinyin: "Zhīdào le!",
        vietnamese: "Biết rồi!",
        useCase: "Trả lời khi bị nhắc — tự nhiên với gia đình, đừng dùng với cấp trên hoặc thầy cô",
      },
    ],
    nativeStyleTips: [
      // QC FIX: đổi framing "lười biếng" thành mô tả trung tính, chính xác hơn
      "知道了 là cách đứa trẻ thật sự trả lời trong gia đình — bình thường hoàn toàn. Đừng dùng 我明白了, nghe như học sinh đang báo cáo với giáo viên.",
      "路上小心 không chỉ là 'cẩn thận' — đây là cách người Trung nói 'tôi quan tâm đến bạn' khi tiễn nhau ra đi. Ngắn nhưng ấm.",
      "拜拜 (báibái) trông như tiếng nước ngoài nhưng rất phổ biến trong gia đình trẻ — tự nhiên hơn 再见 với người thân.",
      "Khi gọi con dậy, mẹ Trung nói: Tên + 快起来. Không ai nói 请起床 — câu đó nghe như phục vụ khách sạn.",
    ],
    politenessVariants: [
      // QC FIX: sửa ví dụ tránh nhầm chiều của 路上小心
      {
        context: "Con nói khi ra khỏi nhà",
        example: "妈，我走了，拜拜！",
        note: "Thân mật, ngắn gọn — con thông báo trước khi đi",
      },
      {
        context: "Mẹ nói tiễn con (người ở lại tiễn người đi)",
        example: "路上小心，别跑！",
        note: "路上小心 luôn do người Ở Lại nói với người Ra Đi",
      },
      {
        context: "Với đồng nghiệp / người quen",
        example: "我先走了，再见！",
        note: "Lịch sự hơn một chút, dùng ở văn phòng",
      },
      {
        context: "Với cấp trên / khách lạ",
        example: "我先告辞了。慢走。",
        note: "Trang trọng, lịch sự. 告辞 (gàocí) = xin phép ra về",
      },
    ],
    pronunciationPractice: [
      {
        targetChinese: "快起来！",
        pinyin: "Kuài qǐlái!",
        vietnamese: "Dậy nhanh lên!",
        focusPoint: "快 (kuài) T4 — xuống mạnh. 起 (qǐ) T3 — xuống rồi lên. 来 (lái) T2 — lên.",
        commonMistake: "Người Việt hay đọc 起 quá phẳng, mất T3 — nghe không có âm điệu.",
        practiceInstruction: "Nói chậm từng từ: kuài — qǐ — lái. Sau đó ghép lại tốc độ bình thường.",
      },
      {
        targetChinese: "快来吃饭！",
        pinyin: "Kuài lái chīfàn!",
        vietnamese: "Ra ăn cơm nhanh lên!",
        focusPoint: "吃 (chī) T1 — bằng, cao. 饭 (fàn) T4 — xuống mạnh cuối câu.",
        commonMistake: "Hay đọc 吃饭 như tiếng Việt — âm 'ch' tiếng Trung cần cuộn lưỡi, khác 'ch' tiếng Việt.",
        practiceInstruction: "Tập riêng 吃饭 5 lần, chú ý cuộn lưỡi ở 吃. Rồi ghép cả câu.",
      },
      {
        targetChinese: "路上小心！",
        pinyin: "Lùshang xiǎoxīn!",
        vietnamese: "Đi đường cẩn thận!",
        focusPoint: "路 (lù) T4 — xuống. 小 (xiǎo) T3 — xuống rồi lên. 心 (xīn) T1 — bằng cao.",
        commonMistake: "Nói đều đều như đọc bài — câu này cần có cảm xúc, thanh điệu sẽ tự nhiên hơn.",
        practiceInstruction: "Tưởng tượng đang tiễn người thân ra cửa — nói câu này với cảm xúc thật.",
      },
      {
        targetChinese: "钥匙在哪儿？",
        pinyin: "Yàoshi zài nǎr?",
        vietnamese: "Chìa khóa ở đâu?",
        focusPoint: "钥匙 (yàoshi) — 匙 đọc thanh nhẹ, không nhấn. 哪儿 (nǎr) T3.",
        commonMistake: "Đọc 匙 thanh 2 (shí) — sai. Âm 匙 trong 钥匙 phải nhẹ và ngắn.",
        practiceInstruction: "Tập: yào — shi (nhẹ, ngắn). Rồi: yàoshi zài nǎr?",
      },
    ],
    roleplayPractice: {
      setup: "Bạn là MẸ. Buổi sáng con chưa dậy, bố đang tìm chìa khóa, cơm đã xong.",
      prompts: [
        {
          instruction: "Gọi con dậy — đã 7 giờ rồi!",
          suggestedAnswer: "小明，快起来！都七点了！",
        },
        {
          instruction: "Gọi cả nhà ra ăn cơm.",
          suggestedAnswer: "快来吃饭！饭已经好了！",
        },
        {
          instruction: "Tiễn bố đi làm.",
          suggestedAnswer: "路上小心！",
        },
        {
          instruction: "Con hỏi cặp ở đâu — trả lời con.",
          suggestedAnswer: "在你房间门口！",
        },
      ],
    },
    dailyPracticeTask:
      "Hôm nay, khi ai đó trong nhà ra khỏi cửa, hãy nói: 路上小心！ Nếu một mình, hãy tự nói to 5 lần với cảm xúc thật — như đang tiễn người bạn yêu quý.",
    reviewPrompt:
      "Tối nay trước khi ngủ: Bạn nhớ câu nào nhất từ bài này? Nói lại 3 lần. Ngày mai thử dùng trong gia đình.",
    quiz: [
      {
        question: "Mẹ muốn gọi cả nhà ra ăn cơm, nói gì?",
        options: ["路上小心！", "快来吃饭！", "我走了！", "找到了！"],
        answer: 1,
      },
      {
        question: "Khi ra khỏi nhà, bạn nói gì với gia đình?",
        options: ["知道了！", "在哪儿？", "我走了，拜拜！", "快起来！"],
        answer: 2,
      },
      {
        question: "路上小心 — ai nói với ai?",
        options: [
          "Người ra đi nói với người ở lại",
          "Người ở lại nói với người ra đi",
          "Ai cũng có thể nói",
          "Chỉ dùng với người lạ",
        ],
        answer: 1,
      },
      {
        question: "Trong gia đình, 拜拜 hay 再见 nghe tự nhiên hơn?",
        options: ["再见", "拜拜", "Như nhau", "Không dùng cái nào"],
        answer: 1,
      },
    ],
  },

  // ================================================================
  // BÀI 2 — Bữa trưa gia đình
  // MODULE B | beginner | family
  // QC: không có lỗi lớn, minor toneNote dòng 2
  // ================================================================
  {
    id: 2,
    title: "Bữa trưa gia đình",
    slug: "bua-trua-gia-dinh",
    module: "B",
    moduleLabel: "Bữa ăn gia đình",
    level: "beginner",
    relationshipCircle: "family",
    sceneDescription:
      "12 giờ trưa. Cả nhà quây quần bên mâm cơm. Bà nội gắp thức ăn cho cháu, mẹ giục ăn thêm, bố hỏi thăm việc học. Bữa cơm gia đình Trung Quốc — ấm áp, hối hả, và đầy tiếng nói.",
    characters: [
      { name: "奶奶", nameVi: "Bà nội", emoji: "👵" },
      { name: "爸爸", nameVi: "Bố", emoji: "👨" },
      { name: "妈妈", nameVi: "Mẹ", emoji: "👩" },
      { name: "小美", nameVi: "Tiểu Mỹ (con gái 15 tuổi)", emoji: "👧" },
    ],
    dialogue: [
      {
        speaker: "奶奶",
        chinese: "来，都坐下，菜都凉了！",
        pinyin: "Lái, dōu zuòxià, cài dōu liáng le!",
        vietnamese: "Nào, ngồi xuống hết đi, thức ăn nguội hết rồi!",
        toneNote: "Câu của bà — vừa giục vừa thương. 都...了 nhấn mạnh trạng thái đã xảy ra.",
      },
      {
        speaker: "妈妈",
        chinese: "小美，去把饭盛上来，每人一碗。",
        pinyin: "Xiǎo Měi, qù bǎ fàn chéng shànglái, měi rén yī wǎn.",
        vietnamese: "Tiểu Mỹ, đi xới cơm ra đây, mỗi người một bát.",
        // QC FIX: bỏ thuật ngữ ngữ pháp, giải thích thực tế hơn
        toneNote: "把 (bǎ) — dùng khi thao tác với vật cụ thể. 去把饭盛上来 = 'đi mang cơm ra đây'.",
      },
      {
        speaker: "小美",
        chinese: "好的，妈。奶奶，您先喝点儿汤。",
        pinyin: "Hǎo de, mā. Nǎinai, nín xiān hē diǎnr tāng.",
        vietnamese: "Vâng mẹ. Bà ơi, bà uống tí canh trước đi.",
        toneNote: "您 (nín) — kính ngữ dùng với bà, ông, bố mẹ chồng/vợ. Không dùng với bạn bè.",
      },
      {
        speaker: "奶奶",
        chinese: "不用不用，你们先吃，我不饿。",
        pinyin: "Bú yòng bú yòng, nǐmen xiān chī, wǒ bù è.",
        vietnamese: "Thôi thôi, các con cứ ăn đi, bà chưa đói.",
        toneNote: "不用不用 — lặp lại để từ chối nhẹ nhàng. Đây là lịch sự — chủ nhà vẫn phải tiếp tục mời.",
      },
      {
        speaker: "爸爸",
        chinese: "妈，您多吃点，这个排骨是您爱吃的。",
        pinyin: "Mā, nín duō chī diǎn, zhège páigǔ shì nín ài chī de.",
        vietnamese: "Mẹ ơi, mẹ ăn thêm đi, cái sườn này là món mẹ thích mà.",
        toneNote: "Gắp thức ăn cho người khác = cách thể hiện yêu thương trong bữa ăn Trung Quốc.",
      },
      {
        speaker: "妈妈",
        chinese: "小美，今天学校怎么样？作业多不多？",
        pinyin: "Xiǎo Měi, jīntiān xuéxiào zěnmeyàng? Zuòyè duō bu duō?",
        vietnamese: "Tiểu Mỹ, hôm nay trường thế nào? Bài tập nhiều không?",
        toneNote: "多不多 — mẫu V/Adj + 不 + V/Adj để hỏi có/không. Tự nhiên hơn 多不多吗.",
      },
      {
        speaker: "小美",
        chinese: "还好，就是数学考了九十分，有点低。",
        pinyin: "Hái hǎo, jiùshì shùxué kǎo le jiǔshí fēn, yǒudiǎn dī.",
        vietnamese: "Cũng ổn thôi, chỉ là toán thi được chín mươi điểm, hơi thấp.",
        toneNote: "还好 — câu trả lời khiêm tốn an toàn. Người Trung ít khi nói 'rất tốt, hoàn hảo'.",
      },
      {
        speaker: "爸爸",
        chinese: "九十分不低了！来，再吃一块排骨。",
        pinyin: "Jiǔshí fēn bù dī le! Lái, zài chī yī kuài páigǔ.",
        vietnamese: "Chín mươi điểm không thấp chút nào! Nào, ăn thêm miếng sườn nữa đi.",
        toneNote: "Khen con xong gắp thức ăn — cách bố Trung biểu lộ hãnh diện mà không cần lời.",
      },
      {
        speaker: "奶奶",
        chinese: "多吃一点，你看你瘦的。",
        pinyin: "Duō chī yīdiǎn, nǐ kàn nǐ shòu de.",
        vietnamese: "Ăn thêm vào, nhìn con gầy quá.",
        toneNote: "你看你 — câu bà hay nói, vừa thương vừa có vẻ chê — rất đặc trưng, đừng hiểu nhầm là phê bình.",
      },
      {
        speaker: "小美",
        chinese: "奶奶，我吃饱了，真的！",
        pinyin: "Nǎinai, wǒ chī bǎo le, zhēn de!",
        vietnamese: "Bà ơi, cháu no rồi, thật mà bà!",
        toneNote: "吃饱了 — cách từ chối ăn thêm mà không thất lễ. Thêm 真的 để nhấn mạnh.",
      },
    ],
    vocabulary: [
      {
        chinese: "多吃一点",
        pinyin: "duō chī yīdiǎn",
        vietnameseMeaning: "Ăn thêm tí",
        exampleSentenceChinese: "来，多吃一点，菜很多。",
        exampleSentencePinyin: "Lái, duō chī yīdiǎn, cài hěn duō.",
        exampleSentenceVietnamese: "Nào, ăn thêm tí đi, thức ăn nhiều lắm.",
        usageNote: "Câu mời ăn tự nhiên — quan tâm, ấm áp. Đừng nói 请多吃 — nghe như văn bản.",
      },
      {
        chinese: "吃饱了",
        pinyin: "chī bǎo le",
        vietnameseMeaning: "Ăn no rồi",
        exampleSentenceChinese: "谢谢，我已经吃饱了。",
        exampleSentencePinyin: "Xièxiè, wǒ yǐjīng chī bǎo le.",
        exampleSentenceVietnamese: "Cảm ơn, tôi ăn no rồi.",
        usageNote: "Câu từ chối lịch sự khi được mời ăn thêm — quan trọng khi ăn ở nhà người khác.",
      },
      {
        chinese: "喝点儿汤",
        pinyin: "hē diǎnr tāng",
        vietnameseMeaning: "Uống tí canh",
        exampleSentenceChinese: "先喝点儿汤暖暖身子。",
        exampleSentencePinyin: "Xiān hē diǎnr tāng nuǎn nuǎn shēnzi.",
        exampleSentenceVietnamese: "Uống tí canh cho ấm người trước đi.",
        usageNote: "点儿 — cách nói thân mật phương Bắc, thay cho 一点. 点儿 nghe gần gũi, thoải mái hơn.",
      },
      {
        chinese: "怎么样",
        pinyin: "zěnmeyàng",
        vietnameseMeaning: "Thế nào / Ra sao",
        exampleSentenceChinese: "今天工作怎么样？",
        exampleSentencePinyin: "Jīntiān gōngzuò zěnmeyàng?",
        exampleSentenceVietnamese: "Hôm nay công việc thế nào?",
        usageNote: "Câu hỏi thăm vạn năng — dùng với mọi người, mọi tình huống. Thân thiện, không áp lực.",
      },
      {
        chinese: "还好",
        pinyin: "hái hǎo",
        vietnameseMeaning: "Ổn thôi / Cũng được",
        exampleSentenceChinese: "最近怎么样？还好。",
        exampleSentencePinyin: "Zuìjìn zěnmeyàng? Hái hǎo.",
        exampleSentenceVietnamese: "Dạo này thế nào? Ổn thôi.",
        usageNote: "Câu trả lời khiêm tốn — người Trung tránh nói 'rất tốt, hoàn hảo' vì sợ khoe. 还好 là an toàn nhất.",
      },
      {
        chinese: "您",
        pinyin: "nín",
        vietnameseMeaning: "Bạn — kính ngữ",
        exampleSentenceChinese: "奶奶，您多吃点。",
        exampleSentencePinyin: "Nǎinai, nín duō chī diǎn.",
        exampleSentenceVietnamese: "Bà ơi, bà ăn thêm đi.",
        usageNote: "Dùng với người lớn tuổi, cấp trên, bố mẹ chồng/vợ. KHÔNG dùng với bạn bè hoặc người cùng tuổi.",
      },
    ],
    readyToUseSentences: [
      {
        chinese: "多吃一点！",
        pinyin: "Duō chī yīdiǎn!",
        vietnamese: "Ăn thêm tí đi!",
        useCase: "Mời ăn thêm trong bữa cơm",
      },
      {
        chinese: "我吃饱了，谢谢！",
        pinyin: "Wǒ chī bǎo le, xièxiè!",
        vietnamese: "Tôi no rồi, cảm ơn!",
        useCase: "Từ chối ăn thêm một cách lịch sự",
      },
      {
        chinese: "今天学校怎么样？",
        pinyin: "Jīntiān xuéxiào zěnmeyàng?",
        vietnamese: "Hôm nay trường thế nào?",
        useCase: "Hỏi thăm con cái trong bữa ăn",
      },
      {
        chinese: "菜都凉了，快来吃！",
        pinyin: "Cài dōu liáng le, kuài lái chī!",
        vietnamese: "Thức ăn nguội hết rồi, ăn nhanh lên!",
        useCase: "Giục cả nhà vào bàn ăn",
      },
    ],
    nativeStyleTips: [
      "Trong bữa ăn, người Trung luôn mời nhau ăn thêm — đây là nghi thức, không phải áp lực. Bạn có thể từ chối bằng 我吃饱了.",
      "Dùng 您 với bà, ông, bố mẹ chồng/vợ — đây là tôn trọng rất quan trọng. Dùng sai có thể bị xem là vô lễ.",
      "还好 là câu trả lời an toàn — người Trung không quen nói 'rất tốt, hoàn hảo' kiểu Tây. Khiêm tốn vừa phải là chuẩn.",
      "Gắp thức ăn cho người khác = ngôn ngữ tình yêu trong bữa ăn Trung Quốc — nhận rồi cảm ơn là lịch sự nhất.",
    ],
    politenessVariants: [
      {
        context: "Với bà, ông, bố mẹ chồng/vợ",
        example: "您多吃点，这是您爱吃的。",
        note: "Dùng 您, thêm chi tiết quan tâm",
      },
      {
        context: "Với bố mẹ ruột, anh chị",
        example: "多吃一点！",
        note: "Ngắn gọn, thân mật",
      },
      {
        context: "Với khách đến nhà",
        example: "请多吃，别客气。",
        note: "Lịch sự hơn, dùng 请",
      },
    ],
    pronunciationPractice: [
      {
        targetChinese: "多吃一点。",
        pinyin: "Duō chī yīdiǎn.",
        vietnamese: "Ăn thêm tí.",
        focusPoint: "多 T1 — bằng cao. 吃 T1 — bằng cao. 点 (diǎn) T3 — xuống rồi lên.",
        commonMistake: "Hay đọc 点 quá nhanh, mất T3 — phải cảm nhận xuống rồi nhích lên ở cuối.",
        practiceInstruction: "Nói chậm: duō — chī — yī — diǎn. Rồi ghép lại, nhấn vào 多 và 点.",
      },
      {
        targetChinese: "我吃饱了。",
        pinyin: "Wǒ chī bǎo le.",
        vietnamese: "Tôi ăn no rồi.",
        focusPoint: "饱 (bǎo) T3 — gần giống tiếng Việt 'bảo'. Nhớ xuống rồi lên.",
        commonMistake: "Hay đọc 饱 như 'bao' phẳng — mất hoàn toàn T3.",
        practiceInstruction: "Nói câu này sau khi ăn tối mỗi ngày. Lặp 5 lần.",
      },
      {
        targetChinese: "今天怎么样？",
        pinyin: "Jīntiān zěnmeyàng?",
        vietnamese: "Hôm nay thế nào?",
        focusPoint: "怎么样 — 3 âm tiết: zěn-me-yàng. 么 (me) đọc nhẹ, không nhấn.",
        commonMistake: "Nhấn 么 quá mạnh — cả từ 怎么样 phải chảy mượt, nhấn vào 怎 và 样.",
        practiceInstruction: "Nghe 3 lần, bắt chước nhịp điệu. Đây là câu hỏi thân thiện nhất tiếng Trung.",
      },
    ],
    roleplayPractice: {
      setup: "Bạn là BÀ NỘI. Cả nhà đang ăn cơm. Cháu ăn ít quá, bạn muốn gắp thêm cho cháu.",
      prompts: [
        {
          instruction: "Giục cả nhà ngồi vào bàn.",
          suggestedAnswer: "来，都坐下，菜都凉了！",
        },
        {
          instruction: "Gắp thức ăn, mời cháu ăn thêm.",
          suggestedAnswer: "多吃一点，你看你瘦的。",
        },
        {
          instruction: "Hỏi cháu hôm nay trường thế nào.",
          suggestedAnswer: "今天学校怎么样？",
        },
        {
          instruction: "Cháu nói no rồi — bạn vẫn giục thêm.",
          suggestedAnswer: "没关系，再吃一口！",
        },
      ],
    },
    dailyPracticeTask:
      "Hôm nay trong bữa ăn, hãy nói với một người trong gia đình: 多吃一点！ Nếu ăn một mình, tự nói 我吃饱了 khi ăn xong.",
    reviewPrompt:
      "Câu nào trong bài này bạn có thể dùng ngay ngày mai? Viết ra 1 câu và thử dùng trong bữa ăn.",
    quiz: [
      {
        question: "Nói gì khi muốn từ chối ăn thêm một cách lịch sự?",
        options: ["不用不用！", "我吃饱了，谢谢！", "菜不好吃。", "我不饿。"],
        answer: 1,
      },
      {
        question: "Dùng 您 hay 你 khi nói với bà nội?",
        options: ["你", "您", "Cả hai đều được", "Không dùng cái nào"],
        answer: 1,
      },
      {
        question: "还好 có nghĩa là gì khi trả lời 'hôm nay thế nào'?",
        options: ["Rất tốt", "Rất tệ", "Ổn thôi", "Không biết"],
        answer: 2,
      },
      {
        question: "Câu nào đúng để mời ăn thêm?",
        options: ["请你吃饭。", "多吃一点！", "你要吃吗？", "吃饱了吗？"],
        answer: 1,
      },
    ],
  },

  // ================================================================
  // BÀI 3 — Khách đến chơi nhà
  // MODULE D | elementary | community
  // QC FIX: thêm 2 dòng tiễn khách (L11, L12) để 慢走/下次再来 có ngữ cảnh
  // ================================================================
  {
    id: 3,
    title: "Khách đến chơi nhà",
    slug: "khach-den-choi-nha",
    module: "D",
    moduleLabel: "Khách đến nhà",
    level: "elementary",
    relationshipCircle: "community",
    sceneDescription:
      "Chiều thứ Bảy. Cô Lan — đồng nghiệp cũ của mẹ — ghé thăm. Mẹ ra đón, mời vào, rót trà, hỏi thăm. Không khí vừa lịch sự vừa thân mật — kiểu khách không phải người thân nhưng cũng không xa lạ.",
    characters: [
      { name: "妈妈", nameVi: "Mẹ (chủ nhà)", emoji: "👩" },
      { name: "兰阿姨", nameVi: "Cô Lan (khách)", emoji: "🧕" },
      { name: "小明", nameVi: "Tiểu Minh (con trai)", emoji: "👦" },
    ],
    dialogue: [
      {
        speaker: "兰阿姨",
        chinese: "叮咚！有人在吗？",
        pinyin: "Dīngdōng! Yǒu rén zài ma?",
        vietnamese: "Điiing... Có ai ở nhà không?",
        toneNote: "叮咚 là tiếng chuông cửa — thêm vào để cảnh thêm sinh động.",
      },
      {
        speaker: "妈妈",
        chinese: "来了来了！哎，兰姐，你来了！快进来！",
        pinyin: "Lái le lái le! Āi, Lán jiě, nǐ lái le! Kuài jìnlái!",
        vietnamese: "Đến rồi đến rồi! Ôi, chị Lan đến rồi! Vào nhanh đi!",
        toneNote: "来了来了 — lặp lại để báo hiệu đang ra mở cửa. Nghe tự nhiên, không cần thêm gì.",
      },
      {
        speaker: "兰阿姨",
        chinese: "不打扰你们吧？临时过来的，也没带什么。",
        pinyin: "Bù dǎrǎo nǐmen ba? Línshí guòlái de, yě méi dài shénme.",
        vietnamese: "Có làm phiền không chị? Em ghé đột xuất, cũng không mang gì.",
        toneNote: "不打扰吧 — câu khách nói khi đến không báo trước. Lịch sự, tự nhiên, nên học thuộc.",
      },
      {
        speaker: "妈妈",
        chinese: "说什么呢！来就来嘛，快坐，喝点儿茶。",
        pinyin: "Shuō shénme ne! Lái jiù lái ma, kuài zuò, hē diǎnr chá.",
        vietnamese: "Nói gì vậy chị! Đến là được rồi, ngồi xuống đi, uống tí trà.",
        toneNote: "说什么呢 — không phải phản đối, mà là 'thôi đừng khách khí'. Rất thân thiện.",
      },
      {
        speaker: "妈妈",
        chinese: "小明！出来叫人！兰阿姨来了！",
        pinyin: "Xiǎo Míng! Chūlái jiào rén! Lán āyí lái le!",
        vietnamese: "Tiểu Minh ơi! Ra chào người ta! Cô Lan đến rồi!",
        toneNote: "叫人 — con cái phải ra chào khách. Không ra chào là mất lịch sự trong gia đình Trung.",
      },
      {
        speaker: "小明",
        chinese: "兰阿姨好！",
        pinyin: "Lán āyí hǎo!",
        vietnamese: "Cô Lan, cô khỏe không ạ!",
        toneNote: "Tên + 好 — cách trẻ con chào người lớn, ngắn gọn và đủ lễ.",
      },
      {
        speaker: "兰阿姨",
        chinese: "哎，小明长高了！上几年级了？",
        pinyin: "Āi, Xiǎo Míng zhǎng gāo le! Shàng jǐ niánjí le?",
        vietnamese: "Ôi, Tiểu Minh cao hơn rồi đó! Học lớp mấy rồi?",
        toneNote: "长高了 — nhận xét trẻ con cao lớn — câu người lớn hay nói khi gặp lại trẻ sau lâu.",
      },
      {
        speaker: "妈妈",
        chinese: "六年级了。快去拿两杯茶来，给兰阿姨和妈妈。",
        pinyin: "Liù niánjí le. Kuài qù ná liǎng bēi chá lái, gěi Lán āyí hé māma.",
        vietnamese: "Lớp sáu rồi. Đi lấy hai tách trà ra đây, cho cô Lan và mẹ.",
        toneNote: "",
      },
      {
        speaker: "兰阿姨",
        chinese: "不用不用，我不渴。对了，最近怎么样？",
        pinyin: "Bú yòng bú yòng, wǒ bù kě. Duì le, zuìjìn zěnmeyàng?",
        vietnamese: "Thôi thôi không cần, em không khát. À đúng rồi, dạo này thế nào?",
        toneNote: "对了 — chuyển chủ đề tự nhiên, như vừa nhớ ra điều gì muốn hỏi.",
      },
      {
        speaker: "妈妈",
        chinese: "还好还好，就是忙。你呢，工作顺利吗？",
        pinyin: "Hái hǎo hái hǎo, jiùshì máng. Nǐ ne, gōngzuò shùnlì ma?",
        vietnamese: "Ổn ổn, chỉ là bận. Còn chị, công việc suôn sẻ không?",
        toneNote: "你呢 — hỏi ngược lại người vừa hỏi mình. Lịch sự và tự nhiên.",
      },
      // QC FIX: Thêm 2 dòng tiễn khách — cần thiết để 慢走/下次再来 có ngữ cảnh xuất hiện
      {
        speaker: "兰阿姨",
        chinese: "时间不早了，我得走了，不留了！",
        pinyin: "Shíjiān bù zǎo le, wǒ děi zǒu le, bù liú le!",
        vietnamese: "Trời cũng muộn rồi, em phải về thôi, không ở lại nữa!",
        toneNote: "我得走了 + 不留了 — câu ra về chủ động, lịch sự. 不留 = không ở lại, không làm phiền thêm.",
      },
      {
        speaker: "妈妈",
        chinese: "那慢走！下次有空再来玩儿！",
        pinyin: "Nà màn zǒu! Xià cì yǒu kòng zài lái wánr!",
        vietnamese: "Vậy về cẩn thận nhé! Lần sau rảnh ghé chơi!",
        // QC FIX: toneNote giải thích rõ chiều của 慢走 — quan trọng vì Bài 5 có lỗi chính xác điểm này
        toneNote: "慢走 — NGƯỜI Ở LẠI nói với NGƯỜI RA VỀ. Không dùng ngược lại. Ấm áp, không thể thiếu khi tiễn khách.",
      },
    ],
    vocabulary: [
      {
        chinese: "快进来",
        pinyin: "kuài jìnlái",
        vietnameseMeaning: "Vào nhanh đi / Mời vào",
        exampleSentenceChinese: "外面冷，快进来！",
        exampleSentencePinyin: "Wàimiàn lěng, kuài jìnlái!",
        exampleSentenceVietnamese: "Ngoài trời lạnh, vào nhà nhanh đi!",
        usageNote: "Thân mật, ấm áp — với người quen. Với khách lạ hoặc người lớn tuổi hơn: 请进 (qǐng jìn).",
      },
      {
        chinese: "不打扰吧",
        pinyin: "bù dǎrǎo ba",
        vietnameseMeaning: "Không làm phiền chứ",
        exampleSentenceChinese: "我突然来，不打扰你吧？",
        exampleSentencePinyin: "Wǒ tūrán lái, bù dǎrǎo nǐ ba?",
        exampleSentenceVietnamese: "Tôi đột nhiên đến, có làm phiền không?",
        usageNote: "Câu khách nói khi đến không báo trước. Dùng khi ghé thăm nhà người quen.",
      },
      {
        chinese: "说什么呢",
        pinyin: "shuō shénme ne",
        vietnameseMeaning: "Nói gì vậy / Thôi nào (đừng khách khí)",
        exampleSentenceChinese: "说什么呢，你来我很高兴。",
        exampleSentencePinyin: "Shuō shénme ne, nǐ lái wǒ hěn gāoxìng.",
        exampleSentenceVietnamese: "Nói gì vậy, bạn đến tôi mừng lắm.",
        usageNote: "Không phải phủ nhận ý kiến — là xua tan sự khách khí. Nghe thân thiện, dùng khi chủ nhà muốn khách thoải mái.",
      },
      {
        chinese: "慢走",
        pinyin: "màn zǒu",
        vietnameseMeaning: "Về cẩn thận nhé / Đi thong thả",
        exampleSentenceChinese: "慢走，下次再来！",
        exampleSentencePinyin: "Màn zǒu, xià cì zài lái!",
        exampleSentenceVietnamese: "Về cẩn thận, lần sau ghé nữa!",
        usageNote: "Người Ở Lại nói với người Ra Về. Câu tiễn khách ấm áp nhất — quan tâm đến hành trình về của họ.",
      },
      {
        chinese: "下次再来",
        pinyin: "xià cì zài lái",
        vietnameseMeaning: "Lần sau ghé nữa nhé",
        exampleSentenceChinese: "下次带你先生一起来！",
        exampleSentencePinyin: "Xià cì dài nǐ xiānsheng yīqǐ lái!",
        exampleSentenceVietnamese: "Lần sau mang chồng đến cùng nhé!",
        usageNote: "Câu tiễn khách thể hiện muốn gặp lại — quan trọng trong giao tiếp xã giao.",
      },
    ],
    readyToUseSentences: [
      {
        chinese: "快进来！",
        pinyin: "Kuài jìnlái!",
        vietnamese: "Vào nhanh đi!",
        useCase: "Đón khách thân quen vào nhà",
      },
      {
        chinese: "说什么呢，来就来！",
        pinyin: "Shuō shénme ne, lái jiù lái!",
        vietnamese: "Nói gì vậy, đến là được rồi!",
        useCase: "Xua tan sự khách khí của khách",
      },
      {
        chinese: "不打扰你吧？",
        pinyin: "Bù dǎrǎo nǐ ba?",
        vietnamese: "Tôi không làm phiền chứ?",
        useCase: "Khi đến nhà ai đó không báo trước",
      },
      {
        chinese: "慢走，下次再来！",
        pinyin: "Màn zǒu, xià cì zài lái!",
        vietnamese: "Về cẩn thận, lần sau ghé nữa!",
        useCase: "Tiễn khách ra về",
      },
    ],
    nativeStyleTips: [
      "说什么呢 nghe như phản đối nhưng thực ra là 'thôi đừng khách khí' — cực kỳ thân thiện. Đừng dịch thẳng nghĩa.",
      "慢走 do người ở lại nói với người ra về — không dùng ngược lại. Nghĩa đen là 'đi thong thả' nhưng hàm ý 'tôi quan tâm đến bạn trên đường về'.",
      "Khi khách từ chối trà (không用不用), chủ nhà vẫn phải mang ra — đây là nghi thức. Khách từ chối là lịch sự, không phải từ chối thật.",
      "不打扰吧 — câu khách nói dù biết chủ nhà sẽ vui. Đây là lịch sự hai chiều — cả hai đều biết nhưng vẫn cần nói.",
    ],
    politenessVariants: [
      {
        context: "Đón khách thân (bạn bè, đồng nghiệp cũ)",
        example: "哎，你来了！快进来！",
        note: "Thân mật, vui vẻ",
      },
      {
        context: "Đón khách lịch sự hơn (sếp, người lớn tuổi)",
        example: "请进，请进，里面请坐。",
        note: "Trang trọng, dùng 请",
      },
      {
        context: "Tiễn khách",
        example: "慢走！下次再来玩儿！",
        note: "Thân mật, 玩儿 = ghé chơi",
      },
    ],
    pronunciationPractice: [
      {
        targetChinese: "快进来！",
        pinyin: "Kuài jìnlái!",
        vietnamese: "Vào nhanh đi!",
        focusPoint: "进 (jìn) T4 + 来 (lái) T2 — nói dồn, nhanh, có hứng khởi.",
        commonMistake: "Nói quá chậm rãi — câu này cần có cảm xúc đón khách, không phải đọc thông báo.",
        practiceInstruction: "Tưởng tượng người bạn thân đứng trước cửa — nói câu này với nụ cười.",
      },
      {
        targetChinese: "不打扰你吧？",
        pinyin: "Bù dǎrǎo nǐ ba?",
        vietnamese: "Không làm phiền chứ?",
        focusPoint: "打扰 — 打 T3, 扰 T3. Hai T3 liền nhau: 打 đọc thành T2. Kết quả: dá-rǎo.",
        commonMistake: "Đọc cả hai âm đều T3 — vi phạm quy tắc biến điệu T3+T3.",
        practiceInstruction: "Tập riêng: dá-rǎo (không phải dǎ-rǎo). Nói chậm 5 lần rồi ghép vào câu đầy đủ.",
      },
      {
        targetChinese: "慢走，下次再来！",
        pinyin: "Màn zǒu, xià cì zài lái!",
        vietnamese: "Về cẩn thận, lần sau ghé nữa!",
        focusPoint: "慢 T4, 走 T3. Ngắt nhịp sau 慢走, rồi mới nói 下次再来.",
        commonMistake: "Đọc liên tục không ngắt — câu có hai phần rõ ràng, cần ngắt để tự nhiên.",
        practiceInstruction: "Nói với nụ cười tiễn biệt: 慢走 (nhẹ dừng lại) — 下次再来!",
      },
    ],
    roleplayPractice: {
      setup: "Bạn là CHỦ NHÀ. Người bạn cũ bất ngờ ghé thăm chiều thứ Bảy.",
      prompts: [
        {
          instruction: "Mở cửa, vui mừng thấy bạn đến!",
          suggestedAnswer: "哎！你来了！快进来，快进来！",
        },
        {
          instruction: "Khách nói không muốn làm phiền — xua tan.",
          suggestedAnswer: "说什么呢，来就来嘛！",
        },
        {
          instruction: "Mời khách ngồi, uống trà.",
          suggestedAnswer: "坐，坐，喝点儿茶吧。",
        },
        {
          instruction: "Khách nói phải về rồi — tiễn khách.",
          suggestedAnswer: "慢走！下次有空再来玩儿！",
        },
      ],
    },
    dailyPracticeTask:
      "Hôm nay hãy học thuộc 慢走，下次再来！ Dùng khi tiễn bất kỳ ai ra khỏi nhà bạn — gia đình, bạn bè, hay hàng xóm.",
    reviewPrompt:
      "Nếu một người bạn Trung Quốc đến nhà bạn ngay bây giờ — bạn sẽ nói gì từ lúc mở cửa đến lúc tiễn về? Thử nói thành tiếng 4-5 câu.",
    quiz: [
      {
        question: "Khách đến không báo trước, họ nói gì để lịch sự?",
        options: ["快进来！", "不打扰你吧？", "我来了！", "有人在吗？"],
        answer: 1,
      },
      {
        question: "Tiễn khách ra về, chủ nhà nói câu gì?",
        options: ["再见！", "走了走了！", "慢走，下次再来！", "不送了！"],
        answer: 2,
      },
      {
        question: "慢走 — ai nói với ai?",
        options: [
          "Khách nói khi ra về",
          "Chủ nhà nói khi tiễn khách",
          "Ai cũng có thể nói",
          "Chỉ nói với người lạ",
        ],
        answer: 1,
      },
      {
        question: "说什么呢 trong ngữ cảnh đón khách có nghĩa là?",
        options: [
          "Khách đang nói gì vậy?",
          "Thôi đừng khách khí, đến là vui!",
          "Tôi không hiểu bạn nói gì",
          "Bạn nói sai rồi",
        ],
        answer: 1,
      },
    ],
  },

  // ================================================================
  // BÀI 4 — Hỏi người nhà: Hôm nay có mệt không?
  // MODULE C | beginner | family
  // QC FIX: xóa duplicate 辛苦了, thay bằng 还行
  // ================================================================
  {
    id: 4,
    title: "Hỏi người nhà: Hôm nay có mệt không?",
    slug: "hoi-tham-hom-nay-co-met-khong",
    module: "C",
    moduleLabel: "Hỏi thăm trong ngày",
    level: "beginner",
    relationshipCircle: "family",
    sceneDescription:
      "7 giờ tối. Bố vừa về nhà sau một ngày dài. Con gái đang ôn bài. Mẹ đang nấu ăn. Mỗi người hỏi thăm nhau theo cách của mình — đơn giản, ấm áp, không cần nhiều lời.",
    characters: [
      { name: "爸爸", nameVi: "Bố (vừa về nhà)", emoji: "👨" },
      { name: "小美", nameVi: "Tiểu Mỹ (con gái)", emoji: "👧" },
      { name: "妈妈", nameVi: "Mẹ (đang nấu ăn)", emoji: "👩" },
    ],
    dialogue: [
      {
        speaker: "爸爸",
        chinese: "我回来了！",
        pinyin: "Wǒ huílái le!",
        vietnamese: "Bố về rồi!",
        toneNote: "Câu thông báo khi về nhà — quan trọng như lời chào. Không nói câu này là thiếu lễ phép.",
      },
      {
        speaker: "小美",
        chinese: "爸！今天累不累？",
        pinyin: "Bà! Jīntiān lèi bu lèi?",
        vietnamese: "Bố ơi! Hôm nay bố có mệt không?",
        toneNote: "V + 不 + V = hỏi có/không. Lèi bu lèi tự nhiên hơn 你累吗 trong gia đình.",
      },
      {
        speaker: "爸爸",
        chinese: "有点儿，不过还好。你呢，功课做完了吗？",
        pinyin: "Yǒudiǎnr, búguò hái hǎo. Nǐ ne, gōngkè zuò wán le ma?",
        vietnamese: "Có tí, nhưng cũng ổn. Con thì sao, bài tập làm xong chưa?",
        toneNote: "有点儿 — thừa nhận có mệt nhưng giảm nhẹ. Người Trung ít khi than thở mạnh với gia đình.",
      },
      {
        speaker: "小美",
        chinese: "还没，还有两道数学题。",
        pinyin: "Hái méi, hái yǒu liǎng dào shùxué tí.",
        vietnamese: "Chưa xong, còn hai bài toán nữa.",
        toneNote: "还没 — 'chưa' ngắn gọn, tự nhiên. Không cần nói đầy đủ 还没做完.",
      },
      {
        speaker: "妈妈",
        chinese: "回来了？洗手来吃饭，快好了。",
        pinyin: "Huílái le? Xǐ shǒu lái chīfàn, kuài hǎo le.",
        vietnamese: "Về rồi đó à? Đi rửa tay ra ăn cơm, sắp xong rồi.",
        toneNote: "洗手来吃饭 — 'rửa tay trước khi ăn' — câu mẹ nói mỗi ngày, gần như thành phản xạ.",
      },
      {
        speaker: "爸爸",
        chinese: "好，先喝点儿水，渴死了。",
        pinyin: "Hǎo, xiān hē diǎnr shuǐ, kě sǐ le.",
        vietnamese: "Được, uống tí nước cái đã, khát chết đi được.",
        toneNote: "渴死了 — cường điệu hài hước, không phải chết thật. Tương đương 'khát muốn chết'.",
      },
      {
        speaker: "小美",
        chinese: "给你，爸。今天工作顺利吗？",
        pinyin: "Gěi nǐ, bà. Jīntiān gōngzuò shùnlì ma?",
        vietnamese: "Cho bố, bố ơi. Hôm nay công việc suôn sẻ không?",
        toneNote: "给你 — đưa đồ cho người khác. Ngắn gọn, tự nhiên.",
      },
      {
        speaker: "爸爸",
        chinese: "还行，就是开会开了一下午。累得很。",
        pinyin: "Hái xíng, jiùshì kāihuì kāi le yī xiàwǔ. Lèi de hěn.",
        vietnamese: "Cũng được, chỉ là họp cả buổi chiều. Mệt lắm.",
        toneNote: "还行 — gần nghĩa 还好, đều là 'cũng ổn thôi'. Không than cũng không khoe.",
      },
      {
        speaker: "妈妈",
        chinese: "那辛苦了。吃完饭早点休息。",
        pinyin: "Nà xīnkǔ le. Chī wán fàn zǎodiǎn xiūxi.",
        vietnamese: "Vậy thì vất vả rồi. Ăn cơm xong nghỉ ngơi sớm thôi.",
        toneNote: "辛苦了 — chỉ hai từ nhưng đủ ấm. Đây là câu quan tâm đặc trưng khi thấy người thân làm việc mệt nhọc.",
      },
    ],
    vocabulary: [
      {
        chinese: "累不累",
        pinyin: "lèi bu lèi",
        vietnameseMeaning: "Có mệt không?",
        exampleSentenceChinese: "今天累不累？坐下来歇歇。",
        exampleSentencePinyin: "Jīntiān lèi bu lèi? Zuòxià lái xiēxie.",
        exampleSentenceVietnamese: "Hôm nay có mệt không? Ngồi nghỉ đi.",
        usageNote: "Mẫu V+不+V rất thông dụng: 饿不饿 (có đói không), 冷不冷 (có lạnh không), 忙不忙 (có bận không).",
      },
      {
        chinese: "辛苦了",
        pinyin: "xīnkǔ le",
        vietnameseMeaning: "Vất vả rồi / Cảm ơn bạn đã cố gắng",
        exampleSentenceChinese: "今天辛苦了，谢谢你。",
        exampleSentencePinyin: "Jīntiān xīnkǔ le, xièxiè nǐ.",
        exampleSentenceVietnamese: "Hôm nay vất vả rồi, cảm ơn bạn.",
        usageNote: "Câu thể hiện đồng cảm và trân trọng — nói với người về nhà sau ngày làm việc, với đồng nghiệp sau buổi họp, với ai vừa làm điều gì khó nhọc.",
      },
      {
        chinese: "喝点儿水",
        pinyin: "hē diǎnr shuǐ",
        vietnameseMeaning: "Uống tí nước",
        exampleSentenceChinese: "渴了吧，喝点儿水。",
        exampleSentencePinyin: "Kě le ba, hē diǎnr shuǐ.",
        exampleSentenceVietnamese: "Khát rồi chứ, uống tí nước đi.",
        usageNote: "Câu quan tâm thực tế — người Trung thể hiện yêu thương qua hành động chăm sóc cụ thể.",
      },
      {
        chinese: "我回来了",
        pinyin: "wǒ huílái le",
        vietnameseMeaning: "Tôi/Con về rồi",
        exampleSentenceChinese: "妈，我回来了！",
        exampleSentencePinyin: "Mā, wǒ huílái le!",
        exampleSentenceVietnamese: "Mẹ ơi, con về rồi!",
        usageNote: "Câu thông báo khi bước vào nhà — không nói là thiếu lễ phép. Giống 'ただいま' của tiếng Nhật.",
      },
      // QC FIX: thay 辛苦了 (bản trùng) bằng 还行 — từ xuất hiện trong dialogue, cần giải thích riêng
      {
        chinese: "还行",
        pinyin: "hái xíng",
        vietnameseMeaning: "Cũng được / Tạm ổn",
        exampleSentenceChinese: "今天工作怎么样？还行，就是累。",
        exampleSentencePinyin: "Jīntiān gōngzuò zěnmeyàng? Hái xíng, jiùshì lèi.",
        exampleSentenceVietnamese: "Hôm nay công việc thế nào? Tạm ổn, chỉ là mệt.",
        usageNote: "Gần nghĩa 还好 — cả hai đều khiêm tốn. 还行 nghe như 'còn chịu được', 还好 nghe nhẹ nhàng hơn tí. Dùng thay nhau được.",
      },
      {
        chinese: "早点休息",
        pinyin: "zǎodiǎn xiūxi",
        vietnameseMeaning: "Nghỉ ngơi sớm đi",
        exampleSentenceChinese: "明天还要上班，早点休息吧。",
        exampleSentencePinyin: "Míngtiān hái yào shàngbān, zǎodiǎn xiūxi ba.",
        exampleSentenceVietnamese: "Ngày mai còn đi làm, nghỉ ngơi sớm đi.",
        usageNote: "Câu quan tâm sức khỏe buổi tối — dùng với người thân, đồng nghiệp, bạn bè thân.",
      },
    ],
    readyToUseSentences: [
      {
        chinese: "我回来了！",
        pinyin: "Wǒ huílái le!",
        vietnamese: "Con/Tôi về rồi!",
        useCase: "Thông báo khi bước vào nhà",
      },
      {
        chinese: "今天累不累？",
        pinyin: "Jīntiān lèi bu lèi?",
        vietnamese: "Hôm nay có mệt không?",
        useCase: "Hỏi thăm người thân sau ngày làm/học",
      },
      {
        chinese: "辛苦了！",
        pinyin: "Xīnkǔ le!",
        vietnamese: "Vất vả rồi!",
        useCase: "An ủi, động viên người mệt mỏi — chỉ hai từ, đủ ấm lòng",
      },
      {
        chinese: "喝点儿水吧。",
        pinyin: "Hē diǎnr shuǐ ba.",
        vietnamese: "Uống tí nước đi.",
        useCase: "Quan tâm người vừa về — thực tế, ấm áp",
      },
      {
        chinese: "早点休息。",
        pinyin: "Zǎodiǎn xiūxi.",
        vietnamese: "Nghỉ ngơi sớm đi.",
        useCase: "Buổi tối, chúc người thân nghỉ ngơi",
      },
    ],
    nativeStyleTips: [
      "辛苦了 là câu thần kỳ — chỉ hai từ nhưng ấm lòng hơn nhiều câu dài. Nói với ai vừa làm gì vất vả là đúng lúc.",
      "我回来了 quan trọng như 再见 khi ra đi — đây là nghi thức kết nối gia đình mỗi ngày.",
      "V+不+V (lèi bu lèi, è bu è) là mẫu hỏi tự nhiên nhất — dùng thay cho 你累吗 nghe sách vở.",
      "Người Trung hiếm khi nói 'tôi yêu bạn' mà thay bằng: rót nước, gắp thức ăn, nhắc nghỉ ngơi. Học những câu này là học ngôn ngữ tình yêu của họ.",
    ],
    politenessVariants: [
      {
        context: "Với bố mẹ, ông bà",
        example: "今天辛苦了，爸。早点休息。",
        note: "Thêm tên gọi, thêm quan tâm",
      },
      {
        context: "Với đồng nghiệp",
        example: "今天辛苦了！早点走吧。",
        note: "Bình thường, không cần kính ngữ",
      },
      {
        context: "Với sếp, người lớn tuổi",
        example: "您辛苦了，早点回去休息吧。",
        note: "Dùng 您, thêm 回去",
      },
    ],
    pronunciationPractice: [
      {
        targetChinese: "今天累不累？",
        pinyin: "Jīntiān lèi bu lèi?",
        vietnamese: "Hôm nay có mệt không?",
        focusPoint: "累 T4 — xuống mạnh. 不 giữa đọc nhẹ (trung hòa). 累 cuối T4. Ngữ điệu câu hỏi lên nhẹ.",
        commonMistake: "Đọc 不 quá to — phải nhẹ, như tiếng nối hai từ 累.",
        practiceInstruction: "Nói: lèi — (nhẹ)bu — lèi? Nhớ ngữ điệu lên cuối câu hỏi.",
      },
      {
        targetChinese: "辛苦了！",
        pinyin: "Xīnkǔ le!",
        vietnamese: "Vất vả rồi!",
        focusPoint: "辛 (xīn) T1 — cao đều. 苦 (kǔ) T3 — xuống rồi lên.",
        commonMistake: "Đọc quá ngắn, thiếu cảm xúc — câu này phải có hơi ấm trong giọng.",
        practiceInstruction: "Thở ra nhẹ rồi nói với cảm xúc quan tâm: Xīn-kǔ-le. Đừng đọc nhanh.",
      },
      {
        targetChinese: "喝点儿水吧。",
        pinyin: "Hē diǎnr shuǐ ba.",
        vietnamese: "Uống tí nước đi.",
        focusPoint: "点儿 (diǎnr) — âm cuộn lưỡi đặc trưng Bắc Kinh. Shuǐ T3.",
        commonMistake: "Bỏ âm 'r' cuộn lưỡi trong 点儿 — thành 点 không có r nghe nhẹ hơn nhưng ít tự nhiên.",
        practiceInstruction: "Tập riêng: diǎn + r → diǎnr. Rồi ghép: hē diǎnr shuǐ ba.",
      },
    ],
    roleplayPractice: {
      setup: "Bạn là CON GÁI. Bố vừa về nhà sau ngày làm việc mệt mỏi.",
      prompts: [
        {
          instruction: "Nghe tiếng bố về — chào và hỏi thăm.",
          suggestedAnswer: "爸！回来了！今天累不累？",
        },
        {
          instruction: "Bố nói mệt — đưa nước cho bố.",
          suggestedAnswer: "给你，爸，喝点儿水。",
        },
        {
          instruction: "Bố nói hôm nay họp nhiều — đồng cảm.",
          suggestedAnswer: "辛苦了，爸！",
        },
        {
          instruction: "Đến tối, nhắc bố nghỉ ngơi sớm.",
          suggestedAnswer: "爸，明天还要上班，早点休息吧。",
        },
      ],
    },
    dailyPracticeTask:
      "Tối nay khi bố/mẹ hoặc ai đó trong nhà về, hãy nói: 辛苦了！ Chỉ hai từ thôi — nhưng ấm lắm đó.",
    reviewPrompt:
      "Bạn về nhà sau một ngày mệt. Người thân hỏi bạn. Bạn sẽ trả lời thế nào bằng tiếng Trung? Thử nói một đoạn 3-4 câu.",
    quiz: [
      {
        question: "Mẫu 'lèi bu lèi' có nghĩa là gì?",
        options: ["Rất mệt", "Có mệt không?", "Không mệt", "Mệt lắm"],
        answer: 1,
      },
      {
        question: "Nói gì khi bước vào nhà?",
        options: ["再见！", "你好！", "我回来了！", "开门！"],
        answer: 2,
      },
      {
        question: "辛苦了 dùng khi nào?",
        options: [
          "Chào buổi sáng",
          "Đồng cảm với người vừa làm việc vất vả",
          "Mời ăn cơm",
          "Tiễn khách",
        ],
        answer: 1,
      },
      {
        question: "还行 và 还好 khác nhau thế nào?",
        options: [
          "还行 tích cực hơn",
          "还好 tích cực hơn",
          "Cả hai đều có nghĩa 'cũng ổn thôi', dùng thay nhau được",
          "Hoàn toàn khác nghĩa",
        ],
        answer: 2,
      },
    ],
  },

  // ================================================================
  // BÀI 5 — Hàng xóm gặp nhau buổi sáng
  // MODULE E | elementary | community
  // QC FIX: sửa dòng 9 — 王阿姨 không thể nói 慢走 khi chính mình là người ra về
  // ================================================================
  {
    id: 5,
    title: "Hàng xóm gặp nhau buổi sáng",
    slug: "hang-xom-gap-nhau-buoi-sang",
    module: "E",
    moduleLabel: "Nhóm nhỏ / Hàng xóm / Bạn bè",
    level: "elementary",
    relationshipCircle: "community",
    sceneDescription:
      "8 giờ sáng. Cô Vương mang rác ra, gặp bác Trương đang tưới cây trước nhà. Họ là hàng xóm quen nhau đã lâu. Đây là kiểu chuyện trò ngắn, thân thiện — 5-6 câu là đủ ấm, không cần dài hơn.",
    characters: [
      { name: "王阿姨", nameVi: "Cô Vương (hàng xóm nữ)", emoji: "🧕" },
      { name: "张大叔", nameVi: "Bác Trương (hàng xóm nam)", emoji: "👴" },
    ],
    dialogue: [
      {
        speaker: "王阿姨",
        chinese: "张大叔，这么早出来啊！",
        pinyin: "Zhāng dàshū, zhème zǎo chūlái a!",
        vietnamese: "Bác Trương, sớm thế mà đã ra ngoài rồi!",
        toneNote: "啊 cuối câu làm giọng thân thiện hơn, bớt cứng.",
      },
      {
        speaker: "张大叔",
        chinese: "哎，王姐！早啊！出来浇浇花。你也出来了？",
        pinyin: "Āi, Wáng jiě! Zǎo a! Chūlái jiāo jiāo huā. Nǐ yě chūlái le?",
        vietnamese: "Ồ, chị Vương! Chào buổi sáng! Ra tưới tưới hoa. Chị cũng ra à?",
        toneNote: "浇浇 — lặp động từ = làm nhẹ nhàng, 'tưới tí thôi'. Nghe thoải mái hơn 浇花.",
      },
      {
        speaker: "王阿姨",
        chinese: "倒个垃圾。今天天气不错啊。",
        pinyin: "Dào gè lājī. Jīntiān tiānqì búcuò a.",
        vietnamese: "Đổ rác thôi. Hôm nay thời tiết tốt nhỉ.",
        toneNote: "不错 = 'không tệ' nhưng hàm ý khen. Câu nhận xét thời tiết phổ biến nhất khi gặp nhau.",
      },
      {
        speaker: "张大叔",
        chinese: "是啊，春天了，暖和多了。",
        pinyin: "Shì a, chūntiān le, nuǎnhuo duō le.",
        vietnamese: "Ừ nhỉ, sang xuân rồi, ấm hẳn lên.",
        toneNote: "暖和 (nuǎnhuo) — dùng cho thời tiết dễ chịu mùa xuân/thu. Khác với 热 (nóng bức).",
      },
      {
        speaker: "王阿姨",
        chinese: "张大叔，最近身体怎么样？上次说膝盖不好。",
        pinyin: "Zhāng dàshū, zuìjìn shēntǐ zěnmeyàng? Shàng cì shuō xīgài bù hǎo.",
        vietnamese: "Bác Trương, dạo này sức khỏe thế nào? Lần trước bác nói đầu gối không tốt.",
        toneNote: "Nhớ chuyện cũ và hỏi lại — đây là giao tiếp hàng xóm thật, không chỉ xã giao.",
      },
      {
        speaker: "张大叔",
        chinese: "好多了，谢谢你还记得。没大碍。",
        pinyin: "Hǎo duō le, xièxiè nǐ hái jìde. Méi dà'ài.",
        vietnamese: "Tốt hơn nhiều rồi, cảm ơn chị vẫn còn nhớ. Không có gì to tát.",
        toneNote: "谢谢你还记得 — 'cảm ơn chị vẫn nhớ' — câu cảm động, thể hiện sự quan tâm được trân trọng.",
      },
      {
        speaker: "王阿姨",
        chinese: "那就好。对了，听说你儿子结婚了？恭喜恭喜！",
        pinyin: "Nà jiù hǎo. Duì le, tīng shuō nǐ érzi jiéhūn le? Gōngxǐ gōngxǐ!",
        vietnamese: "Vậy thì tốt rồi. Này, nghe nói con trai bác cưới rồi phải không? Chúc mừng!",
        toneNote: "恭喜恭喜 — lặp lại để thêm chân thành và vui vẻ.",
      },
      {
        speaker: "张大叔",
        chinese: "哎，是啊，上个月的事。还没请你呢，不好意思。",
        pinyin: "Āi, shì a, shàng gè yuè de shì. Hái méi qǐng nǐ ne, bù hǎoyìsi.",
        vietnamese: "Ừ, chuyện tháng trước. Chưa mời chị ăn được, xin lỗi nhé.",
        toneNote: "不好意思 — không chỉ 'xin lỗi' mà còn 'ngại quá, thấy có lỗi'. Cảm xúc sâu hơn 对不起.",
      },
      // QC FIX: bỏ 慢走 khỏi câu của 王阿姨 — cô ấy đang ra về, không thể nói 慢走 với người ở lại
      {
        speaker: "王阿姨",
        chinese: "哎，说什么呢，都是邻居嘛。那我先走了，不打扰你了！",
        pinyin: "Āi, shuō shénme ne, dōu shì línjū ma. Nà wǒ xiān zǒu le, bù dǎrǎo nǐ le!",
        vietnamese: "Ôi, nói gì vậy, đều là hàng xóm mà. Thôi tôi về trước, không làm phiền bác nữa!",
        toneNote: "都是邻居嘛 — xua tan sự ngại ngùng. 我先走了 — thông báo mình ra về, lịch sự.",
      },
      {
        speaker: "张大叔",
        chinese: "好，慢走慢走！改天请你们吃饭！",
        pinyin: "Hǎo, màn zǒu màn zǒu! Gǎitiān qǐng nǐmen chīfàn!",
        vietnamese: "Được rồi, về cẩn thận nhé! Hôm nào mời cả nhà đến ăn cơm!",
        // QC FIX: 张大叔 là người ở lại nói 慢走 với 王阿姨 đang ra về — đây mới là đúng
        toneNote: "慢走 do NGƯỜI Ở LẠI nói. Ở đây 张大叔 đứng lại, 王阿姨 ra về — nên 张大叔 nói 慢走 là đúng.",
      },
    ],
    vocabulary: [
      {
        chinese: "不错",
        pinyin: "búcuò",
        vietnameseMeaning: "Không tệ / Tốt đấy",
        exampleSentenceChinese: "今天天气不错！",
        exampleSentencePinyin: "Jīntiān tiānqì búcuò!",
        exampleSentenceVietnamese: "Hôm nay thời tiết không tệ nhỉ!",
        usageNote: "Cách khen khiêm tốn — người Trung tránh nói 'tuyệt vời, hoàn hảo'. 不错 = đủ khen rồi.",
      },
      {
        chinese: "不好意思",
        pinyin: "bù hǎoyìsi",
        vietnameseMeaning: "Xin lỗi / Ngại quá",
        exampleSentenceChinese: "不好意思，打扰一下。",
        exampleSentencePinyin: "Bù hǎoyìsi, dǎrǎo yīxià.",
        exampleSentenceVietnamese: "Xin lỗi, làm phiền một chút.",
        usageNote: "Câu vạn năng — dùng khi ngại, khi nhờ vả, khi xin lỗi nhẹ. Linh hoạt hơn 对不起 rất nhiều.",
      },
      {
        chinese: "改天",
        pinyin: "gǎitiān",
        vietnameseMeaning: "Hôm nào đó / Dịp khác",
        exampleSentenceChinese: "改天请你喝茶！",
        exampleSentencePinyin: "Gǎitiān qǐng nǐ hē chá!",
        exampleSentenceVietnamese: "Hôm nào mời bạn uống trà!",
        usageNote: "KHÔNG phải lời hẹn thật — là cách nói xã giao thể hiện thiện chí. Đừng hỏi 'hôm nào cụ thể?'",
      },
      {
        chinese: "都是邻居嘛",
        pinyin: "dōu shì línjū ma",
        vietnameseMeaning: "Đều là hàng xóm mà",
        exampleSentenceChinese: "说什么呢，都是邻居嘛！",
        exampleSentencePinyin: "Shuō shénme ne, dōu shì línjū ma!",
        exampleSentenceVietnamese: "Nói gì vậy, đều là hàng xóm mà!",
        usageNote: "Câu xua tan sự ngại ngùng. Thay 邻居 bằng 朋友 (bạn bè), 自己人 (người nhà) tùy ngữ cảnh.",
      },
      {
        chinese: "没大碍",
        pinyin: "méi dà'ài",
        vietnameseMeaning: "Không có gì to tát / Không sao",
        exampleSentenceChinese: "跌了一跤，没大碍。",
        exampleSentencePinyin: "Diē le yī jiāo, méi dà'ài.",
        exampleSentenceVietnamese: "Ngã một cái, không có gì nghiêm trọng.",
        usageNote: "Câu trấn an khi người hỏi thăm sức khỏe — nhẹ nhàng, không lo lắng quá.",
      },
    ],
    readyToUseSentences: [
      {
        chinese: "今天天气不错啊！",
        pinyin: "Jīntiān tiānqì búcuò a!",
        vietnamese: "Hôm nay thời tiết tốt nhỉ!",
        useCase: "Mở đầu cuộc trò chuyện với hàng xóm, người quen",
      },
      {
        chinese: "最近身体怎么样？",
        pinyin: "Zuìjìn shēntǐ zěnmeyàng?",
        vietnamese: "Dạo này sức khỏe thế nào?",
        useCase: "Hỏi thăm sức khỏe người lớn tuổi",
      },
      {
        chinese: "不好意思，打扰一下。",
        pinyin: "Bù hǎoyìsi, dǎrǎo yīxià.",
        vietnamese: "Xin lỗi, làm phiền một chút.",
        useCase: "Khi cần nhờ vả ai đó",
      },
      {
        chinese: "改天请你吃饭！",
        pinyin: "Gǎitiān qǐng nǐ chīfàn!",
        vietnamese: "Hôm nào mời bạn đi ăn!",
        useCase: "Câu xã giao thể hiện thiện chí — không nhất thiết là lời hẹn thật",
      },
      {
        chinese: "慢走！",
        pinyin: "Màn zǒu!",
        vietnamese: "Về cẩn thận nhé!",
        useCase: "Tiễn người quen ra về — nói bởi người ở lại với người ra đi",
      },
    ],
    nativeStyleTips: [
      "改天请你吃饭 không phải lời hẹn thật — là xã giao thể hiện thiện chí. Đừng hỏi ngày giờ cụ thể khi nghe câu này.",
      "不错 là cách người Trung khen vừa phải — họ không quen nói 'tuyệt vời'. 不错 = đủ khen rồi.",
      "慢走 — nhớ kỹ: người ở lại nói với người ra về. Không dùng ngược lại.",
      "不好意思 linh hoạt hơn 对不起 rất nhiều — dùng khi ngại, khi nhờ, khi cảm ơn kiêm xin lỗi. Đây là một trong những câu thông dụng nhất tiếng Trung.",
    ],
    politenessVariants: [
      {
        context: "Gặp hàng xóm buổi sáng",
        example: "张叔，早啊！今天天气不错！",
        note: "Ngắn, thân thiện — không cần nhiều hơn",
      },
      {
        context: "Hỏi thăm người lớn tuổi",
        example: "您最近身体怎么样？",
        note: "Dùng 您, thể hiện tôn trọng",
      },
      {
        context: "Kết thúc trò chuyện ngắn",
        example: "好，我先走了！您慢走！",
        note: "Nếu mình ra về: 我先走了. Nếu người kia ra về: 慢走",
      },
    ],
    pronunciationPractice: [
      {
        targetChinese: "今天天气不错啊！",
        pinyin: "Jīntiān tiānqì búcuò a!",
        vietnamese: "Hôm nay thời tiết không tệ nhỉ!",
        focusPoint: "不错 — 不 (bù) biến thành T2 (bú) trước 错 (T4). Quy tắc biến điệu quan trọng.",
        commonMistake: "Đọc 不 T4 (bù) — sai! Trước T4, 不 luôn đọc T2 (bú).",
        practiceInstruction: "Tập riêng: bú-cuò (không phải bù-cuò). Cả câu: Jīntiān tiānqì bú-cuò a!",
      },
      {
        targetChinese: "不好意思！",
        pinyin: "Bù hǎoyìsi!",
        vietnamese: "Xin lỗi / Ngại quá!",
        focusPoint: "好意思 — hǎo T3, yì T4, si nhẹ. 思 (si) phải đọc nhẹ, không nhấn.",
        commonMistake: "Nhấn 思 quá mạnh — cả từ 好意思 phải chảy nhanh, nhẹ dần ở cuối.",
        practiceInstruction: "Nói nhanh: bù hǎo-yì-si. Lặp 5 lần cho quen miệng.",
      },
      {
        targetChinese: "改天请你吃饭！",
        pinyin: "Gǎitiān qǐng nǐ chīfàn!",
        vietnamese: "Hôm nào mời bạn đi ăn!",
        focusPoint: "改 T3, 天 T1, 请 T3 — không có sandhi vì không liền nhau.",
        commonMistake: "Đọc quá chậm, trang trọng — câu này phải vui, nhanh, thân thiện.",
        practiceInstruction: "Nói với nụ cười — cảm xúc tự nhiên giúp thanh điệu chuẩn hơn.",
      },
    ],
    roleplayPractice: {
      setup: "Bạn là HÀNG XÓM. Buổi sáng gặp bác hàng xóm lớn tuổi đang quét sân. Trò chuyện ngắn, thân thiện.",
      prompts: [
        {
          instruction: "Chào bác, nhận xét thời tiết hôm nay.",
          suggestedAnswer: "张叔，早！今天天气不错啊！",
        },
        {
          instruction: "Hỏi thăm sức khỏe bác.",
          suggestedAnswer: "您最近身体怎么样？",
        },
        {
          instruction: "Bác nói đầu gối đau — trấn an.",
          suggestedAnswer: "慢慢养，会好的！",
        },
        {
          instruction: "Kết thúc, nói bạn phải đi rồi.",
          suggestedAnswer: "好，我先走了！您慢走，注意身体！",
        },
      ],
    },
    dailyPracticeTask:
      "Hôm nay hãy dùng 不好意思 một lần trong cuộc sống thật — khi nhờ ai đó, khi xin qua đường, khi hỏi điều gì. Chỉ cần nói tự nhiên một lần là thành công.",
    reviewPrompt:
      "Bạn gặp hàng xóm buổi sáng — biết mặt nhưng không thân lắm. Bạn sẽ nói gì? Thử nói 4-5 câu.",
    quiz: [
      {
        question: "改天请你吃饭 có nghĩa thật là gì?",
        options: [
          "Hẹn ăn tối nay",
          "Lời xã giao thể hiện thiện chí, không phải hẹn thật",
          "Mời ăn tuần tới",
          "Không có ý gì cả",
        ],
        answer: 1,
      },
      {
        question: "不错 trong tiếng Trung tương đương mức nào?",
        options: ["Tệ", "Trung bình", "Khá tốt / Ổn", "Hoàn hảo"],
        answer: 2,
      },
      {
        question: "慢走 — ai nói với ai?",
        options: [
          "Người ra về nói với người ở lại",
          "Người ở lại nói với người ra về",
          "Ai cũng có thể nói",
          "Chỉ dùng với người già",
        ],
        answer: 1,
      },
      {
        question: "不好意思 dùng trong tình huống nào?",
        options: [
          "Chỉ khi xin lỗi",
          "Chỉ khi cảm ơn",
          "Khi ngại, nhờ vả, xin lỗi nhẹ — linh hoạt",
          "Khi không hiểu",
        ],
        answer: 2,
      },
    ],
  },
];

// ============================================================
// MODULE_INFO — không thay đổi
// ============================================================
export const MODULE_INFO = {
  A: { label: "Buổi sáng trong gia đình", emoji: "🌅", color: "#C2440E", bg: "#FFF7F0" },
  B: { label: "Bữa ăn gia đình",          emoji: "🍚", color: "#A83215", bg: "#FFF1EE" },
  C: { label: "Hỏi thăm trong ngày",      emoji: "💬", color: "#166534", bg: "#F0FDF4" },
  D: { label: "Khách đến nhà",            emoji: "🏠", color: "#1E3A8A", bg: "#EFF6FF" },
  E: { label: "Nhóm nhỏ / Hàng xóm",     emoji: "👥", color: "#581C87", bg: "#FAF5FF" },
};
