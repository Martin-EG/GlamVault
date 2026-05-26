'use client';

import Button from '@/GlamUI/components/Button';
import IconButton from '@/GlamUI/components/IconButton';
import { Exit } from '@/GlamUI/components/Icon';
import Text from '@/GlamUI/components/Text';
import { useResponsive } from '@/Hooks/responsive';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const DashboardHeader = () => {
  const t = useTranslations('dashboard');
  const { isMobile } = useResponsive();
  const headerClasses = isMobile ? 'h-25' : 'h-30';
  const logoSize = isMobile ? 60 : 70;
  const wordmarkWidth = isMobile ? 140 : 160;
  const wordmarkHeight = isMobile ? 50 : 60;
  const textSize = isMobile ? 'sm' : 'lg';
  const logoutButton = isMobile ? (
    <IconButton icon={<Exit size="xl" />} label={t('logout')} />
  ) : (
    <Button variant="transparent" icon={<Exit color="black" size="md" />}>
      {t('logout')}
    </Button>
  );

  return (
    <header
      className={`w-full ${headerClasses} md:px-8 md:py-6 px-4 py-4 shrink-0 sticky top-0 z-30 bg-white border-b-1 border-gray-200`}
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
            {t('greetings', { name: 'John Doe' })}
          </Text>
        </div>
        <div className="flex items-center gap-4">{logoutButton}</div>
      </div>
    </header>
  );
};

export default DashboardHeader;
