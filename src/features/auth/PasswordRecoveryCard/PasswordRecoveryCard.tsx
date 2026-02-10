'use client';

import Button from '@/GlamUI/components/Button';
import MessageBar from '@/GlamUI/components/MessageBar';
import Text from '@/GlamUI/components/Text';
import TextInput from '@/GlamUI/components/TextInput';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import AuthCard from '../AuthCard';

const errorsInitialState: LoginErrors = {
  email: undefined,
  login: undefined,
};

interface LoginErrors {
  email?: string;
  login?: string;
}

const PasswordRecoveryCard = () => {
  const t = useTranslations('passwordRecovery');
  const tCommon = useTranslations('common');
  const tErrors = useTranslations('errors');

  const [loginErrors, setLoginErrors] =
    useState<LoginErrors>(errorsInitialState);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined,
  );
  const [email, setEmail] = useState<string>('');

  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      if (e.target.validity.typeMismatch) {
        setLoginErrors((prev) => ({
          ...prev,
          email: tErrors('invalidEmail'),
        }));
      } else {
        setLoginErrors((prev) => ({ ...prev, email: undefined }));
      }
    }

    setEmail(e.target.value);
  };

  const recoverPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginErrors((prev) => ({ ...prev, login: undefined }));

    if (!email) {
      setLoginErrors((prev) => ({ ...prev, login: t('enterEmail') }));
      return;
    }

    setSuccessMessage(t('checkEmail'));
  };

  return (
    <AuthCard title={t('title')}>
      <div className="flex flex-col items-center w-full max-w-sm">
        <Text variant="body" size="sm" weight="semibold" as="p" align="center">
          {t('instructions')}
        </Text>
        <form
          className="flex flex-col gap-2 w-full max-w-sm mt-2 mb-4"
          onSubmit={recoverPassword}
        >
          <TextInput
            label={tCommon('email')}
            name="email"
            type="email"
            id="email"
            placeholder={tCommon('emailPlaceholder')}
            onChange={updateEmail}
            value={email}
            error={loginErrors.email}
          />

          <MessageBar
            message={loginErrors.login}
            variant="error"
            dismissible={true}
            dismissMessageBar={() =>
              setLoginErrors((prev) => ({ ...prev, login: undefined }))
            }
          />

          <MessageBar
            message={successMessage}
            variant="success"
            dismissible={true}
            dismissMessageBar={() => setSuccessMessage(undefined)}
          />

          <div className="mt-0">
            <Button
              type="submit"
              variant="primary"
              rounded="full"
              size="sm"
              fullSize={true}
              aria-label={t('resetButton')}
            >
              {t('resetButton')}
            </Button>
          </div>
        </form>
        <div className="flex justify-center items-center gap-x-2 flex-wrap">
          <Text variant="label" size="sm" weight="semibold" as="span">
            {t('rememberedPassword')}
          </Text>
          <Link href="/login">
            <Text
              variant="label"
              size="sm"
              weight="bold"
              as="span"
              color="brandSecondary"
            >
              {t('loginNow')}
            </Text>
          </Link>
        </div>
      </div>
    </AuthCard>
  );
};

export default PasswordRecoveryCard;
