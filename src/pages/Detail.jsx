import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ribbon from '@/assets/images/ribbon.svg';
import { generateId, STORAGE_KEYS } from '@/utils/storage';

const Detail = () => {
  const navigate = useNavigate();
  const nicknameRef = useRef(null);
  const languageRef = useRef(null);

  useEffect(() => {
    const savedUserId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
    
    if (savedUserId) {
      navigate('/home');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nickname = nicknameRef.current.value.trim();
    const language = languageRef.current.value;

    if (!nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    else if (nickname.length > 20) {
      alert('닉네임은 최대 20자까지 입력할 수 있습니다.');
      return;
    }

    const savedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    let users = savedUsers ? JSON.parse(savedUsers) : [];

    // 중복 체크 (이름 기준)
    const isDuplicate = users.some(u => (typeof u === 'string' ? u : u.name) === nickname);
    if (isDuplicate) {
      alert('이미 존재하는 닉네임입니다.');
      return;
    }

    const newUserId = generateId();
    const newUser = { id: newUserId, name: nickname, lang: language };
    const updatedUsers = [...users, newUser];
    
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, nickname);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, newUserId);
    localStorage.setItem(STORAGE_KEYS.CURRENT_LANGUAGE, language);

    navigate('/home');
  };

  return (
    <Page>
      <Ribbon src={ribbon} alt="" aria-hidden="true" />

      <Content>
        <Title>사용자 정보 입력</Title>

        <Form onSubmit={handleSubmit}>
          <Field>
            <FieldLabel htmlFor="nickname">닉네임</FieldLabel>
            <Input id="nickname" type="text" defaultValue="홍길동" ref={nicknameRef} />
          </Field>

          <Field>
            <FieldLabel htmlFor="language">공부할 언어</FieldLabel>
            <Select id="language" defaultValue="Javascript" ref={languageRef}>
              <option value="Javascript">Javascript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
            </Select>
          </Field>

          <SubmitButton type="submit">완료</SubmitButton>
        </Form>
      </Content>
    </Page>
  );
};

const Page = styled.main`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #f7f7f7;
`;

const Ribbon = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  width: clamp(310px, 47vw, 680px);
  max-width: 72vw;
  height: auto;
  user-select: none;
  pointer-events: none;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  width: min(48.333vw, 85vw);
  margin: 0 auto;
  padding-top: 10.741vh;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin-bottom: 11.389vh;
  color: #151515;
  font-size: min(3.333vw, 5.926vh);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 0;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Field = styled.div`
  display: flex;
  margin-bottom: 8.148vh;
  flex-direction: column;
  gap: 1vh;
`;

const FieldLabel = styled.label`
  color: #151515;
  font-size: 1.6rem; 
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 0;
  margin-left: 0.3vw;
`;

const sharedControlStyle = `
  height: 6vh;
  border: 0;
  border-radius: min(0.8vw, 1.4vh);
  background: #e7e7e7;
  color: #151515;
  font-size: 1.75rem;
  font-weight: 400;
  line-height: 1;
  outline: none;
`;

const Input = styled.input`
  ${sharedControlStyle}
  padding: 0px 0px 0.1vh 1.2vw;
`;

const Select = styled.select`
  ${sharedControlStyle}
  padding: 0vw 0vw 0 1.2vw;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23151515%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 1.0vw center;
  background-size: 1.8vw;
`;

const SubmitButton = styled.button`
  align-self: center;
  width: 20vh;
  height: 6vh;
  margin-top: 6.296vh;
  border: 0;
  border-radius: min(0.521vw, 0.926vh);
  background: #46cd58;
  color: #ffffff;
  font-size: 1.75rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0;
  cursor: pointer;
`;

export default Detail;
