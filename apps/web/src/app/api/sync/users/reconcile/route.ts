// POST /api/sync/users/reconcile
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.HUB_JWT_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json().catch(() => ({})) as { company_slug?: string; active_emails?: string[] }
  if (!body.company_slug || !Array.isArray(body.active_emails)) {
    return NextResponse.json({ error: 'company_slug and active_emails[] required' }, { status: 400 })
  }
  // fichaje uses taxId (not slug) as company unique key — same convention as /api/sync/clinics
  const company =
    (await prisma.company.findUnique({ where: { taxId: body.company_slug } })) ??
    (await prisma.company.findFirst({ where: { name: body.company_slug } }))
  if (!company) return NextResponse.json({ ok: true, soft_deleted: 0, skipped: 'company not found' })
  const r = await prisma.user.updateMany({
    where: { companyId: company.id, isActive: true, deletedAt: null, email: { notIn: body.active_emails } },
    data:  { isActive: false, deletedAt: new Date() },
  })
  return NextResponse.json({ ok: true, soft_deleted: r.count })
}
