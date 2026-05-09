const rawStages = [
  {
    id: 'morning',
    title: 'Buổi sáng',
    focus: 'Thức dậy, chào hỏi, chuẩn bị đi học',
    minimumOutcomes: [
      'nghe hiểu 5 câu sáng quen thuộc',
      'nói lại 5 câu với pinyin',
      'phản xạ 3 tình huống dưới 4 giây',
      'không cần nhớ mặt chữ',
    ],
    items: [
      ['zao', '早', 'zǎo', 'sáng / chào buổi sáng', '早。', 'zǎo', 'Chào buổi sáng.', 'Gặp người nhà buổi sáng'],
      ['qi', '起', 'qǐ', 'dậy', '起床了。', 'qǐ chuáng le', 'Dậy thôi.', 'Gọi con dậy'],
      ['xing', '醒', 'xǐng', 'tỉnh dậy', '你醒了吗？', 'nǐ xǐng le ma', 'Con dậy chưa?', 'Hỏi con đã tỉnh chưa'],
      ['kuai', '快', 'kuài', 'nhanh', '快一点。', 'kuài yì diǎn', 'Nhanh một chút.', 'Hối nhẹ nhàng'],
      ['xi-lian', '洗脸', 'xǐ liǎn', 'rửa mặt', '去洗脸。', 'qù xǐ liǎn', 'Đi rửa mặt đi.', 'Nhắc vệ sinh buổi sáng'],
      ['shua-ya', '刷牙', 'shuā yá', 'đánh răng', '刷牙了吗？', 'shuā yá le ma', 'Đánh răng chưa?', 'Kiểm tra trước khi đi'],
      ['yi-fu', '衣服', 'yī fu', 'quần áo', '穿衣服。', 'chuān yī fu', 'Mặc quần áo đi.', 'Chuẩn bị đi học'],
      ['shu-bao', '书包', 'shū bāo', 'cặp sách', '拿书包。', 'ná shū bāo', 'Lấy cặp sách.', 'Trước khi ra cửa'],
      ['shui', '水', 'shuǐ', 'nước', '喝点水。', 'hē diǎn shuǐ', 'Uống chút nước.', 'Nhắc uống nước'],
      ['fan', '饭', 'fàn', 'cơm / bữa ăn', '吃早饭。', 'chī zǎo fàn', 'Ăn sáng đi.', 'Bữa sáng'],
      ['men', '门', 'mén', 'cửa', '关门。', 'guān mén', 'Đóng cửa.', 'Ra khỏi nhà'],
      ['zou', '走', 'zǒu', 'đi', '我们走吧。', 'wǒ men zǒu ba', 'Mình đi thôi.', 'Bắt đầu đi'],
    ],
  },
  {
    id: 'noon',
    title: 'Buổi trưa',
    focus: 'Ăn uống và yêu cầu trong nhà',
    minimumOutcomes: [
      'nghe hiểu 6 câu ăn uống',
      'nói lại 6 câu ngắn',
      'phản xạ gọi đồ ăn/uống cơ bản',
      'không cần nhớ mặt chữ',
    ],
    items: [
      ['wo-yao', '要', 'yào', 'muốn / cần', '我要水。', 'wǒ yào shuǐ', 'Con muốn nước.', 'Muốn uống nước'],
      ['chi', '吃', 'chī', 'ăn', '我要吃饭。', 'wǒ yào chī fàn', 'Con muốn ăn cơm.', 'Nói khi đói'],
      ['he', '喝', 'hē', 'uống', '我要喝水。', 'wǒ yào hē shuǐ', 'Con muốn uống nước.', 'Nói khi khát'],
      ['e', '饿', 'è', 'đói', '我饿了。', 'wǒ è le', 'Con đói rồi.', 'Báo đang đói'],
      ['ke', '渴', 'kě', 'khát', '我渴了。', 'wǒ kě le', 'Con khát rồi.', 'Báo đang khát'],
      ['wan-bowl', '碗', 'wǎn', 'bát', '给我碗。', 'gěi wǒ wǎn', 'Cho con cái bát.', 'Xin đồ trên bàn'],
      ['kuai-zi', '筷子', 'kuài zi', 'đũa', '给我筷子。', 'gěi wǒ kuài zi', 'Cho con đũa.', 'Xin đũa'],
      ['tang', '汤', 'tāng', 'canh', '我要汤。', 'wǒ yào tāng', 'Con muốn canh.', 'Xin canh'],
      ['rou', '肉', 'ròu', 'thịt', '我要肉。', 'wǒ yào ròu', 'Con muốn thịt.', 'Xin món ăn'],
      ['cai', '菜', 'cài', 'rau / món ăn', '多吃菜。', 'duō chī cài', 'Ăn nhiều rau.', 'Nhắc ăn rau'],
      ['hao-chi', '好吃', 'hǎo chī', 'ngon', '很好吃。', 'hěn hǎo chī', 'Rất ngon.', 'Khen món ăn'],
      ['bao', '饱', 'bǎo', 'no', '我饱了。', 'wǒ bǎo le', 'Con no rồi.', 'Kết thúc bữa ăn'],
    ],
  },
  {
    id: 'afternoon',
    title: 'Buổi chiều',
    focus: 'Đi học về, nghỉ ngơi, làm bài',
    minimumOutcomes: [
      'nghe hiểu 5 câu sau giờ học',
      'nói lại 5 câu về cảm giác và việc cần làm',
      'phản xạ trả lời đã về, mệt, muốn nghỉ',
      'không cần nhớ mặt chữ',
    ],
    items: [
      ['hui-lai', '回来', 'huí lái', 'trở về', '我回来了。', 'wǒ huí lái le', 'Con về rồi.', 'Về tới nhà'],
      ['lei', '累', 'lèi', 'mệt', '我累了。', 'wǒ lèi le', 'Con mệt rồi.', 'Sau giờ học'],
      ['re', '热', 'rè', 'nóng', '太热了。', 'tài rè le', 'Nóng quá.', 'Thời tiết nóng'],
      ['leng', '冷', 'lěng', 'lạnh', '有点冷。', 'yǒu diǎn lěng', 'Hơi lạnh.', 'Thời tiết lạnh'],
      ['xiu-xi', '休息', 'xiū xi', 'nghỉ ngơi', '休息一下。', 'xiū xi yí xià', 'Nghỉ một chút.', 'Muốn nghỉ'],
      ['zuo', '做', 'zuò', 'làm', '做作业。', 'zuò zuò yè', 'Làm bài tập.', 'Nhắc học bài'],
      ['kan', '看', 'kàn', 'xem / nhìn', '看这里。', 'kàn zhè lǐ', 'Nhìn đây.', 'Gọi chú ý'],
      ['ting', '听', 'tīng', 'nghe', '听我说。', 'tīng wǒ shuō', 'Nghe bố nói.', 'Nhắc lắng nghe'],
      ['deng', '等', 'děng', 'đợi', '等一下。', 'děng yí xià', 'Đợi một chút.', 'Xin chờ'],
      ['xian-zai', '现在', 'xiàn zài', 'bây giờ', '现在做。', 'xiàn zài zuò', 'Làm bây giờ.', 'Bắt đầu làm việc'],
      ['hao', '好', 'hǎo', 'được / tốt', '好，我知道。', 'hǎo, wǒ zhī dào', 'Vâng, con biết rồi.', 'Đáp lại lời nhắc'],
      ['wan-play', '玩', 'wán', 'chơi', '我想玩。', 'wǒ xiǎng wán', 'Con muốn chơi.', 'Xin thời gian chơi'],
    ],
  },
  {
    id: 'evening',
    title: 'Buổi tối',
    focus: 'Tắm, ngủ, cảm xúc, nói chuyện trong nhà',
    minimumOutcomes: [
      'nghe hiểu 6 câu tối thường dùng',
      'nói lại được câu về tắm, ngủ, cảm xúc',
      'phản xạ chúc ngủ ngon và trả lời lời nhắc',
      'không cần nhớ mặt chữ',
    ],
    items: [
      ['xi-zao', '洗澡', 'xǐ zǎo', 'tắm', '去洗澡。', 'qù xǐ zǎo', 'Đi tắm đi.', 'Nhắc đi tắm'],
      ['shui-jiao', '睡觉', 'shuì jiào', 'ngủ', '该睡觉了。', 'gāi shuì jiào le', 'Đến giờ ngủ rồi.', 'Giờ đi ngủ'],
      ['wan-an', '晚安', 'wǎn ān', 'ngủ ngon', '晚安。', 'wǎn ān', 'Ngủ ngon.', 'Chúc ngủ ngon'],
      ['pa', '怕', 'pà', 'sợ', '我怕。', 'wǒ pà', 'Con sợ.', 'Nói cảm xúc'],
      ['kai-xin', '开心', 'kāi xīn', 'vui', '我很开心。', 'wǒ hěn kāi xīn', 'Con rất vui.', 'Nói cảm xúc tốt'],
      ['bu', '不', 'bù', 'không', '我不要。', 'wǒ bú yào', 'Con không muốn.', 'Từ chối lịch sự'],
      ['yao', '要', 'yào', 'muốn', '我要这个。', 'wǒ yào zhè ge', 'Con muốn cái này.', 'Chọn đồ'],
      ['zhe-ge', '这个', 'zhè ge', 'cái này', '这个很好。', 'zhè ge hěn hǎo', 'Cái này tốt.', 'Chỉ đồ vật'],
      ['na-ge', '那个', 'nà ge', 'cái kia', '我要那个。', 'wǒ yào nà ge', 'Con muốn cái kia.', 'Chỉ đồ vật xa'],
      ['ba-ba', '爸爸', 'bà ba', 'bố', '爸爸，来。', 'bà ba, lái', 'Bố ơi, lại đây.', 'Gọi bố'],
      ['ma-ma', '妈妈', 'mā ma', 'mẹ', '妈妈，帮我。', 'mā ma, bāng wǒ', 'Mẹ ơi, giúp con.', 'Xin giúp'],
      ['bang', '帮', 'bāng', 'giúp', '帮我一下。', 'bāng wǒ yí xià', 'Giúp con một chút.', 'Xin giúp đỡ'],
    ],
  },
  {
    id: 'outside',
    title: 'Ra ngoài',
    focus: 'Đi đường, mua đồ, hỏi đáp đơn giản',
    minimumOutcomes: [
      'nghe hiểu 6 câu khi ra ngoài',
      'nói lại câu chào hỏi, cảm ơn, xin lỗi',
      'phản xạ được khi hỏi giá, đi đâu, muốn mua gì',
      'không cần nhớ mặt chữ',
    ],
    items: [
      ['ni-hao', '你好', 'nǐ hǎo', 'xin chào', '你好。', 'nǐ hǎo', 'Xin chào.', 'Chào người khác'],
      ['xie-xie', '谢谢', 'xiè xie', 'cảm ơn', '谢谢你。', 'xiè xie nǐ', 'Cảm ơn bạn.', 'Nói cảm ơn'],
      ['dui-bu-qi', '对不起', 'duì bu qǐ', 'xin lỗi', '对不起。', 'duì bu qǐ', 'Xin lỗi.', 'Nói xin lỗi'],
      ['mei-guan-xi', '没关系', 'méi guān xi', 'không sao', '没关系。', 'méi guān xi', 'Không sao.', 'Đáp lại xin lỗi'],
      ['duo-shao-qian', '多少钱', 'duō shǎo qián', 'bao nhiêu tiền', '多少钱？', 'duō shǎo qián', 'Bao nhiêu tiền?', 'Hỏi giá'],
      ['mai', '买', 'mǎi', 'mua', '我要买这个。', 'wǒ yào mǎi zhè ge', 'Con muốn mua cái này.', 'Mua đồ'],
      ['qu', '去', 'qù', 'đi', '去哪里？', 'qù nǎ lǐ', 'Đi đâu?', 'Hỏi điểm đến'],
      ['na-li', '哪里', 'nǎ lǐ', 'ở đâu', '厕所在哪里？', 'cè suǒ zài nǎ lǐ', 'Nhà vệ sinh ở đâu?', 'Hỏi vị trí'],
      ['che', '车', 'chē', 'xe', '车来了。', 'chē lái le', 'Xe đến rồi.', 'Khi chờ xe'],
      ['man', '慢', 'màn', 'chậm', '慢一点。', 'màn yì diǎn', 'Chậm một chút.', 'Nhắc đi chậm'],
      ['xiao-xin', '小心', 'xiǎo xīn', 'cẩn thận', '小心！', 'xiǎo xīn', 'Cẩn thận!', 'Cảnh báo nhanh'],
      ['zai-jian', '再见', 'zài jiàn', 'tạm biệt', '再见。', 'zài jiàn', 'Tạm biệt.', 'Chào tạm biệt'],
    ],
  },
]

