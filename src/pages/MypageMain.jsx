import { useState, useEffect } from 'react';
import styled from 'styled-components';
import HistoryTable from '../components/HistoryTable';
import UserManageModal from '../components/UserManageModal';
import ResetConfirmModal from '../components/ResetConfirmModal';
import Header from '../components/Header';
import { STORAGE_KEYS, generateId } from '@/utils/storage';

const MypageMain = () => {
  // --- 상태 관리 ---
  const [currentUserId, setCurrentUserId] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID) || '';
  });
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || '';
  });
  const [users, setUsers] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [filterLang, setFilterLang] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_LANGUAGE) || 'Javascript';
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // --- 로컬 스토리지 연동 ---
  useEffect(() => {
    const savedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
    const savedCurrentUserId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
    const savedCurrentUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);

    if (savedUsers) {
      const parsed = JSON.parse(savedUsers);
      
      // 마이그레이션: ID가 없는 유저들에게 ID 부여
      let needsUpdate = false;
      const normalizedUsers = parsed.map(u => {
        if (typeof u === 'string') {
          needsUpdate = true;
          return { id: generateId(), name: u, lang: 'Javascript' };
        }
        if (!u.id) {
          needsUpdate = true;
          return { ...u, id: generateId() };
        }
        return u;
      });

      setUsers(normalizedUsers);
      if (needsUpdate) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(normalizedUsers));
      }

      // 현재 유저 세션 복구 및 검증
      if (savedCurrentUserId) {
        const currentExists = normalizedUsers.some(u => u.id === savedCurrentUserId);
        if (!currentExists) {
          // ID로 못 찾은 경우 이름으로 한 번 더 검색 (마이그레이션 대비)
          const userByName = normalizedUsers.find(u => u.name === savedCurrentUser);
          if (userByName) {
            setCurrentUserId(userByName.id);
            localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, userByName.id);
          } else {
            // 정말 유저가 없는 경우에만 초기화
            setCurrentUserId('');
            setCurrentUser('');
            localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
            localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
          }
        }
      } else if (savedCurrentUser) {
        // 이름만 있는 경우 마이그레이션된 유저에서 ID 찾기
        const user = normalizedUsers.find(u => u.name === savedCurrentUser);
        if (user) {
          setCurrentUserId(user.id);
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, user.id);
        }
      }
    }

    if (savedHistory) {
      let parsedHistory = JSON.parse(savedHistory);
      // Migration: Convert array format to object format if needed
      if (Array.isArray(parsedHistory)) {
        parsedHistory = parsedHistory.reduce((acc, record) => {
          const uid = record.userId;
          if (uid) {
            if (!acc[uid]) acc[uid] = [];
            acc[uid].push(record);
          }
          return acc;
        }, {});
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(parsedHistory));
      }
      setHistoryData(parsedHistory);
    }
  }, []);

  // --- 공통 로직 함수들 ---
  const handleUpdateUsers = (newUsers) => {
    setUsers(newUsers);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(newUsers));
    
    // 현재 선택된 유저의 정보가 수정되었는지 확인 후 업데이트
    const updatedCurrentUser = newUsers.find(u => u.id === currentUserId);
    if (updatedCurrentUser && updatedCurrentUser.name !== currentUser) {
      setCurrentUser(updatedCurrentUser.name);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, updatedCurrentUser.name);
      
      // Header에 닉네임 변경 알림
      window.dispatchEvent(new Event('userUpdated'));
    }
  };

  const handleUpdateHistory = (newHistory) => {
    setHistoryData(newHistory);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(newHistory));
  };

  const handleChangeCurrentUser = (newId) => {
    const selectedUser = users.find(u => u.id === newId);
    if (!selectedUser) {
      setCurrentUserId('');
      setCurrentUser('');
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      return;
    }

    setCurrentUserId(newId);
    setCurrentUser(selectedUser.name);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, newId);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, selectedUser.name);
    
    if (selectedUser.lang) {
      setFilterLang(selectedUser.lang);
      localStorage.setItem(STORAGE_KEYS.CURRENT_LANGUAGE, selectedUser.lang);
    }
  };

  const handleFilterLangChange = (newLang) => {
    setFilterLang(newLang);
    localStorage.setItem(STORAGE_KEYS.CURRENT_LANGUAGE, newLang);
  };

  const handleConfirmReset = () => {
    // 현재 사용자의 기록만 삭제
    if (currentUserId && historyData[currentUserId]) {
        const updatedHistory = { ...historyData, [currentUserId]: [] };
        handleUpdateHistory(updatedHistory);
    }
    setIsResetConfirmOpen(false);
  };

  const filteredHistory = (historyData[currentUserId] || []).slice(0, 10); // 최대 10개만 출력

  return (
    <Container>
      <Header />

      <ContentWrapper>
        <TitleSection>
          <PageTitle>마이페이지</PageTitle>
          <InfoSection>
            <InfoItem>
              <InfoLabel>닉네임</InfoLabel>
              <InfoValue>{currentUser || '사용자 없음'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>언어</InfoLabel>
              <Select 
                value={filterLang} 
                onChange={(e) => handleFilterLangChange(e.target.value)}
              >
                <option value="Javascript">Javascript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
              </Select>
            </InfoItem>
          </InfoSection>
        </TitleSection>

        <TableWrapper>
          <HistoryTable filteredHistory={filteredHistory} style={{ flex: 1 }} />
        </TableWrapper>

        <ButtonSection>
          <ResetButton onClick={() => setIsResetConfirmOpen(true)}>기록 초기화</ResetButton>
          <ManageButton onClick={() => setIsModalOpen(true)}>사용자 관리</ManageButton>
        </ButtonSection>

        {isModalOpen && (
          <UserManageModal 
            onClose={() => setIsModalOpen(false)} 
            users={users} 
            currentUserId={currentUserId} 
            onUpdateUsers={handleUpdateUsers} 
            onChangeCurrentUser={handleChangeCurrentUser} 
            onUpdateHistory={handleUpdateHistory}
            historyData={historyData}
          />
        )}

        {isResetConfirmOpen && (
          <ResetConfirmModal 
            onClose={() => setIsResetConfirmOpen(false)} 
            onConfirm={handleConfirmReset} 
          />
        )}
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard', sans-serif;
  box-sizing: border-box;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 0 80px 40px 80px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TableWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 30px;
`;

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
`;

const PageTitle = styled.h2`
  font-size: 40px;
  font-weight: bold;
  margin: 0;
  letter-spacing: -1px;
`;

const InfoSection = styled.div`
  display: flex;
  gap: 40px;
  align-items: start;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const InfoLabel = styled.span`
  font-size: 13px;
  color: #888;
  margin-bottom: 4px;
`;

const InfoValue = styled.span`
  font-size: 24px;
  font-weight: bold;
  height: 38px;
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  height: 38px;
  padding: 0 50px 0 10px;
  font-size: 18px;
  border-radius: 6px;
  border: none;
  background-color: #e9ecef;
  cursor: pointer;
  font-weight: 500;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BaseButton = styled.button`
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
`;

const ResetButton = styled(BaseButton)`
  background-color: #ff7474;
`;

const ManageButton = styled(BaseButton)`
  background-color: #6b8aef;
`;

export default MypageMain;
