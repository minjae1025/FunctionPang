import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { STORAGE_KEYS, savePracticeRecord } from '@/utils/storage';

export default function PracticeFillBlank() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [lang, setLang] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLastCorrect, setIsLastCorrect] = useState(false);
  const [timer, setTimer] = useState(10);
  const inputRef = useRef(null);

  useEffect(() => {
    const currentLang = localStorage.getItem(STORAGE_KEYS.CURRENT_LANGUAGE) || 'Javascript';
    setLang(currentLang);
    
    const loadQuestions = async () => {
      try {
        const module = await import(`../data/questions/${currentLang.toLowerCase()}.json`);
        const allQuestions = module.default.fill_blank;
        const shuffled = [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, 10);
        setQuestions(shuffled);
      } catch (error) {
        console.error('Failed to load questions:', error);
      }
    };

    loadQuestions();
  }, []);

  useEffect(() => {
    if (inputRef.current && !showFeedback) {
      inputRef.current.focus();
    }
  }, [currentIndex, isFinished, showFeedback]);

  // Timer and Enter key logic for feedback modal
  useEffect(() => {
    let interval;
    if (showFeedback) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            handleNext();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Enter 키 이벤트 리스너
      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
          handleNext();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearInterval(interval);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [showFeedback]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showFeedback) return;

    const correctAnswer = questions[currentIndex].function_name.replace('()', '').trim();
    const userChoice = userInput.replace('()', '').trim();
    const correct = userChoice.toLowerCase() === correctAnswer.toLowerCase();

    setIsLastCorrect(correct);
    if (correct) {
      setScore(prev => prev + 10);
    }
    setShowFeedback(true);
    setTimer(10);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserInput('');
    } else {
      setIsFinished(true);
    }
  };

  useEffect(() => {
    if (isFinished) {
      savePracticeRecord({
        score,
        type: '빈칸 채우기',
        lang: lang
      });
    }
  }, [isFinished, score, lang]);

  if (questions.length === 0) return <div>Loading...</div>;

  if (isFinished) {
    return (
      <Container>
        <Header />
        <ResultSection>
          <ResultTitle>학습 완료!</ResultTitle>
          <ScoreText>당신의 점수는 <span>{score}</span>점 입니다.</ScoreText>
          <ButtonArea>
            <ActionButton $bgColor="#8fd242" onClick={() => navigate('/home')}>메뉴로 돌아가기</ActionButton>
          </ButtonArea>
        </ResultSection>
      </Container>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <Container>
      <Header />
      <Main>
        <Progress>{currentIndex + 1} / {questions.length}</Progress>
        <QuestionBox>
          <DescriptionTitle>{currentQuestion.description}</DescriptionTitle>
          <CodeDisplay>
            <code>{currentQuestion.code}</code>
          </CodeDisplay>
          <InstructionText>빈칸(____)에 들어갈 함수명을 입력하세요.</InstructionText>
        </QuestionBox>

        <InputForm onSubmit={handleSubmit}>
          <PracticeInput
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="빈칸의 내용을 입력하세요"
            autoFocus
            disabled={showFeedback}
          />
          <SubmitButton $bgColor="#8fd242" type="submit">다음</SubmitButton>
        </InputForm>
      </Main>

      {showFeedback && (
        <ModalOverlay>
          <ModalContent>
            <FeedbackIcon>{isLastCorrect ? '✅' : '❌'}</FeedbackIcon>
            <FeedbackTitle $isCorrect={isLastCorrect}>
              {isLastCorrect ? '정답입니다!' : '아쉬워요, 오답입니다.'}
            </FeedbackTitle>
            {!isLastCorrect && (
              <CorrectAnswerBox>
                <AnswerLabel>정답:</AnswerLabel>
                <AnswerValue>{currentQuestion.function_name}</AnswerValue>
              </CorrectAnswerBox>
            )}
            <TimerText><span>{timer}</span>초 후 자동으로 넘어갑니다.</TimerText>
            <NextButton $bgColor="#8fd242" onClick={handleNext}>다음 문제</NextButton>
          </ModalContent>
        </ModalOverlay>
      )}
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

const Progress = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #666;
  margin-bottom: 20px;
`;

const QuestionBox = styled.div`
  width: 100%;
  max-width: 800px;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  margin-bottom: 40px;
  text-align: center;
`;

const DescriptionTitle = styled.h3`
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
  font-weight: 600;
`;

const CodeDisplay = styled.div`
  background: #2d2d2d;
  padding: 30px;
  border-radius: 12px;
  color: #f8f8f2;
  font-family: 'Courier New', Courier, monospace;
  font-size: 28px;
  word-break: break-all;
  line-height: 1.4;
  margin-bottom: 20px;
`;

const InstructionText = styled.p`
  font-size: 18px;
  color: #888;
`;

const InputForm = styled.form`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PracticeInput = styled.input`
  width: 100%;
  padding: 20px;
  font-size: 24px;
  border: 2px solid #ddd;
  border-radius: 12px;
  outline: none;
  text-align: center;

  &:focus {
    border-color: #8fd242;
  }

  &:disabled {
    background-color: #eee;
  }
`;

const SubmitButton = styled.button`
  padding: 20px;
  font-size: 24px;
  font-weight: 600;
  color: white;
  background: ${props => props.$bgColor};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const ResultSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;
`;

const ResultTitle = styled.h2`
  font-size: 60px;
  margin-bottom: 30px;
`;

const ScoreText = styled.p`
  font-size: 40px;
  margin-bottom: 50px;
  
  span {
    color: #8fd242;
    font-weight: 800;
  }
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
    opacity: 0.9;
  }
`;

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
  color: ${props => props.$isCorrect ? '#46cd58' : '#8fd242'};
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
