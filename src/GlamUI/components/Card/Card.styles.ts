import styled from 'styled-components';

export const StyledCard = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surface.default};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

export const StyledCardImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-top-left-radius: ${({ theme }) => theme.radius.sm};
  border-top-right-radius: ${({ theme }) => theme.radius.sm};
`;

export const StyledCardImagePlaceholder = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${({ theme }) => theme.radius.sm};
  border-top-right-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surface.muted};
  color: ${({ theme }) => theme.colors.text.muted};
`;

export const StyledCardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const StyledCardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 0;
`;

export const StyledCardFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  padding-top: 0;
`;
