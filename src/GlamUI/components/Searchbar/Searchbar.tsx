import { Close, Search } from '@/GlamUI/components/Icon';
import { FC } from 'react';
import { useTranslations } from 'next-intl';

import IconButton from '../IconButton/IconButton';

import { Wrapper, Input, RightSection } from './Searchbar.styles';
import { SearchbarProps } from './Searchbar.types';

const SearchBar: FC<SearchbarProps> = ({
  placeholder,
  value,
  onChange,
  onClear,
}) => {
  const t = useTranslations('searchbar');
  const placeholderText = placeholder || t('placeholder');

  const rightIcon = value ? (
    <IconButton
      icon={<Close size="md" />}
      label={t('clearSearch')}
      onClick={onClear}
    />
  ) : (
    <Search size="md" />
  );

  return (
    <Wrapper>
      <Input
        role="searchbox"
        placeholder={placeholderText}
        value={value}
        onChange={onChange}
        aria-label={placeholderText}
      />

      <RightSection>{rightIcon}</RightSection>
    </Wrapper>
  );
};

export default SearchBar;
