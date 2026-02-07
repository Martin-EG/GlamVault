'use client';

import Button from '@/GlamUI/components/Button';
import IconButton from '@/GlamUI/components/IconButton';
import { Exit } from '@/GlamUI/components/Icon';
import Text from '@/GlamUI/components/Text';
import { useResponsive } from '@/Hooks/responsive';
import Image from 'next/image';

const DashboardHeader = () => {
  const { isMobile } = useResponsive();
  const headerClasses = isMobile ? 'h-25' : 'h-40';
  const logoSize = isMobile ? 60 : 92;
  const wordmarkWidth = isMobile ? 140 : 220;
  const wordmarkHeight = isMobile ? 50 : 80;
  const textSize = isMobile ? 'sm' : 'lg';
  const logoutButton = isMobile ? (
    <IconButton icon={<Exit size="xl" />} label="Cerrar Sesión" />
  ) : (
    <Button variant="transparent" icon={<Exit color="black" size="md" />}>
      Cerrar Sesión
    </Button>
  );

  return (
    <header
      className={`w-full ${headerClasses} md:px-10 md:py-8 px-4 py-4 shrink-0 sticky top-0 z-30 bg-white border-b-1 border-gray-200`}
    >
      <div className="flex items-center justify-between gap-3">
        <Image
          src="/heart-icon.svg"
          alt="Logo"
          width={logoSize}
          height={logoSize}
        />
        <div className="flex flex-1 flex-col items-start gap-1">
          <Image
            src="/glamvault-wordmark.svg"
            alt="GlamVault"
            width={wordmarkWidth}
            height={wordmarkHeight}
          />
          <Text variant="body" size={textSize} weight="medium">
            Hola, John Doe
          </Text>
        </div>
        <div className="flex items-center gap-4">{logoutButton}</div>
      </div>
    </header>
  );
};

export default DashboardHeader;
