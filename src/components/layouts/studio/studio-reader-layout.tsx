import { ContainerWrapper } from '@/components/ui/wrappers/container-wrapper/container-wrapper';

const StudioReaderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ContainerWrapper>{children}</ContainerWrapper>
    </>
  );
};

export default StudioReaderLayout;
