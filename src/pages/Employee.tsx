import styled from 'styled-components';
import EmployeeSkills from '../components/EmployeeSkills';
import { useState, useEffect } from 'react';
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/constants';

const Employee = () => {
  const [key, setKey] = useState(1);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, dispatch] = useStateProvider();


  useEffect(() => {
    const skillsStr = localStorage.getItem('sm_employee_skills');
    const skills = skillsStr ? JSON.parse(skillsStr) : [];
    console.log(skills, ">>>")
    dispatch({
      type: reducerCases.SET_EMPLOYEE_SKILLS,
     employee_skills:skills,
    });
    dispatch({
      type: reducerCases.SET_FILTERED_SKILLS,
      filtered_skills: skills,
    });
  }, [key]);

  const reload = () => {
    setKey((key) => key + 1);
  };


  return (
    <Container>
      <EmployeeSkills reload={reload} />
    </Container>
  );
};
const Container = styled.div``;
export default Employee;
