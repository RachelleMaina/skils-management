import { Button, Form, Modal, Select } from 'antd';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';

interface Props {
  open: boolean;
  close: () => void;
  initialValues: any;
}

const SwitchProfile = ({ open, close, initialValues }: Props) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [JSON.stringify(initialValues)]);

  const handleFormSubmit = (payload: { profile: string }) => {
    const employee_profile_str = localStorage.getItem('sm_user');
    let employee_profile = employee_profile_str
      ? JSON.parse(employee_profile_str)
      : [];
    employee_profile.role = payload.profile;
    employee_profile = JSON.stringify(employee_profile);
      localStorage.setItem('sm_user', employee_profile);
      close();
      window.location.reload(true);
  };

  return (
    <Modal
      open={open}
      title={'Publish Profile'}
      onOk={close}
      onCancel={close}
      footer={null}
    >
      <div
        style={{
          padding: '20px 0',
        }}
      >
        <Form
          form={form}
          onFinish={handleFormSubmit}
          layout={'vertical'}
          autoComplete="off"
          initialValues={initialValues}
          // requiredMark={requiredMark}
        >
        <Form.Item
            label="Profile"
            name="profile"
            rules={[{ required: true, message: 'Please input profile!' }]}
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
            style={{
              display: 'flex',
              justifyContent: 'end',
              marginTop: '10px',
            }}
          >
            <Button type="primary" htmlType="submit">
              Switch Profile
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default SwitchProfile;
