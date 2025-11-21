export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

export interface DateInfo {
  readable: string;
  hijri: {
    day: string;
    month: {
      en: string;
      ar: string;
    };
    year: string;
  };
  gregorian: {
    day: string;
    weekday: {
      en: string;
    };
  };
}

export interface TimingsResponse {
  code: number;
  status: string;
  data: {
    timings: PrayerTimes;
    date: DateInfo;
    meta: {
      latitude: number;
      longitude: number;
      timezone: string;
      method: {
        id: number;
        name: string;
      };
    };
  };
}

export interface CityData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  isAuto: boolean;
}

export enum PrayerName {
  Fajr = 'İmsak',
  Sunrise = 'Güneş',
  Dhuhr = 'Öğle',
  Asr = 'İkindi',
  Maghrib = 'Akşam',
  Isha = 'Yatsı'
}

export interface NextPrayerInfo {
  name: PrayerName;
  time: string;
  remainingMs: number;
}
