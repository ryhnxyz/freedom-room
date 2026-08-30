export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://46.250.234.12:5000/api";

export interface RoomData {
  id: string;
  name: string;
  tower: string;
  floor: string;
  unit_number: string;
  type: string;
  status: "Available" | "Occupied" | "Cleaning" | "Maintenance" | string;
  sleeps: number;
  size: string;
  rate_transit_3h: number;
  rate_transit_6h: number;
  rate_transit_8h: number;
  rate_full_day: number;
  rate_monthly: number;
  rate_weekday_3h?: number;
  rate_weekday_6h?: number;
  rate_weekday_8h?: number;
  rate_weekday_fullday_21?: number;
  rate_weekday_fullday_13?: number;
  rate_weekend_3h?: number;
  rate_weekend_6h?: number;
  rate_weekend_8h?: number;
  rate_weekend_fullday_21?: number;
  rate_weekend_fullday_13?: number;
  base_rate: number;
  image: string;
  gallery: string[];
  amenities: string[];
  description: string;
  rating: string;
  reviews_count: number;
}

export interface ReviewData {
  id: number | string;
  room_id: string;
  guest_name: string;
  rating: number | string;
  comment: string;
  stay_type?: string;
  date: string;
  avatar?: string;
  is_verified?: boolean;
  created_at?: string;
}

export interface ReservationPayload {
  guest: string;
  phone: string;
  email?: string;
  package: string;
  type?: string;
  unit_id: string;
  unit_name: string;
  unit_code: string;
  check_in: string;
  check_out: string;
  check_in_time?: string;
  check_out_time?: string;
  guests?: number;
  status?: string;
  source?: string;
  payment_method?: string;
  total: number;
  notes?: string;
}

export interface ReservationData {
  id: number | string;
  ref: string;
  guest: string;
  email?: string;
  phone: string;
  type: string;
  package: string;
  unit_id: string;
  unit_name: string;
  unit_code: string;
  check_in: string;
  check_out: string;
  check_in_time?: string;
  check_out_time?: string;
  guests?: number;
  status: string;
  source: string;
  payment_method: string;
  payment_status: string;
  total: number;
  notes?: string;
  created_at: string;
}

export async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(url, { ...options, headers, cache: "no-store" });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${res.status}: ${res.statusText}`);
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error(`API Error on ${endpoint}:`, err);
    throw err;
  }
}

export const api = {
  // Rooms
  getRooms: (status?: string): Promise<RoomData[]> =>
    request<RoomData[]>(status ? `/rooms?status=${status}` : "/rooms"),

  getRoomById: (id: string): Promise<RoomData> =>
    request<RoomData>(`/rooms/${id}`),

  // Reviews
  getReviews: (roomId?: string): Promise<ReviewData[]> =>
    request<ReviewData[]>(roomId ? `/reviews?room_id=${encodeURIComponent(roomId)}` : "/reviews"),

  createReview: (review: { room_id: string; guest_name: string; rating: number; comment: string; stay_type?: string }): Promise<ReviewData> =>
    request<ReviewData>("/reviews", {
      method: "POST",
      body: JSON.stringify(review),
    }),

  // Reservations
  getReservations: (filter?: string, query?: string): Promise<ReservationData[]> => {
    const q: string[] = [];
    if (filter) q.push(`filter=${encodeURIComponent(filter)}`);
    if (query) q.push(`query=${encodeURIComponent(query)}`);
    return request<ReservationData[]>(q.length ? `/reservations?${q.join("&")}` : "/reservations");
  },

  createReservation: (booking: ReservationPayload): Promise<ReservationData> =>
    request<ReservationData>("/reservations", {
      method: "POST",
      body: JSON.stringify(booking),
    }),

  getReservationByRef: async (queryStr: string): Promise<ReservationData | null> => {
    try {
      const results = await request<ReservationData[]>(`/reservations?query=${encodeURIComponent(queryStr)}`);
      if (Array.isArray(results) && results.length > 0) {
        const cleanQ = queryStr.trim().toUpperCase();
        return (
          results.find(
            (r) =>
              r.ref?.toUpperCase() === cleanQ ||
              r.phone?.replace(/\D/g, "").includes(queryStr.replace(/\D/g, "")) ||
              r.guest?.toLowerCase().includes(queryStr.toLowerCase())
          ) || results[0]
        );
      }
      return null;
    } catch {
      return null;
    }
  },
};

export default api;
