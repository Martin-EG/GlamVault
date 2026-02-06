'use client';

import Button from '@/GlamUI/components/Button';
import { Exit } from '@/GlamUI/components/Icon';
import Text from '@/GlamUI/components/Text';
import Image from 'next/image';

const DashboardHeader = () => {
  return (
    <header className="w-full h-40 px-10 py-8 shrink-0 sticky top-0 z-30 bg-white border-b-1 border-gray-200">
      <div className="flex items-center justify-between gap-3">
        <Image src="/heart-icon.svg" alt="Logo" width={92} height={97} />
        <div className="flex flex-1 flex-col items-start gap-1">
          <Image
            src="/glamvault-wordmark.svg"
            alt="GlamVault"
            width={220}
            height={80}
          />
          <Text variant="body" size="lg" weight="medium">
            Hola, John Doe
          </Text>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="transparent" icon={<Exit />}>
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
