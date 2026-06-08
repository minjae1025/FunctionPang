import { useState, useEffect } from 'react';
import AddUserView from './AddUserView';

const UserManageModal = ({ onClose, users, currentUser, onUpdateUsers, onChangeCurrentUser }) => {
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
    
    if (updatedUsers[editIndex] === currentUser) {
      onChangeCurrentUser(editName);
    }
    
    updatedUsers[editIndex] = editName;
    onUpdateUsers(updatedUsers);
    setEditIndex(null);
  };

  const handleAddUser = (name) => {
    if (users.includes(name)) {
      alert('이미 존재하는 이름입니다.');
      return;
    }
    const updatedUsers = [...users, name];
    onUpdateUsers(updatedUsers);
    setView('list');
  };

  const selectUser = (name) => {
    onChangeCurrentUser(name);
    onClose(); // 선택 시 바로 닫기
  };

  const deleteUser = (e, idx, name) => {
    e.stopPropagation(); // 이름 클릭(선택) 방지
    const updated = users.filter((_, i) => i !== idx);
    onUpdateUsers(updated);
    if (currentUser === name) onChangeCurrentUser('');
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: '#fff', width: '480px', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 25px 0', fontSize: '24px', fontWeight: 'bold' }}>사용자 관리</h3>
        
        {view === 'list' ? (
          <>
            <div style={{ backgroundColor: '#f8f9fa', borderRadius: '15px', padding: '20px', marginBottom: '30px' }}>
              <p style={{ fontSize: '14px', color: '#666', margin: '0 0 15px 0' }}>사용자 목록 (클릭 시 선택)</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '250px', overflowY: 'auto', paddingRight: '5px' }}>
                {users.length > 0 ? users.map((user, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => selectUser(user)}
                    style={{ 
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                      padding: '12px 18px', 
                      backgroundColor: currentUser === user ? '#e8f0fe' : '#fff', 
                      borderRadius: '10px',
                      cursor: 'pointer',
                      border: currentUser === user ? '2px solid #4b7bff' : '1px solid #eee',
                      transition: 'all 0.2s'
                    }}
                  >
                    
                    {editIndex === idx ? (
                      <input 
                        value={editName} 
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') finishEditing(e); }}
                        style={{ padding: '6px 10px', border: '1px solid #4b7bff', borderRadius: '6px', width: '70%', fontSize: '15px' }}
                        autoFocus
                      />
                    ) : (
                      <span style={{ fontSize: '16px', fontWeight: currentUser === user ? 'bold' : '500', color: currentUser === user ? '#4b7bff' : '#333' }}>
                        {user} {currentUser === user && ' (현재)'}
                      </span>
                    )}

                    <div style={{ display: 'flex', gap: '10px' }}>
                      {editIndex === idx ? (
                        <button onClick={finishEditing} style={{ fontSize: '12px', padding: '5px 10px', cursor: 'pointer', border: 'none', borderRadius: '5px', backgroundColor: '#4b7bff', color: '#fff' }}>확인</button>
                      ) : (
                        <>
                          <span onClick={(e) => startEditing(e, idx, user)} style={{ cursor: 'pointer', fontSize: '16px' }}>✏️</span>
                          <span onClick={(e) => deleteUser(e, idx, user)} style={{ cursor: 'pointer', fontSize: '16px' }}>🗑️</span>
                        </>
                      )}
                    </div>
                  </div>
                )) : (
                  <p style={{ color: '#999', padding: '20px 0' }}>등록된 사용자가 없습니다.</p>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={onClose} style={{ flex: 1, backgroundColor: '#ff4d4f', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>취소</button>
              <button onClick={() => setView('add')} style={{ flex: 1, backgroundColor: '#4CAF50', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>사용자 추가</button>
              <button onClick={onClose} style={{ flex: 1, backgroundColor: '#4b7bff', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>완료</button>
            </div>
          </>
        ) : (
          <AddUserView onAdd={handleAddUser} onCancel={() => setView('list')} />
        )}
      </div>
    </div>
  );
};

export default UserManageModal;