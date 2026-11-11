import { Explorer } from './explorer'
import { getPublicReports } from '@/lib/report-store'

export const dynamic = 'force-dynamic'

export default function ExplorationPage() {
  return <Explorer publicReports={getPublicReports()} />
}
