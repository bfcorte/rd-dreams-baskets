# R&D Dreams & Baskets — Architecture

## Stack Decisions

| Layer | Choice | Why |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | Built-in i18n routing, zero-config Vercel deploy, SSG + SSR hybrid, file-based API routes |
| **Styling** | Tailwind CSS v3 | Utility-first, design tokens in config, no runtime cost, perfect for one-off landing pages |
| **i18n** | next-intl | First-class App Router support, type-safe translations, locale-aware routing middleware |
| **Forms** | react-hook-form + zod | Performant (uncontrolled), schema-validated, small bundle footprint |
| **Hosting** | Vercel (recommended) | Free tier covers this use case; zero-config Next.js deploy; global CDN |

## URL Structure

| URL | Language | Notes |
|---|---|---|
| `/` | — | Redirects to `/USA` |
| `/USA` | English | Primary market |
| `/BR` | Portuguese (BR) | Brazilian market |

## Design System

Extracted from the R&D Dreams & Baskets logo:

| Token | Hex | Usage |
|---|---|---|
| `cream-200` | `#F5EFE0` | Page background |
| `cream-100` | `#FAF7F0` | Section alternate bg |
| `rust-600` | `#8B3322` | Primary CTA, brand highlight |
| `rust-400` | `#C4624A` | Hover states, accents |
| `gold-400` | `#C49A6C` | Taglines, decorative text |
| `sage-400` | `#7A9B76` | Secondary accents |
| `bark-900` | `#241A0F` | Footer background |
| `bark-800` | `#3D2B1A` | Body text |

**Fonts:**
- Display: Playfair Display (Google Fonts) — headlines, brand name
- Body: Lato (Google Fonts) — all body copy, labels, buttons

**Logo reference:** `public/logo.jpeg`

## Project Structure

```
app/
  layout.tsx              Root layout (metadata)
  globals.css             Global styles + Tailwind imports
  [locale]/
    layout.tsx            Locale-specific layout (NextIntlClientProvider)
    page.tsx              Landing page
  api/
    contact/route.ts      Form submission endpoint → Google Sheets
components/
  Navigation.tsx          Fixed nav, scroll-aware, mobile menu, lang switcher
  HeroSection.tsx         Full-viewport hero with CTA
  ProductsSection.tsx     4-card basket collection grid
  HowItWorksSection.tsx   3-step process
  ContactSection.tsx      Form + WhatsApp card
  WhatsAppFloat.tsx       Fixed bottom-right WhatsApp button
  Footer.tsx              Brand footer with language links
i18n/
  request.ts              next-intl server config
messages/
  USA.json                English copy
  BR.json                 Portuguese copy
middleware.ts             Locale detection + routing
public/
  logo.jpeg               Brand logo (design system reference)
```

## WhatsApp Contact

Number: `+1 (321) 806-5340`
Link format: `https://wa.me/13218065340`

---

## Connecting the Contact Form to Google Sheets

This is a webhook approach using Google Apps Script — no third-party service needed, 100% free.

### Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet.
2. Name it **"R&D Dreams & Baskets — Leads"**.
3. In Row 1, add these headers (exactly):
   ```
   A1: Timestamp
   B1: Name
   C1: Email
   D1: Phone
   E1: Basket Type
   F1: Message
   G1: Language
   ```

### Step 2 — Open Apps Script

1. In the spreadsheet, click **Extensions → Apps Script**.
2. Delete any existing code in the editor.
3. Paste this code:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data  = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp  || new Date().toISOString(),
      data.name       || '',
      data.email      || '',
      data.phone      || '',
      data.basketType || '',
      data.message    || '',
      data.locale     || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — run this manually to verify it works
function testDoPost() {
  var mockEvent = {
    postData: {
      contents: JSON.stringify({
        timestamp:  new Date().toISOString(),
        name:       'Test User',
        email:      'test@example.com',
        phone:      '+1 555 000 0000',
        basketType: 'breakfast',
        message:    'Test submission from Apps Script',
        locale:     'USA',
      })
    }
  };
  var result = doPost(mockEvent);
  Logger.log(result.getContent());
}
```

### Step 3 — Deploy as Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set these options:
   - **Description:** Form webhook v1
   - **Execute as:** Me (your Google account)
   - **Who has access:** Anyone
4. Click **Deploy**.
5. **Authorize** the app when prompted (click "Advanced → Go to [project name] (unsafe)" if needed).
6. Copy the **Web app URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

### Step 4 — Configure the Environment Variable

1. In the project root, create a `.env.local` file (never commit this):
   ```
   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycb.../exec
   ```
2. Replace the URL with the one you copied in Step 3.

### Step 5 — Verify It Works

1. Run the app locally: `npm run dev`
2. Go to `http://localhost:3000/USA` and submit the contact form.
3. Check your Google Sheet — a new row should appear within seconds.

### Step 6 — Production (Vercel)

1. In your [Vercel dashboard](https://vercel.com), go to the project settings.
2. Navigate to **Settings → Environment Variables**.
3. Add:
   - Key: `GOOGLE_SHEETS_WEBHOOK_URL`
   - Value: your Apps Script deployment URL
4. Redeploy.

### Important Notes

- **Redeployment:** If you ever edit the Apps Script code, you must create a **New deployment** (not update the existing one) and update the URL in your env var. Apps Script versioning is immutable.
- **Quota:** Google Apps Script has a free daily execution quota (20,000 calls/day) — more than enough for a landing page.
- **Security:** The endpoint is public but only appends rows — it cannot read or modify your existing data. If you want to add an auth token layer, add a `secret` field to the payload and verify it in the script.

---

## Running Locally

> **Windows note:** The folder name `R&D Cestas` contains `&` which Windows CMD interprets as a command separator,
> breaking `npm run dev`. Use either of these workarounds:

**Option A — Run via Node directly (recommended):**
```bash
node "c:/Users/Bombc/Documents/R&D Cestas/node_modules/next/dist/bin/next" dev
```

**Option B — Move the project to a path without `&`:**
```bash
# e.g., rename to C:\Users\Bombc\Documents\RD-Cestas
npm run dev   # works normally
```

**Setup:**
```bash
npm install --ignore-scripts
cp .env.example .env.local
# Edit .env.local with your Google Sheets webhook URL
```

Open [http://localhost:3000/USA](http://localhost:3000/USA)

## Deploying to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Next.js and handles everything.
Set `GOOGLE_SHEETS_WEBHOOK_URL` in the Vercel dashboard under Environment Variables.
