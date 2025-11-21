import React from 'react';
import { PrayerName } from './types';

// Aladhan API uses Method 13 for Diyanet İşleri Başkanlığı
export const API_METHOD_ID = 13; 
export const API_BASE_URL = 'https://api.aladhan.com/v1/timings';

export const PRAYER_MAPPING: Record<string, PrayerName> = {
  Fajr: PrayerName.Fajr,
  Sunrise: PrayerName.Sunrise,
  Dhuhr: PrayerName.Dhuhr,
  Asr: PrayerName.Asr,
  Maghrib: PrayerName.Maghrib,
  Isha: PrayerName.Isha,
};

export const ADHAN_SOUNDS = [
  { id: 'hicaz', name: 'Hicaz Makamı (İstanbul)', url: 'https://cdn.aladhan.com/audio/adhans/hicaz.mp3' },
  { id: 'mekke', name: 'Mekke Ezanı', url: 'https://cdn.aladhan.com/audio/adhans/mecca.mp3' },
  { id: 'medine', name: 'Medine Ezanı', url: 'https://cdn.aladhan.com/audio/adhans/madina.mp3' },
  { id: 'aksa', name: 'Mescid-i Aksa', url: 'https://cdn.aladhan.com/audio/adhans/alaqsa.mp3' },
  { id: 'misir', name: 'Mısır Makamı', url: 'https://cdn.aladhan.com/audio/adhans/egypt.mp3' },
];

