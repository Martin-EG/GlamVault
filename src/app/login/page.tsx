"use client"

import MessageBar from '@/GlamUI/components/MessageBar'
import Button from '@/GlamUI/components/Button'
import Text from '@/GlamUI/components/Text'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react';

interface LoginProps {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loginData, setLoginData] = useState<LoginProps>({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);

  const updateLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const updateRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!loginData.email || !loginData.password) {
      setError('Completa todos los campos');
      return;
    }

    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <Image src="/glamvault-complete.svg" alt="GlamVault" width={320} height={200} />
          <div className="flex flex-col items-center w-full max-w-sm">
            <Text variant="heading" size="xxl" weight="bold" as="h1">Bienvenido</Text>
            <form className="flex flex-col w-full max-w-sm mt-4 mb-4" onSubmit={handleLogin}>
              <Text
                variant="label"
                size="sm"
                weight="regular"
                as="label"
                color="light"
                labelFor="email"
              >
                Email
              </Text>
              <input
                name="email"
                type="email"
                id="email"
                className="border border-gray-300 rounded px-3 py-1 mb-4"
                onChange={updateLoginData}
                value={loginData.email}
              />
              <Text
                variant="label"
                size="sm"
                weight="regular"
                as="label"
                color="light"
                labelFor="password"
              >
                Contraseña
              </Text>
              <input
                name="password"
                type="password"
                id="password"
                className="border border-gray-300 rounded px-2 py-1 mb-1"
                onChange={updateLoginData}
                value={loginData.password}
              />
              <div className="flex justify-end items-center gap-2 mb-4">
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
                variant="error"
                dismissible={true}
                dismissMessageBar={() => setError(null)}
                message={error}
              />

              <Button
                type="submit"
                variant="primary"
                rounded="full"
                size="sm"
                fullSize={true}
                text="Iniciar sesión"
              />
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
        </div>
      </div>
    </main>
  );
}

export default Login;
