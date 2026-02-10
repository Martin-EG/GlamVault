import useCollectionStore from './collection';

describe('useCollectionStore', () => {
  beforeEach(() => {
    useCollectionStore.getState().collections = [];
  });

  it('should add a collection', () => {
    const { addCollection } = useCollectionStore.getState();

    const collection = {
      id: '1',
      name: 'Collection 1',
    };
    addCollection(collection);

    const collections = useCollectionStore.getState().collections;
    expect(collections).toEqual([collection]);
  });

  it('should update a collection', () => {
    const { addCollection, updateCollection } = useCollectionStore.getState();

    const collection1 = {
      id: '1',
      name: 'Collection 1',
    };
    addCollection(collection1);

    const updatedCollection = {
      id: '1',
      name: 'Updated Collection 1',
    };
    updateCollection('1', updatedCollection);

    const collections = useCollectionStore.getState().collections;
    expect(collections).toEqual([updatedCollection]);
  });

  it('should delete a collection', () => {
    const { addCollection, deleteCollection } = useCollectionStore.getState();

    const collection1 = {
      id: '1',
      name: 'Collection 1',
    };
    addCollection(collection1);

    deleteCollection('1');

    const collections = useCollectionStore.getState().collections;
    expect(collections).toEqual([]);
  });
});
