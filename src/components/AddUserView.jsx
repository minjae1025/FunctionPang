import { useState } from 'react';
import styled from 'styled-components';

const AddUserView = ({ onAdd, onCancel }) => {
  const [newName, setNewName] = useState('');

  const handleSubmit = () => {
    if (newName.trim()) {
      onAdd(newName.trim());
    }
  };

  return (
    <Container>
      <Title>새 사용자 추가</Title>
      <Input 
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="추가할 이름을 입력하세요"
        onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
        autoFocus
      />
      <ButtonGroup>
        <AddButton onClick={handleSubmit}>추가하기</AddButton>
        <BackButton onClick={onCancel}>돌아가기</BackButton>
      </ButtonGroup>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 0;
`;

const Title = styled.h4`
  margin: 0 0 20px 0;
  font-size: 18px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
  font-size: 16px;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const BaseButton = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
`;

const AddButton = styled(BaseButton)`
  background-color: #4CAF50;
  color: white;
`;

const BackButton = styled(BaseButton)`
  background-color: #eee;
  color: #333;
`;

export default AddUserView;
