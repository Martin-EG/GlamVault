import { Product } from '@/types';
import { create } from 'zustand';

type WishlistStore = {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  deleteFromWishlist: (productId: string) => void;
};

const useWishlistStore = create<WishlistStore>((set) => ({
  wishlist: [],
  addToWishlist: (product: Product) =>
    set((state) => ({ wishlist: [...state.wishlist, product] })),
  deleteFromWishlist: (productId: string) =>
    set((state) => ({
      wishlist: state.wishlist.filter((product) => product.id !== productId),
    })),
}));

export default useWishlistStore;
