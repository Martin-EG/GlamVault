'use client';

import Button from '@/GlamUI/components/Button';
import Text from '@/GlamUI/components/Text';
import inventoryEmptyState from '@/images/svg/inventory-empty-state.svg';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

interface InventoryEmptyStateProps {
  readonly hasSearch: boolean;
}

const InventoryEmptyState: FC<InventoryEmptyStateProps> = ({ hasSearch }) => {
  const t = useTranslations('inventory');

  const emptyStateTranslations = hasSearch
    ? {
        title: t('noResultsTitle'),
        subtitle: t('noResultsSubtitle'),
        buttonText: t('addProductButton'),
      }
    : {
        title: t('emptyStateTitle'),
        subtitle: t('emptyStateSubtitle'),
        buttonText: t('addFirstProductButton'),
      };

  return (
    <section className="flex flex-col items-center px-4 pt-8 text-center md:pt-10">
      <Image
        src={inventoryEmptyState}
        alt=""
        width={260}
        height={195}
        priority
      />
      <div className="mt-4 flex max-w-md flex-col items-center gap-2">
        <Text
          as="h2"
          variant="heading"
          size="lg"
          weight="medium"
          align="center"
        >
          {emptyStateTranslations.title}
        </Text>
        <Text variant="body" size="sm" color="light" align="center">
          {emptyStateTranslations.subtitle}
        </Text>
      </div>
      <div className="mt-6 w-full max-w-xs">
        <Button variant="primary" rounded="semi" fullSize>
          + {emptyStateTranslations.buttonText}
        </Button>
      </div>
    </section>
  );
};

export default InventoryEmptyState;
