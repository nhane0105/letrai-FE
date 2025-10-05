export type ListingStatus =
  | 'draft'         // Bản nháp
  | 'active'        // Đang hiển thị
  | 'paused'        // Tạm dừng
  | 'sold'          // Đã bán
  | 'hidden'        // Ẩn/khóa
  | 'review'        // Chờ duyệt
  | 'delivery'      // Giao & nhận hàng
  | 'issue';        // Bị huỷ/trả hàng

export type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location?: string;
  images: string[];
  // Ảnh xác nhận khi chuyển trạng thái giao/nhận hàng
  deliveryProofs?: string[];
  createdAt: number;
  status: ListingStatus;
};

const STORAGE_KEY = 'nt_listings';

function readAll(): Listing[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Listing[]) : [];
  } catch {
    return [];
  }
}

function writeAll(listings: Listing[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
}

export function createListing(data: Omit<Listing, 'id' | 'createdAt' | 'status'> & { status?: ListingStatus }): Listing {
  const listing: Listing = {
    id: `L${Date.now()}`,
    createdAt: Date.now(),
    status: data.status ?? 'active',
    ...data,
  };
  const all = readAll();
  all.unshift(listing);
  writeAll(all);
  return listing;
}

export function updateListing(id: string, partial: Partial<Listing>) {
  const all = readAll();
  const idx = all.findIndex((l) => l.id === id);
  if (idx >= 0) {
    all[idx] = { ...all[idx], ...partial };
    writeAll(all);
  }
}

export function removeListing(id: string) {
  writeAll(readAll().filter((l) => l.id !== id));
}

export function getListings(status?: ListingStatus) {
  const all = readAll();
  return status ? all.filter((l) => l.status === status) : all;
}


