import { FC, useEffect, useMemo, useRef, useState } from 'react';
import {
  MenuWrapper,
  TriggerButton,
  MenuContainer,
  MenuItemButton,
  MenuItemIcon,
} from './Menu.styles';

import type { MenuProps } from './Menu.types';
import { useCloseWhenClickingOutside, useHandleFocusWithKeyboardCallback } from './hooks';

const Menu: FC<MenuProps> = ({ items, align = 'left' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLButtonElement[]>([]);
  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((value) => !value);
  const handleFocusWithKeyboardCallback = useHandleFocusWithKeyboardCallback({ itemRefs });

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        itemRefs.current[0]?.focus();
      });
    }
  }, [isOpen]);

  useCloseWhenClickingOutside({ isOpen, closeMenu, ref });

  const menuItems = useMemo(() => items.map(({ onClick, disabled, variant, icon, label }, index) => {
    const onMenuItemClick = () => {
      onClick();
      closeMenu();
    }

    const menuItemIcon = icon ? (
      <MenuItemIcon aria-hidden>
        {icon}
      </MenuItemIcon>
    ) : null;

    return (
      <MenuItemButton
        key={index}
        ref={(element) => {
          if (element) itemRefs.current[index] = element;
        }}
        role="menuitem"
        onClick={onMenuItemClick}
        disabled={disabled}
        $variant={variant}
        tabIndex={-1}
      >
        {menuItemIcon}
        {label}
      </MenuItemButton>
    );
  }), [items]);

  const menu = isOpen ? (
    <MenuContainer role="menu" $align={align} onKeyDown={handleFocusWithKeyboardCallback}>
      {menuItems}
    </MenuContainer>
  ) : null;

  return (
    <MenuWrapper ref={ref}>
      <TriggerButton
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={toggleMenu}
      >
        ⋯
      </TriggerButton>
      {menu}
    </MenuWrapper>
  );
};

export default Menu;
