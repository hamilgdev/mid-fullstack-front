import { vstack } from 'styled-system/patterns';

import { ContainerWrapper } from '@/components/ui/wrappers/container-wrapper/container-wrapper';
import { Logo } from '@/components/ui/logo/logo';

export const PublicHeader = () => {
  return (
    <header
      className={vstack({
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'gray.100',
        minHeight: '12',
      })}
    >
      <ContainerWrapper>
        <Logo />
      </ContainerWrapper>
    </header>
  );
};
