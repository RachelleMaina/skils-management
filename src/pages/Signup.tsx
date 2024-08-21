import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, Form, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Signup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFormSubmit = (payload: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    localStorage.setItem('sm_user', JSON.stringify(payload));

    if (payload.role === 'employee') {
      const profile = {
        employee: payload.name,
        skills: null,
        visible_to: null,
      };
      localStorage.setItem('sm_employee_profile', JSON.stringify(profile));
      localStorage.setItem('sm_is_logged_in', 'true');
      navigate('/');
    }
  };

  return (
    <Container>
      <div className="wrapper">
        <div className="header">
          <span>Create your Account</span>
        </div>
        <Form
          form={form}
          onFinish={handleFormSubmit}
          layout={'vertical'}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please input your role!' }]}
          >
            <Select
              showSearch
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={[
                { value: 'employee', label: 'Employee' },
                { value: 'hr manager', label: 'HR Manager' },
                { value: 'line manager', label: 'Line Manager' },
              ]}
              onChange={(value: any) => form.setFieldsValue({ skill: value })}
              suffixIcon={
                <Icon
                  icon="ion:chevron-down"
                  style={{
                    color: 'var(--grey-3)',
                    fontSize: '16px',
                  }}
                />
              }
            />
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
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="footer">
        <span>Have an account? </span>
        <span className="auth" onClick={() => navigate('/auth/signin')}>
          Sign in.
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
      margin-bottom: 20px;
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

export default Signup;
