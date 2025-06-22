import { css } from 'styled-system/css';

import { useAuthContext } from '@/hooks/use-auth-context';
import { ContainerWrapper } from '@/components/ui/wrappers/container-wrapper/container-wrapper';
import { Logo } from '@/components/ui/logo/logo';

export const StudioHeader = () => {
  const { logout } = useAuthContext();

  return (
    <header
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4',
        width: '100%',
        backgroundColor: 'gray.50',
        boxShadow: 'xs',
        borderBottomWidth: '1px',
        borderColor: 'gray.200',
      })}
    >
      <ContainerWrapper>
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          })}
        >
          <Logo />

          <button>
            <span
              className={css({
                color: 'blue.500',
                fontSize: 'lg',
                textDecoration: 'none',
              })}
              onClick={() => logout()}
            >
              Cerrar sesión
            </span>
          </button>
        </div>
      </ContainerWrapper>
    </header>
  );
};
