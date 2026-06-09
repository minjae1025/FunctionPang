import styled from 'styled-components';

const PracticeFeedbackModal = ({ 
  show, 
  isCorrect, 
  correctAnswer, 
  timer, 
  onNext,
  bgColor 
}) => {
  if (!show) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <FeedbackIcon>{isCorrect ? '✅' : '❌'}</FeedbackIcon>
        <FeedbackTitle $isCorrect={isCorrect}>
          {isCorrect ? '정답입니다!' : '아쉬워요, 오답입니다.'}
        </FeedbackTitle>
        {!isCorrect && (
          <CorrectAnswerBox>
            <AnswerLabel>정답:</AnswerLabel>
            <AnswerValue>{correctAnswer}</AnswerValue>
          </CorrectAnswerBox>
        )}
        <TimerText><span>{timer}</span>초 후 자동으로 넘어갑니다.</TimerText>
        <NextButton $bgColor={bgColor} onClick={onNext}>다음 문제</NextButton>
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
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 90%;
  max-width: 450px;
  padding: 50px 30px;
  border-radius: 24px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
`;

const FeedbackIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`;

const FeedbackTitle = styled.h3`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  color: ${props => props.$isCorrect ? '#46cd58' : '#cf4f4f'};
`;

const CorrectAnswerBox = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 25px;
  border: 1px solid #eee;
`;

const AnswerLabel = styled.div`
  font-size: 16px;
  color: #888;
  margin-bottom: 5px;
`;

const AnswerValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  font-family: 'Courier New', Courier, monospace;
`;

const TimerText = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
  
  span {
    font-weight: 700;
    color: #333;
  }
`;

const NextButton = styled.button`
  width: 100%;
  padding: 18px;
  font-size: 20px;
  font-weight: 600;
  color: white;
  background: ${props => props.$bgColor};
  border: none;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export default PracticeFeedbackModal;
