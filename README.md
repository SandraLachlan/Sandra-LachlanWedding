# Sandra & Lachlan — Romantic Indian Floral Wedding Website

A bespoke, responsive wedding invitation website designed for **Sandra Balan & Lachlan James McLean** celebrating their wedding in **February 2027** in **God's Own Country, Kerala, India**.

Designed with a warm Kerala-inspired aesthetic:
- **Colour Palette:** Ivory and warm cream background, lotus pink & dusty rose accents, pista green highlights, deep forest green text, and antique gold ornamental borders.
- **Visual Elements:** Traditional Kerala brass Nilavilakku (oil lamp), sacred Indian lotus motifs, delicate jasmine garlands (*mullappoo maala*), and gold filigree frames.
- **Tech Stack:** HTML5, CSS3, Vanilla JavaScript (zero build step, zero dependencies, 100% compatible with free GitHub Pages static hosting).

---

## Table of Contents
1. [Project Structure](#1-project-structure)
2. [How to Replace Placeholder Images](#2-how-to-replace-placeholder-images)
3. [How to Add Your Custom MP3 Music](#3-how-to-add-your-custom-mp3-music)
4. [How to Edit Wedding Event Details & Text](#4-how-to-edit-wedding-event-details--text)
5. [How to Connect the RSVP Form to a Free Backend](#5-how-to-connect-the-rsvp-form-to-a-free-backend)
6. [How to Preview the Website Locally](#6-how-to-preview-the-website-locally)
7. [How to Publish Free on GitHub Pages](#7-how-to-publish-free-on-github-pages)

---

## 1. Project Structure

```text
sandra-lachlan-wedding/
├── index.html                 # Main website markup with all sections & modal dialogues
├── style.css                  # Romantic Kerala floral design, typography & responsive layouts
├── script.js                  # Music player, countdown timer, gallery lightbox, RSVP validation & petal canvas
├── README.md                  # Complete documentation and deployment guide
└── assets/
    ├── music/
    │   ├── README.txt         # Instructions for adding your MP3
    │   └── wedding-song.mp3   # (Place your MP3 file here)
    └── images/
        ├── favicon.svg             # Monogram S & L favicon
        ├── nilavilakku.svg         # Traditional Kerala brass oil lamp illustration
        ├── lotus-motif.svg         # Sacred Indian pink lotus motif
        ├── jasmine-garland.svg     # Jasmine flower garland ornamental divider
        ├── ornamental-corner.svg   # Antique gold corner filigree for cards
        ├── couple-portrait.svg     # Couple portrait illustration placeholder
        ├── traditional-attire.svg  # Kerala Kasavu saree and silks illustration
        ├── floral-decor.svg        # Floral mandap and brass urli illustration
        ├── prewedding.svg          # Kumbalangi backwater sunset silhouette
        ├── peacock-lotus.svg       # Royal Peacock & sacred blooming lotus vector illustration
        ├── swans-harmony.svg       # Royal Swan pair (Hamsa) on tranquil lotus pond crest
        ├── parrot-vine.svg         # Paired Kerala green parrots on blooming jasmine & lotus vine
        ├── palette-haldi.svg       # Haldi ceremony color palette vector illustration
        ├── palette-hindu-wedding.svg # Hindu wedding lotus color palette vector illustration
        ├── palette-reception.svg   # Wedding reception color palette vector illustration
        ├── venue-kumbalangi.svg    # Green Nest Kumbalangi venue card illustration
        ├── venue-mangalassery.svg  # Mangalassery Pavilion venue card illustration
        └── venue-tamarind.svg      # Tamarind Heritage venue card illustration
```

---

## 2. How to Replace Placeholder Images

All photographs and illustrations are loaded via relative paths from the `assets/images/` directory.

### Replacing Gallery & Story Photos:
1. Save your photographs as `.jpg`, `.jpeg`, `.png`, or `.webp` inside the `assets/images/` folder (e.g. `couple-real.jpg`, `engagement.jpg`, `haldi.jpg`).
2. Open `index.html` in any text editor (VS Code, Notepad, etc.).
3. Search for the image tags you wish to replace. For example, in the Photo Gallery section:
   ```html
   <!-- Replace this: -->
   <img src="assets/images/couple-portrait.svg" alt="Sandra & Lachlan Couple Portrait" class="gallery-thumb" loading="lazy">

   <!-- With your photograph: -->
   <img src="assets/images/couple-real.jpg" alt="Sandra & Lachlan in Kochi" class="gallery-thumb" loading="lazy">
   ```
4. Update the corresponding caption text inside `<figcaption>` and the overlay title.

> **Tip for Best Web Performance:**  
> Keep your image files under 1MB each (ideally 1200px to 1600px wide) so the website loads lightning-fast on mobile phones and over international connections.

---

## 3. How to Add Your Custom MP3 Music

The website is configured with a background music player with play/pause, mute, and animated equalizer controls.

### Steps to Add Music:
1. Obtain your audio file in **MP3** format.
2. Rename the file to exactly:
   ```text
   wedding-song.mp3
   ```
3. Place it in the `assets/music/` directory:
   ```text
   assets/music/wedding-song.mp3
   ```
4. That's it! When guests click **"Open Our Invitation"** or click the floating music button, your song will start playing smoothly.

### Graceful Fallback:
If the file is not yet added, the music player displays a helpful status: *"Click to play / Add MP3 to enable"*, ensuring that no errors or broken controls appear.

---

## 4. How to Edit Wedding Event Details & Text

All celebration schedules, venue directions, and FAQs are located in `index.html` with clear comments:

### 1. Haldi & Sangeet (Wednesday, 17 February 2027)
- Venue: **Tamarind Heritage**, Kochi, Kerala.
- Schedule: **Haldi Ceremony** in the morning; **Sangeet Celebration** at night.
- Attire:
  - **Haldi:** Sunshine yellows, turmerics, marigold oranges, and festive coral pinks (custom palette image: `assets/images/palette-haldi.jpg`).
  - **Sangeet:** Any sort of vibrant, joyful colors of your choice.

### 2. Traditional Hindu Wedding (Saturday, 20 February 2027)
- Venue: **Green Nest Kumbalangi**, Kumbalangi Backwaters, Kochi.
- Muhurtham: Auspicious morning ceremony followed by traditional Kerala Sadhya feast.
- Attire: **Pastel Pink & Pastel Green** (inspired by the sacred lotus flower) or traditional Kerala Kasavu (cream & gold) (custom palette image: `assets/images/palette-hindu-wedding.jpg`).

### 3. Wedding Reception (Sunday, 21 February 2027)
- Venue: **Mangalassery Pavilion**, Kochi, Kerala.
- Schedule: Evening celebration with grand dinner, celebratory toasts, music & dancing.
- Attire: Formal evening wear, suits, evening gowns, or glamorous Indian silks & fusion wear (custom palette image: `assets/images/palette-reception.jpg`).

---

## 5. How to Save RSVPs to a Google Spreadsheet

The website has a built-in spreadsheet integration that saves every RSVP response both locally and to a Google Sheet:

### Option A: Free Direct Google Sheet Integration (Recommended)
1. Open [Google Sheets](https://sheets.new/) and create a new blank spreadsheet.
2. In the top row, enter the column headers:
   - `A1`: **Timestamp**
   - `B1`: **Guest Name**
   - `C1`: **Phone / WhatsApp**
   - `D1`: **Attendance**
   - `E1`: **Party Size**
   - `F1`: **Notes / Wishes**
3. In Google Sheets, click **Extensions > Apps Script**.
4. Replace the code in the script editor with this simple 15-line script:
   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var data = JSON.parse(e.postData.contents);
     sheet.appendRow([
       data.timestamp || new Date(),
       data.guestName,
       data.guestPhone,
       data.attendance,
       data.guestCount,
       data.message
     ]);
     return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```
5. Click **Deploy > New deployment**:
   - Select type: **Web app**.
   - Execute as: **Me**.
   - Who has access: **Anyone** (this allows the form on GitHub Pages to submit without requiring guest login).
   - Click **Deploy** and copy your **Web app URL**.
6. Open `script.js` in your website code and paste your Web app URL into `GOOGLE_SHEET_ENDPOINT`:
   ```javascript
   const GOOGLE_SHEET_ENDPOINT = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
That's it! Every time a guest confirms their RSVP, their row automatically appears live in your Google Sheet.

### Option B: Built-in 1-Click CSV Spreadsheet Export
Even before connecting to Google Apps Script, all RSVP responses are preserved in the website's database. Guests and organizers can simply click **"Download RSVPs Spreadsheet (.csv)"** to download the complete spreadsheet file anytime.

---

## 6. How to Preview the Website Locally

You can test the website on your computer before publishing:

### Method 1: Using Python (Built-in on most computers)
Open PowerShell or Terminal in the `sandra-lachlan-wedding` folder and run:
```bash
python -m http.server 8000
```
Open your browser and navigate to:
```text
http://localhost:8000
```

### Method 2: Using VS Code Live Server
1. Open the `sandra-lachlan-wedding` folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and click **"Open with Live Server"**.

---

## 7. How to Publish Free on GitHub Pages

You can host this website completely free of cost with a custom URL (e.g. `https://your-username.github.io/sandra-lachlan-wedding`):

1. **Create a GitHub Account:** If you don't already have one, sign up at [github.com](https://github.com/).
2. **Create a New Repository:**
   - Click the **"+"** icon in the top right corner and select **"New repository"**.
   - Name the repository: `sandra-lachlan-wedding` (or any name you prefer).
   - Set it to **Public**.
   - Do not check "Add a README file" (since this project already includes one).
   - Click **Create repository**.
3. **Upload Files:**
   - In your local project directory, initialize Git and push:
     ```bash
     git init
     git add .
     git commit -m "Initial wedding website for Sandra & Lachlan"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/sandra-lachlan-wedding.git
     git push -u origin main
     ```
   - Alternatively, you can use GitHub's web interface to drag and drop all files and folders.
4. **Enable GitHub Pages:**
   - In your GitHub repository, click on the **Settings** tab.
   - On the left sidebar, click **Pages**.
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and root `/ (root)`.
   - Click **Save**.
5. **View Your Website:**
   - Within 1–2 minutes, GitHub will publish your live website at:
     ```text
     https://YOUR_USERNAME.github.io/sandra-lachlan-wedding/
     ```
   - You can also bind a custom domain (e.g. `sandraandlachlan.com`) for free in the GitHub Pages settings under **Custom domain**.

---

*With warm wishes for a lifetime of love, joy, and peace — Sandra & Lachlan, February 2027.*
