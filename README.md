# GOVA Academy — Redesigned Platform

Next.js 14 · TypeScript · Tailwind CSS · Three.js · GSAP · Resend Email

---

## 🚀 Setup (3 steps)

### 1. Install dependencies
```bash
npm install
```

### 2. Setup Email (Resend — FREE, no Gmail needed)

**a)** Go to [resend.com](https://resend.com) → Sign up (free, no credit card)

**b)** Click **API Keys** → **Create API Key** → copy it

**c)** Create `.env.local` in the root folder:
```
RESEND_API_KEY=re_your_key_here
```

### 3. Run
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## ✉️ How Email Works

When someone submits the application form:
1. `POST /api/apply` receives the data
2. Sends a branded HTML notification → `creatives.gova@gmail.com`
3. Sends a confirmation email → to the applicant
4. Form shows success state

No Gmail App Passwords, no SMTP config — just one API key.

---

## 🚢 Deploy to Vercel

```bash
vercel deploy
```

Then in **Vercel Dashboard → Settings → Environment Variables**, add:
```
RESEND_API_KEY = re_your_key_here
```

---

## 🎨 Design System

- **Background:** `#0a0612` deep space
- **Violet:** `#4c1d95` / `#7c3aed` / `#a78bfa`
- **Orange:** `#f97316` (GOVA accent)
- **Fonts:** Playfair Display (headings) + Inter (body)
- **3D:** Three.js particle field + wireframe shapes + mouse parallax
- **Animations:** GSAP ScrollTrigger on all sections

