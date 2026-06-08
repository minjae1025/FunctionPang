import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HistoryTable from '../components/HistoryTable';
import UserManageModal from '../components/UserManageModal';
import ResetConfirmModal from '../components/ResetConfirmModal';
const MypageMain = () => {
  const navigate = useNavigate();
  // --- 상태 관리 ---
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('functionpang_currentUser') || '';
  });
  const [users, setUsers] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [filterLang, setFilterLang] = useState('Javascript');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // --- 로컬 스토리지 연동 ---
  useEffect(() => {
    const savedUsers = localStorage.getItem('functionpang_users');
    const savedHistory = localStorage.getItem('functionpang_history');
    const savedCurrentUser = localStorage.getItem('functionpang_currentUser');

    const dummyNames = ['이민준', '김민재', '윤정후', '박준원'];

    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers).filter(name => !dummyNames.includes(name));
      setUsers(parsedUsers);
      if (parsedUsers.length !== JSON.parse(savedUsers).length) {
        localStorage.setItem('functionpang_users', JSON.stringify(parsedUsers));
      }
    }

    if (savedCurrentUser && dummyNames.includes(savedCurrentUser)) {
      setCurrentUser('');
      localStorage.removeItem('functionpang_currentUser');
    }
    
    // 더미 데이터 없이 깔끔하게 저장된 기록만 가져오거나 빈 배열 유지
    if (savedHistory) {
      setHistoryData(JSON.parse(savedHistory));
    }
  }, []);

  // --- 공통 로직 함수들 ---
  const handleUpdateUsers = (newUsers) => {
    setUsers(newUsers);
    localStorage.setItem('functionpang_users', JSON.stringify(newUsers));
  };

  const handleChangeCurrentUser = (newName) => {
    setCurrentUser(newName);
    localStorage.setItem('functionpang_currentUser', newName);
  };

  const handleConfirmReset = () => {
    setHistoryData([]);
    localStorage.setItem('functionpang_history', JSON.stringify([]));
    setIsResetConfirmOpen(false);
  };

  const filteredHistory = historyData.filter(item => 
    item.lang.toLowerCase() === filterLang.toLowerCase()
  );

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '0px 0px 40px 0px', fontFamily: '"Noto Sans KR", sans-serif', boxSizing: 'border-box', overflowX: 'hidden' }}>
      
      {/* 상단 헤더 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: '#f0f0f0', 
        padding: '25px 60px',
        marginBottom: '40px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
      }}>
        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => navigate('/')}>
          <img src="함수팡.svg" alt="logo" style={{ height: '48px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="sub_logo.svg" alt="person" style={{ height: '48px' }} />
        </div>
      </div>

      <div style={{ padding: '0 80px' }}>
        {/* 타이틀 및 닉네임/언어 선택 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 'bold', margin: 0, letterSpacing: '-1px' }}>마이페이지</h2>
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '13px', color: '#888', marginBottom: '4px' }}>닉네임</span>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{currentUser}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '13px', color: '#888', marginBottom: '4px' }}>언어</span>
              <select 
                value={filterLang} 
                onChange={(e) => setFilterLang(e.target.value)}
                style={{ padding: '6px 30px 6px 10px', fontSize: '16px', borderRadius: '6px', border: 'none', backgroundColor: '#e9ecef', cursor: 'pointer', fontWeight: '500' }}
              >
                <option value="Javascript">Javascript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
              </select>
            </div>
          </div>
        </div>

        {/* 1. 분리된 테이블 컴포넌트 렌더링 */}
        <HistoryTable filteredHistory={filteredHistory} />

        {/* 하단 버튼들 */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => setIsResetConfirmOpen(true)} style={{ backgroundColor: '#ff7474', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' }}>기록 초기화</button>
          <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: '#6b8aef', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' }}>사용자 관리</button>
        </div>

        {/* 2. 분리된 사용자 관리 모달 컴포넌트 렌더링 */}
        {isModalOpen && (
          <UserManageModal 
            onClose={() => setIsModalOpen(false)} 
            users={users} 
            currentUser={currentUser} 
            onUpdateUsers={handleUpdateUsers} 
            onChangeCurrentUser={handleChangeCurrentUser} 
          />
        )}

        {/* 3. 분리된 초기화 경고 모달 컴포넌트 렌더링 */}
        {isResetConfirmOpen && (
          <ResetConfirmModal 
            onClose={() => setIsResetConfirmOpen(false)} 
            onConfirm={handleConfirmReset} 
          />
        )}
      </div>
    </div>
  );
};

export default MypageMain;
