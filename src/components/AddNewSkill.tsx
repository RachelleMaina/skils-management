import { Button, Form, Input, Modal, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import InfoAlert from './InfoAlert';
import { useState } from 'react';

interface Props {
  open: boolean;
  close: () => void;
  title: string;
  initialValues: any;
  reload: () => void;
  action: string;
}

interface Payload {
  skills: [
    {
      skill: string;
  
    }
  ];
}
interface Skill {
  id: number;
  skill: string;

}

const AddNewSkill = ({
  open,
  close,
  title,
  initialValues,
  reload,
  action,
}: Props) => {
  const [showInfoAlert, setShowInfoALert] = useState(false);
  const [alertDesc, setAlertDesc] = useState('');

  const [form] = Form.useForm();

  const handleFormSubmit = (payload: Payload) => {
    action === 'edit' ? handleEdit(payload) : handleAdd(payload);
  };

  const handleAdd = (payload: Payload) => {
    const ls = localStorage.getItem('sm_all_skills');
    const existingSkills = ls ? JSON.parse(ls) : [];

    //add ids
    const skillsWithIds = payload.skills.map((skill, i) => ({
      ...skill,
      id: existingSkills.length + 1 + i,
    }));

    const allSkills = [...existingSkills, ...skillsWithIds];

    localStorage.setItem('sm_all_skills', JSON.stringify(allSkills));
    close();
    reload();
    setAlertDesc('Skill Added Successfully');
    setShowInfoALert(true);
  };

  const handleEdit = (payload: Payload) => {
    const ls = localStorage.getItem('sm_all_skills');
    const existingSkills: Skill[] = ls ? JSON.parse(ls) : [];

    //find skill with given id
    const skill = existingSkills.find(
      (skill) => skill.id === initialValues.skills[0].id
    );

    //update skill
    if (skill) {
      skill.skill = payload.skills[0].skill;
    }

    localStorage.setItem('sm_all_skills', JSON.stringify(existingSkills));

    close();
    reload();
    setAlertDesc('Skill Updated Successfully');
    setShowInfoALert(true);
  };

  return (
    <>
      <Modal
        open={open}
        title={title}
        onOk={close}
        onCancel={close}
        footer={null}
        centered
      >
        <Form
             form={form}
             onFinish={handleFormSubmit}
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
                               gridTemplateColumns: '3fr 1fr',
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
                               rules={[{ required: true }]}
                               label="Skill"
                             >
                               <Input  />
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
      </Modal>
      {showInfoAlert && (
        <InfoAlert
          alertOpen={showInfoAlert}
          closeAlert={() => setShowInfoALert(false)}
          description={alertDesc}
          variant={'success'}
        />
      )}
    </>
  );
};

export default AddNewSkill;
