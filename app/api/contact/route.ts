import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const ContactSchema = z.object({
  name:       z.string().min(1).max(100),
  email:      z.string().email(),
  phone:      z.string().optional(),
  basketType: z.enum(['breakfast', 'mothers-day', 'birthday', 'custom']),
  message:    z.string().min(1).max(1000),
  locale:     z.enum(['USA', 'BR']),
})

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = ContactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 422 })
  }

  const data = parsed.data

  // Forward to Google Sheets via Apps Script webhook
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp:  new Date().toISOString(),
          name:       data.name,
          email:      data.email,
          phone:      data.phone ?? '',
          basketType: data.basketType,
          message:    data.message,
          locale:     data.locale,
        }),
      })
      if (!res.ok) {
        console.error('Sheets webhook error:', await res.text())
      }
    } catch (err) {
      // Log but don't fail — user submitted successfully regardless
      console.error('Failed to reach Google Sheets webhook:', err)
    }
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
