import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1000;
`;

export const ModalBase = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};
  border-radius: ${({ theme }) => theme.radius.md};

  width: 90%;
  max-width: 420px;

  display: flex;
  flex-direction: column;

  padding: ${({ theme }) => theme.spacing.md};
`;

export const Footer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};

  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`;
