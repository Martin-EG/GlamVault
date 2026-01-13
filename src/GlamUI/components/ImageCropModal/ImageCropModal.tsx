/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FC, useState } from 'react';
import Cropper from 'react-easy-crop';

import Button from '../Button';
import {
  CropArea,
  Footer,
  Modal,
  Overlay,
} from './ImageCropModal.styles';
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
    <Overlay>
      <Modal role="dialog" aria-modal="true">
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

        <Footer>
          <Button variant="secondary" onClick={onCancel} text="Cancelar" size="sm" fullSize />
          <Button onClick={handleConfirm} text="Guardar" size="sm" fullSize />
        </Footer>
      </Modal>
    </Overlay>
  );
};

export default ImageCropModal;
