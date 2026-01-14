'use client';

import { FC, PropsWithChildren } from 'react';

import Text from '../Text';
import Button from '../Button';

import {
  Footer,
  ModalBase,
  Overlay,
} from './Modal.styles';

interface ModalProps extends PropsWithChildren {
  title?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const Modal: FC<ModalProps> = ({
  title,
  onCancel,
  onConfirm,
  children
}) => {
  const modalTitle = title ? (
    <Text
      variant="heading"
      as="h2"
      size="lg"
      weight="bold"
      color="default"
      truncate={false}
      align="left"
      labelFor={title}
    >
      {title}
    </Text>
  ) : null;

  const secondaryButton = onCancel ? (
    <Button variant="secondary" onClick={onCancel} text="Cancelar" size="sm" fullSize />
  ) : null;

  const primaryButton = onConfirm ? (
    <Button onClick={onConfirm} text="Guardar" size="sm" fullSize />
  ) : null;


  return (
    <Overlay>
      <ModalBase role="dialog" aria-modal="true">
        {modalTitle}

        {children}

        <Footer>
          {secondaryButton}
          {primaryButton}
        </Footer>
      </ModalBase>
    </Overlay>
  );
};

export default Modal;
