import { render, screen } from '@/test-utils';
import 'jest-styled-components';

import { Icon } from './Icon';

describe('Icon', () => {
  it('renders default icon', () => {
    // Render with a dummy path child to ensure it renders children
    const { container } = render(
      <Icon>
        <path d="M10 10" />
      </Icon>,
    );

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Default size is sm (16px)
    expect(svg).toHaveAttribute('width', '16');
    expect(svg).toHaveAttribute('height', '16');

    // Default color is currentColor
    expect(svg).toHaveAttribute('stroke', 'currentColor');

    // Default strokeWidth is 1.5
    expect(svg).toHaveAttribute('stroke-width', '1.5');

    // Default formatting
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('fill', 'none');

    // Accessibility
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders with custom size', () => {
    const { container } = render(
      <Icon size="lg">
        <path />
      </Icon>,
    );

    const svg = container.querySelector('svg');
    // lg size is 24px
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });

  it('renders with custom color and stroke width', () => {
    const { container } = render(
      <Icon color="red" strokeWidth={2}>
        <path />
      </Icon>,
    );

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('stroke', 'red');
    expect(svg).toHaveAttribute('stroke-width', '2');
  });

  it('renders with title', () => {
    const { container } = render(
      <Icon title="Icon Title">
        <path />
      </Icon>,
    );

    // Since aria-hidden is true, getByText/getByTitle might fail in standard testing-library queries
    // We check simpler DOM presence
    const titleEl = container.querySelector('title');
    expect(titleEl).toBeInTheDocument();
    expect(titleEl).toHaveTextContent('Icon Title');
  });

  it('renders with custom className', () => {
    const { container } = render(
      <Icon className="custom-class">
        <path />
      </Icon>,
    );

    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom-class');
  });
});
