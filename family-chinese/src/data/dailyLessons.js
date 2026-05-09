const rawStages = [
  {
    id: 'family',
    title: 'Gia đình',
    focus: 'Cách gọi người trong nhà để ghép vào câu nói hằng ngày',
    minimumOutcomes: [
      'nghe hiểu 8 cách gọi người thân',
      'nói lại được cách gọi ba, mẹ, anh, chị, ông, bà',
      'phản xạ gọi đúng người trong nhà dưới 4 giây',
      'không cần nhớ mặt chữ',
    ],
    items: [
      ['wo', '我', 'wǒ', 'con / tôi', '我是武。', 'wǒ shì wǔ', 'Con là Vũ.', 'Tự xưng khi nói trong nhà'],
      ['ba-ba', '爸爸', 'bà ba', 'ba / bố', '爸爸来了。', 'bà ba lái le', 'Bố đến rồi.', 'Gọi hoặc nhắc tới bố'],
      ['ma-ma', '妈妈', 'mā ma', 'mẹ', '妈妈来了。', 'mā ma lái le', 'Mẹ đến rồi.', 'Gọi hoặc nhắc tới mẹ'],
      ['ge-ge', '哥哥', 'gē ge', 'anh trai', '哥哥在这里。', 'gē ge zài zhè lǐ', 'Anh ở đây.', 'Gọi anh trai'],
      ['jie-jie', '姐姐', 'jiě jie', 'chị gái', '姐姐在这里。', 'jiě jie zài zhè lǐ', 'Chị ở đây.', 'Gọi chị gái'],
      ['di-di', '弟弟', 'dì di', 'em trai', '弟弟来了。', 'dì di lái le', 'Em trai đến rồi.', 'Gọi em trai'],
      ['mei-mei', '妹妹', 'mèi mei', 'em gái', '妹妹来了。', 'mèi mei lái le', 'Em gái đến rồi.', 'Gọi em gái'],
      ['ye-ye', '爷爷', 'yé ye', 'ông nội', '爷爷好。', 'yé ye hǎo', 'Chào ông nội.', 'Chào ông nội'],
      ['nai-nai', '奶奶', 'nǎi nai', 'bà nội', '奶奶好。', 'nǎi nai hǎo', 'Chào bà nội.', 'Chào bà nội'],
      ['wai-gong', '外公', 'wài gōng', 'ông ngoại', '外公好。', 'wài gōng hǎo', 'Chào ông ngoại.', 'Chào ông ngoại'],
      ['wai-po', '外婆', 'wài pó', 'bà ngoại', '外婆好。', 'wài pó hǎo', 'Chào bà ngoại.', 'Chào bà ngoại'],
      ['a-yi', '阿姨', 'ā yí', 'cô / dì', '阿姨好。', 'ā yí hǎo', 'Chào cô/dì.', 'Chào cô hoặc dì'],
    ],
  },
  {
    id: 'numbers',
    title: 'Số đếm',
    focus: 'Số 1-12 để đếm đồ, tuổi, giờ và số lượng',
    minimumOutcomes: [
      'nghe hiểu số 1 đến 12',
      'nói lại số rõ thanh điệu',
      'phản xạ đếm đồ vật trong nhà',
      'không cần nhớ mặt chữ',
    ],
    items: [
      ['yi', '一', 'yī', 'một', '一个苹果。', 'yí ge píng guǒ', 'Một quả táo.', 'Đếm một món đồ'],
      ['er', '二', 'èr', 'hai', '两个杯子。', 'liǎng ge bēi zi', 'Hai cái cốc.', 'Đếm hai món đồ'],
      ['san', '三', 'sān', 'ba', '三个碗。', 'sān ge wǎn', 'Ba cái bát.', 'Đếm bát trên bàn'],
      ['si', '四', 'sì', 'bốn', '四本书。', 'sì běn shū', 'Bốn quyển sách.', 'Đếm sách'],
      ['wu', '五', 'wǔ', 'năm', '五分钟。', 'wǔ fēn zhōng', 'Năm phút.', 'Nói thời gian ngắn'],
      ['liu', '六', 'liù', 'sáu', '六点了。', 'liù diǎn le', 'Sáu giờ rồi.', 'Nói giờ'],
      ['qi', '七', 'qī', 'bảy', '七点起床。', 'qī diǎn qǐ chuáng', 'Bảy giờ dậy.', 'Nói giờ dậy'],
      ['ba', '八', 'bā', 'tám', '八点上学。', 'bā diǎn shàng xué', 'Tám giờ đi học.', 'Nói giờ đi học'],
      ['jiu', '九', 'jiǔ', 'chín', '九块钱。', 'jiǔ kuài qián', 'Chín tệ.', 'Nói giá tiền'],
      ['shi', '十', 'shí', 'mười', '十个。', 'shí ge', 'Mười cái.', 'Đếm số lượng'],
      ['shi-yi', '十一', 'shí yī', 'mười một', '十一点睡觉。', 'shí yī diǎn shuì jiào', 'Mười một giờ đi ngủ.', 'Nói giờ ngủ'],
      ['shi-er', '十二', 'shí èr', 'mười hai', '十二点吃饭。', 'shí èr diǎn chī fàn', 'Mười hai giờ ăn cơm.', 'Nói giờ ăn'],
    ],
  },
  {
    id: 'morning',
    title: 'Buổi sáng',
    focus: 'Thức dậy, vệ sinh cá nhân, chuẩn bị đi học bằng câu có chủ ngữ rõ',
    minimumOutcomes: [
      'nghe hiểu 6 câu sáng quen thuộc',
      'nói lại câu có tên người hoặc người thân',
      'phản xạ 3 tình huống buổi sáng dưới 4 giây',
      'không cần nhớ mặt chữ',
    ],
    items: [
      ['zao', '早', 'zǎo', 'sáng / chào buổi sáng', '爸爸早。', 'bà ba zǎo', 'Chào buổi sáng bố.', 'Chào bố buổi sáng'],
      ['qi-chuang', '起床', 'qǐ chuáng', 'dậy / thức dậy', '武，起床了。', 'wǔ, qǐ chuáng le', 'Vũ ơi, dậy thôi.', 'Gọi con dậy'],
      ['xing', '醒', 'xǐng', 'tỉnh dậy', '武醒了吗？', 'wǔ xǐng le ma', 'Vũ dậy chưa?', 'Hỏi con đã tỉnh chưa'],
      ['shua-ya', '刷牙', 'shuā yá', 'đánh răng', '武刷牙了吗？', 'wǔ shuā yá le ma', 'Vũ đánh răng chưa?', 'Kiểm tra trước khi đi'],
      ['xi-lian', '洗脸', 'xǐ liǎn', 'rửa mặt', '武去洗脸。', 'wǔ qù xǐ liǎn', 'Vũ đi rửa mặt đi.', 'Nhắc vệ sinh buổi sáng'],
      ['yi-fu', '衣服', 'yī fu', 'quần áo', '武穿衣服。', 'wǔ chuān yī fu', 'Vũ mặc quần áo đi.', 'Chuẩn bị đi học'],
      ['shu-bao', '书包', 'shū bāo', 'cặp sách', '武拿书包。', 'wǔ ná shū bāo', 'Vũ lấy cặp sách.', 'Trước khi ra cửa'],
      ['he-shui', '喝水', 'hē shuǐ', 'uống nước', '我要喝水。', 'wǒ yào hē shuǐ', 'Con muốn uống nước.', 'Nói khi khát'],
      ['zao-fan', '早饭', 'zǎo fàn', 'bữa sáng', '武吃早饭。', 'wǔ chī zǎo fàn', 'Vũ ăn sáng đi.', 'Bữa sáng'],
      ['guan-men', '关门', 'guān mén', 'đóng cửa', '爸爸关门。', 'bà ba guān mén', 'Bố đóng cửa lại nhé.', 'Ra khỏi nhà'],
      ['kuai', '快', 'kuài', 'nhanh', '武快一点。', 'wǔ kuài yì diǎn', 'Vũ nhanh một chút.', 'Hối nhẹ nhàng'],
      ['zou', '走', 'zǒu', 'đi', '我们走吧。', 'wǒ men zǒu ba', 'Mình đi thôi.', 'Bắt đầu đi'],
    ],
  },
  {
    id: 'meals',
    title: 'Ăn uống',
    focus: 'Nói nhu cầu ăn uống bằng câu đủ nghĩa',
    minimumOutcomes: [
      'nghe hiểu 6 câu ăn uống thường dùng',
      'nói lại câu có con/bố/mẹ và món cần nói',
      'phản xạ xin nước, cơm, bát, đũa rõ nghĩa',
      'không cần nhớ mặt chữ',
    ],
    items: [
      ['yao-he-shui', '喝水', 'hē shuǐ', 'uống nước', '我要喝水。', 'wǒ yào hē shuǐ', 'Con muốn uống nước.', 'Muốn uống nước'],
      ['yao-chi-fan', '吃饭', 'chī fàn', 'ăn cơm', '我要吃饭。', 'wǒ yào chī fàn', 'Con muốn ăn cơm.', 'Nói khi đói'],
      ['e', '饿', 'è', 'đói', '我饿了。', 'wǒ è le', 'Con đói rồi.', 'Báo đang đói'],
      ['ke', '渴', 'kě', 'khát', '我渴了。', 'wǒ kě le', 'Con khát rồi.', 'Báo đang khát'],
      ['wan-bowl', '碗', 'wǎn', 'bát', '给我一个碗。', 'gěi wǒ yí ge wǎn', 'Cho con một cái bát.', 'Xin bát trên bàn'],
      ['kuai-zi', '筷子', 'kuài zi', 'đũa', '给我一双筷子。', 'gěi wǒ yì shuāng kuài zi', 'Cho con một đôi đũa.', 'Xin đũa'],
      ['tang', '汤', 'tāng', 'canh', '我要喝汤。', 'wǒ yào hē tāng', 'Con muốn uống canh.', 'Xin canh'],
      ['rou', '肉', 'ròu', 'thịt', '我要吃肉。', 'wǒ yào chī ròu', 'Con muốn ăn thịt.', 'Xin món ăn'],
      ['cai', '菜', 'cài', 'rau / món ăn', '武多吃菜。', 'wǔ duō chī cài', 'Vũ ăn nhiều rau nhé.', 'Nhắc ăn rau'],
      ['hao-chi', '好吃', 'hǎo chī', 'ngon', '这个很好吃。', 'zhè ge hěn hǎo chī', 'Món này rất ngon.', 'Khen món ăn'],
      ['bao', '饱', 'bǎo', 'no', '我吃饱了。', 'wǒ chī bǎo le', 'Con ăn no rồi.', 'Kết thúc bữa ăn'],
      ['bang', '帮', 'bāng', 'giúp', '妈妈帮我一下。', 'mā ma bāng wǒ yí xià', 'Mẹ giúp con một chút.', 'Xin giúp đỡ'],
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