export const dailyLessonStages = rawStages.map((stage) => ({
  ...stage,
  items: stage.items.map(([id, chinese, pinyin, meaning, phrase, phrasePinyin, phraseMeaning, cue]) => ({
    id: `seed-${stage.id}-${id}`,
    stageId: stage.id,
    chinese,
    pinyin,
    meaning,
    phrase,
    phrasePinyin,
    phraseMeaning,
    cue,
    tags: ['nghe-noi', stage.title.toLowerCase()],
  })),
}))

export const seededVocabulary = dailyLessonStages.flatMap((stage) =>
  stage.items.map((item) => ({
    id: item.id,
    chinese: item.chinese,
    pinyin: item.pinyin,
    meaning: item.meaning,
    example: item.phrase,
    examplePinyin: item.phrasePinyin,
    exampleMeaning: item.phraseMeaning,
    phrase: item.phrase,
    phrasePinyin: item.phrasePinyin,
    phraseMeaning: item.phraseMeaning,
    cue: item.cue,
    tags: item.tags,
    addedBy: 'seed',
    addedAt: '2026-05-09',
  })),
)

export function getItemPracticeGoals(item) {
  return [
    `Nghe hiểu khi gặp tình huống: ${item.cue}`,
    `Nói lại được: ${item.phrasePinyin}`,
    `Biết nghĩa tiếng Việt: ${item.phraseMeaning}`,
    'Phản xạ trong dưới 4 giây, không cần nhớ mặt chữ',
  ]
}

