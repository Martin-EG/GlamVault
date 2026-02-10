import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

type UserStore = {
  user: User;
  setUser: (user: User) => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: {
    id: '',
    name: '',
    email: '',
    image: '',
  },
  setUser: (user: User) => set({ user }),
}));

export default useUserStore;
