import { Icon } from '@iconify/react';
import { Input } from 'antd';
import styled from 'styled-components';

const SearchInput = () => {
  return (
    <Container>
      <Input
        placeholder="search"
        prefix={
          <Icon
            icon="weui:search-outlined"
            style={{ color: 'var(--grey-3)', fontSize: '20px' }}
          />
        }
      />
    </Container>
  );
};
const Container = styled.div`
  width: 150px;
`;
export default SearchInput;
