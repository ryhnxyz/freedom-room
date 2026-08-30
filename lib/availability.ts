import { ReservationData, RoomData } from "./api";

export interface TimeSlotStatus {
  id: string;
  timeRange: string;
  label: string;
  isAvailable: boolean;
  bookedBy?: string;
  packageType?: string;
  reason?: string;
}

export interface UnitScheduleInfo {
  unitCode: string;
  unitName: string;
  isAvailableNow: boolean;
  statusText: string;
  statusBadgeColor: "emerald" | "amber" | "rose" | "blue";
  currentActiveBooking: ReservationData | null;
  nextAvailableTime: string;
  nextAvailableDate: string;
  occupiedUntilText: string | null;
  todaySlots: TimeSlotStatus[];
  upcomingBookingsCount: number;
}

const DEFAULT_SLOTS = [
  { id: "slot-morning", timeRange: "08:00 - 11:00", label: "Transit Pagi (3 Jam)" },
  { id: "slot-noon-1", timeRange: "11:00 - 14:00", label: "Transit Siang 1 (3 Jam)" },
  { id: "slot-noon-2", timeRange: "14:00 - 17:00", label: "Transit Siang 2 (3 Jam)" },
  { id: "slot-evening", timeRange: "17:30 - 20:30", label: "Transit Sore / Malam (3 Jam)" },
  { id: "slot-night", timeRange: "21:00 - 09:00", label: "Transit Malam / Full Night" },
  { id: "slot-fullday", timeRange: "14:00 - 12:00 (+1 Hari)", label: "Full Day Menginap (22 Jam)" },
];

export function computeUnitAvailability(
  unitCodeOrId: string,
  unitName: string,
  reservations: ReservationData[] = [],
  targetDateStr?: string // e.g. "2026-08-30" or default to current date
): UnitScheduleInfo {
  const now = new Date();
  const targetDate = targetDateStr ? new Date(targetDateStr) : new Date();

  // Filter reservations relevant to this unit
  const unitReservations = reservations.filter((r) => {
    if (!r) return false;
    const matchCode = r.unit_code && r.unit_code.toLowerCase() === unitCodeOrId.toLowerCase();
    const matchId = r.unit_id && (r.unit_id.toLowerCase() === unitCodeOrId.toLowerCase() || unitCodeOrId.toLowerCase().includes(r.unit_id.toLowerCase()));
    const matchName = r.unit_name && (r.unit_name.toLowerCase().includes(unitName.toLowerCase()) || unitName.toLowerCase().includes(r.unit_name.toLowerCase()));
    return matchCode || matchId || matchName;
  });

  // Check if any reservation is active RIGHT NOW
  let activeReservation: ReservationData | null = null;

  for (const res of unitReservations) {
    if (res.status === "Cancelled" || res.status === "Checked-Out") continue;

    const checkIn = new Date(res.check_in || "");
    const checkOut = new Date(res.check_out || "");

    if (!isNaN(checkIn.getTime()) && !isNaN(checkOut.getTime())) {
      if (now >= checkIn && now <= checkOut) {
        activeReservation = res;
        break;
      }
    } else if (res.status === "Active (In-Room)") {
      activeReservation = res;
      break;
    }
  }

  // Calculate upcoming bookings for the target date
  const targetDateYMD = targetDate.toISOString().split("T")[0];

  const todaySlots: TimeSlotStatus[] = DEFAULT_SLOTS.map((slot) => {
    // Check if this slot conflicts with any reservation on target date
    const conflictingRes = unitReservations.find((r) => {
      if (r.status === "Cancelled" || r.status === "Checked-Out") return false;
      const resDate = r.check_in ? r.check_in.split("T")[0] : "";
      if (resDate !== targetDateYMD) return false;

      // Check time overlap if available
      if (r.package && r.package.toLowerCase().includes("fullday")) {
        return true;
      }

      if (r.check_in_time) {
        const slotStartHour = parseInt(slot.timeRange.split(":")[0], 10);
        const resStartHour = parseInt(r.check_in_time.split(":")[0], 10);
        return Math.abs(slotStartHour - resStartHour) < 3;
      }

      return false;
    });

    if (conflictingRes) {
      return {
        ...slot,
        isAvailable: false,
        bookedBy: conflictingRes.guest || "Tamu Terdaftar",
        packageType: conflictingRes.package || conflictingRes.type || "Transit",
        reason: `Terisi (${conflictingRes.package || "Transit"})`,
      };
    }

    return {
      ...slot,
      isAvailable: true,
    };
  });

  let isAvailableNow = true;
  let statusText = "Siap Huni (Available)";
  let statusBadgeColor: "emerald" | "amber" | "rose" | "blue" = "emerald";
  let nextAvailableTime = "Sekarang (Instant Check-in)";
  let nextAvailableDate = "Hari Ini";
  let occupiedUntilText: string | null = null;

  if (activeReservation) {
    isAvailableNow = false;
    const checkOut = new Date(activeReservation.check_out || "");
    const isTransit = (activeReservation.package || "").toLowerCase().includes("transit");

    if (isTransit) {
      statusBadgeColor = "amber";
      const timeStr = activeReservation.check_out_time || (!isNaN(checkOut.getTime()) ? `${checkOut.getHours().toString().padStart(2, "0")}:${checkOut.getMinutes().toString().padStart(2, "0")}` : "17:00");
      statusText = `Sedang Transit (s/d ${timeStr} WIB)`;
      occupiedUntilText = `Terisi s/d Pkl ${timeStr} WIB`;
      nextAvailableTime = `Hari Ini mulai ${timeStr} WIB (+30 mnt sterilisasi)`;
    } else {
      statusBadgeColor = "rose";
      const dateStr = !isNaN(checkOut.getTime()) ? checkOut.toLocaleDateString("id-ID", { day: "numeric", month: "short" }) : "Besok";
      statusText = `Terisi Menginap (s/d ${dateStr})`;
      occupiedUntilText = `Terisi menginap s/d ${dateStr}, 12:00 WIB`;
      nextAvailableTime = `${dateStr}, Pkl 13:00 WIB`;
    }
  }

  return {
    unitCode: unitCodeOrId,
    unitName,
    isAvailableNow,
    statusText,
    statusBadgeColor,
    currentActiveBooking: activeReservation,
    nextAvailableTime,
    nextAvailableDate,
    occupiedUntilText,
    todaySlots,
    upcomingBookingsCount: unitReservations.filter((r) => r.status !== "Cancelled" && r.status !== "Checked-Out").length,
  };
}
