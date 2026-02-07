import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const errorsInitialState: LoginErrors = {
  email: undefined,
  login: undefined,
};

interface LoginProps {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  login?: string;
}

interface UseLoginProps {
  loginData: LoginProps;
  loginErrors: LoginErrors;
  rememberMe: boolean;
  setLoginErrors: React.Dispatch<React.SetStateAction<LoginErrors>>;
  updateLoginData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateRememberMe: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
}

type UseLogin = () => UseLoginProps;
export const useLogin: UseLogin = () => {
  const router = useRouter();
  const t = useTranslations('errors');

  const [loginErrors, setLoginErrors] =
    useState<LoginErrors>(errorsInitialState);
  const [loginData, setLoginData] = useState<LoginProps>({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);

  const updateLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      if (e.target.validity.typeMismatch) {
        setLoginErrors((prev) => ({
          ...prev,
          email: t('invalidEmail'),
        }));
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
      setLoginErrors((prev) => ({
        ...prev,
        login: t('emptyFields'),
      }));
      return;
    }

    router.push('/dashboard');
  };

  return {
    loginData,
    loginErrors,
    rememberMe,
    setLoginErrors,
    updateLoginData,
    updateRememberMe,
    handleLogin,
  };
};
