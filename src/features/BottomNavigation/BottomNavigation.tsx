import { Box, Heart, Star, User } from '@/GlamUI/components/Icon';
import { useTranslations } from 'next-intl';

import BottomNavItem from './BottomNavItem';

const BottomNavigation = () => {
  const t = useTranslations('navigation');

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white border-t-1 border-gray-200">
      <ul className="flex justify-around">
        <BottomNavItem
          href="/dashboard/profile"
          BottomNavItemIcon={User}
          label={t('profile')}
        />
        <BottomNavItem
          href="/dashboard/inventory"
          BottomNavItemIcon={Box}
          label={t('inventory')}
        />
        <BottomNavItem
          href="/dashboard/collections"
          BottomNavItemIcon={Star}
          label={t('collections')}
        />
        <BottomNavItem
          href="/dashboard/wishlist"
          BottomNavItemIcon={Heart}
          label={t('wishlist')}
        />
      </ul>
    </nav>
  );
};

export default BottomNavigation;
