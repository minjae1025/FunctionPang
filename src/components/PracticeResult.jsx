import styled from 'styled-components';
import Header from '@/components/Header';

const PracticeResult = ({ score, onBack, bgColor, incorrectQuestions }) => {
  return (
    <Container>
      <Header />
      <ResultSection>
        <ResultTitle>학습 완료!</ResultTitle>
        <ScoreText>당신의 점수는 <span style={{ color: bgColor }}>{score}</span>점 입니다.</ScoreText>
        
        {incorrectQuestions && incorrectQuestions.length > 0 && (
          <WrongQuestionsContainer>
            <WrongTitle>틀린 문제 ({incorrectQuestions.length}개)</WrongTitle>
            <WrongList>
              {incorrectQuestions.map((q, i) => (
                <WrongItem key={i}>
                  <Description>{q.description}</Description>
                  <Answer>정답: {q.function_name || q.code}</Answer>
                </WrongItem>
              ))}
            </WrongList>
          </WrongQuestionsContainer>
        )}
        
        <ButtonArea>
          <ActionButton $bgColor={bgColor} onClick={onBack}>메뉴로 돌아가기</ActionButton>
        </ButtonArea>
      </ResultSection>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
`;

const ResultSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
`;

const ResultTitle = styled.h2`
  font-size: 60px;
  margin-bottom: 20px;
`;

const ScoreText = styled.p`
  font-size: 40px;
  margin-bottom: 40px;
  
  span {
    font-weight: 800;
  }
`;

const WrongQuestionsContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 40px;
  text-align: left;
`;

const WrongTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const WrongList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const WrongItem = styled.li`
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #ddd;
`;

const Description = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 8px;
`;

const Answer = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #d33;
`;

const ButtonArea = styled.div`
  display: flex;
  gap: 20px;
`;

const ActionButton = styled.button`
  padding: 20px 40px;
  font-size: 24px;
  font-weight: 600;
  color: white;
  background: ${props => props.$bgColor};
  border: none;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`;

export default PracticeResult;
