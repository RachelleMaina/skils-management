import styled from 'styled-components';
import { Button, Modal } from 'antd';
import { Icon } from '@iconify/react';

interface Props {
  alertOpen: boolean;
  closeAlert: () => void;
  promptText: string;
  callback: () => void;
  loading: boolean;
  deleteText: string;
}
const DeleteAlert = ({
  alertOpen,
  closeAlert,
  callback,
  promptText,
  loading,
  deleteText,
}: Props) => {
  return (
    <Modal
      title=""
      centered
      open={alertOpen}
      closeIcon={null}
      onCancel={closeAlert}
      footer={null}
    >
      <Container>
        <div className="propmt__text">
          <span>{promptText}</span>
        </div>
        <div className="cta">
          <Button
            loading={loading}
            htmlType="submit"
            type={'primary'}
            onClick={callback}
            style={{
              backgroundColor: 'var(--danger)',
            }}
            icon={
              <Icon
                icon={'simple-line-icons:check'}
                style={{ fontSize: '18px' }}
              />
            }
          >
            {deleteText}
          </Button>
          <Button type={'default'} onClick={() => closeAlert()}>
            Cancel
          </Button>
        </div>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  color: var(---black);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px 0;
  .cta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .propmt__text {
    font-size: 14px;
    font-weight: 400;
  }
`;
export default DeleteAlert;
