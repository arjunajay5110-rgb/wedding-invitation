# Digital Wedding Invitation Website

A production-ready, mobile-first, and informational-only digital wedding invitation website built with Next.js 16 (App Router), TypeScript, and Tailwind CSS. The website features a bilingual (English / Malayalam) translation system, elegant Kerala Kasavu design, a custom background music player, photo gallery, event schedule timeline, and support for personalized greeting links.

---

## 📁 Project Folder Structure

```text
wedding/
├── public/
│   ├── images/
│   │   ├── kerala_couple.png      # Generated wedding illustration
│   │   ├── kerala_decor.png       # Generated Nilavilakku / lamp decoration
│   │   └── kerala_venue.png       # Generated Kovilakam Palace venue image
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── guest/
│   │   │       └── [guestId]/
│   │   │           └── route.ts   # GET /api/guest/[guestId] (Local guest lookup)
│   │   │   
│   │   ├── invite/
│   │   │   └── [guestId]/
│   │   │       └── page.tsx       # Personalized route (/invite/G001)
│   │   ├── globals.css            # Stylesheets with Tailwind v4 themes
│   │   ├── layout.tsx             # Root layout with Playfair & Outfit fonts
│   │   └── page.tsx               # Generic invitation route (/)
│   ├── components/
│   │   ├── CountdownTimer.tsx     # Low-profile text countdown timer
│   │   ├── KeralaDecorations.tsx  # SVGs: Kasavu border, Nilavilakku, Elephant
│   │   ├── LoadingScreen.tsx      # 2-second Kerala loading animation
│   │   ├── MusicPlayer.tsx        # Styled audio player (play/pause/mute)
│   │   ├── PhotoGallery.tsx       # Grid with full-screen lightbox modal
│   │   ├── ShareButton.tsx        # Mobile web-share API & clipboard copy
│   │   └── VenueSection.tsx       # Localized venue card
│   ├── config/
│   │   └── weddingConfig.ts       # Central config: real wedding details, schedule, and guest list
├── tsconfig.json
├── package.json
└── README.md                      # Setup & Deployment documentation
```

---

## 👥 Adding & Modifying Personalized Guests

Personalized greetings are mapped locally for maximum simplicity (no database setup required). Guests can be accessed via `/invite/{guestId}` (e.g. `/invite/G001`).

To add or modify guests, open [src/config/weddingConfig.ts](file:///c:/Users/user/Documents/wedding/src/config/weddingConfig.ts) and add records inside the `guestList` object:

```typescript
guestList: {
  "G001": {
    guestId: "G001",
    guestName: { 
      en: "Rahul and Family", 
      ml: "രാഹുൽ കൂടാതെ കുടുംബാംഗങ്ങളും" 
    }
  },
  "G002": {
    guestId: "G002",
    guestName: { 
      en: "Keerthi", 
      ml: "കീർത്തി" 
    }
  }
}
```

- **ID**: Set a unique ID key (e.g., `G001`, `G002`). This defines the invitation link: `/invite/G001`.
- **Name (`en`)**: The guest's name displayed when the website is viewed in English.
- **Name (`ml`)**: The guest's name displayed when the website is viewed in Malayalam.

---

## 🚀 Local Development

1. Install the required Node dependencies:
   ```bash
   npm install
   ```

2. Run the local development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   - General invitation: [http://localhost:3000](http://localhost:3000)
   - Personalized invitation: [http://localhost:3000/invite/G001](http://localhost:3000/invite/G001)

---

## ☁️ Vercel Deployment Instructions

Since this website is informational-only and self-contained:
1. **Push your code** to a Git repository (GitHub, GitLab, or Bitbucket).
2. Open your [Vercel Dashboard](https://vercel.com/) and click **Add New > Project**.
3. Import your repository.
4. Click **Deploy**. (No environment variables are required!)
5. Vercel will build the Next.js static and serverless components and deploy your website immediately.
