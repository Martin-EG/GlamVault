/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FC, useState } from 'react';
import Cropper from 'react-easy-crop';

import Modal from '../Modal';

import { CropArea } from './ImageCropModal.styles';
import { useCroppedImage } from './hooks';

interface ImageCropModalProps {
  image: string;
  onCancel: () => void;
  onConfirm: (croppedBlob: Blob) => void;
}

const ImageCropModal: FC<ImageCropModalProps> = ({
  image,
  onCancel,
  onConfirm,
}) => {
  const getCroppedImage = useCroppedImage();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<any>(null);

  const onCropComplete = (_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleConfirm = async () => {
    const blob = await getCroppedImage(image, croppedAreaPixels);
    onConfirm(blob);
  };

  return (
    <Modal onCancel={onCancel} onConfirm={handleConfirm}>
      <CropArea>
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </CropArea>
    </Modal>
  );
};

export default ImageCropModal;
