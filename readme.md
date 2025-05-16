# 📖 QuranVerse (Quran Verse Display App)

A simple Progressive Web App (PWA) that displays a random verse from the Quran along with its English translation and optional tafseer (commentary). Designed to work offline using IndexedDB and Service Workers.

---

## ✨ Features

- 📜 Displays a random Quran verse with Arabic text, translation, and tafseer.
- 🔁 "New Verse" button to fetch another random verse.
- 🌗 Light/Dark mode toggle.
- 📖 Toggle between showing or hiding tafseer.
- 📴 Fully functional offline using PWA technologies.
- 📦 IndexedDB stores verses locally after the first load.

---

## 🚀 Tech Stack

- HTML, CSS, JavaScript
- IndexedDB for offline data storage
- Service Worker for caching app shell
- Web App Manifest for installability


---

## 📦 How to Use

### 1. Clone this repository
```bash
git clone https://github.com/your-username/quran-verse-app.git
cd quran-verse-app
````

### 2. Start a local server

You can use any static file server, for example:

#### With Node (if installed):

```bash
npx serve
```

### 3. Open in browser

Navigate to `http://localhost:8000` or the port shown by your server.

---

## 💾 IndexedDB & Offline Mode

* On first load, verses are fetched from `data/quran.json` and stored in IndexedDB.
* On future visits, verses are loaded from local IndexedDB storage.
* App shell (HTML, CSS, JS) is cached by the service worker for offline access.

---

## 🛠️ PWA Support

* ✅ Installable on mobile and desktop
* ✅ Fully offline capable
* ✅ Custom icons and theme

---

## 📘 Credits

* Quran text and translation: \[Your Source or API name if applicable]
* Built with ❤️ for learning and spiritual reflection

---

## 📄 License

MIT License — free for personal and educational use.
