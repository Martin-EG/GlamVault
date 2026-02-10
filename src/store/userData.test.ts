import useUserStore from './userData';

describe('useUserStore', () => {
  beforeEach(() => {
    useUserStore.getState().user = {
      id: '',
      name: '',
      email: '',
      image: '',
    };
  });

  it('should initialize with an empty user', () => {
    const user = useUserStore.getState().user;
    expect(user).toEqual({
      id: '',
      name: '',
      email: '',
      image: '',
    });
  });

  it('should set the user', () => {
    const setUser = useUserStore.getState().setUser;

    const user = {
      id: '1',
      name: 'User 1',
      email: 'email1',
      image: 'image1',
    };
    setUser(user);

    const updatedUser = useUserStore.getState().user;
    expect(updatedUser).toEqual(user);
  });
});
