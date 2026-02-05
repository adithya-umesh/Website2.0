// Script to create the embedx2_registrations table in Supabase
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function createTable() {
  // Check if table exists
  const { data, error: checkError } = await supabase
    .from('pg_tables')
    .select('tablename')
    .eq('tablename', 'embedx2_registrations');
  if (checkError) {
    console.error('Error checking table existence:', checkError);
    return;
  }
  if (data && data.length > 0) {
    console.log('Table already exists.');
    return;
  }
  // Only create if not exists
  const sql = `
    CREATE TABLE embedx2_registrations (
      id BIGSERIAL PRIMARY KEY,
      team_name TEXT,
      leader_name TEXT,
      leader_email TEXT,
      leader_phone TEXT,
      campus TEXT,
      members JSONB,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
  const { error } = await supabase.rpc('execute_sql', { sql });
  if (error) {
    console.error('Error creating table:', error);
  } else {
    console.log('Table created.');
  }
}

createTable();