function getThirtyDayStudyPlan() {
  const plan = []
  const allItems = dailyLessonStages.flatMap((stage) =>
    stage.items.map((item, indexInStage) => ({
      ...item,
      stageTitle: stage.title,
      stageFocus: stage.focus,
      indexInStage,
    })),
  )

  for (let index = 0; index < allItems.length; index += 4) {
    const items = allItems.slice(index, index + 4)
    const day = plan.length + 1
    plan.push({
      day,
      type: 'new',
      stageId: items[0].stageId,
      stageTitle: items[0].stageTitle,
      itemStartIndex: items[0].indexInStage,
      title: `Ngày ${day}: ${items[0].stageTitle}`,
      focus: items[0].stageFocus,
      items,
      minimumGoals: [
        `30 phút: Nghe hiểu ${items.length} câu mới`,
        'Nói lại từng câu đạt tối thiểu 70 điểm',
        'Phản xạ nói được khi nhìn tình huống tiếng Việt',
        'Ôn lại bài hôm trước trong 2 phút',
      ],
    })
  }

  for (let reviewIndex = 0; reviewIndex < 15; reviewIndex += 1) {
    const start = (reviewIndex * 4) % allItems.length
    const items = allItems.slice(start, start + 4)
    const day = plan.length + 1
    plan.push({
      day,
      type: 'review',
      stageId: items[0].stageId,
      stageTitle: items[0].stageTitle,
      itemStartIndex: items[0].indexInStage,
      title: `Ngày ${day}: Ôn phản xạ`,
      focus: 'Ôn xoay vòng, nói nhanh hơn, nghe không nhìn pinyin trước.',
      items,
      minimumGoals: [
        `30 phút: Nghe lại ${items.length} câu đã học`,
        'Nói lại từng câu đạt tối thiểu 80 điểm',
        'Phản xạ trong dưới 4 giây khi chỉ nhìn nghĩa tiếng Việt',
        'Tự nói liền 4 câu không nhìn chữ Hán',
      ],
    })
  }

  return plan
}

