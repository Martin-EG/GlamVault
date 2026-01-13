"use client"

import MessageBar from '@/GlamUI/components/MessageBar'
import Button from '@/GlamUI/components/Button'
import PasswordInput from '@/GlamUI/components/PasswordInput'
import Text from '@/GlamUI/components/Text'
import TextInput from '@/GlamUI/components/TextInput'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useState } from 'react'

import AuthCard from "../AuthCard";

const errorsInitialState: LoginErrors = {
  email: undefined,
  login: undefined,
}

interface LoginProps {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  login?: string;
}

const LoginCard = () => {
  const [loginErrors, setLoginErrors] = useState<LoginErrors>(errorsInitialState);
  const [loginData, setLoginData] = useState<LoginProps>({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);

  const updateLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      if (e.target.validity.typeMismatch) {
        setLoginErrors((prev) => ({ ...prev, email: 'Introduce un email válido' }));
      } else {
        setLoginErrors((prev) => ({ ...prev, email: undefined }));
      }
    }

    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginErrors((prev) => ({ ...prev, login: undefined }));

    if (!loginData.email || !loginData.password) {
      setLoginErrors((prev) => ({ ...prev, login: 'Completa todos los campos' }));
      return;
    }

    redirect('/dashboard');
  };

  return (
    <AuthCard title="Bienvenido">
      <div className="flex flex-col items-center w-full max-w-sm">
        <form className="flex flex-col w-full max-w-sm mb-4" onSubmit={handleLogin}>
          <TextInput
            label="Email"
            name="email"
            type="email"
            id="email"
            placeholder="you@email.com"
            onChange={updateLoginData}
            value={loginData.email}
            error={loginErrors.email}
          />
          <PasswordInput
            label="Contraseña"
            name="password"
            id="password"
            onChange={updateLoginData}
            value={loginData.password}
          />
          <div className="flex justify-end items-center gap-2 mb-2">
            <input
              name="rememberMe"
              type="checkbox"
              id="rememberMe"
              onChange={updateRememberMe}
              checked={rememberMe}
            />
            <Text
              variant="label"
              size="sm"
              weight="regular"
              as="label"
              color="light"
              labelFor="rememberMe"
            >
              Recordarme
            </Text>
          </div>

          <MessageBar
            message={loginErrors.login}
            variant="error"
            dismissible={true}
            dismissMessageBar={() => setLoginErrors((prev) => ({ ...prev, login: undefined }))}
          />

          <div className="mt-4">
            <Button
              type="submit"
              variant="primary"
              rounded="full"
              size="sm"
              fullSize={true}
              text="Iniciar sesión"
            />
          </div>
        </form>
        <div className="flex justify-center items-center gap-2">
          <Text variant="label" size="sm" weight="semibold" as="span">
            ¿No tienes cuenta?
          </Text>
          <Link href="/signup">
            <Text variant="label" size="sm" weight="bold" as="span" color="brandSecondary">
              Registrate
            </Text>
          </Link>
        </div>
        <Link href="/password-recover">
          <Text variant="label" size="sm" weight="bold" as="span" color="brandSecondary">
            ¿Olvidaste tu contraseña?
          </Text>
        </Link>

      </div>
    </AuthCard>
  )
};

export default LoginCard;
