// Define global variables
let verses = [];
let showTafseer = false;

// Define DB variables
const DB_NAME = 'quranDB';
const DB_VERSION = 1;
const DB_STORE_NAME = 'verses';
let db;

// Initialize IndexedDB
function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = function(event) {
            db = event.target.result;
            if (!db.objectStoreNames.contains(DB_STORE_NAME)) {
                db.createObjectStore(DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onsuccess = function(event) {
            db = event.target.result;
            resolve(db);
        };

        request.onerror = function(event) {
            console.error('Database error:', event.target.errorCode);
            reject(event.target.errorCode);
        };
    });
}

// Load verses from IndexedDB, if available
async function loadVerses() {
    await initDB();

    const transaction = db.transaction(DB_STORE_NAME, 'readonly');
    const store = transaction.objectStore(DB_STORE_NAME);
    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = async function(event) {
        if (event.target.result.length > 0) {
            verses = event.target.result;
            displayVerse();
        } else {
            // Load from JSON, then store in IndexedDB
            const response = await fetch('data/quran.json');
            const data = await response.json();
            verses = data;
            const addTransaction = db.transaction(DB_STORE_NAME, 'readwrite');
            const addStore = addTransaction.objectStore(DB_STORE_NAME);
            data.forEach(verse => {
                addStore.add(verse);
            });
            displayVerse();
        }
    }
}

// Fetch verses
loadVerses();

// Display verse
function displayVerse() {
    // do null check
    if (!verses || verses.length === 0) {
        console.error('No verses available to display.');
        return;
    }

    // get random verse
    const randomIndex = Math.floor(Math.random() * verses.length);
    const verse = verses[randomIndex];

    // load verse into the DOM
    document.getElementById('verse-text').textContent = verse.text;
    document.getElementById('verse-key').textContent = verse.verseKey;
    document.getElementById('verse-translation').textContent = verse.translation;
    document.getElementById('verse-tafseer').textContent = verse.tafseer;
}

// Display verse at button click
document.getElementById('new-verse-btn').addEventListener('click', function() {
    displayVerse();
});

// Toggle tafseer
document.getElementById('toggle-tafseer-btn').addEventListener('click', function() {
    showTafseer = !showTafseer; 
    document.getElementById('verse-tafseer-box').classList.toggle('hidden', !showTafseer);
})

// Toggle theme
document.getElementById('toggle-theme-btn').addEventListener('click', function() {
    document.body.classList.toggle('dark');
    const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// Load saved theme from localStorage
window.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.toggle('dark', savedTheme === 'dark');
    }
});

// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('service-worker.js')
            .then(function(registration) {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(function(error) {
                console.error('Service Worker registration failed:', error);
            });
    });
}
