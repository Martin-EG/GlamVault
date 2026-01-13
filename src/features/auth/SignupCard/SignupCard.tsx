"use client"

import MessageBar from '@/GlamUI/components/MessageBar'
import Button from '@/GlamUI/components/Button'
import PasswordInput from '@/GlamUI/components/PasswordInput'
import Text from '@/GlamUI/components/Text'
import TextInput from '@/GlamUI/components/TextInput'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useState } from 'react'

import ProfilePhotoInput from '../../ProfilePhotoInput'
import AuthCard from "../AuthCard";

const errorsInitialState: SignupErrors = {
  email: undefined,
  password: undefined,
  passwordConfirmation: undefined,
  signup: undefined,
}

interface SignupProps {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupErrors {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  signup?: string;
}

const SignupCard = () => {
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [signupErrors, setSignupErrors] = useState<SignupErrors>(errorsInitialState);
  const [signupData, setSignupData] = useState<SignupProps>({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const updateSignupData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      if (e.target.validity.typeMismatch) {
        setSignupErrors((prev) => ({ ...prev, email: 'Introduce un email válido' }));
      } else {
        setSignupErrors((prev) => ({ ...prev, email: undefined }));
      }
    }

    if (e.target.name === 'password') {
      if (e.target.value.length < 8) {
        setSignupErrors((prev) => ({ ...prev, password: 'La contraseña debe tener al menos 8 caracteres' }));
      } else {
        setSignupErrors((prev) => ({ ...prev, password: undefined }));
      }
    }

    if (e.target.name === 'passwordConfirmation') {
      if (e.target.value !== signupData.password) {
        setSignupErrors((prev) => ({ ...prev, passwordConfirmation: 'Las contraseñas no coinciden' }));
      } else {
        setSignupErrors((prev) => ({ ...prev, passwordConfirmation: undefined }));
      }
    }

    setSignupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignupErrors((prev) => ({ ...prev, signup: undefined }));

    if (!signupData.name ||
      !signupData.email ||
      !signupData.password ||
      !signupData.passwordConfirmation) {
      setSignupErrors((prev) => ({ ...prev, signup: 'Completa todos los campos' }));
      return;
    }

    if (signupData.password !== signupData.passwordConfirmation) {
      setSignupErrors((prev) => ({ ...prev, passwordConfirmation: 'Las contraseñas no coinciden' }));
      return;
    }

    console.log(profilePhoto, signupData);

    redirect('/dashboard');
  };

  return (
    <AuthCard title="Crea tu cuenta">
      <div className="flex flex-col items-center w-full max-w-sm">
        <Text variant='body' size='sm' weight='semibold' as='p' align='center'>
          Comienza a organizar tu maquillaje en linea
        </Text>
        <div className="flex items-center justify-center mt-4">
          <ProfilePhotoInput onChangeProfilePhoto={setProfilePhoto} />
        </div>
        <form className="flex flex-col w-full max-w-sm mb-4" onSubmit={handleSignup}>
          <TextInput
            label="Nombre"
            name="name"
            type="text"
            id="name"
            placeholder="Tu nombre"
            onChange={updateSignupData}
            value={signupData.name}
          />
          <TextInput
            label="Email"
            name="email"
            type="email"
            id="email"
            placeholder="you@email.com"
            onChange={updateSignupData}
            value={signupData.email}
            error={signupErrors.email}
          />
          <PasswordInput
            label="Contraseña"
            name="password"
            id="password"
            onChange={updateSignupData}
            value={signupData.password}
            error={signupErrors.password}
          />
          <PasswordInput
            label="Confirmar contraseña"
            name="passwordConfirmation"
            id="passwordConfirmation"
            onChange={updateSignupData}
            value={signupData.passwordConfirmation}
            error={signupErrors.passwordConfirmation}
          />

          <div className="mt-4">
            <MessageBar
              message={signupErrors.signup}
              variant="error"
              dismissible={true}
              dismissMessageBar={() => setSignupErrors((prev) => ({ ...prev, signup: undefined }))}
            />
          </div>

          <div className="mt-4">
            <Button
              type="submit"
              variant="primary"
              rounded="full"
              size="sm"
              fullSize={true}
              text="Registrarse"
            />
          </div>
        </form>
        <div className="flex justify-center items-center gap-2">
          <Text variant="label" size="sm" weight="semibold" as="span">
            ¿Ya tienes cuenta?
          </Text>
          <Link href="/login">
            <Text variant="label" size="sm" weight="bold" as="span" color="brandSecondary">
              Inicia sesión
            </Text>
          </Link>
        </div>

      </div>
    </AuthCard>
  )
};

export default SignupCard;
