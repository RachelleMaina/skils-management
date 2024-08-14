import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Signin = () => {
  const [error, setError] = useState('');
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFormSubmit = (payload: { email: string; password: string }) => {
    const user_str = localStorage.getItem('sm_user');
    if (user_str) {
      const user = user_str ? JSON.parse(user_str) : {};

      if (user.email === payload.email && user.password === payload.password) {
        localStorage.setItem('sm_is_logged_in', 'true');
        navigate('/');
      } else {
        setError('Email or password is incorrect.');
      }
    } else {
      setError('Email or password is incorrect.');
    }
  };

  return (
    <Container>
      <div className="wrapper">
        <div className="header">
          <span>Sign In</span>
          {error && (
            <div className="error">
              <span>{error}</span>
            </div>
          )}
        </div>

        <Form
          form={form}
          onFinish={handleFormSubmit}
          layout={'vertical'}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="footer">
        <span> Don't have an account? </span>
        <span className="auth" onClick={() => navigate('/auth/signup')}>
          Sign up.
        </span>
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin: 20px auto;
  max-width: 400px;
  .wrapper {
    border-radius: 10px;
    background: #fff;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    padding: 30px 40px;
    .header {
      font-weight: 700;
      font-size: 24px;
      height: 60px;
    }
    .error {
      color: red;
      font-size: 12px;
      font-weight: 400;
      padding: 0 5px;
    }
    label {
      font-weight: 500;
    }
    button {
      margin-top: 20px;
    }
  }
  .footer {
    font-weight: 500;
    text-align: center;
    margin: 20px;
    .auth {
      cursor: pointer;
      color: var(--brand);
    }
  }
`;

export default Signin;
