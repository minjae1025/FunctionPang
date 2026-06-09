import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { STORAGE_KEYS, savePracticeRecord } from '@/utils/storage';

export default function PracticeTyping() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [lang, setLang] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const currentLang = localStorage.getItem(STORAGE_KEYS.CURRENT_LANGUAGE) || 'Javascript';
    setLang(currentLang);
    
    // Load questions dynamically
    const loadQuestions = async () => {
      try {
        const module = await import(`../data/questions/${currentLang.toLowerCase()}.json`);
        const allQuestions = module.default.typing;
        // Shuffle and take 10
        const shuffled = [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, 10);
        setQuestions(shuffled);
      } catch (error) {
        console.error('Failed to load questions:', error);
      }
    };

    loadQuestions();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex, isFinished]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() === questions[currentIndex].code.trim()) {
      setScore(prev => prev + 10);
    }

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
        type: '타자 방식',
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
            <ActionButton onClick={() => navigate('/home')}>메뉴로 돌아가기</ActionButton>
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
          <Description>{currentQuestion.description}</Description>
          <CodeDisplay>
            <code>{currentQuestion.code}</code>
          </CodeDisplay>
        </QuestionBox>

        <InputForm onSubmit={handleSubmit}>
          <PracticeInput
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="위 코드를 똑같이 입력하세요"
            autoFocus
          />
          <SubmitButton type="submit">다음</SubmitButton>
        </InputForm>
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

const Description = styled.p`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
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
  font-family: 'Courier New', Courier, monospace;

  &:focus {
    border-color: #374cd3;
  }
`;

const SubmitButton = styled.button`
  padding: 20px;
  font-size: 24px;
  font-weight: 600;
  color: white;
  background: #374cd3;
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
    color: #374cd3;
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
  background: #374cd3;
  border: none;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background: #2a3eb1;
  }
`;
