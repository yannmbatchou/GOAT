import { UserAccount } from '../types';

const STORAGE_KEY_USER = 'goat392_user_session';
const STORAGE_KEY_USERS_DB = 'goat392_users_database';

export class AuthService {
  static getCurrentUser(): UserAccount | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_USER);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  static login(emailOrPhone: string, password: string): { success: boolean; user?: UserAccount; message?: string } {
    if (!emailOrPhone.trim()) {
      return { success: false, message: 'Veuillez saisir votre numéro ou email.' };
    }
    if (!password || password.length < 4) {
      return { success: false, message: 'Le mot de passe doit contenir au moins 4 caractères.' };
    }

    const users = this.getAllUsers();
    let user = users.find((u) => u.emailOrPhone.toLowerCase() === emailOrPhone.trim().toLowerCase());

    if (!user) {
      // Auto-create user if first time login for smooth UX
      user = {
        id: 'usr_' + Date.now(),
        name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Membre ' + emailOrPhone.slice(-4),
        emailOrPhone: emailOrPhone.trim(),
        createdAt: Date.now(),
        purchasedApks: ['apk_aviator_pro'], // Give Aviator demo access
      };
      users.push(user);
      localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(users));
    }

    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    return { success: true, user };
  }

  static register(name: string, emailOrPhone: string, password: string): { success: boolean; user?: UserAccount; message?: string } {
    if (!name.trim()) {
      return { success: false, message: 'Veuillez entrer votre nom.' };
    }
    if (!emailOrPhone.trim()) {
      return { success: false, message: 'Veuillez renseigner un numéro de téléphone ou email.' };
    }
    if (!password || password.length < 4) {
      return { success: false, message: 'Le mot de passe doit contenir au moins 4 caractères.' };
    }

    const users = this.getAllUsers();
    const existing = users.find((u) => u.emailOrPhone.toLowerCase() === emailOrPhone.trim().toLowerCase());
    if (existing) {
      // Log in existing
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(existing));
      return { success: true, user: existing };
    }

    const newUser: UserAccount = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      emailOrPhone: emailOrPhone.trim(),
      createdAt: Date.now(),
      purchasedApks: [],
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(users));
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));

    return { success: true, user: newUser };
  }

  static logout(): void {
    localStorage.removeItem(STORAGE_KEY_USER);
  }

  static addPurchasedApk(apkId: string): UserAccount | null {
    const user = this.getCurrentUser();
    if (!user) return null;

    if (!user.purchasedApks.includes(apkId)) {
      user.purchasedApks.push(apkId);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));

      const users = this.getAllUsers();
      const idx = users.findIndex((u) => u.id === user.id);
      if (idx !== -1) {
        users[idx] = user;
        localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(users));
      }
    }

    return user;
  }

  static getAllUsers(): UserAccount[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_USERS_DB);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}
