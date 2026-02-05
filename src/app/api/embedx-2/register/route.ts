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
        const m = members[i] as any;
        if (!m) continue;
        // Only upload if payment_url is not already set and paymentDataUrl exists
        if (!m.payment_url && m.paymentDataUrl) {
          try {
            const paymentObj = { name: m.paymentName || `payment_${i+1}`, data: m.paymentDataUrl };
            const uploaded = await uploadBase64('embedx2', `${teamName}_payment_member${i+1}`, paymentObj);
            m.payment_url = uploaded;
          } catch (e) {
            console.warn(`Failed to upload payment for member ${i+1}:`, e);
          }
        }
      }
    }

    // Save all form data as JSON in the embedx2 bucket (bucket only, not table)
    const payload: any = {
      team_name: teamName,
      leader_name: teamLeader,
      leader_email: email,
      leader_phone: phone,
      campus: campus || null,
      members: members || [],
      created_at: new Date().toISOString(),
    }

    try {
      const jsonFileName = `${teamName.replace(/\s+/g, '_')}_details.json`;
      const jsonBuffer = Buffer.from(JSON.stringify(payload, null, 2));
      // Upload JSON file to the embedx2 bucket
      const { error: jsonUploadError } = await supabaseAdmin.storage.from('embedx2').upload(jsonFileName, jsonBuffer, { upsert: true, contentType: 'application/json' });
      if (jsonUploadError) {
        console.warn('Failed to upload team details JSON to bucket:', jsonUploadError);
        return NextResponse.json({ error: 'Failed to upload registration JSON', details: jsonUploadError }, { status: 500 });
      }
      return NextResponse.json({ success: true });
    } catch (fileErr) {
      console.warn('Failed to upload registration JSON file:', fileErr);
      return NextResponse.json({ error: 'Failed to upload registration JSON file', details: String(fileErr) }, { status: 500 });
    }
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Unhandled error' }, { status: 500 })
  }
}
