import { render, screen } from '@/utils/test-utils';

import InventoryEmptyState from './InventoryEmptyState';

jest.mock('@/images/svg/inventory-empty-state.svg', () => ({
  src: '/inventory-empty-state.svg',
  width: 314,
  height: 235,
}));

describe('InventoryEmptyState', () => {
  it('renders the expected translations when has search', () => {
    render(<InventoryEmptyState hasSearch />);

    expect(
      screen.getByRole('heading', { name: 'noResultsTitle' }),
    ).toBeInTheDocument();
    expect(screen.getByText('noResultsSubtitle')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '+ addProductButton' }),
    ).toBeInTheDocument();
  });

  it('renders the expected translations when does not have search', () => {
    render(<InventoryEmptyState hasSearch={false} />);

    expect(
      screen.getByRole('heading', { name: 'emptyStateTitle' }),
    ).toBeInTheDocument();
    expect(screen.getByText('emptyStateSubtitle')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '+ addFirstProductButton' }),
    ).toBeInTheDocument();
  });
});
