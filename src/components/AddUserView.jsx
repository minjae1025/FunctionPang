import { useState } from 'react';

const AddUserView = ({ onAdd, onCancel }) => {
  const [newName, setNewName] = useState('');

  const handleSubmit = () => {
    if (newName.trim()) {
      onAdd(newName.trim());
    }
  };

  return (
    <div style={{ padding: '20px 0' }}>
      <h4 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>새 사용자 추가</h4>
      <input 
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="추가할 이름을 입력하세요"
        onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
        style={{ 
          padding: '12px', 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          width: '100%', 
          fontSize: '16px',
          boxSizing: 'border-box',
          marginBottom: '20px'
        }}
        autoFocus
      />
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={handleSubmit} 
          style={{ flex: 1, padding: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          추가하기
        </button>
        <button 
          onClick={onCancel} 
          style={{ flex: 1, padding: '12px', backgroundColor: '#eee', color: '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          돌아가기
        </button>
      </div>
    </div>
  );
};

export default AddUserView;