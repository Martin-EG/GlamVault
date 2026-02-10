import useInventoryStore from './inventory';

describe('Inventory Store', () => {
  beforeEach(() => {
    useInventoryStore.setState({ inventory: [] });
  });

  it('should initialize with an empty inventory', () => {
    const inventory = useInventoryStore.getState().inventory;
    expect(inventory).toEqual([]);
  });

  it('should add a product to inventory', () => {
    const addProductToInventory =
      useInventoryStore.getState().addProductToInventory;

    const newProduct = {
      id: '1',
      name: 'Product 1',
      makeupType: 'Makeup Type 1',
      brand: 'Brand 1',
      openedAt: new Date(),
      boughtIn: 'Bought In 1',
      description: 'Description 1',
      collectionId: 'Collection Id 1',
      image: 'Image 1',
    };
    addProductToInventory(newProduct);

    const updatedInventory = useInventoryStore.getState().inventory;
    expect(updatedInventory).toEqual([newProduct]);
  });

  it('should delete a product from inventory', () => {
    const { addProductToInventory, deleteProductFromInventory } =
      useInventoryStore.getState();

    const product1 = {
      id: '1',
      name: 'Product 1',
      makeupType: 'Makeup Type 1',
      brand: 'Brand 1',
      openedAt: new Date(),
      boughtIn: 'Bought In 1',
      description: 'Description 1',
      collectionId: 'Collection Id 1',
      image: 'Image 1',
    };
    const product2 = {
      id: '2',
      name: 'Product 2',
      makeupType: 'Makeup Type 2',
      brand: 'Brand 2',
      openedAt: new Date(),
      boughtIn: 'Bought In 2',
      description: 'Description 2',
      collectionId: 'Collection Id 2',
      image: 'Image 2',
    };

    addProductToInventory(product1);
    addProductToInventory(product2);

    deleteProductFromInventory('1');

    const inventory = useInventoryStore.getState().inventory;
    expect(inventory).toEqual([product2]);
  });
});
