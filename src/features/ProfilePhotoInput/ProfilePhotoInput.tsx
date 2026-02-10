'use client';

import Avatar from '@/GlamUI/components/Avatar';
import ImageCropModal from '@/GlamUI/components/ImageCropModal';
import { FC, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

interface ProfilePhotoInputProps {
  readonly onChangeProfilePhoto?: (value: File) => void;
}

const ProfilePhotoInput: FC<ProfilePhotoInputProps> = ({
  onChangeProfilePhoto,
}) => {
  const t = useTranslations('common');
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [cropping, setCropping] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadFile = (file: File) => {
    setPreview(URL.createObjectURL(file));
    setCropping(true);
  };

  const confirmCropping = async (blob: Blob) => {
    setCropping(false);
    setLoading(true);

    const file = new File([blob], 'avatar.jpg', {
      type: 'image/jpeg',
    });

    setPreview(URL.createObjectURL(file));
    onChangeProfilePhoto?.(file);

    setLoading(false);
  };

  return (
    <>
      <Avatar
        src={preview}
        alt={t('profilePicture')}
        size="lg"
        editable
        loading={loading}
        onClick={() => inputRef.current?.click()}
      />

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => e.target.files && loadFile(e.target.files[0])}
      />

      {cropping && preview && (
        <ImageCropModal
          image={preview}
          onCancel={() => setCropping(false)}
          onConfirm={confirmCropping}
        />
      )}
    </>
  );
};

export default ProfilePhotoInput;
