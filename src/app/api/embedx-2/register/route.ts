import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      teamName,
      teamLeader,
      email,
      phone,
      campus,
      members,
    } = body

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
    const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE_KEY) as string
    if (!supabaseUrl || !serviceRoleKey) {
      console.error('Missing Supabase config:', { supabaseUrl: !!supabaseUrl, serviceRoleKey: !!serviceRoleKey })
      return NextResponse.json({ 
        error: 'Supabase not configured (server).',
        details: 'Missing SUPABASE_SERVICE_ROLE or SUPABASE_SERVICE_ROLE_KEY environment variable'
      }, { status: 500 })
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

    const uploadBase64 = async (bucket: string, prefix: string, fileObj: any) => {
      if (!fileObj) return null
      const name = fileObj.name || `${Date.now()}`
      const dataUrl = fileObj.data
      const commaIndex = dataUrl.indexOf(',')
      const base64 = commaIndex >= 0 ? dataUrl.slice(commaIndex + 1) : dataUrl
      const buffer = Buffer.from(base64, 'base64')
      const safeName = `${prefix}_${Date.now()}_${name.replace(/\s+/g, '_')}`

      try {
        // @ts-ignore
        const { error: createErr } = await supabaseAdmin.storage.createBucket(bucket, { public: true })
        if (createErr) {
          console.warn('createBucket error (ignored):', createErr)
        }
      } catch (e) {
        // ignore
      }

      const { error: uploadError } = await supabaseAdmin.storage.from(bucket).upload(safeName, buffer, { upsert: true })
      if (uploadError) throw uploadError
      const publicResult = supabaseAdmin.storage.from(bucket).getPublicUrl(safeName)
      const publicUrl = (publicResult as any)?.data?.publicUrl || null
      return publicUrl
    }

    if (Array.isArray(members)) {
      for (let i = 0; i < members.length; i++) {
        const m = members[i] as any
        if (!m) continue
        const paymentObj = (m.payment as any) || (m.paymentDataUrl ? { name: m.paymentName || `payment_${i+1}`, data: m.paymentDataUrl } : null)
        if (paymentObj && paymentObj.data) {
          try {
            const uploaded = await uploadBase64('embedx2', `${teamName}_payment_member${i+1}`, paymentObj)
            m.payment_url = uploaded
          } catch (e) {
            console.warn(`Failed to upload payment for member ${i+1}:`, e)
          }
        }
      }
    }

    const payload: any = {
      team_name: teamName,
      leader_name: teamLeader,
      leader_email: email,
      leader_phone: phone,
      campus: campus || null,
      members: members || [],
    }

    try {
      const { data, error } = await supabaseAdmin
        .from('embedx2_registrations')
        .insert([payload])
        .select()

      if (error) {
        const code = (error as any)?.code
        if (code === 'PGRST205') {
          return NextResponse.json({
            error: 'DB insert failed - table missing',
            details: error,
            action: 'Create the table "embedx2_registrations" in Supabase with columns team_name, leader_name, leader_email, leader_phone, campus, members (jsonb).'
          }, { status: 500 })
        }

        return NextResponse.json({ error: 'DB insert failed', details: error }, { status: 500 })
      }

      // Save registration as a JSON file in /data/embedx2_registrations
      try {
        const fs = require('fs');
        const path = require('path');
        const outDir = path.join(process.cwd(), 'data', 'embedx2_registrations');
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
        const fileName = `${teamName.replace(/\s+/g, '_')}_${Date.now()}.json`;
        fs.writeFileSync(path.join(outDir, fileName), JSON.stringify(payload, null, 2));
      } catch (fileErr) {
        console.warn('Failed to write registration JSON file:', fileErr);
      }
      return NextResponse.json({ success: true, data: data?.[0] })
    } catch (dbErr) {
      console.error('Unexpected DB error:', dbErr)
      return NextResponse.json({ error: 'Unexpected DB error', details: String(dbErr) }, { status: 500 })
    }
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Unhandled error' }, { status: 500 })
  }
}
