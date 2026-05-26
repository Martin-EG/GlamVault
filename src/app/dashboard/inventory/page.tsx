'use client';

import Button from '@/GlamUI/components/Button';
import Text from '@/GlamUI/components/Text';
import SearchBar from '@/GlamUI/components/Searchbar';
import { useInventoryStore } from '@/store';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const Inventory = () => {
  const t = useTranslations('inventory');
  const inventory = useInventoryStore((state) => state.inventory);
  const [search, setSearch] = useState('');

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-baseline gap-2">
          <Text as="h1" variant="heading" weight="semibold" size="xl">
            {t('title')}
          </Text>
          <Text as="p" weight="medium" size="sm" color="light">
            ({inventory.length}/50)
          </Text>
        </div>
        <Button variant="secondary" size="sm" rounded="full">
          + {t('addProductButton')}
        </Button>
      </div>
      <div className="mb-2">
        <Text as="p" variant="subheading" color="light">
          {t('subtitle')}
        </Text>
      </div>
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch('')}
        placeholder={t('searchbarPlaceholder')}
      />
    </>
  );
};

export default Inventory;
