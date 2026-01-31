import styled from 'styled-components';

export const StyledCard = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surface.default};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

export const CardImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-top-left-radius: ${({ theme }) => theme.radius.sm};
  border-top-right-radius: ${({ theme }) => theme.radius.sm};
`;

export const CardTitle = styled.div`
  max-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const CardBody = styled.div`
  max-height: 300px;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const CardFooter = styled.div`
  max-height: 50px;
  padding: ${({ theme }) => theme.spacing.md};
  padding-top: 0;
`;
