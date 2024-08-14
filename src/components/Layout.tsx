import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';
import { useEffect } from 'react';
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/constants';

const Layout = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, dispatch] = useStateProvider();

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
        <div className="body__container">
          <Outlet />
        </div>
      </div>
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

  .body__container {
    max-width: 900px;
    margin: 10px auto;
    height: 86vh;
    background-color: white;
  }
`;
export default Layout;