// Full list of 81 Provinces of Turkey
export const TURKEY_CITIES = [
  { name: 'Adana', lat: 37.0000, lng: 35.3213 },
  { name: 'Adıyaman', lat: 37.7648, lng: 38.2786 },
  { name: 'Afyonkarahisar', lat: 38.7507, lng: 30.5567 },
  { name: 'Ağrı', lat: 39.7191, lng: 43.0503 },
  { name: 'Amasya', lat: 40.6501, lng: 35.8360 },
  { name: 'Ankara', lat: 39.9334, lng: 32.8597 },
  { name: 'Antalya', lat: 36.8969, lng: 30.7133 },
  { name: 'Artvin', lat: 41.1828, lng: 41.8183 },
  { name: 'Aydın', lat: 37.8560, lng: 27.8416 },
  { name: 'Balıkesir', lat: 39.6484, lng: 27.8826 },
  { name: 'Bilecik', lat: 40.1451, lng: 29.9799 },
  { name: 'Bingöl', lat: 38.8854, lng: 40.4980 },
  { name: 'Bitlis', lat: 38.4006, lng: 42.1095 },
  { name: 'Bolu', lat: 40.7350, lng: 31.6061 },
  { name: 'Burdur', lat: 37.7204, lng: 30.2908 },
  { name: 'Bursa', lat: 40.1885, lng: 29.0610 },
  { name: 'Çanakkale', lat: 40.1553, lng: 26.4142 },
  { name: 'Çankırı', lat: 40.6013, lng: 33.6134 },
  { name: 'Çorum', lat: 40.5506, lng: 34.9556 },
  { name: 'Denizli', lat: 37.7765, lng: 29.0864 },
  { name: 'Diyarbakır', lat: 37.9144, lng: 40.2306 },
  { name: 'Edirne', lat: 41.6768, lng: 26.5603 },
  { name: 'Elazığ', lat: 38.6810, lng: 39.2264 },
  { name: 'Erzincan', lat: 39.7500, lng: 39.5000 },
  { name: 'Erzurum', lat: 39.9000, lng: 41.2700 },
  { name: 'Eskişehir', lat: 39.7767, lng: 30.5206 },
  { name: 'Gaziantep', lat: 37.0662, lng: 37.3833 },
  { name: 'Giresun', lat: 40.9128, lng: 38.3895 },
  { name: 'Gümüşhane', lat: 40.4600, lng: 39.4700 },
  { name: 'Hakkari', lat: 37.5833, lng: 43.7333 },
  { name: 'Hatay', lat: 36.4018, lng: 36.3498 },
  { name: 'Isparta', lat: 37.7648, lng: 30.5566 },
  { name: 'Mersin', lat: 36.8000, lng: 34.6333 },
  { name: 'İstanbul', lat: 41.0082, lng: 28.9784 },
  { name: 'İzmir', lat: 38.4192, lng: 27.1287 },
  { name: 'Kars', lat: 40.6013, lng: 43.0975 },
  { name: 'Kastamonu', lat: 41.3887, lng: 33.7827 },
  { name: 'Kayseri', lat: 38.7312, lng: 35.4787 },
  { name: 'Kırklareli', lat: 41.7333, lng: 27.2167 },
  { name: 'Kırşehir', lat: 39.1425, lng: 34.1709 },
  { name: 'Kocaeli', lat: 40.8533, lng: 29.8815 },
  { name: 'Konya', lat: 37.8667, lng: 32.4833 },
  { name: 'Kütahya', lat: 39.4167, lng: 29.9833 },
  { name: 'Malatya', lat: 38.3552, lng: 38.3095 },
  { name: 'Manisa', lat: 38.6191, lng: 27.4289 },
  { name: 'Kahramanmaraş', lat: 37.5858, lng: 36.9371 },
  { name: 'Mardin', lat: 37.3212, lng: 40.7245 },
  { name: 'Muğla', lat: 37.2153, lng: 28.3636 },
  { name: 'Muş', lat: 38.9462, lng: 41.7539 },
  { name: 'Nevşehir', lat: 38.6939, lng: 34.6857 },
  { name: 'Niğde', lat: 37.9667, lng: 34.6833 },
  { name: 'Ordu', lat: 40.9839, lng: 37.8764 },
  { name: 'Rize', lat: 41.0201, lng: 40.5234 },
  { name: 'Sakarya', lat: 40.7569, lng: 30.3783 },
  { name: 'Samsun', lat: 41.2928, lng: 36.3313 },
  { name: 'Siirt', lat: 37.9333, lng: 41.9500 },
  { name: 'Sinop', lat: 42.0231, lng: 35.1531 },
  { name: 'Sivas', lat: 39.7477, lng: 37.0179 },
  { name: 'Tekirdağ', lat: 40.9833, lng: 27.5167 },
  { name: 'Tokat', lat: 40.3167, lng: 36.5500 },
  { name: 'Trabzon', lat: 41.0015, lng: 39.7178 },
  { name: 'Tunceli', lat: 39.1079, lng: 39.5401 },
  { name: 'Şanlıurfa', lat: 37.1591, lng: 38.7969 },
  { name: 'Uşak', lat: 38.6823, lng: 29.4082 },
  { name: 'Van', lat: 38.4891, lng: 43.4089 },
  { name: 'Yozgat', lat: 39.8181, lng: 34.8147 },
  { name: 'Zonguldak', lat: 41.4564, lng: 31.7987 },
  { name: 'Aksaray', lat: 38.3687, lng: 34.0370 },
  { name: 'Bayburt', lat: 40.2552, lng: 40.2249 },
  { name: 'Karaman', lat: 37.1759, lng: 33.2287 },
  { name: 'Kırıkkale', lat: 39.8468, lng: 33.5153 },
  { name: 'Batman', lat: 37.8812, lng: 41.1351 },
  { name: 'Şırnak', lat: 37.5164, lng: 42.4611 },
  { name: 'Bartın', lat: 41.6344, lng: 32.3375 },
  { name: 'Ardahan', lat: 41.1105, lng: 42.7022 },
  { name: 'Iğdır', lat: 39.9196, lng: 44.0459 },
  { name: 'Yalova', lat: 40.6500, lng: 29.2667 },
  { name: 'Karabük', lat: 41.2061, lng: 32.6204 },
  { name: 'Kilis', lat: 36.7184, lng: 37.1212 },
  { name: 'Osmaniye', lat: 37.0742, lng: 36.2467 },
  { name: 'Düzce', lat: 40.8438, lng: 31.1565 },
].sort((a, b) => a.name.localeCompare(b.name));

// Icons
export const Icons = {
  Location: () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
  ),
  Plus: () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" })
  ),
  Trash: () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" })
  ),
  VolumeUp: () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
      React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" })
  ),
  VolumeOff: () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
      React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" }),
      React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" })
  ),
  Settings: () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
      React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }),
      React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })
  ),
  Music: () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
      React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" })
  ),
  Play: () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
      React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" }),
      React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })
  ),
  Mosque: () => React.createElement("svg", { width: "64", height: "64", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "opacity-20" },
      React.createElement("path", { d: "M3 21H21", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }),
      React.createElement("path", { d: "M12 21V7", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }),
      React.createElement("path", { d: "M7 21V11C7 11 9.5 9 12 9C14.5 9 17 11 17 11V21", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }),
      React.createElement("path", { d: "M12 7L14.5 4.5C14.5 4.5 13.5 3 12 3C10.5 3 9.5 4.5 9.5 4.5L12 7Z", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" })
  )
};