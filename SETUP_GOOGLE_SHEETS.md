# Google Sheets Setup (one-time, ~10 minutes)

Every application submitted on the website will automatically appear as a new row in your Google Sheet.

---

## Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) → Create new sheet
2. Name it: **GOVA Applications**
3. Add these headers in Row 1:
   ```
   A1: Timestamp
   B1: Full Name
   C1: Email
   D1: Phone
   E1: Program Interest
   F1: Experience Level
   G1: Message / Goals
   H1: Status
   ```
4. Copy the Sheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/` **THIS_PART_HERE** `/edit`

---

## Step 2 — Create a Google Service Account

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project (e.g. "GOVA Academy")
3. Go to **APIs & Services** → **Enable APIs**
4. Search and enable: **Google Sheets API**
5. Go to **APIs & Services** → **Credentials**
6. Click **Create Credentials** → **Service Account**
7. Name it anything (e.g. "gova-sheets") → Done
8. Click the service account → **Keys** tab → **Add Key** → **JSON**
9. A JSON file will download — open it, you need:
   - `client_email` (looks like: `gova-sheets@project.iam.gserviceaccount.com`)
   - `private_key` (long string starting with `-----BEGIN PRIVATE KEY-----`)

---

## Step 3 — Share the Sheet with Service Account

1. Open your Google Sheet
2. Click **Share** (top right)
3. Paste the `client_email` from the JSON file
4. Set permission to **Editor**
5. Click Send

---

## Step 4 — Add to .env.local

Add these 3 lines to your `.env.local` file:

```
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_CLIENT_EMAIL=gova-sheets@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
```

> ⚠️ The private key must be in quotes and `\n` for newlines (copy exactly from the JSON file's `private_key` field)

---

## Step 5 — Restart server

```bash
npm run dev
```

That's it! Every form submission will now:
1. ✅ Send email to victoriomatt308@gmail.com
2. ✅ Send confirmation to the applicant
3. ✅ Add a new row to your Google Sheet automatically
