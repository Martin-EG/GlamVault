import Text from '@/GlamUI/components/Text';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface SidebarItemProps {
  href: string;
  label: string;
  icon: ReactNode;
}

const SidebarItem: FC<SidebarItemProps> = ({ href, label, icon }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const textVariant = !isActive ? 'caption' : undefined;
  const textWeight = !isActive ? 'regular' : 'bold';

  return (
    <Text variant={textVariant} weight={textWeight}>
      <Link href={href} className="flex items-center gap-2">
        {icon}
        {label}
      </Link>
    </Text>
  );
};

export default SidebarItem;
