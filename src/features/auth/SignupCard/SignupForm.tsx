'use client';

import MessageBar from '@/GlamUI/components/MessageBar';
import Button from '@/GlamUI/components/Button';
import PasswordInput from '@/GlamUI/components/PasswordInput';
import TextInput from '@/GlamUI/components/TextInput';
import { FC } from 'react';
import { useTranslations } from 'next-intl';

import { SignupErrors, SignupProps } from './hooks';

interface SignupFormProps {
  signupData: SignupProps;
  signupErrors: SignupErrors;
  setSignupErrors: React.Dispatch<React.SetStateAction<SignupErrors>>;
  updateSignupData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSignup: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SignupForm: FC<SignupFormProps> = ({
  signupData,
  signupErrors,
  updateSignupData,
  handleSignup,
  setSignupErrors,
}) => {
  const t = useTranslations('signup');
  const tCommon = useTranslations('common');

  return (
    <form
      className="flex flex-col w-full max-w-sm mb-4"
      onSubmit={handleSignup}
    >
      <TextInput
        label={t('name')}
        name="name"
        type="text"
        id="name"
        placeholder={t('namePlaceholder')}
        onChange={updateSignupData}
        value={signupData.name}
      />
      <TextInput
        label={tCommon('email')}
        name="email"
        type="email"
        id="email"
        placeholder={tCommon('emailPlaceholder')}
        onChange={updateSignupData}
        value={signupData.email}
        error={signupErrors.email}
      />
      <PasswordInput
        label={tCommon('password')}
        name="password"
        id="password"
        onChange={updateSignupData}
        value={signupData.password}
        error={signupErrors.password}
      />
      <PasswordInput
        label={t('confirmPassword')}
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
          dismissMessageBar={() =>
            setSignupErrors((prev) => ({ ...prev, signup: undefined }))
          }
        />
      </div>

      <div className="mt-4">
        <Button
          type="submit"
          variant="primary"
          rounded="full"
          size="sm"
          fullSize={true}
          aria-label={t('signupButton')}
        >
          {t('signupButton')}
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
