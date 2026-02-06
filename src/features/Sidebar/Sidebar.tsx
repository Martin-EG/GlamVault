import Avatar from '@/GlamUI/components/Avatar';
import { Box, Heart, Star, User } from '@/GlamUI/components/Icon';

import SidebarItem from './SidebarItem';

const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col items-center gap-6 w-60 shrink-0 px-8 py-10 bg-white sticky top-40 h-[calc(100dvh-10rem)]">
      <Avatar src="/dog.jpg" alt="Foto de perfil" size="lg" />
      <nav className="w-full flex flex-col gap-3">
        <SidebarItem
          href="/dashboard/profile"
          label="Mi perfil"
          icon={<User />}
        />
        <SidebarItem
          href="/dashboard/inventory"
          label="Mi inventario"
          icon={<Box />}
        />
        <SidebarItem
          href="/dashboard/collections"
          label="Mis colecciones"
          icon={<Star />}
        />
        <SidebarItem
          href="/dashboard/wishlist"
          label="Mis lista de deseos"
          icon={<Heart />}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
