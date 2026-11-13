'use client';

import { useState, useEffect } from 'react';

const DEFAULT_PHOTOS = {
  1: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=700&q=80',
  2: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=700&q=80',
  3: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=700&q=80',
};

const DB_NAME = 'annabday_db';
const STORE_NAME = 'scrapbook_photos';

function openPhotoDB() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return resolve(null);
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
}

async function persistToDB(id, dataUrl) {
  try {
    const db = await openPhotoDB();
    if (!db) return;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(dataUrl, String(id));
  } catch (err) {
    console.error('IndexedDB write error', err);
  }
}

async function removeFromDB(id) {
  try {
    const db = await openPhotoDB();
    if (!db) return;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(String(id));
  } catch (err) {
    console.error('IndexedDB delete error', err);
  }
}

async function loadFromDB() {
  try {
    const db = await openPhotoDB();
    if (!db) return {};
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const results = {};
      const req1 = store.get('1');
      const req2 = store.get('2');
      const req3 = store.get('3');

      tx.oncomplete = () => {
        if (req1.result) results[1] = req1.result;
        if (req2.result) results[2] = req2.result;
        if (req3.result) results[3] = req3.result;
        resolve(results);
      };
      tx.onerror = () => resolve({});
    });
  } catch {
    return {};
  }
}

function compressImage(file, maxDimension = 1600, quality = 0.88) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target?.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ScrapbookSection() {
  const [photos, setPhotos] = useState(DEFAULT_PHOTOS);
  const [isSaving, setIsSaving] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // 1. Synchronous recovery from localStorage for instant render
    try {
      const cached = localStorage.getItem('annabday_scrapbook_photos');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed === 'object') {
          setPhotos((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch {}

    // 2. Load from IndexedDB
    loadFromDB().then((dbPhotos) => {
      if (dbPhotos && Object.keys(dbPhotos).length > 0) {
        setPhotos((prev) => ({ ...prev, ...dbPhotos }));
      }
    });

    // 3. Sync from server
    fetch('/api/photos')
      .then((res) => res.json())
      .then((serverPhotos) => {
        if (serverPhotos && Object.keys(serverPhotos).length > 0) {
          setPhotos((prev) => ({ ...prev, ...serverPhotos }));
        }
      })
      .catch(() => {});
  }, []);

  const handleImageChange = async (e, id) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsSaving(id);
      const compressedDataUrl = await compressImage(file);

      // Immediate state update
      setPhotos((prev) => {
        const next = { ...prev, [id]: compressedDataUrl };
        try {
          localStorage.setItem('annabday_scrapbook_photos', JSON.stringify(next));
        } catch (err) {
          console.warn('localStorage save warning:', err);
        }
        return next;
      });

      // IndexedDB persistence
      await persistToDB(id, compressedDataUrl);

      // Server disk persistence
      fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, dataUrl: compressedDataUrl }),
      }).catch((err) => console.warn('Server sync warning:', err));

      setToast('Photo saved! It will stay even after refresh or exit ✨');
      setTimeout(() => setToast(null), 3500);
    } catch (err) {
      console.error('Failed to load image', err);
    } finally {
      setIsSaving(null);
      e.target.value = '';
    }
  };

  const handleResetImage = (id) => {
    setPhotos((prev) => {
      const next = { ...prev, [id]: DEFAULT_PHOTOS[id] };
      try {
        localStorage.setItem('annabday_scrapbook_photos', JSON.stringify(next));
      } catch {}
      return next;
    });

    removeFromDB(id);
    fetch(`/api/photos?id=${id}`, { method: 'DELETE' }).catch(() => {});

    setToast('Restored default photo ✨');
    setTimeout(() => setToast(null), 2500);
  };

  const polaroids = [
    {
      id: 1,
      title: 'Our Future',
      subtitle: 'Looking forward to forever with you ✨',
      alt: 'Our future together',
      rotation: 'transform -rotate-2 hover:rotate-0',
      tape: 'washi-tape',
    },
    {
      id: 2,
      title: 'That Soft, Cozy Smile',
      subtitle: 'The one that melts all my worries away 🌸',
      alt: 'Quiet coffee date',
      rotation: 'transform rotate-2 hover:rotate-0',
      tape: 'washi-tape washi-tape-right',
    },
    {
      id: 3,
      title: 'Every Little Walk With You',
      subtitle: 'My favorite place is right beside you 🕊️',
      alt: 'Hand in hand',
      rotation: 'transform -rotate-1 hover:rotate-0',
      tape: 'washi-tape',
    },
  ];

  return (
    <section className="relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-romanticDark/90 text-white px-5 py-2.5 rounded-full shadow-xl text-sm font-medium backdrop-blur-md animate-[fadeIn_0.3s_ease-out] flex items-center gap-2 border border-white/20">
          <i className="fa-solid fa-circle-check text-warmGold"></i>
          <span>{toast}</span>
        </div>
      )}

      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-warmGold font-semibold">
          Fragments of Forever
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-romanticDark mt-1 mb-2">
          Our Little Scrapbook 📸
        </h2>
        <p className="font-handwriting text-2xl text-romanticMuted">
          A glimpse into the memories that make my life so colorful
        </p>
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 pt-4">
        {polaroids.map((card) => {
          const isCustom = photos[card.id] !== DEFAULT_PHOTOS[card.id];
          const isCurrentSaving = isSaving === card.id;

          return (
            <div
              key={card.id}
              className={`relative bg-white p-4 pb-6 rounded-md shadow-polaroid ${card.rotation} transition duration-300`}
            >
              <div className={card.tape}></div>
              <div className="aspect-square bg-cream-100 rounded overflow-hidden mb-4 relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photos[card.id]}
                  alt={card.alt}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Loading overlay during compression/save */}
                {isCurrentSaving && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center text-white text-xs font-medium gap-2">
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    <span>Saving...</span>
                  </div>
                )}

                {/* Persistent saved badge if user uploaded photo */}
                {isCustom && !isCurrentSaving && (
                  <span className="absolute top-2 left-2 bg-blush-500/85 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm backdrop-blur-xs">
                    Saved ❤️
                  </span>
                )}

                {/* Action Controls */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition">
                  {isCustom && (
                    <button
                      type="button"
                      onClick={() => handleResetImage(card.id)}
                      className="bg-black/60 hover:bg-rose-600 text-white p-2 rounded-full cursor-pointer text-xs transition duration-200 shadow-md"
                      title="Reset to default photo"
                    >
                      <i className="fa-solid fa-rotate-left"></i>
                    </button>
                  )}
                  <label
                    htmlFor={`upload-${card.id}`}
                    className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full cursor-pointer text-xs transition duration-200 shadow-md"
                    title="Swap with your own photo"
                  >
                    <i className="fa-solid fa-camera"></i>
                  </label>
                </div>

                <input
                  type="file"
                  id={`upload-${card.id}`}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, card.id)}
                />
              </div>

              <p className="font-handwriting text-2xl text-romanticDark text-center font-bold">
                {card.title}
              </p>
              <p className="font-handwriting text-lg text-romanticMuted text-center">
                {card.subtitle}
              </p>
            </div>
          );
        })}
      </div>

      <p className="text-center font-handwriting text-lg text-romanticMuted mt-6">
        Tip: You can tap the small camera icon to replace any photo with your real pictures!
      </p>
    </section>
  );
}
