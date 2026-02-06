import { Box, Heart, Star, User } from '@/GlamUI/components/Icon';

import BottomNavItem from './BottomNavItem';

const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white border-t">
      <ul className="flex justify-around">
        <BottomNavItem
          href="/dashboard/profile"
          BottomNavItemIcon={User}
          label="Perfil"
        />
        <BottomNavItem
          href="/dashboard/inventory"
          BottomNavItemIcon={Box}
          label="Inventario"
        />
        <BottomNavItem
          href="/dashboard/collections"
          BottomNavItemIcon={Star}
          label="Colecciones"
        />
        <BottomNavItem
          href="/dashboard/wishlist"
          BottomNavItemIcon={Heart}
          label="Lista de deseos"
        />
      </ul>
    </nav>
  );
};

export default BottomNavigation;
