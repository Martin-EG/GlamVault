'use client';

import Button from '@/GlamUI/components/Button';
import { Icon } from '@/GlamUI/components/Icon';
import Text from '@/GlamUI/components/Text';
import { colors } from '@/GlamUI/tokens/dist/colors';
import { FC } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface BottomNavItemProps {
  BottomNavItemIcon: Icon;
  label: string;
  href: string;
}

const BottomNavItem: FC<BottomNavItemProps> = ({
  BottomNavItemIcon,
  label,
  href,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === href;
  const color = !isActive ? colors.text.muted : undefined;
  const textVariant = !isActive ? 'caption' : undefined;
  const redirectToRoute = () => {
    router.push(href);
  };

  return (
    <li>
      <Button
        variant="transparent"
        rounded="full"
        aria-label={label}
        onClick={redirectToRoute}
        className="flex flex-col items-center justify-center"
      >
        <BottomNavItemIcon color={color} size="md" />
        <Text size="xs" variant={textVariant}>
          {label}
        </Text>
      </Button>
    </li>
  );
};

export default BottomNavItem;
