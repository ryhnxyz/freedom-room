/**
 * FreedomRoom Real Calendar & Indonesian National Holidays (Tanggal Merah) System
 * Weekend Rate Rule: Sabtu, Minggu, dan Hari Libur Nasional (Tanggal Merah).
 * Weekday Rate Rule: Senin sampai Jumat (di luar tanggal merah).
 */

export interface HolidayItem {
  date: string; // YYYY-MM-DD
  name: string;
  isCutiBersama?: boolean;
}

// Master Indonesian National Public Holidays (Tanggal Merah) Dataset
export const INDONESIA_PUBLIC_HOLIDAYS: Record<string, string> = {
  // 2025
  "2025-01-01": "Tahun Baru Masehi",
  "2025-01-27": "Isra Mikraj Nabi Muhammad SAW",
  "2025-01-29": "Tahun Baru Imlek 2576 Kongzili",
  "2025-03-29": "Hari Suci Nyepi (Tahun Baru Saka 1947)",
  "2025-03-31": "Hari Raya Idul Fitri 1446 H (Hari 1)",
  "2025-04-01": "Hari Raya Idul Fitri 1446 H (Hari 2)",
  "2025-04-18": "Wafat Yesus Kristus (Jumat Agung)",
  "2025-04-20": "Hari Paskah",
  "2025-05-01": "Hari Buruh Internasional",
  "2025-05-12": "Hari Raya Waisak 2569 BE",
  "2025-05-29": "Kenaikan Yesus Kristus",
  "2025-06-01": "Hari Lahir Pancasila",
  "2025-06-07": "Hari Raya Idul Adha 1446 H",
  "2025-06-27": "Tahun Baru Islam 1447 H",
  "2025-08-17": "Hari Kemerdekaan Republik Indonesia (HUT RI)",
  "2025-09-05": "Maulid Nabi Muhammad SAW",
  "2025-12-25": "Hari Raya Natal",

  // 2026
  "2026-01-01": "Tahun Baru 2026 Masehi",
  "2026-01-16": "Isra Mikraj Nabi Muhammad SAW",
  "2026-02-17": "Tahun Baru Imlek 2577 Kongzili",
  "2026-03-19": "Hari Suci Nyepi (Tahun Baru Saka 1948)",
  "2026-03-20": "Hari Raya Idul Fitri 1447 H (Hari 1)",
  "2026-03-21": "Hari Raya Idul Fitri 1447 H (Hari 2)",
  "2026-04-03": "Wafat Yesus Kristus (Jumat Agung)",
  "2026-04-05": "Hari Kebangkitan Yesus Kristus (Paskah)",
  "2026-05-01": "Hari Buruh Internasional",
  "2026-05-14": "Kenaikan Yesus Kristus",
  "2026-05-31": "Hari Raya Waisak 2570 BE",
  "2026-06-01": "Hari Lahir Pancasila",
  "2026-05-27": "Hari Raya Idul Adha 1447 H",
  "2026-06-16": "Tahun Baru Islam 1448 H",
  "2026-08-17": "Hari Kemerdekaan Republik Indonesia (HUT RI Ke-81)",
  "2026-08-25": "Maulid Nabi Muhammad SAW",
  "2026-12-25": "Hari Raya Natal",

  // 2027
  "2027-01-01": "Tahun Baru 2027 Masehi",
  "2027-01-05": "Isra Mikraj Nabi Muhammad SAW",
  "2027-02-06": "Tahun Baru Imlek 2578 Kongzili",
  "2027-03-09": "Hari Raya Idul Fitri 1448 H (Hari 1)",
  "2027-03-10": "Hari Raya Idul Fitri 1448 H (Hari 2)",
  "2027-03-26": "Wafat Yesus Kristus",
  "2027-05-01": "Hari Buruh Internasional",
  "2027-05-06": "Kenaikan Yesus Kristus",
  "2027-05-16": "Hari Raya Idul Adha 1448 H",
  "2027-05-20": "Hari Raya Waisak 2571 BE",
  "2027-06-01": "Hari Lahir Pancasila",
  "2027-06-06": "Tahun Baru Islam 1449 H",
  "2027-08-15": "Maulid Nabi Muhammad SAW",
  "2027-08-17": "Hari Kemerdekaan Republik Indonesia (HUT RI Ke-82)",
  "2027-12-25": "Hari Raya Natal",
};

/**
 * Check if a date string/object is Weekend (Sabtu / Minggu) or Tanggal Merah (Hari Libur Nasional)
 */
export function getCalendarRateInfo(dateInput?: string | Date): {
  isWeekendRate: boolean;
  isSaturdayOrSunday: boolean;
  isHoliday: boolean;
  holidayName: string | null;
  dayName: string;
  label: string;
  badgeTone: "weekend" | "holiday" | "weekday";
} {
  const dateObj = dateInput ? new Date(dateInput) : new Date();
  const day = dateObj.getDay(); // 0 = Minggu, 6 = Sabtu

  // Format YYYY-MM-DD
  const yyyy = dateObj.getFullYear();
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const dd = String(dateObj.getDate()).padStart(2, "0");
  const dateKey = `${yyyy}-${mm}-${dd}`;

  const holidayName = INDONESIA_PUBLIC_HOLIDAYS[dateKey] || null;
  const isHoliday = Boolean(holidayName);
  const isSaturdayOrSunday = day === 0 || day === 6; // Sabtu (6) atau Minggu (0)
  const isWeekendRate = isSaturdayOrSunday || isHoliday;

  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const dayName = dayNames[day] || "";

  let label = "Tarif Weekday (Senin - Jumat)";
  let badgeTone: "weekend" | "holiday" | "weekday" = "weekday";

  if (isHoliday) {
    label = `Tanggal Merah (${holidayName})`;
    badgeTone = "holiday";
  } else if (isSaturdayOrSunday) {
    label = `Tarif Weekend (${dayName})`;
    badgeTone = "weekend";
  }

  return {
    isWeekendRate,
    isSaturdayOrSunday,
    isHoliday,
    holidayName,
    dayName,
    label,
    badgeTone,
  };
}

/**
 * Standard isWeekend check: returns TRUE ONLY for Sabtu, Minggu, or Tanggal Merah
 */
export function isWeekendOrHoliday(dateInput?: string | Date): boolean {
  return getCalendarRateInfo(dateInput).isWeekendRate;
}
