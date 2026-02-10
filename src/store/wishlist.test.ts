import useWishlistStore from './wishlist';

describe('useWishlistStore', () => {
  beforeEach(() => {
    useWishlistStore.getState().wishlist = [];
  });

  it('should initialize with an empty wishlist', () => {
    const wishlist = useWishlistStore.getState().wishlist;
    expect(wishlist).toEqual([]);
  });

  it('should add a product to wishlist', () => {
    const { addToWishlist } = useWishlistStore.getState();

    const product = {
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
    addToWishlist(product);

    const wishlist = useWishlistStore.getState().wishlist;
    expect(wishlist).toEqual([product]);
  });

  it('should delete a product from wishlist', () => {
    const { addToWishlist, deleteFromWishlist } = useWishlistStore.getState();

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

    addToWishlist(product1);
    addToWishlist(product2);

    deleteFromWishlist('1');

    const wishlist = useWishlistStore.getState().wishlist;
    expect(wishlist).toEqual([product2]);
  });
});
