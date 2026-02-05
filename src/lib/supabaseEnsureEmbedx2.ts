import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE_KEY) as string;

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

export async function ensureEmbedx2TableAndBucket() {
  // Check table
  const { data: tables, error: tableErr } = await supabaseAdmin.rpc('pg_tables');
  if (tableErr) throw new Error('Could not check tables: ' + tableErr.message);
  const exists = Array.isArray(tables) && tables.some((t: any) => t.tablename === 'embedx2_registrations');
  if (!exists) {
    // Create table if not exists
    await supabaseAdmin.rpc('execute_sql', {
      sql: `CREATE TABLE IF NOT EXISTS embedx2_registrations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        team_name TEXT NOT NULL,
        leader_name TEXT NOT NULL,
        leader_email TEXT NOT NULL,
        leader_phone TEXT NOT NULL,
        campus TEXT,
        members JSONB NOT NULL,
        payment_screenshot_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        attendance BOOLEAN DEFAULT FALSE
      );`
    });
  }
  // Check bucket
  const { data: buckets, error: bucketErr } = await supabaseAdmin.storage.listBuckets();
  if (bucketErr) throw new Error('Could not check buckets: ' + bucketErr.message);
  if (!buckets.some((b: any) => b.name === 'embedx2')) {
    await supabaseAdmin.storage.createBucket('embedx2', { public: true });
  }
}

// Call this in your server start or API handler
