import styled from 'styled-components';
import { Modal } from 'antd';
import { Icon } from '@iconify/react';
import CloseButton from './CloseButton';

interface Props {
  alertOpen: boolean;
  closeAlert: () => void;
  description: string;
  variant: 'warning' | 'danger' | 'success';
}
const InfoAlert = ({ alertOpen, closeAlert, description, variant }: Props) => {
  const renderIcon = () => {
    switch (variant) {
      case 'danger':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '60px',
              width: '60px',
              borderRadius: '50%',
              backgroundColor: 'var(--danger-light)',
            }}
          >
            <Icon
              icon="bi:exclamation"
              style={{
                fontSize: '40px',
                color: 'var(--danger)',
              }}
            />
          </div>
        );
      case 'warning':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '60px',
              width: '60px',
              borderRadius: '50%',
              backgroundColor: 'var(--warning-20)',
            }}
          >
            <Icon
              icon="bi:info"
              style={{
                fontSize: '40px',
                color: 'var(--warning)',
              }}
            />
          </div>
        );
      default:
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '60px',
              width: '60px',
              borderRadius: '50%',
              backgroundColor: 'var(--success-light)',
            }}
          >
            <Icon
              icon="ic:outline-check"
              style={{
                fontSize: '40px',
                color: 'var(--success)',
              }}
            />
          </div>
        );
    }
  };

  const renderTitle = () => {
    switch (variant) {
      case 'danger':
        return 'Error';
      case 'warning':
        return 'Info';
      default:
        return 'Success';
    }
  };
  return (
    <Modal
      title=""
      centered
      open={alertOpen}
      closeIcon={null}
      onCancel={closeAlert}
      footer={null}
      zIndex={11000}
    >
      <Container>
        <div className="alert__header">
          <CloseButton onClose={closeAlert} />
        </div>
        <div className="alert__body">
          {renderIcon()}
          <div className="title">
            <span>{renderTitle()}</span>
          </div>
          <div className="description">
            <span>{description}</span>
          </div>
        </div>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  color: var(--black);
  .alert__header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .alert__body {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    .title {
      font-size: 20px;
      font-weight: 500;
      margin-top: 10px;
    }
    .description {
      font-size: 14px;
      font-weight: 400;
    }
  }
`;
export default InfoAlert;
