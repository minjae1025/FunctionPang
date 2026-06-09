import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import PracticeFeedbackModal from '@/components/PracticeFeedbackModal';
import PracticeResult from '@/components/PracticeResult';
import { STORAGE_KEYS, savePracticeRecord } from '@/utils/storage';

export default function PracticeSubjective() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
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
        const allQuestions = module.default.subjective;
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
    } else {
      setIncorrectQuestions(prev => [...prev, questions[currentIndex]]);
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
        type: '주관식',
        lang: lang
      });
    }
  }, [isFinished, score, lang]);

  if (questions.length === 0) return <div>Loading...</div>;

  if (isFinished) {
    return (
      <PracticeResult 
        score={score} 
        incorrectQuestions={incorrectQuestions}
        onBack={() => navigate('/home')} 
        bgColor="#cf4f4f"
      />
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <Container>
      <Header />
      <Main>
        <Progress>{currentIndex + 1} / {questions.length}</Progress>
        <QuestionBox>
          <DescriptionTitle>이 설명에 맞는 함수(메서드)는 무엇인가요?</DescriptionTitle>
          <DescriptionText>{currentQuestion.description}</DescriptionText>
        </QuestionBox>

        <InputForm onSubmit={handleSubmit}>
          <PracticeInput
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="함수 이름을 입력하세요 (예: map)"
            autoFocus
            disabled={showFeedback}
          />
          <SubmitButton $bgColor="#cf4f4f" type="submit">제출</SubmitButton>
        </InputForm>
      </Main>

      <PracticeFeedbackModal 
        show={showFeedback}
        isCorrect={isLastCorrect}
        correctAnswer={currentQuestion.function_name}
        timer={timer}
        onNext={handleNext}
        bgColor="#cf4f4f"
      />
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
  padding: 60px 40px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  margin-bottom: 40px;
  text-align: center;
`;

const DescriptionTitle = styled.h3`
  font-size: 20px;
  color: #888;
  margin-bottom: 20px;
  font-weight: 400;
`;

const DescriptionText = styled.p`
  font-size: 36px;
  color: #121212;
  font-weight: 700;
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
  text-align: center;

  &:focus {
    border-color: #cf4f4f;
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
