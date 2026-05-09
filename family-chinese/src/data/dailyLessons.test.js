import test from 'node:test'
import assert from 'node:assert/strict'
import {
  dailyLessonStages,
  getDailyStudyPlan,
  getItemPracticeGoals,
  learningRoadmap,
  seededVocabulary,
} from './dailyLessons.js'

test('seeded daily lessons focus on listening and speaking outcomes', () => {
  assert.equal(dailyLessonStages.length, 5)

  for (const stage of dailyLessonStages) {
    assert.ok(stage.minimumOutcomes.some((goal) => goal.includes('nghe')))
    assert.ok(stage.minimumOutcomes.some((goal) => goal.includes('nói') || goal.includes('đọc lại')))
    assert.ok(stage.minimumOutcomes.some((goal) => goal.includes('không cần nhớ mặt chữ')))
  }
})

test('seeded vocabulary contains enough short daily-life speaking items with pinyin', () => {
  assert.ok(seededVocabulary.length >= 60)

  for (const item of seededVocabulary) {
    assert.ok(item.id.startsWith('seed-'))
    assert.ok(item.pinyin.trim().length > 0)
    assert.ok(item.meaning.trim().length > 0)
    assert.ok(item.examplePinyin.trim().length > 0)
    assert.ok(item.exampleMeaning.trim().length > 0)
    assert.ok(item.tags.includes('nghe-noi'))
  }
})

test('first week starts with family names and numbers before daily routines', () => {
  assert.equal(dailyLessonStages[0].id, 'family')
  assert.equal(dailyLessonStages[1].id, 'numbers')

  const firstWeekIds = getDailyStudyPlan().slice(0, 7).flatMap((day) => day.items.map((item) => item.id))
  assert.ok(firstWeekIds.includes('seed-family-ba-ba'))
  assert.ok(firstWeekIds.includes('seed-family-ma-ma'))
  assert.ok(firstWeekIds.includes('seed-family-a-yi'))
  assert.ok(firstWeekIds.includes('seed-numbers-shi-er'))
})

test('daily routine examples use natural contextual sentences', () => {
  const allItems = dailyLessonStages.flatMap((stage) => stage.items)
  const drinkWater = allItems.find((item) => item.id === 'seed-morning-he-shui')
  const brushTeeth = allItems.find((item) => item.id === 'seed-morning-shua-ya')
  const closeDoor = allItems.find((item) => item.id === 'seed-morning-guan-men')

  assert.equal(drinkWater.phrase, '我要喝水。')
  assert.equal(drinkWater.phraseMeaning, 'Con muốn uống nước.')
  assert.equal(brushTeeth.phraseMeaning, 'Vũ đánh răng chưa?')
  assert.equal(closeDoor.phraseMeaning, 'Bố đóng cửa lại nhé.')
})

test('learning roadmap covers three months of outcomes', () => {
  assert.equal(learningRoadmap.length, 3)
  assert.ok(learningRoadmap.some((item) => item.title.includes('Tháng 1')))
  assert.ok(learningRoadmap.some((item) => item.title.includes('Tháng 2')))
  assert.ok(learningRoadmap.some((item) => item.title.includes('Tháng 3')))
})

test('each lesson item has concrete practice goals', () => {
  const firstItem = dailyLessonStages[0].items[0]
  const goals = getItemPracticeGoals(firstItem)

  assert.equal(goals.length, 4)
  assert.ok(goals.some((goal) => goal.includes(firstItem.cue)))
  assert.ok(goals.some((goal) => goal.includes(firstItem.phrasePinyin)))
  assert.ok(goals.some((goal) => goal.includes('không cần nhớ mặt chữ')))
})

test('daily study plan gives one 30-minute guided assignment for each of 90 days', () => {
  const plan = getDailyStudyPlan()

  assert.equal(plan.length, 90)
  assert.equal(plan[0].day, 1)
  assert.equal(plan[89].day, 90)

  for (const day of plan) {
    assert.equal(day.items.length, 4)
    assert.ok(day.stageId)
    assert.ok(day.title.includes(`Ngày ${day.day}`))
    assert.ok(day.minimumGoals.some((goal) => goal.includes('Nghe')))
    assert.ok(day.minimumGoals.some((goal) => goal.includes('Nói lại')))
    assert.ok(day.minimumGoals.some((goal) => goal.includes('Phản xạ')))
    assert.ok(day.minimumGoals.some((goal) => goal.includes('30 phút')))
  }
})

test('first 15 days of daily study plan cover all seeded lesson items in order', () => {
  const planIds = getDailyStudyPlan().slice(0, 15).flatMap((day) => day.items.map((item) => item.id))
  const lessonIds = dailyLessonStages.flatMap((stage) => stage.items.map((item) => item.id))

  assert.deepEqual(planIds, lessonIds)
})

test('three month study plan has family, expansion, and travel phases', () => {
  const plan = getDailyStudyPlan()

  assert.equal(plan.filter((day) => day.phase === 'family-foundation').length, 30)
  assert.equal(plan.filter((day) => day.phase === 'family-expansion').length, 30)
  assert.equal(plan.filter((day) => day.phase === 'travel-basic').length, 30)
  assert.ok(plan.slice(60).every((day) => day.title.includes('Du lịch')))
})
