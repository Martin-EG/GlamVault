'use client';

import MessageBar from '@/GlamUI/components/MessageBar';
import Button from '@/GlamUI/components/Button';
import PasswordInput from '@/GlamUI/components/PasswordInput';
import Text from '@/GlamUI/components/Text';
import TextInput from '@/GlamUI/components/TextInput';
import { useTranslations } from 'next-intl';

import { useLogin } from './hooks';

const LoginForm = () => {
  const t = useTranslations('login');
  const tCommon = useTranslations('common');

  const {
    loginData,
    loginErrors,
    rememberMe,
    setLoginErrors,
    updateLoginData,
    updateRememberMe,
    handleLogin,
  } = useLogin();

  return (
    <form className="flex flex-col w-full max-w-sm mb-4" onSubmit={handleLogin}>
      <TextInput
        label={tCommon('email')}
        name="email"
        type="email"
        id="email"
        placeholder={tCommon('emailPlaceholder')}
        onChange={updateLoginData}
        value={loginData.email}
        error={loginErrors.email}
      />
      <PasswordInput
        label={tCommon('password')}
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
          {t('rememberMe')}
        </Text>
      </div>

      <MessageBar
        message={loginErrors.login}
        variant="error"
        dismissible={true}
        dismissMessageBar={() =>
          setLoginErrors((prev) => ({ ...prev, login: undefined }))
        }
      />

      <div className="mt-4">
        <Button
          type="submit"
          variant="primary"
          rounded="full"
          size="sm"
          fullSize={true}
          aria-label={t('loginButton')}
        >
          {t('loginButton')}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
