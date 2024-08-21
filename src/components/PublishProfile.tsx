import { Button, Form, Modal, Select, Space } from 'antd';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';

interface Props {
  open: boolean;
  close: () => void;
  initialValues: any;
}

const PublishProfile = ({ open, close, initialValues }: Props) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [JSON.stringify(initialValues)]);

  const handleFormSubmit = (payload: { visible_to: string }) => {
    const employee_profile_str = localStorage.getItem('sm_employee_profile');
    let employee_profile = employee_profile_str
      ? JSON.parse(employee_profile_str)
      : [];
    employee_profile.visible_to = payload.visible_to;
    employee_profile = JSON.stringify(employee_profile);
    localStorage.setItem('sm_employee_profile', employee_profile);
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
          <Space
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
            }}
          >
            <Form.Item
              style={{ width: '250px' }}
              name={'visible_to'}
              label="Publish to"
              rules={[{ required: true }]}
     
            >
              <Select
                mode="multiple"
                options={[
                  { value: 'line_manager', label: 'Line Manager' },
                  { value: 'hr_manager', label: 'HR manager' },
                  { value: 'team', label: 'My team' },
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
          </Space>
          <Form.Item
            style={{
              display: 'flex',
              justifyContent: 'end',
              marginTop: '10px',
            }}
          >
            <Button type="primary" htmlType="submit">
              Publish
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default PublishProfile;
