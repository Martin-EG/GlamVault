import { FC } from 'react';

import Text from '../Text/Text';
import Menu from '../Menu/Menu';

import {
  StyledCard,
  StyledCardBody,
  StyledCardImage,
  StyledCardFooter,
  StyledCardTitle,
} from './Card.styles';
import type { CardProps } from './Card.types';

const Card: FC<CardProps> = ({ title, image, body, footer, options }) => {
  const cardImage = image ? <StyledCardImage src={image} alt={title} /> : null;
  const cardFooter = footer ? (
    <StyledCardFooter>{footer}</StyledCardFooter>
  ) : null;

  const menu = options ? <Menu items={options} align="right" /> : null;

  return (
    <StyledCard>
      {cardImage}
      <StyledCardBody>
        <StyledCardTitle>
          <Text weight="bold">{title}</Text>
          {menu}
        </StyledCardTitle>
        {body}
      </StyledCardBody>
      {cardFooter}
    </StyledCard>
  );
};

export default Card;
