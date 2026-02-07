'use client';

import Text from '@/GlamUI/components/Text';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import AuthCard from '../AuthCard';

import LoginForm from './LoginForm';

const LoginCard = () => {
  const t = useTranslations('auth');

  return (
    <AuthCard title={t('welcome')}>
      <div className="flex flex-col items-center w-full max-w-sm">
        <LoginForm />
        <div className="flex justify-center items-center gap-2">
          <Text variant="label" size="sm" weight="semibold" as="span">
            {t('notAMember')}
          </Text>
          <Link href="/signup">
            <Text
              variant="label"
              size="sm"
              weight="bold"
              as="span"
              color="brandSecondary"
            >
              {t('signup')}
            </Text>
          </Link>
        </div>
        <Link href="/password-recover">
          <Text
            variant="label"
            size="sm"
            weight="bold"
            as="span"
            color="brandSecondary"
          >
            {t('forgotPassword')}
          </Text>
        </Link>
      </div>
    </AuthCard>
  );
};

export default LoginCard;
