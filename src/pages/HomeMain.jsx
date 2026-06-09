import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { STORAGE_KEYS } from '@/utils/storage';
import imgTyping from '@/assets/images/imgTyping.svg';
import imgSubjective from '@/assets/images/imgSubjective.svg';
import imgBlank from '@/assets/images/imgBlink.svg';

export default function HomeMain() {
    const [currentLanguage, setCurrentLanguage] = useState('Javascript');
    const navigate = useNavigate();

    useEffect(() => {
        const savedUserId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);

        if (!savedUserId) {
            navigate('/detail');
        }
    }, [navigate]);

    useEffect(() => {
        const savedLanguage = localStorage.getItem(STORAGE_KEYS.CURRENT_LANGUAGE);
        if (savedLanguage) {
            setCurrentLanguage(savedLanguage);
        }
    }, []);

    return (
        <Container>
            <Header />
            <Main>
                <TitleSection>
                    <Title>공부 방식을 선택하세요</Title>
                    <Subtitle>현재 선택된 언어 : {currentLanguage}</Subtitle>
                </TitleSection>

                <MethodCards>
                    <MethodCard $bgColor="#374cd3" onClick={() => navigate('/home/typing')}>
                        <MethodLabel>타자 방식</MethodLabel>
                        <IconWrapper>
                            <img src={imgTyping} alt="타자 방식" />
                        </IconWrapper>
                    </MethodCard>

                    <MethodCard $bgColor="#cf4f4f" onClick={() => navigate('/home/subjective')}>
                        <MethodLabel>주관식</MethodLabel>
                        <IconWrapper>
                            <img src={imgSubjective} alt="주관식" />
                        </IconWrapper>
                    </MethodCard>

                    <MethodCard $bgColor="#8fd242" onClick={() => navigate('/home/fill-blank')}>
                        <MethodLabel>빈칸 채우기</MethodLabel>
                        <IconWrapper>
                            <img src={imgBlank} alt="빈칸 채우기" />
                        </IconWrapper>
                    </MethodCard>
                </MethodCards>
            </Main>
        </Container>
    );
}

const Container = styled.div`
  min-height: 100vh;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
`;

const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 56px;
  color: #121212;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 28px;
  color: #000000;
`;

const MethodCards = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1400px;
`;

const MethodCard = styled.div`
  width: 380px;
  height: 380px;
  background-color: ${props => props.$bgColor};
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 1vw;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-10px);
  }
`;

const MethodLabel = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 42px;
  color: #f9f9f9;
  margin-bottom: 40px;
`;

const IconWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  img {
    max-width: 70%;
    height: 60%;
  }
`;
