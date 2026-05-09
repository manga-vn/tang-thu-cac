'use client'

import dynamic from 'next/dynamic'

const FamilyChineseApp = dynamic(
  () => import('./FamilyChineseApp'),
  { ssr: false }
)

export default function FamilyChineseClientLoader() {
  return <FamilyChineseApp />
}
