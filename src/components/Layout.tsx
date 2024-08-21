import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/constants';
import SwitchProfile from './SwitchProfile';

const Layout = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ user }, dispatch] = useStateProvider();
  const [showModal, setshowModal] = useState(false);

  useEffect(() => {
    const is_logged_in = localStorage.getItem('sm_is_logged_in');
    if (is_logged_in) {
      const user_str = localStorage.getItem('sm_user');
      if (user_str) {
        const user = JSON.parse(user_str);
        dispatch({
          type: reducerCases.SET_USER,
          user,
        });
      } else {
        navigate('/auth/signup');
      }
    } else {
      navigate('/auth/signin');
    }
  }, []);

  return (
    <Container>
      <div className="app__body">
        <Navbar />
        <div className="profile_status"><span>Hi 👋 <span className='upper'> {user?.name}.</span> You are Logged is as <span className='upper'> {user?.role === "employee" ? ( `an ${user?.role}`) : ( `a ${user?.role}`)}</span></span><span className='switch_profile' onClick={()=>setshowModal(true)}> Switch Profile</span></div>
          
        <div className="body__container">
        <Outlet />
        </div>
      </div>
      {showModal && (
        <SwitchProfile
          open={showModal}
          close={() => setshowModal(false)}
          initialValues={{}}
        />
      )}
    </Container>
  );
};
const Container = styled.div`
  .logo {
    color: var(--brand);
    padding: 30px 0px 10px 0px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    svg {
      font-size: 26px;
    }
  }
.profile_status{
margin:20px 0;
text-align:center;
.upper{
text-transform:capitalize;
}
}
  .body__container {
    max-width: 900px;
    margin: 10px auto;
    height: 86vh;
    background-color: white;
  }
    .switch_profile{
    text-decoration:underline;
    cursor:pointer;
    }
`;
export default Layout;
