import { Icon } from '@iconify/react';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useStateProvider } from '../utils/StateProvider';
import PublishProfile from './PublishProfile';

const Navbar = () => {
  const [showModal, setshowModal] = useState(false);

  const [{ user }] = useStateProvider();

  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('sm_is_logged_in');
    navigate('/auth/signin');
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <div className="profile">
          <div className="user">
            <span className="username">{user?.name}</span>
            <span className="role">{user?.role}</span>
          </div>
        </div>
      ),
      key: '1',
    },

    {
      type: 'divider',
    },
    {
      label: (
        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
          onClick={signOut}
        >
          <Icon
            icon="uit:signout"
            style={{
              fontSize: '24px',
            }}
          />
          <span
            style={{
              textTransform: 'capitalize',
            }}
          >
            Sign Out
          </span>
        </div>
      ),
      key: '2',
    },
  ];

  return (
    <>
      <Container>
        <div className="left__items" onClick={()=>navigate("/")}>
          <Icon
            icon="token:card"
            style={{ color: 'var(--brand)', fontSize: '32px' }}
          />
          <span className="company">My Company</span>
        </div>
        <div className="right__items">
          {user?.role === "employee" ?  <div className="publish__profile">
            <button className="publish_btn" onClick={() => setshowModal(true)}>
              Publish Profile
            </button>
          </div> :null}
        

          <Dropdown
            menu={{ items }}
            overlayStyle={{
              fontFamily: "'Futura', sans-serif",
            }}
            trigger={['click']}
          >
            <Avatar
              style={{
                backgroundColor: 'var(--brand)',
                color: 'var(--black-1)',
                cursor: 'pointer',
              }}
            >
              {user?.name?.charAt(0)}
            </Avatar>
          </Dropdown>
        </div>
      </Container>
      {showModal && (
        <PublishProfile
          open={showModal}
          close={() => setshowModal(false)}
          initialValues={{}}
        />
      )}
    </>
  );
};
const Container = styled.div`
  padding: 20px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left__items {
    display: flex;
    align-items: center;
    gap: 10px;
    .company {
      color: black;
      font-weight: 600;
      font-size: 16px;
    }
  }
  .right__items {
    display: flex;
    align-items: center;
    gap: 10px;
    .time {
      font-size: 14px;
      font-weight: 500;
      color: var(--grey-3);
      border-right: 1px solid var(--grey-3);
      padding-right: 10px;
    }
    .logout {
      color: var(--brand);
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
    }
  }
`;
export default Navbar;
