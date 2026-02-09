import { render, screen, fireEvent } from '@/test-utils';
import 'jest-styled-components';
import ImageCropModal from './ImageCropModal';
import { useCroppedImage } from './hooks';

jest.mock('react-easy-crop', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mock-cropper">Mock Cropper</div>,
  };
});

jest.mock('./hooks', () => ({
  useCroppedImage: jest.fn(),
}));

describe('ImageCropModal', () => {
  const mockOnCancel = jest.fn();
  const mockOnConfirm = jest.fn();
  const mockGetCroppedImage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCroppedImage as jest.Mock).mockReturnValue(mockGetCroppedImage);
    mockGetCroppedImage.mockResolvedValue(
      new Blob(['test'], { type: 'image/jpeg' }),
    );
  });

  const defaultProps = {
    image: 'test-image.jpg',
    onCancel: mockOnCancel,
    onConfirm: mockOnConfirm,
  };

  it('renders correctly', () => {
    render(<ImageCropModal {...defaultProps} />);
    expect(screen.getByTestId('mock-cropper')).toBeInTheDocument();

    // Modal buttons
    expect(screen.getByText('Cancelar edición')).toBeInTheDocument();
    expect(screen.getByText('Guardar')).toBeInTheDocument();
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(<ImageCropModal {...defaultProps} />);
    const cancelBtn = screen.getByRole('button', { name: 'Cancelar edición' });
    fireEvent.click(cancelBtn);
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
