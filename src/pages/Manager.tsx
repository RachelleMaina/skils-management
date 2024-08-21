import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/constants';
import AllSkills from '../components/AllSkills';

const Manager = () => {
  const [key, setKey] = useState(1);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, dispatch] = useStateProvider();


  useEffect(() => {
    const employee_skills_str = localStorage.getItem('sm_employee_skills');
    const employee_skills =  employee_skills_str ? JSON.parse( employee_skills_str) : [];

    const all_skills_str = localStorage.getItem('sm_all_skills');
    const all_skills = all_skills_str ? JSON.parse(all_skills_str) : [];
    
    dispatch({
      type: reducerCases.SET_EMPLOYEE_SKILLS,
     employee_skills,
    });
    dispatch({
      type: reducerCases.SET_FILTERED_SKILLS,
      filtered_skills:   employee_skills,
    });
    dispatch({
      type: reducerCases.SET_ALL_SKILLS,
      all_skills
    });
  }, [key]);

  const reload = () => {
    setKey((key) => key + 1);
  };


  return (
    <Container>

      <AllSkills reload={reload} tableKey={ key} />
    </Container>
  );
};
const Container = styled.div``;
export default Manager;
