# How to make emails work (one-time setup, 3 minutes)

## Step 1 — Create .env.local

Create a file called `.env.local` in the root of the project (same folder as package.json):

```
GMAIL_USER=creatives.gova@gmail.com
GMAIL_APP_PASSWORD=your_app_password_here
```

## Step 2 — Get Gmail App Password

1. Login to **creatives.gova@gmail.com**
2. Go to: https://myaccount.google.com/security
3. Make sure **2-Step Verification** is ON (turn it on if not)
4. Search for **"App passwords"** in the search bar
5. Click it → Select **Mail** → Click **Generate**
6. Copy the 16-character password (e.g. `abcd efgh ijkl mnop`)
7. Paste it in `.env.local` as `GMAIL_APP_PASSWORD` (no spaces)

## Step 3 — Restart server

```bash
# Stop with Ctrl+C then:
npm run dev
```

## That's it!
From now on, any email submitted in the form will:
- Send notification to creatives.gova@gmail.com
- Send confirmation to whoever applied (any email, any Gmail, anywhere)
