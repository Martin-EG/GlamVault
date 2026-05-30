import { render, screen, fireEvent } from '@/utils/test-utils';
import { testMessages, testT } from '@/utils/test-messages';
import 'jest-styled-components';

import FileInput from './FileInput';

describe('FileInput', () => {
  const { fileInput } = testMessages.inventoryAddProduct;
  const productPhotoLabel = testMessages.inventoryAddProduct.productPhotoLabel;

  it('renders file input correctly', () => {
    render(<FileInput label={productPhotoLabel} />);

    const input = screen.getByLabelText(productPhotoLabel);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'file');
    expect(screen.getByText(fileInput.dragLabel)).toBeInTheDocument();
    expect(screen.getByText(fileInput.browseLabel)).toBeInTheDocument();
  });

  it('renders error message and aria attributes', () => {
    const customError = 'Upload a product photo';

    render(
      <FileInput
        id="product-photo"
        label={productPhotoLabel}
        error={customError}
      />,
    );

    const input = screen.getByLabelText(productPhotoLabel);
    const errorMessage = screen.getByText(customError);

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'product-photo-error');
    expect(errorMessage).toHaveAttribute('id', 'product-photo-error');
  });

  it('handles disabled state', () => {
    render(<FileInput disabled label={productPhotoLabel} />);

    expect(screen.getByLabelText(productPhotoLabel)).toBeDisabled();
    expect(
      screen.getByRole('button', {
        name: new RegExp(fileInput.browseLabel, 'i'),
      }),
    ).toBeDisabled();
  });

  it('passes selected files to onFilesChange', () => {
    const handleFilesChange = jest.fn();
    const file = new File(['image'], 'photo.png', { type: 'image/png' });
    render(
      <FileInput label={productPhotoLabel} onFilesChange={handleFilesChange} />,
    );

    fireEvent.change(screen.getByLabelText(productPhotoLabel), {
      target: { files: [file] },
    });

    expect(handleFilesChange).toHaveBeenCalledWith([file]);
  });

  it('passes dropped files to onFilesChange', () => {
    const handleFilesChange = jest.fn();
    const file = new File(['image'], 'photo.png', { type: 'image/png' });
    render(
      <FileInput label={productPhotoLabel} onFilesChange={handleFilesChange} />,
    );

    fireEvent.drop(screen.getByText(fileInput.dragLabel), {
      dataTransfer: { files: [file] },
    });

    expect(handleFilesChange).toHaveBeenCalledWith([file]);
  });

  it('shows size error when selected file exceeds max size', () => {
    const handleFilesChange = jest.fn();
    const file = new File(['oversized'], 'photo.png', { type: 'image/png' });
    Object.defineProperty(file, 'size', { value: 2 * 1024 * 1024 });

    render(
      <FileInput
        label={productPhotoLabel}
        maxSizeMB={1}
        onFilesChange={handleFilesChange}
      />,
    );

    fireEvent.change(screen.getByLabelText(productPhotoLabel), {
      target: { files: [file] },
    });

    expect(
      screen.getByText(
        testT('inventoryAddProduct.fileInput', 'errorSize', { maxSize: 1 }),
      ),
    ).toBeInTheDocument();
    expect(handleFilesChange).toHaveBeenCalledWith([]);
  });
});
