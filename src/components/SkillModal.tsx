import { Form, Modal } from 'antd';
import SkillsForm from './SkillForm';
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
      proficiency: number;
      tags: string[];
    }
  ];
}
interface Skill {
  id: number;
  skill: string;
  proficiency: number;
  tags: string[];
}

const SkillModal = ({
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
    const ls = localStorage.getItem('sm_employee_skills');
    const existingSkills = ls ? JSON.parse(ls) : [];

    //add ids
    const skillsWithIds = payload.skills.map((skill, i) => ({
      ...skill,
      id: existingSkills.length + 1 + i,
    }));

    const allSkills = [...existingSkills, ...skillsWithIds];

    localStorage.setItem('sm_employee_skills', JSON.stringify(allSkills));
    close();
    reload();
    setAlertDesc('Skill Added Successfully');
    setShowInfoALert(true);
  };

  const handleEdit = (payload: Payload) => {
    const ls = localStorage.getItem('sm_employee_skills');
    const existingSkills: Skill[] = ls ? JSON.parse(ls) : [];

    //find skill with given id
    const skill = existingSkills.find(
      (skill) => skill.id === initialValues.skills[0].id
    );

    //update skill
    if (skill) {
      skill.skill = payload.skills[0].skill;
      skill.tags = [...skill.tags, ...payload.skills[0].tags];
      skill.proficiency = payload.skills[0].proficiency;
    }

    localStorage.setItem('sm_employee_skills', JSON.stringify(existingSkills));

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
        <SkillsForm
          form={form}
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          action={action}
        />
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

export default SkillModal;
