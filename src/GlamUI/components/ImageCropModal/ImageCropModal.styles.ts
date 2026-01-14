import styled from 'styled-components';

export const CropArea = styled.div`
  width: 100%;
  height: 320px;

  position: relative;
  overflow: hidden;

  background: #000;
  border-radius: ${({ theme }) => theme.radius.sm};
`;
