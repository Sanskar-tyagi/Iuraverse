import { create } from "zustand";

export interface User {
  userId: string;
  cognitoId: string;
  userRole: string;
  userName?: string;
}
interface UserStoreI {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}
export const UserStore = create<UserStoreI>()((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  logout: () => set({ user: null }),
}));
