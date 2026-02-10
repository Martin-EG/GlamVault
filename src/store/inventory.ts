import { Product } from '@/types';
import { create } from 'zustand';

type InventoryStore = {
  inventory: Product[];
  addProductToInventory: (newProduct: Product) => void;
  updateProductInInventory: (
    productId: string,
    updatedProduct: Product,
  ) => void;
  deleteProductFromInventory: (productId: string) => void;
};

const useInventoryStore = create<InventoryStore>((set) => ({
  inventory: [],
  addProductToInventory: (newProduct: Product) =>
    set((state) => ({ inventory: [...state.inventory, newProduct] })),
  updateProductInInventory: (productId: string, updatedProduct: Product) =>
    set((state) => ({
      inventory: state.inventory.map((item) =>
        item.id === productId ? updatedProduct : item,
      ),
    })),
  deleteProductFromInventory: (productId: string) =>
    set((state) => ({
      inventory: state.inventory.filter((item) => item.id !== productId),
    })),
}));

export default useInventoryStore;
