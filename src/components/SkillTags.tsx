import { useState } from 'react';
import { Select, Tag } from 'antd';
import { Skill } from '../types';

const SkillTags = ({ skill }: { skill: Skill }) => {
  const [tags, setTags] = useState<string[]>(skill.tags || []);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const handleInputConfirm = (inputValue: string) => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
  };

  const forMap = (tag: string) => (
    <span key={tag} style={{ display: 'inline-block' }}>
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
        style={{ padding: '4px' }}
      >
        {tag}
      </Tag>
    </span>
  );

  const tagChild = tags.map(forMap);

  return (
    <div
      style={{
        margin: '10px 0',
        display: 'flex',
        gap: '5px',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ height: '35px' }}>{tagChild}</div>
      {tags.length < 3 ? (
        <Select
          style={{ minWidth: 130, height: 28 }}
          options={[
            { value: 'Good At', label: 'Good At' },
            { value: 'Needs Training', label: 'Needs Training' },
            { value: 'Can Couch', label: 'Can Couch' },
          ]}
          size="small"
          onSelect={handleInputConfirm}
          placeholder="Add Tag"
        />
      ) : null}
    </div>
  );
};

export default SkillTags;
