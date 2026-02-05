import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE_KEY) as string;
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('embedx2_registrations')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ registrations: data });
}


export async function PATCH(req: Request) {
  const { id, attendance } = await req.json();
  const { data, error } = await supabaseAdmin
    .from('embedx2_registrations')
    .update({ attendance })
    .eq('id', id)
    .select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ updated: data?.[0] });
}

// GET /api/admin/embedx2_registrations?export=hostel
export async function GET_HOSTEL(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get('export') !== 'hostel') return null;
  const { data, error } = await supabaseAdmin
    .from('embedx2_registrations')
    .select('members');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  // Flatten all members with hostel info
  const allMembers = (data || []).flatMap(r => (r.members || []));
  const hostelMembers = allMembers.filter(m => m.hostel && m.hostel.trim());
  // CSV header
  const header = ['name','srn','email','phone','semester','section','department','hostel'];
  const rows = [header.join(',')];
  for (const m of hostelMembers) {
    rows.push(header.map(h => (m[h] || '').replace(/,/g, ' ')).join(','));
  }
  const csv = rows.join('\n');
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="hostel_members.csv"',
    },
  });
}
