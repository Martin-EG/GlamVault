import { create } from 'zustand';

type Product = {
  id: string;
  name: string;
  makeupType: string;
  brand: string;
  openedAt: Date;
  boughtIn: string;
  description: string;
  collectionId: string;
  image: string;
};

type InventoryStore = {
  inventory: Product[];
  addProductToInventory: (newProduct: Product) => void;
  deleteProductFromInventory: (productId: string) => void;
};

const useInventoryStore = create<InventoryStore>((set) => ({
  inventory: [],
  addProductToInventory: (newProduct: Product) =>
    set((state) => ({ inventory: [...state.inventory, newProduct] })),
  deleteProductFromInventory: (productId: string) =>
    set((state) => ({
      inventory: state.inventory.filter((item) => item.id !== productId),
    })),
}));

export default useInventoryStore;
