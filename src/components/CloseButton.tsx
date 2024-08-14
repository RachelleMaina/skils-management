import { Icon } from '@iconify/react';
import styled from 'styled-components';

const CloseButton = ({ onClose }: { onClose: () => void }) => {
  return (
    <Container onClick={onClose}>
      <Icon icon={'iconoir:cancel'} />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: var(--miqo-brand-20);
  color: var(--miqo-brand);
  svg {
    font-size: 24px;
  }
`;
export default CloseButton;
