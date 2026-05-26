// POST /api/sync/companies/reconcile
// fichaje stores company key as `taxId` (Hub's company_slug). active_slugs == taxIds.
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.HUB_JWT_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json().catch(() => ({})) as { active_slugs?: string[] }
  if (!Array.isArray(body.active_slugs)) {
    return NextResponse.json({ error: 'active_slugs[] required' }, { status: 400 })
  }
  const r = await prisma.company.updateMany({
    where: { isActive: true, deletedAt: null, taxId: { notIn: body.active_slugs } },
    data:  { isActive: false, deletedAt: new Date() },
  })
  return NextResponse.json({ ok: true, soft_deleted: r.count })
}