export const learningRoadmap = [
  {
    title: 'Tháng 1: Gia đình nền tảng',
    target: 'Nắm 60 câu/cụm lõi trong gia đình, ăn uống, sinh hoạt và ra ngoài rất cơ bản.',
    outcomes: ['Nghe và nói 4 câu/ngày', 'Phản xạ câu quen thuộc dưới 4 giây', 'Không yêu cầu nhớ mặt chữ'],
  },
  {
    title: 'Tháng 2: Gia đình mở rộng',
    target: 'Mở rộng chủ đề sức khỏe, cảm xúc, học tập, thói quen, yêu cầu và câu trả lời trong nhà.',
    outcomes: ['Tự nói theo tình huống tiếng Việt', 'Ghép 2-3 câu thành đoạn ngắn', 'Ôn xoay vòng câu tháng 1'],
  },
  {
    title: 'Tháng 3: Du lịch cơ bản',
    target: 'Chuẩn bị nghe nói khi đi sân bay, khách sạn, taxi, nhà hàng, mua đồ, hỏi đường và cần giúp đỡ.',
    outcomes: ['Hỏi đáp tình huống du lịch cơ bản', 'Nghe hiểu câu chậm/rõ', 'Hội thoại mini 1-2 phút'],
  },
]

const expansionTopics = [
  'Sức khỏe và cảm giác trong người',
  'Bài tập, trường lớp, thời gian học',
  'Việc nhà và yêu cầu giúp đỡ',
  'Cảm xúc, khen, xin lỗi trong gia đình',
  'Thói quen buổi sáng và buổi tối',
  'Nói điều muốn, không muốn, chưa hiểu',
  'Hỏi vị trí đồ vật trong nhà',
  'Mua đồ nhỏ gần nhà',
  'Gọi điện và nhắn người thân',
  'Ôn phản xạ gia đình tổng hợp',
]

