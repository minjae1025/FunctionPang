import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '@/utils/storage';
import logo from '@/assets/images/function_pang.svg';
import subLogo from '@/assets/images/sub_logo.svg';

const Header = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState('');

  const updateUserName = () => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    setCurrentUser(savedUser || '');
  };

  useEffect(() => {
    updateUserName();

    // 사용자 정보 변경 시 실시간 반영을 위한 이벤트 리스너
    window.addEventListener('userUpdated', updateUserName);
    return () => window.removeEventListener('userUpdated', updateUserName);
  }, []);

  useEffect(() => {
    const savedUserId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
    if (!savedUserId) {
      navigate('/detail');
    }
  }, [navigate]);

  return (
    <HeaderContainer>
      <LogoWrapper onClick={() => navigate('/home')}>
        <LogoImg src={logo} alt="logo" />
      </LogoWrapper>
      <SubLogoWrapper onClick={() => navigate('/mypage')}>
        <Name>{currentUser}님</Name>
        <SubLogoImg src={subLogo} alt="person" />
      </SubLogoWrapper>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  padding: 25px 60px;
  margin-bottom: 40px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const LogoWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  height: 48px;
`;

const SubLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SubLogoImg = styled.img`
  height: 48px;
`;

const Name = styled.span`
  margin-right: 10px;
  font-weight: 600;
  font-size: 18px;
`;

export default Header;
