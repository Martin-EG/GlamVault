'use client';

import Text from '@/GlamUI/components/Text';
import Link from 'next/link';

import ProfilePhotoInput from '../../ProfilePhotoInput';
import AuthCard from '../AuthCard';

import { useSignup } from './hooks';
import SignupForm from './SignupForm';

const SignupCard = () => {
  const { setProfilePhoto, ...signupFormProps } = useSignup();

  return (
    <AuthCard title="Crea tu cuenta">
      <div className="flex flex-col items-center w-full max-w-sm">
        <Text variant="body" size="sm" weight="semibold" as="p" align="center">
          Comienza a organizar tu maquillaje en linea
        </Text>
        <div className="flex items-center justify-center mt-4">
          <ProfilePhotoInput onChangeProfilePhoto={setProfilePhoto} />
        </div>
        <SignupForm {...signupFormProps} />
        <div className="flex justify-center items-center gap-2">
          <Text variant="label" size="sm" weight="semibold" as="span">
            ¿Ya tienes cuenta?
          </Text>
          <Link href="/login">
            <Text
              variant="label"
              size="sm"
              weight="bold"
              as="span"
              color="brandSecondary"
            >
              Inicia sesión
            </Text>
          </Link>
        </div>
      </div>
    </AuthCard>
  );
};
export default SignupCard;
