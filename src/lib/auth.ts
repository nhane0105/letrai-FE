export type AppUser = {
  id: string;
  name: string;
  email?: string;
};

const STORAGE_KEY = 'nt_user';

export function getUser(): AppUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AppUser) : null;
  } catch {
    return null;
  }
}

export function setUser(user: AppUser) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearUser() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}


