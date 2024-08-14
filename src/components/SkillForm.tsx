import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import {
  Button,
  Form,
  FormInstance,
  Input,
  InputRef,
  Select,
  Space,
} from 'antd';
import { Store } from 'antd/es/form/interface';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props {
  form: FormInstance<any>;
  onSubmit: (data: any) => void;
  initialValues: Store | undefined;
  action: string;
}
export interface ProposesSkills {
  skill: string;
  employee: string;
}

const SkillsForm = ({ form, onSubmit, initialValues, action }: Props) => {
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [JSON.stringify(initialValues)]);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    //add item to list of proposed skills

    const proposed_skills_str = localStorage.getItem('sm_proposed_skills');
    let proposed_skills = proposed_skills_str
      ? JSON.parse(proposed_skills_str)
      : [];
    proposed_skills = [...proposed_skills, { employee: 'anon', skill: name }];
    proposed_skills = JSON.stringify(proposed_skills);
    localStorage.setItem('sm_proposed_skills', proposed_skills);
  };

  return (
    <Container>
      {action === 'propose' ? (
        <>
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              placeholder="Please enter item"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Propose Skill to HR
            </Button>
          </Space>
        </>
      ) : (
        <Form
          form={form}
          onFinish={onSubmit}
          layout={'vertical'}
          autoComplete="off"
          initialValues={initialValues}
          // requiredMark={requiredMark}
        >
          <>
            <Form.List name="skills">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => {
                    return (
                      <>
                        <Space
                          key={key}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            alignItems: 'center',
                            gap: '20px',
                            marginBottom: 8,
                          }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            style={{ width: '100%' }}
                            name={[name, 'skill']}
                            label="Skill"
                            rules={[{ required: true }]}
                          >
                            <Select
                              showSearch
                              filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '')
                                  .toLowerCase()
                                  .localeCompare(
                                    (optionB?.label ?? '').toLowerCase()
                                  )
                              }
                              options={[
                                { value: 'JavaScript', label: 'JavaScript' },
                                { value: 'TypeScript', label: 'TypeScript' },
                                { value: 'Next.js', label: 'Next.js' },
                              ]}
                              onChange={(value: any) =>
                                form.setFieldsValue({ skill: value })
                              }
                              //   onSelect={(value) => {
                              //     onChange?.(value);
                              //     selectProps?.onSelect?.(value);
                              //   }}
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
                            {...restField}
                            style={{ width: '100%' }}
                            name={[name, 'proficiency']}
                            rules={[{ min: 0, max: 5 }]}
                            label="Proficiency"
                          >
                            <Input type="number" />
                          </Form.Item>
                        </Space>
                        <Space
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr',
                          }}
                        >
                          <Form.Item
                            {...restField}
                            style={{ width: '100%' }}
                            name={[name, 'tags']}
                            label="Tag"
                          >
                            <Select
                              mode="multiple"
                              options={[
                                { value: 'Good At', label: 'Good At' },
                                {
                                  value: 'Needs Training',
                                  label: 'Needs Training',
                                },
                                { value: 'Can Couch', label: 'Can Couch' },
                              ]}
                              onChange={(value: any) =>
                                form.setFieldsValue({ tag: value })
                              }
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
                          {fields.length > 1 && (
                            <MinusCircleOutlined
                              onClick={() => remove(name)}
                              style={{
                                color: 'var(--grey)',
                                fontSize: '16px',
                              }}
                            />
                          )}
                        </Space>
                      </>
                    );
                  })}
                  {initialValues?.skills ? null : (
                    <Form.Item>
                      <Button
                        type="text"
                        onClick={() => add({ position: fields.length + 1 })}
                        icon={
                          <PlusOutlined
                            style={{
                              fontSize: '16px',
                            }}
                          />
                        }
                        style={{
                          color: 'var(--brand)',
                        }}
                      >
                        Add Another Skill
                      </Button>
                    </Form.Item>
                  )}
                </>
              )}
            </Form.List>
            <Form.Item
              style={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'end',
              }}
            >
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Form.Item>
          </>
        </Form>
      )}
    </Container>
  );
};
const Container = styled.div`
  padding: 20px 0px;
  .input__container {
    display: grid;
    grid-template-columns: 40% 40%;
    column-gap: 20%;
  }
  .error {
    color: var(--danger);
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 5px;
    svg {
      font-size: 14px;
    }
  }
  .required {
    font-size: 10px;
    font-weight: 500;
    color: var(--grey-3);
    border-radius: 10px;
    background: rgba(79, 79, 79, 0.1);
    padding: 0px 8px;
    margin-left: 5px;
  }
  input {
    text-transform: capitalize;
  }
  input::placeholder {
    text-transform: capitalize;
  }
`;
export default SkillsForm;
