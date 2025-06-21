import { css } from 'styled-system/css';

import { SignInForm } from '@/components/ui/forms/sign-in/sign-in-form';
import { ContainerWrapper } from '@/components/ui/wrappers/container-wrapper/container-wrapper';

export const SignInSection = () => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100dvh - 48px)',
        backgroundColor: 'gray.50',
        flexGrow: 1,
      })}
    >
      <ContainerWrapper>
        <h1
          className={css({
            fontSize: '2xl',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '4',
            color: 'gray.800',
            marginBlock: '8',
          })}
        >
          Iniciar Sesión
        </h1>
        <SignInForm />
      </ContainerWrapper>
    </div>
  );
};
