import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend('re_WucnK9bX_GehEdhPUZYcWsSjMd8x52TpS')
const GOVA_EMAIL = 'victoriomatt308@gmail.com'

const SHEET_ID = '1PWkejFZn7oQQE4WZYRt_6wQ6kMeSzgoV0uajTn6-n3M'
const CLIENT_EMAIL = 'gova-sheets@gova-499507.iam.gserviceaccount.com'
const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDP5do4iW/YfwTk
46qReh1vlJJ1luGI5YYDpKQUUHQN+WE2Oq8v7RXSdGWI+QtRoJUnUJcLpSzF5Su+
AXRJcxp3ncaYIf9t1y/Lh67GKWki3lrEskuSCw2fTpTUxcvL/IVMcMDoOOzzsd/q
O0c4185FrNu+mYuWYHu8cliK9rY3QPsrjxLZLECnCD4yLKDXa2qMIB436e95xSqE
bnZRQg+siwIqZVmI2U9/TivL3IMbjE5vFriXEAmQ3jpBg4H+NQLm9Wf110WDPkdj
Y1AnxJsbbWtxb4QAgiOvzCq3mnm8g9qWC19naNiQYX0vjrJXO+jJs8MuDyiXlmhh
p6iLx30dAgMBAAECggEAK9ZAtGkuf00RQB5Nag2AxXVjiI3/EnmrT3tY6bupLQUn
nWK0a/um/VBz1HUHEPg2WyrgHqF+ll/jYFY4KgCuVQicxplsncGhH16F2N0EgUi3
hQA/dRUFk1DjixYGCgY+KUchNhZCyIP6Pg6vzumaYhC36THBQD0p+it2Rh8NfwrA
YMbft46Xqi4gFTkhFqJDA9Z7BPd59qmF5HA4+el/dwjTzMKspZbWRTJ9spjl0bGC
/ek8xqcAB3hMcgMTCIIdVY7p44MlMAs9SkVkzlIRcE/EHREJtoOxmddFeLO15tJ5
P+uUvoOUHE29LvELHCPM5G6dcmzyM9OfiEjIWziAVQKBgQDn3Kzb0anIhMVzfKPt
aF51NQphFYO0NEy11EIKpP30w9/wDKlVbOVnNrOslJ7kLDCQGmlRC5E5NQuBKbsy
2azUnV8x5n3gTi6BE/kQnSaPvVL7BocB+4y0D0GYBpFQATZzHzzSK69XXxxhKB5k
WkMUzrLY4d4YmUio6GfHvJ0HAwKBgQDlioL8dpAGj1deVINz11KVJ8fmAuD2X55/
ECHMR4kfgwPUAjv2UlC4p5YzdutcdJ9nRd8YS8qRxZPZmVHW6/jC8JsE+pAy0K8f
VTzg5sOeNcBmEKtJP3Qu9tWJ7fr649jcVRgVofpU06VzO7GynR/JNojDTSEQRoSr
JzbJ97OhXwKBgDaFsvRB+k3XwuKkVZv3Jfcj0NwBhiXzAnLjheAg6kMLaHZ3U75t
zAgYWenkTPTU21qXi1pugOjV622lFYsgmr6ofwEp9UGwwMjDnJbmjXHRkFjNMSQr
NewFhmQsbzFEB7zMhK3bbfD6wZ6rI3Jvs0SKUo4jlulr6iUl+XmDhd1nAoGAXYFc
NI3zw8hWleWlmuXnDT2kT81yaMqw3R/sNLQbZsvPHmk+lewYV/Bk3lgeLo6PdNlg
tRwCy/kJboXncb60mmy7KX8MiLa77+6gGxnGLEfHNYyqye7gXFVOzZ41NEjmyXKc
mgte13lUF6oEjDc3gJcHhU+BHYkseDBEQGf4M88CgYEAxV6NeJzFmmMeNi6kwwYZ
aTn1+jPx+q+2Teah9bq2p+8/O1veAyxjb1cGKmLQZmIjZKLof4nV3DPcZF2xqT03
+SAGi0jRytqWBhwcs5lB1JykIbDp7CBRcGbO6bkLel2pPtNMoeX2xMuR8kCJ5X2z
CSbg1VwvMc7jWSsQkhADRgQ=
-----END PRIVATE KEY-----`

async function appendToSheet(row: string[]) {
  try {
    const now = Math.floor(Date.now() / 1000)
    const header = { alg: 'RS256', typ: 'JWT' }
    const payload = {
      iss: CLIENT_EMAIL,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    }

    const enc = (obj: object) =>
      Buffer.from(JSON.stringify(obj)).toString('base64url')
    const signingInput = `${enc(header)}.${enc(payload)}`

    const keyData = PRIVATE_KEY
      .replace('-----BEGIN PRIVATE KEY-----', '')
      .replace('-----END PRIVATE KEY-----', '')
      .replace(/\s/g, '')

    const binaryKey = Buffer.from(keyData, 'base64')
    const cryptoKey = await crypto.subtle.importKey(
      'pkcs8',
      binaryKey,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['sign']
    )

    const signature = await crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      cryptoKey,
      Buffer.from(signingInput)
    )

    const jwt = `${signingInput}.${Buffer.from(signature).toString('base64url')}`

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
    })
    const tokenData = await tokenRes.json()
    const access_token = tokenData.access_token

    if (!access_token) {
      console.error('No access token:', tokenData)
      return
    }

    const sheetRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A:H:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [row] }),
      }
    )

    if (!sheetRes.ok) {
      const err = await sheetRes.text()
      console.error('Sheet append error:', err)
    } else {
      console.log('✅ Row added to Google Sheet')
    }
  } catch (err) {
    console.error('Sheet error:', err)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, program, experience, message } = body

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required.' },
        { status: 400 }
      )
    }

    const timestamp = new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' })
    const date = new Date().toLocaleDateString('en-PH', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })
    const firstName = name.split(' ')[0]

    // ── 1. Save to Google Sheet ──
    await appendToSheet([
      timestamp,
      name,
      email,
      phone,
      program || '',
      experience || '',
      message || '',
      'New',
    ])

    // ── 2. Email to GOVA team ──
    const teamHtml = `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
  body{font-family:Arial,sans-serif;margin:0;padding:0;background:#f4f4f4;}
  .wrap{max-width:600px;margin:0 auto;padding:32px 16px;}
  .header{background:linear-gradient(135deg,#4c1d95,#1a0038);padding:36px;border-radius:16px 16px 0 0;text-align:center;}
  .logo{font-size:32px;font-weight:900;color:#f97316;}
  .header h1{color:#fff;margin:12px 0 4px;font-size:22px;}
  .header p{color:rgba(255,255,255,0.5);margin:0;font-size:13px;}
  .body{background:#1a0a2e;padding:36px;border-radius:0 0 16px 16px;}
  .badge{display:inline-block;background:rgba(249,115,22,0.2);border:1px solid rgba(249,115,22,0.4);color:#fb923c;padding:4px 14px;border-radius:999px;font-size:11px;font-weight:700;text-transform:uppercase;margin-bottom:24px;}
  .field{margin-bottom:16px;}
  .label{font-size:11px;font-weight:700;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:4px;}
  .value{font-size:16px;color:#fff;font-weight:500;}
  .divider{height:1px;background:rgba(124,58,237,0.3);margin:20px 0;}
  .msgbox{background:rgba(124,58,237,0.15);border:1px solid rgba(124,58,237,0.3);border-radius:10px;padding:16px;color:#d4b8ff;font-size:14px;line-height:1.6;margin-top:6px;}
  .sheetbtn{display:inline-block;margin-top:4px;padding:12px 28px;background:linear-gradient(135deg,#4c1d95,#f97316);color:#fff;font-weight:700;font-size:13px;border-radius:8px;text-decoration:none;}
  .footer{text-align:center;margin-top:24px;color:rgba(255,255,255,0.3);font-size:12px;}
</style></head>
<body><div class="wrap">
  <div class="header">
    <div class="logo">GOVA</div>
    <h1>🎓 New Application Received</h1>
    <p>${date}</p>
  </div>
  <div class="body">
    <span class="badge">🚀 New Applicant</span>
    <div class="field"><div class="label">Full Name</div><div class="value">${name}</div></div>
    <div class="field"><div class="label">Email</div><div class="value"><a href="mailto:${email}" style="color:#a78bfa;">${email}</a></div></div>
    <div class="field"><div class="label">Phone</div><div class="value">${phone}</div></div>
    <div class="divider"></div>
    <div class="field"><div class="label">Program Interest</div><div class="value">${program || 'Not specified'}</div></div>
    ${experience ? `<div class="field"><div class="label">Experience Level</div><div class="value">${experience}</div></div>` : ''}
    ${message ? `<div class="field"><div class="label">Goals & Message</div><div class="msgbox">${message}</div></div>` : ''}
    <div class="divider"></div>
    <div style="text-align:center;">
      <a href="https://docs.google.com/spreadsheets/d/${SHEET_ID}" class="sheetbtn">📊 View All Applications in Google Sheet</a>
    </div>
    <div class="footer">Submitted via GOVA Academy website · Auto-saved to Google Sheets</div>
  </div>
</div></body></html>`

    const confirmHtml = `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
  body{font-family:Arial,sans-serif;margin:0;padding:0;background:#f4f4f4;}
  .wrap{max-width:600px;margin:0 auto;padding:32px 16px;}
  .header{background:linear-gradient(135deg,#4c1d95,#1a0038);padding:36px;border-radius:16px 16px 0 0;text-align:center;}
  .logo{font-size:32px;font-weight:900;color:#f97316;}
  .header h1{color:#fff;margin:12px 0 4px;font-size:22px;}
  .header p{color:rgba(255,255,255,0.5);margin:0;font-size:13px;}
  .body{background:#1a0a2e;padding:36px;border-radius:0 0 16px 16px;color:rgba(255,255,255,0.75);line-height:1.7;}
  .steps{background:rgba(124,58,237,0.1);border:1px solid rgba(124,58,237,0.2);border-radius:12px;padding:20px;margin:20px 0;}
  .step{display:flex;gap:14px;margin-bottom:14px;align-items:flex-start;}
  .num{min-width:28px;height:28px;background:#4c1d95;border-radius:50%;text-align:center;line-height:28px;color:#f97316;font-weight:900;font-size:12px;}
  .footer{text-align:center;margin-top:20px;color:rgba(255,255,255,0.3);font-size:12px;}
</style></head>
<body><div class="wrap">
  <div class="header">
    <div class="logo">GOVA</div>
    <h1>You're In, ${firstName}! 🎉</h1>
    <p>Your application has been received</p>
  </div>
  <div class="body">
    <p>Hi <strong style="color:#fff;">${firstName}</strong>,</p>
    <p>Thank you for applying to <strong style="color:#fff;">GOVA Academy</strong>! We're thrilled you've taken this step.</p>
    <div class="steps">
      <p style="font-weight:700;color:#a78bfa;margin:0 0 14px;font-size:12px;text-transform:uppercase;letter-spacing:.08em;">What happens next</p>
      <div class="step"><div class="num">1</div><div><strong style="color:#fff;">Application Review</strong><br>Our team reviews within 24–48 hours.</div></div>
      <div class="step"><div class="num">2</div><div><strong style="color:#fff;">Consultation Call</strong><br>We'll reach out to schedule a free consultation.</div></div>
      <div class="step"><div class="num">3</div><div><strong style="color:#fff;">Begin Your Journey</strong><br>Start your 30-60-90 Day transformation.</div></div>
    </div>
    <p>Questions? Reply to this email anytime.</p>
    <p style="margin-top:20px;">Rooting for you,<br>
    <strong style="color:#f97316;">Mrs. Wells Fisher</strong><br>
    <span style="color:rgba(255,255,255,0.4);font-size:13px;">Founder & CEO, GOVA Academy</span></p>
    <div class="footer">GOVA Academy · Manila, Philippines</div>
  </div>
</div></body></html>`

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: GOVA_EMAIL,
      replyTo: email,
      subject: `🎓 New Application: ${name} — ${program || 'GOVA Academy'}`,
      html: teamHtml,
    })

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: `You've applied to GOVA Academy, ${firstName}! 🎓`,
      html: confirmHtml,
    })

    return NextResponse.json({
      success: true,
      message: 'Application submitted! Check your email for confirmation.',
    })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to send application. Please try again.' },
      { status: 500 }
    )
  }
}