const travelTopics = [
  'Sân bay và giấy tờ',
  'Taxi, đi đường, hỏi địa chỉ',
  'Khách sạn và nhận phòng',
  'Nhà hàng, gọi món, đồ uống',
  'Mua đồ, hỏi giá, thanh toán',
  'Hỏi đường, nhà vệ sinh, giờ mở cửa',
  'Đi tàu xe, điểm đến, thời gian',
  'Tình huống bị lạc và cần giúp đỡ',
  'Sức khỏe, dị ứng, khẩn cấp',
  'Ôn hội thoại du lịch tổng hợp',
]

export function getDailyStudyPlan() {
  const starterPlan = getThirtyDayStudyPlan().map((day) => ({
    ...day,
    phase: 'family-foundation',
    title: day.type === 'review' ? `Ngày ${day.day}: Ôn phản xạ gia đình` : `Ngày ${day.day}: Gia đình nền tảng`,
    minimumGoals:
      day.type === 'review'
        ? [
            `30 phút: Nghe lại ${day.items.length} câu đã học`,
            'Nói lại từng câu đạt tối thiểu 80 điểm',
            'Phản xạ trong dưới 4 giây khi chỉ nhìn nghĩa tiếng Việt',
            'Tự nói liền 4 câu không nhìn chữ Hán',
          ]
        : [
            `30 phút: Nghe hiểu ${day.items.length} câu mới`,
            'Nói lại từng câu đạt tối thiểu 70 điểm',
            'Phản xạ nói được khi nhìn tình huống tiếng Việt',
            'Ôn lại bài hôm trước trong 2 phút',
          ],
  }))
  const plan = [...starterPlan]
  const allItems = dailyLessonStages.flatMap((stage) =>
    stage.items.map((item, indexInStage) => ({
      ...item,
      stageTitle: stage.title,
      stageFocus: stage.focus,
      indexInStage,
    })),
  )

  for (let dayIndex = 0; dayIndex < 30; dayIndex += 1) {
    const start = (dayIndex * 4) % allItems.length
    const items = allItems.slice(start, start + 4)
    const day = plan.length + 1
    const topic = expansionTopics[dayIndex % expansionTopics.length]
    plan.push({
      day,
      type: 'expansion',
      phase: 'family-expansion',
      stageId: items[0].stageId,
      stageTitle: items[0].stageTitle,
      itemStartIndex: items[0].indexInStage,
      title: `Ngày ${day}: Gia đình mở rộng`,
      focus: topic,
      items,
      minimumGoals: [
        `30 phút: Học 4 mẫu theo chủ đề ${topic}`,
        'Nghe hiểu khi không nhìn pinyin trước',
        'Nói lại từng câu đạt tối thiểu 80 điểm',
        'Phản xạ bằng 2 câu liên tiếp trong tình huống gia đình',
      ],
    })
  }

  const outsideItems = allItems.filter((item) => item.stageId === 'outside')
  for (let dayIndex = 0; dayIndex < 30; dayIndex += 1) {
    const items = Array.from({ length: 4 }, (_, offset) => outsideItems[(dayIndex * 4 + offset) % outsideItems.length])
    const day = plan.length + 1
    const topic = travelTopics[dayIndex % travelTopics.length]
    plan.push({
      day,
      type: 'travel',
      phase: 'travel-basic',
      stageId: 'outside',
      stageTitle: 'Du lịch cơ bản',
      itemStartIndex: items[0].indexInStage,
      title: `Ngày ${day}: Du lịch - ${topic}`,
      focus: topic,
      items,
      minimumGoals: [
        `30 phút: Luyện 4 mẫu du lịch chủ đề ${topic}`,
        'Nghe hiểu câu chậm/rõ trong tình huống du lịch',
        'Nói lại từng câu đạt tối thiểu 80 điểm',
        'Phản xạ hỏi hoặc trả lời được một nhu cầu du lịch cơ bản',
      ],
    })
  }

  return plan
}
