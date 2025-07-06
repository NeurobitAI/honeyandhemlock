
// Admin login credentials for Honey & Hemlock Productions
// These credentials should be created in Supabase Auth manually

export const ADMIN_CREDENTIALS = {
  email: 'admin@honeyandhemlock.productions',
  password: 'Neurobit@123',
  // Alternative admin email (backup)
  alternativeEmail: 'admin'
} as const;

// Note: These credentials need to be manually created in your Supabase Auth dashboard
// Go to: Authentication > Users > Add User
// Use email: admin@honeyandhemlock.productions
// Use password: Neurobit@123
// Make sure to set user_metadata.role = 'admin' for proper role assignment
