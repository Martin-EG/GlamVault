import { render, screen } from '@testing-library/react';
import 'jest-styled-components';

import Label from './Label';

describe('Label', () => {
  it('renders the label text', () => {
    render(<Label text="Test Label" htmlFor="test-input" />);
    const labelElement = screen.getByText('Test Label');

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute('for', 'test-input');
  });
});
