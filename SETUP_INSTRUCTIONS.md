# 🔧 AMCV Setup Instructions

## Critical: Fix Password Reset for All Users

### Problem
Password reset emails contain links to `localhost` which won't work for deployed users.

### Solution: Configure Supabase Redirect URLs

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard/project/ypjvnblbqbnecdodiwew
   - Navigate to: **Authentication** → **URL Configuration**

2. **Set Site URL**
   ```
   Production: https://your-domain.com
   Development: http://localhost:3000
   ```

3. **Add Redirect URLs** (Allow list)
   Add these URLs to the "Redirect URLs" section:
   ```
   http://localhost:3000/auth/callback
   http://localhost:3000/auth/reset-password
   https://your-domain.com/auth/callback
   https://your-domain.com/auth/reset-password
   ```

4. **Configure Email Templates** (Optional but Recommended)
   - Go to: **Authentication** → **Email Templates**
   - Edit "Reset Password" template
   - Ensure the link uses: `{{ .ConfirmationURL }}`
   - This will automatically use the correct domain

### Environment Variables

Make sure your `.env.local` has:
```env
NEXT_PUBLIC_SUPABASE_URL=https://ypjvnblbqbnecdodiwew.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Testing Password Reset

**Development:**
```
http://localhost:3000/auth
```
Click "Forgot Password" - should redirect to localhost

**Production:**
```
https://your-domain.com/auth
```
Click "Forgot Password" - should redirect to your domain

---

## Admin Setup

### Make a User Admin

1. Sign up for an account at `/auth`
2. Go to Supabase Dashboard → **SQL Editor**
3. Run this query:
```sql
UPDATE profiles 
SET is_admin = true 
WHERE email = 'your-email@example.com';
```

4. Refresh the app - you'll now see the Admin menu

### Check Admin Status
```sql
SELECT email, is_admin 
FROM profiles 
WHERE is_admin = true;
```

---

## Deployment Checklist

- [ ] Set Supabase Site URL to production domain
- [ ] Add all redirect URLs (callback, reset-password)
- [ ] Configure custom email templates (optional)
- [ ] Set environment variables in hosting platform
- [ ] Test password reset flow
- [ ] Create at least one admin account
- [ ] Test OAuth providers if configured

---

## Common Issues

### "Invalid redirect URL"
- Add the URL to Supabase allowed redirect URLs list

### "Email not sent"
- Check Supabase email settings
- Verify email templates are enabled
- Check spam folder

### Password reset link doesn't work
- Ensure Site URL matches your domain
- Check redirect URLs are configured
- Verify the link hasn't expired (valid for 1 hour)

### Can't access admin panel
- Verify `is_admin = true` in profiles table
- Check user is logged in
- Clear browser cache and cookies
