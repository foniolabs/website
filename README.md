# Fonio Labs Website

A modern, responsive website for Fonio Labs - a research-driven company building user-friendly tools around Web3 and AI.

## 🚀 Live Site

- **Production**: Coming soon at [foniolabs.xyz](https://foniolabs.xyz)
- **Preview**: Deploy preview available after setup

## ✨ Features

- **Modern Design**: Level USD-inspired design with smooth animations
- **Fully Responsive**: Works perfectly on all devices
- **Contact Form**: Email integration with Resend
- **SEO Optimized**: Meta tags and semantic HTML
- **Custom 404 Page**: User-friendly error pages
- **TypeScript**: Type-safe codebase
- **Performance**: Optimized with Next.js 16

## 📄 Pages

- `/` - Homepage (Hero, Mission, Solutions, Why Fonio Labs)
- `/about` - About page (Story, Vision, Values)
- `/team` - Team page (Meet the founder)
- `/contact` - Contact form
- `/docs` - Documentation
- `/transparency` - Transparency & Open Source commitment

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Email**: Resend
- **Fonts**: Space Grotesk, JetBrains Mono
- **Hosting**: GO54 / Vercel

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/foniolabs-website.git

# Navigate to project directory
cd foniolabs-website

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Add your environment variables to .env.local
# RESEND_API_KEY=your_api_key_here

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
RESEND_API_KEY=re_your_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

See `.env.local.example` and `.env.production.example` for templates.

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm start               # Start production server

# Deployment to GO54
npm run deploy:go54      # Build and show upload instructions
npm run deploy:go54:ssh  # Automated SSH deployment to GO54

# Deployment to Vercel
npm run deploy:vercel    # Deploy to production (Vercel)
npm run deploy:preview   # Deploy preview (Vercel)

# Code Quality
npm run lint            # Run ESLint
```

## 🚀 Deployment

### Option 1: Deploy to GO54 (Recommended for this project)

**GO54** is West Africa's largest web hosting provider, perfect for Nigerian businesses.

#### Quick Start (10 minutes)
See [QUICK_START_GO54.md](./QUICK_START_GO54.md) for step-by-step instructions.

#### Deployment Methods

**Method A: Using cPanel (Easiest)**
```bash
npm run deploy:go54  # Build and get upload instructions
# Then upload files via FTP and configure in cPanel
```

**Method B: Using SSH (Automated)**
```bash
npm run deploy:go54:ssh  # Automated deployment via SSH
```

**Method C: Using Git**
- Push to GitHub
- Clone in cPanel Git interface
- Configure Node.js app

#### Detailed GO54 Guide
See [DEPLOYMENT_GO54.md](./DEPLOYMENT_GO54.md) for comprehensive instructions including:
- Three deployment methods (cPanel, SSH, Git)
- Server configuration
- SSL setup
- Environment variables
- Troubleshooting
- Performance optimization

---

### Option 2: Deploy to Vercel

**Vercel** offers excellent performance with global CDN.

#### Quick Start (5 minutes)
See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for the fastest way to deploy to Vercel.

#### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/foniolabs-website)

#### Detailed Vercel Guide
See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive Vercel deployment instructions.

---

### Comparison: GO54 vs Vercel

| Feature | GO54 | Vercel |
|---------|------|--------|
| **Cost** | ₦20-50k/year (~$25-65) | Free tier available |
| **Location** | Nigeria/Africa | Global CDN |
| **Support** | Local support in Nigeria | Email support |
| **Best For** | Nigerian businesses, local hosting | Global apps, automatic scaling |
| **Setup** | Manual or SSH | One-click |
| **Performance** | Good (regional) | Excellent (global) |

**Recommendation**: Use GO54 if you already have hosting there, otherwise Vercel is simpler.

## 📧 Email Setup

The contact form uses [Resend](https://resend.com) for email delivery.

1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day)
2. Get your API key
3. Add to environment variables
4. See [SETUP_EMAIL.md](./SETUP_EMAIL.md) for detailed setup

## 🎨 Customization

### Update Team Information

Edit [app/team/page.tsx](./app/team/page.tsx):
- Add team member photos to `/public/images/team/`
- Uncomment team member templates
- Update social media links

### Update Content

- **Hero Section**: [app/components/ui/sections/Hero.tsx](./app/components/ui/sections/Hero.tsx)
- **About Content**: [app/about/page.tsx](./app/about/page.tsx)
- **Footer Links**: [app/components/ui/sections/Footer.tsx](./app/components/ui/sections/Footer.tsx)

### Update Branding

- **Colors**: [app/globals.css](./app/globals.css) - Update CSS variables
- **Fonts**: [app/layout.tsx](./app/layout.tsx) - Change font imports
- **Logo**: Add your logo to `/public/images/`

## 📁 Project Structure

```
foniolabs-website/
├── app/
│   ├── about/              # About page
│   ├── api/
│   │   └── contact/        # Contact form API
│   ├── components/
│   │   └── ui/
│   │       └── sections/   # Reusable sections
│   ├── contact/            # Contact page
│   ├── docs/               # Documentation page
│   ├── team/               # Team page
│   ├── transparency/       # Transparency page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── not-found.tsx       # Custom 404
│   └── page.tsx            # Homepage
├── public/
│   ├── images/             # Images and assets
│   └── robots.txt          # SEO robots file
├── .env.local.example      # Environment template
├── DEPLOYMENT.md           # Deployment guide
├── QUICK_DEPLOY.md         # Quick deploy guide
├── SETUP_EMAIL.md          # Email setup guide
└── package.json
```

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Email Not Working
- Check `RESEND_API_KEY` is set
- Verify API key is active in Resend dashboard
- Check contact form submission in browser console

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

## 📄 License

This project is private and proprietary to Fonio Labs.

## 👥 Team

- **Emmanuel Doji** - Founder & CEO
  - [GitHub](https://github.com/web3normad)
  - [Twitter](https://x.com/emmanueldoji)
  - [LinkedIn](https://ng.linkedin.com/in/emmanuel-doji)

## 📞 Contact

- **Email**: admin@foniolabs.xyz
- **Website**: [foniolabs.xyz](https://foniolabs.xyz)

---

Built with ❤️ by Fonio Labs
