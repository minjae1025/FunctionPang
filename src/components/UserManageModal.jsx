import { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddUserView from './AddUserView';
import { STORAGE_KEYS, generateId } from '@/utils/storage';
import DeleteIconSvg from '@/assets/images/delete.svg';
import EditIconSvg from '@/assets/images/edit.svg';

const UserManageModal = ({ onClose, users, currentUserId, onUpdateUsers, onChangeCurrentUser, onUpdateHistory, historyData }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState('');
  const [view, setView] = useState('list'); // 'list' or 'add'

  // ESC 키로 닫기 처리
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const startEditing = (e, index, name) => {
    e.stopPropagation(); // 이름 클릭(선택) 방지
    setEditIndex(index);
    setEditName(name);
  };

  const finishEditing = (e) => {
    if (e) e.stopPropagation();
    if (editName.trim() === '') return;
    const updatedUsers = [...users];
    
    updatedUsers[editIndex] = { ...updatedUsers[editIndex], name: editName };
    onUpdateUsers(updatedUsers);
    
    // 현재 선택된 유저의 이름을 수정한 경우 current_user name도 업데이트해야 함
    // (현재는 상위 컴포넌트에서 name도 별도로 저장하고 있으므로)
    if (updatedUsers[editIndex].id === currentUserId) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, editName);
    }
    
    setEditIndex(null);
  };

  const handleAddUser = (name) => {
    if (users.length >= 10) {
      alert('사용자는 최대 10명까지만 추가할 수 있습니다.');
      return;
    }
    if (users.some(u => u.name === name)) {
      alert('이미 존재하는 이름입니다.');
      return;
    }
    const updatedUsers = [...users, { id: generateId(), name, lang: 'Javascript' }];
    onUpdateUsers(updatedUsers);
    setView('list');
  };

  const selectUser = (id) => {
    onChangeCurrentUser(id);
    onClose(); // 선택 시 바로 닫기
  };

  const deleteUser = (e, idx, id) => {
    e.stopPropagation(); // 이름 클릭(선택) 방지
    const updated = users.filter((_, i) => i !== idx);
    onUpdateUsers(updated);
    
    // 해당 사용자의 기록도 삭제 (오브젝트에서 키 제거)
    const updatedHistory = { ...historyData };
    delete updatedHistory[id];
    onUpdateHistory(updatedHistory);

    if (currentUserId === id) {
      // 다음 유저 선택 (삭제된 유저가 현재 유저일 때)
      if (updated.length > 0) {
        onChangeCurrentUser(updated[0].id);
      } else {
        onChangeCurrentUser('');
      }
    }
  };

  const handleComplete = () => {
    if (users.length === 0) {
      alert('최소 한 명의 사용자가 필요합니다.');
      return;
    }
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>사용자 관리</Title>
        
        {view === 'list' ? (
          <>
            <UserListContainer>
              <ListTitle>사용자 목록 (클릭 시 선택)</ListTitle>
              
              <UserList>
                {users.length > 0 ? users.map((user, idx) => (
                  <UserItem 
                    key={user.id} 
                    onClick={() => selectUser(user.id)}
                    $isSelected={currentUserId === user.id}
                  >
                    
                    {editIndex === idx ? (
                      <EditInput 
                        value={editName} 
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') finishEditing(e); }}
                        autoFocus
                      />
                    ) : (
                      <UserName $isSelected={currentUserId === user.id}>
                        {user.name} {currentUserId === user.id && ' (현재)'}
                      </UserName>
                    )}

                    <ActionButtons>
                      {editIndex === idx ? (
                        <ConfirmButton onClick={finishEditing}>확인</ConfirmButton>
                      ) : (
                        <>
                          <ActionButton onClick={(e) => startEditing(e, idx, user.name)}>
                            <IconImg src={EditIconSvg} alt="수정" />
                          </ActionButton>
                          <ActionButton onClick={(e) => deleteUser(e, idx, user.id)}>
                            <IconImg src={DeleteIconSvg} alt="삭제" />
                          </ActionButton>
                        </>
                      )}
                    </ActionButtons>
                  </UserItem>
                )) : (
                  <EmptyMessage>등록된 사용자가 없습니다.</EmptyMessage>
                )}
              </UserList>
            </UserListContainer>

            <ButtonGroup>
              <CancelButton onClick={onClose}>취소</CancelButton>
              <AddButton onClick={() => setView('add')}>사용자 추가</AddButton>
              <CompleteButton onClick={handleComplete}>완료</CompleteButton>
            </ButtonGroup>
          </>
        ) : (
          <AddUserView onAdd={handleAddUser} onCancel={() => setView('list')} />
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  width: 480px;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Title = styled.h3`
  margin: 0 0 25px 0;
  font-size: 24px;
  font-weight: bold;
`;

const UserListContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
`;

const ListTitle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 15px 0;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 250px;
  overflow-y: auto;
  padding-right: 5px;
`;

const UserItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  background-color: ${props => props.$isSelected ? '#e8f0fe' : '#fff'};
  border-radius: 10px;
  cursor: pointer;
  border: ${props => props.$isSelected ? '2px solid #4b7bff' : '1px solid #eee'};
  transition: all 0.2s;
`;

const EditInput = styled.input`
  padding: 6px 10px;
  border: 1px solid #4b7bff;
  border-radius: 6px;
  width: 70%;
  font-size: 15px;
`;

const UserName = styled.span`
  font-size: 16px;
  font-weight: ${props => props.$isSelected ? 'bold' : '500'};
  color: ${props => props.$isSelected ? '#4b7bff' : '#333'};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ConfirmButton = styled.button`
  font-size: 12px;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #4b7bff;
  color: #fff;
`;

const ActionButton = styled.div`
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
`;

const IconImg = styled.img`
  width: 16px;
  height: 16px;
`;

const EmptyMessage = styled.p`
  color: #999;
  padding: 20px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const BaseButton = styled.button`
  flex: 1;
  color: #fff;
  border: none;
  padding: 14px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
`;

const CancelButton = styled(BaseButton)`
  background-color: #ff4d4f;
`;

const AddButton = styled(BaseButton)`
  background-color: #4CAF50;
  color: white;
`;

const CompleteButton = styled(BaseButton)`
  background-color: #4b7bff;
`;

export default UserManageModal;
