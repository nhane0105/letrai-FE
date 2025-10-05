export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: 'admin';
};

const ADMIN_STORAGE_KEY = 'admin_user';

export function getAdminUser(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AdminUser) : null;
  } catch {
    return null;
  }
}

export function setAdminUser(user: AdminUser) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(user));
}

export function clearAdminUser() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ADMIN_STORAGE_KEY);
}

export async function adminLogin(email: string, password: string) {
  try {
    const response = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (data.success) {
      setAdminUser(data.user);
      return { success: true, user: data.user };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    return { success: false, message: 'Lỗi kết nối' };
  }
}

export async function adminLogout() {
  try {
    await fetch('/api/admin/auth', {
      method: 'DELETE',
    });
    clearAdminUser();
    return { success: true };
  } catch (error) {
    clearAdminUser();
    return { success: true };
  }
}
