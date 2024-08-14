import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const is_logged_in = localStorage.getItem('sm_is_logged_in');
    if (is_logged_in) {
      navigate('/');
    }
  }, []);

  return (
    <Container>
      <Outlet />
    </Container>
  );
};
const Container = styled.div`
  margin-top: 40px;
`;
export default Auth;
