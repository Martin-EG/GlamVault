import { Icon } from '@/GlamUI/components/Icon';
import Text from '@/GlamUI/components/Text';
import Link from 'next/link';
import { FC } from 'react';
import { usePathname } from 'next/navigation';

interface SidebarItemProps {
  href: string;
  label: string;
  SidebarIcon: Icon;
}

const SidebarItem: FC<SidebarItemProps> = ({ href, label, SidebarIcon }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const textVariant = !isActive ? 'caption' : undefined;
  const textWeight = !isActive ? 'regular' : 'bold';

  return (
    <Text variant={textVariant} weight={textWeight}>
      <Link href={href} className="flex items-center gap-2">
        <SidebarIcon size="md" />
        {label}
      </Link>
    </Text>
  );
};

export default SidebarItem;
