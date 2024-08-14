import styled from 'styled-components';
import { useStateProvider } from '../utils/StateProvider';
import { Badge } from 'antd';

const SkillsBanner = ({
  handleFilter,
}: {
  handleFilter: (tag: any) => void;
}) => {
  const [{ skills }] = useStateProvider();
  const skill_tags = [
    {
      name: 'All Skills',
      count: skills.length,
    },
    {
      name: 'Good At',
      count: skills.filter((skill: { tags: string | string[] }) =>
        skill.tags.includes('Good At')
      )?.length,
    },
    {
      name: 'Needs Training',
      count: skills.filter((skill: { tags: string | string[] }) =>
        skill.tags.includes('Needs Training')
      )?.length,
    },
    {
      name: 'Can Couch',
      count: skills.filter((skill: { tags: string | string[] }) =>
        skill.tags.includes('Can Couch')
      )?.length,
    },
  ];

  return (
    <Container>
      {skill_tags.map((tag, i) => (
        <div
          className="skill"
          key={i.toString()}
          onClick={() => handleFilter(tag)}
        >
          <span className="title">{tag.name}</span>
          <Badge count={tag.count} showZero color="var(--brand)" />
        </div>
      ))}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  border: 1px solid var(--grey-2);
  padding: 15px;
  border-radius: 6px;
  .skill {
    display: flex;
    gap: 5px;
    cursor: pointer;
    .title {
      color: var(--grey-3);
    }
  }
`;
export default SkillsBanner;
