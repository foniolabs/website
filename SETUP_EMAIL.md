# Email Service Setup Guide

This guide will help you set up the email service for your contact form using Resend.

## Step 1: Sign up for Resend

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. The free tier includes:
   - 100 emails per day
   - 3,000 emails per month
   - Perfect for a contact form!

## Step 2: Get Your API Key

1. Log in to your Resend dashboard
2. Go to **API Keys** section
3. Click **Create API Key**
4. Give it a name like "Fonio Labs Website"
5. Copy the API key (it starts with `re_`)

## Step 3: Add API Key to Your Project

1. Create a file named `.env.local` in the root of your project (same level as package.json)
2. Add your API key:

```env
RESEND_API_KEY=re_your_actual_api_key_here
```

3. Save the file
4. **Important**: Never commit this file to git! It's already in `.gitignore`

## Step 4: Verify Your Domain (Optional but Recommended)

For production, you should verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `foniolabs.xyz`)
4. Follow the DNS configuration instructions
5. Once verified, update the API route at `app/api/contact/route.ts`:

```typescript
from: "Fonio Labs <contact@foniolabs.xyz>", // Update this line
```

## Step 5: Test the Contact Form

1. Restart your development server: `npm run dev`
2. Go to http://localhost:3000/contact
3. Fill out and submit the form
4. Check your email at admin@foniolabs.xyz

## Troubleshooting

### Form submits but no email received

1. Check that `.env.local` exists and has the correct API key
2. Check the browser console for errors
3. Check the terminal/server logs for errors
4. Verify the API key is active in Resend dashboard

### "Email service not configured" message

This means the RESEND_API_KEY is not set in your `.env.local` file. The form will still work, but emails won't be sent - they'll just be logged to the console.

## Alternative: Using Gmail SMTP (Not Recommended)

If you prefer to use Gmail, you'll need to:
1. Install nodemailer: `npm install nodemailer`
2. Enable 2-factor authentication on your Gmail account
3. Generate an app-specific password
4. Update the API route to use nodemailer

However, **Resend is recommended** because it:
- Is built specifically for transactional emails
- Has better deliverability
- Is easier to set up
- Has a generous free tier
- Provides better analytics

## Current Status

Without setting up the API key:
- ✅ Contact form works
- ✅ Form validation works
- ✅ Submissions are logged to console
- ❌ Emails are not sent (will show message: "Email service not configured yet")

With API key set up:
- ✅ All of the above
- ✅ Emails sent to admin@foniolabs.xyz
- ✅ Production-ready
