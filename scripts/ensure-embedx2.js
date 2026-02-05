const { ensureEmbedx2TableAndBucket } = require('../src/lib/supabaseEnsureEmbedx2');

async function main() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing Supabase config: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }
  try {
    await ensureEmbedx2TableAndBucket();
    console.log('embedx2_registrations table and embedx2 bucket ensured.');
  } catch (e) {
    console.error('Failed to ensure embedx2_registrations table or bucket:', e);
    process.exit(1);
  }
}

main();
