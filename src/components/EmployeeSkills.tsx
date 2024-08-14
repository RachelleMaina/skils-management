import { Icon } from '@iconify/react';
import { Button, Empty, Rate, Select, Typography } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import { Skill } from '../types';
import { useStateProvider } from '../utils/StateProvider';
import SearchInput from './SearchInput';
import SkillModal from './SkillModal';
import SkillTags from './SkillTags';
import SkillsBanner from './SkillsBanner';
import { reducerCases } from '../utils/constants';
import DeleteAlert from './DeleteAlert';

interface Props {
  reload: () => void;
}

const EmployeeSkills = ({ reload }: Props) => {
  const [{ employee_skills, filtered_skills }, dispatch] = useStateProvider();
  const [showModal, setshowModal] = useState(false);
  const [title, setTitle] = useState('Add Skill');
  const [initialValues, setInitialValues] = useState<any>({
    skills: [
      {
        skill: '',
        proficiency: null,
        tag: null,
      },
    ],
  });
  const [action, setAction] = useState('');
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const handleAdd = () => {
    setTitle('Add Skill');
    setAction('add');
    setshowModal(true);
  };

  const handlePropose = () => {
    setTitle('Propose Skill');
    setAction('propose');
    setshowModal(true);
  };

  const handleEdit = (skill: Skill) => {
    setTitle('Edit Skill');
    setAction('edit');
    setshowModal(true);
    setInitialValues({ skills: [skill] });
  };

  const handleDelete = () => {
    if (selectedSkill) {
      //find skill with given id
      const index = employee_skills.findIndex(
        (item: { id: number }) => item.id === selectedSkill.id
      );

      const allSkills = [...employee_skills];
      //delete skill
      if (index > -1) {
        allSkills.splice(index, 1);
      }

      localStorage.setItem('sm_skills', JSON.stringify(allSkills));
      reload();
      setShowDeleteAlert(false);
    }
  };

  const handleFilter = (tag: any) => {
    if (tag.name === 'All Skills') {
      dispatch({
        type: reducerCases.SET_FILTERED_SKILLS,
        filtered_skills: employee_skills,
      });
    } else {
      const filtered_skills = employee_skills.filter((sk: any) =>
        sk.tags.includes(tag.name)
      );
      dispatch({
        type: reducerCases.SET_FILTERED_SKILLS,
        filtered_skills,
      });
    }
  };

  const onDelete = (skill: Skill) => {
    setSelectedSkill(skill);
    setShowDeleteAlert(true);
  };

  return (
    <>
      <Container>
        <div className="table__header">
          <div className="cta_actions">
            <Button onClick={handlePropose}>Propose Skill</Button>
            <Button onClick={handleAdd} type="primary">
              Add Skill
            </Button>
          </div>
          {employee_skills?.length > 0 && (
            <SkillsBanner handleFilter={handleFilter} />
          )}
        </div>
        {employee_skills ? (
          <div className="skills_table">
            <div className="sub_header">
              <Select
                mode="multiple"
                placeholder="Filter By"
                options={[
                  {
                    value: 'Most Scarce',
                    label: 'Most Scarce',
                  },
                  { value: 'Most Used', label: 'Most Used' },
                  { value: 'Most Searched', label: 'Most Searched' },
                ]}
                onChange={(value: any) => console.log(value)}
                style={{ width: '150px', cursor: 'pointer' }}
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
              <SearchInput />
            </div>

            {filtered_skills?.map((skill: Skill) => (
              <div className="skill__item" key={skill.id}>
                <div className="header">
                  <div className="left__section">
                    <span>{skill.skill}</span>
                  </div>
                  <div className="right__section">
                    <div className="icon" onClick={() => handleEdit(skill)}>
                      <Icon icon="mdi:edit" />
                    </div>
                    <div className="icon" onClick={() => onDelete(skill)}>
                      <Icon icon="mdi:trash-outline" />
                    </div>
                  </div>
                </div>

                <Rate value={skill.proficiency} className="rating" />
                <SkillTags skill={skill} />
              </div>
            ))}
          </div>
        ) : (
          <Empty
            imageStyle={{ height: 60, margin: 40 }}
            description={
              <Typography.Text
                style={{
                  fontFamily: "'Axiforma', sans-serif",
                }}
              >
                No Skills Found
              </Typography.Text>
            }
          >
            <Button type="primary" onClick={handleAdd}>
              Add Skill
            </Button>
          </Empty>
        )}
      </Container>

      {showDeleteAlert && (
        <DeleteAlert
          alertOpen={showDeleteAlert}
          closeAlert={() => setShowDeleteAlert(false)}
          promptText={'Are you sure you want to Delete this skill?'}
          callback={handleDelete}
          loading={false}
          deleteText={'Delete Skill'}
        />
      )}

      <SkillModal
        open={showModal}
        close={() => setshowModal(false)}
        title={title}
        initialValues={initialValues}
        reload={reload}
        action={action}
      />
    </>
  );
};
const Container = styled.div`
  background-color: #fff;
  border-radius: 6px;
  margin: 10px 0;
  padding: 20px;

  .table__header {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
    .page_title {
      font-size: 20px;
      font-weight: 500;
    }
  }
  .sub_header {
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }
  .skills_table {
    border: 1px solid var(--grey-2);
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .skill__item {
    border-bottom: 1px solid var(--grey-2);
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    &:last-child {
      border-bottom: none;
    }
    .header {
      display: flex;
      width: 100%;
      .left__section {
        font-weight: 500;
        width: 50%;
      }
      .right__section {
        width: 50%;
        display: flex;
        justify-content: flex-end;
        gap: 5px;
        .icon {
          cursor: pointer;
          svg {
            color: var(--black-1);
            font-size: 18px;
          }
        }
      }
    }
    .rating {
      color: var(--brand);
    }
  }
  .cta_actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
`;
export default EmployeeSkills;
