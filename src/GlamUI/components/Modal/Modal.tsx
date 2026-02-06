'use client';

import { FC, PropsWithChildren } from 'react';

import Text from '../Text';
import Button from '../Button';

import { Footer, ModalBase, Overlay } from './Modal.styles';

interface ModalProps extends PropsWithChildren {
  readonly title?: string;
  readonly cancelText?: string;
  readonly confirmText?: string;
  readonly onCancel?: () => void;
  readonly onConfirm: () => void;
}

const Modal: FC<ModalProps> = ({
  title,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  children,
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

  const secondaryButtonText =
    !!onCancel && !!cancelText ? cancelText : 'Cancelar';
  const primaryButtonText = !!confirmText ? confirmText : 'Guardar';

  const secondaryButton = onCancel ? (
    <Button
      variant="secondary"
      onClick={onCancel}
      aria-label={secondaryButtonText}
      size="sm"
      fullSize
    >
      {secondaryButtonText}
    </Button>
  ) : null;

  return (
    <Overlay>
      <ModalBase role="dialog" aria-modal="true">
        {modalTitle}

        {children}

        <Footer>
          {secondaryButton}
          <Button
            onClick={onConfirm}
            aria-label={primaryButtonText}
            size="sm"
            fullSize
          >
            {primaryButtonText}
          </Button>
        </Footer>
      </ModalBase>
    </Overlay>
  );
};

export default Modal;
