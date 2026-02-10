import { create } from 'zustand';

type Collection = {
  id: string;
  name: string;
};

type CollectionStore = {
  collections: Collection[];
  addCollection: (newCollection: Collection) => void;
  updateCollection: (
    collectionId: string,
    updatedCollection: Collection,
  ) => void;
  deleteCollection: (collectionId: string) => void;
};

const useCollectionStore = create<CollectionStore>((set) => ({
  collections: [],
  addCollection: (newCollection: Collection) =>
    set((state) => ({ collections: [...state.collections, newCollection] })),
  updateCollection: (collectionId: string, updatedCollection: Collection) =>
    set((state) => ({
      collections: state.collections.map((collection) =>
        collection.id === collectionId ? updatedCollection : collection,
      ),
    })),
  deleteCollection: (collectionId: string) =>
    set((state) => ({
      collections: state.collections.filter(
        (collection) => collection.id !== collectionId,
      ),
    })),
}));

export default useCollectionStore;
