import Avatar from '@/GlamUI/components/Avatar';
import { Box, Heart, Star, User } from '@/GlamUI/components/Icon';
import { useTranslations } from 'next-intl';

import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const t = useTranslations('navigation');
  const tCommon = useTranslations('common');

  return (
    <aside className="hidden md:flex flex-col items-center gap-6 w-60 shrink-0 px-8 py-10 bg-white sticky top-40 h-[calc(100dvh-10rem)] border-r-1 border-gray-200">
      <Avatar src="/dog.jpg" alt={tCommon('profilePicture')} size="lg" />
      <nav className="w-full flex flex-col gap-3">
        <SidebarItem
          href="/dashboard/profile"
          label={t('myProfile')}
          SidebarIcon={User}
        />
        <SidebarItem
          href="/dashboard/inventory"
          label={t('myInventory')}
          SidebarIcon={Box}
        />
        <SidebarItem
          href="/dashboard/collections"
          label={t('myCollections')}
          SidebarIcon={Star}
        />
        <SidebarItem
          href="/dashboard/wishlist"
          label={t('myWishlist')}
          SidebarIcon={Heart}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
