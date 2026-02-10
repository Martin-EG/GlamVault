import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { useState } from 'react';

const errorsInitialState: SignupErrors = {
  email: undefined,
  password: undefined,
  passwordConfirmation: undefined,
  signup: undefined,
};

export interface SignupProps {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignupErrors {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  signup?: string;
}

interface UseSignupProps {
  profilePhoto: File | null;
  signupData: SignupProps;
  signupErrors: SignupErrors;
  setProfilePhoto: React.Dispatch<React.SetStateAction<File | null>>;
  setSignupErrors: React.Dispatch<React.SetStateAction<SignupErrors>>;
  updateSignupData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSignup: (e: React.FormEvent<HTMLFormElement>) => void;
}

type UseSignup = () => UseSignupProps;
export const useSignup: UseSignup = () => {
  const t = useTranslations('errors');
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [signupErrors, setSignupErrors] =
    useState<SignupErrors>(errorsInitialState);
  const [signupData, setSignupData] = useState<SignupProps>({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const updateSignupData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      if (e.target.validity.typeMismatch) {
        setSignupErrors((prev) => ({
          ...prev,
          email: t('invalidEmail'),
        }));
      } else {
        setSignupErrors((prev) => ({ ...prev, email: undefined }));
      }
    }

    if (e.target.name === 'password') {
      if (e.target.value.length < 8) {
        setSignupErrors((prev) => ({
          ...prev,
          password: t('passwordTooShort'),
        }));
      } else {
        setSignupErrors((prev) => ({ ...prev, password: undefined }));
      }
    }

    if (e.target.name === 'passwordConfirmation') {
      if (e.target.value !== signupData.password) {
        setSignupErrors((prev) => ({
          ...prev,
          passwordConfirmation: t('passwordMismatch'),
        }));
      } else {
        setSignupErrors((prev) => ({
          ...prev,
          passwordConfirmation: undefined,
        }));
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

    if (
      !signupData.name ||
      !signupData.email ||
      !signupData.password ||
      !signupData.passwordConfirmation
    ) {
      setSignupErrors((prev) => ({
        ...prev,
        signup: t('emptyFields'),
      }));
      return;
    }

    if (signupData.password !== signupData.passwordConfirmation) {
      setSignupErrors((prev) => ({
        ...prev,
        passwordConfirmation: t('passwordMismatch'),
      }));
      return;
    }

    console.log(profilePhoto, signupData);

    redirect('/dashboard');
  };

  return {
    profilePhoto,
    signupData,
    signupErrors,
    setProfilePhoto,
    setSignupErrors,
    updateSignupData,
    handleSignup,
  };
};
