import styled from 'styled-components';
import ribbon from '@/assets/띠.svg';

const Detail = () => {
  return (
    <Page>
      <Ribbon src={ribbon} alt="" aria-hidden="true" />

      <Content>
        <Title>사용자 정보</Title>

        <Form>
          <Field>
            <FieldLabel htmlFor="nickname">닉네임</FieldLabel>
            <Input id="nickname" type="text" defaultValue="이민준" />
          </Field>

          <Field>
            <FieldLabel htmlFor="language">공부할 언어</FieldLabel>
            <Select id="language" defaultValue="Javascript">
              <option value="Javascript">Javascript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
            </Select>
          </Field>

          <SubmitButton type="button">완료</SubmitButton>
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
  width: min(46.094vw, 81.944vh);
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
  gap: 1.574vh;
`;

const FieldLabel = styled.label`
  color: #151515;
  font-size: min(1.875vw, 3.333vh);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 0;
`;

const sharedControlStyle = `
  width: 100%;
  height: 6.667vh;
  border: 0;
  border-radius: min(0.625vw, 1.111vh);
  background: #e7e7e7;
  color: #151515;
  font-size: min(1.771vw, 3.148vh);
  font-weight: 400;
  line-height: 1;
  outline: none;
`;

const Input = styled.input`
  ${sharedControlStyle}
  padding: 0 0.885vw;
`;

const Select = styled.select`
  ${sharedControlStyle}
  padding: 0 3.646vw 0 0.885vw;
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, #050505 50%),
    linear-gradient(135deg, #050505 50%, transparent 50%);
  background-position:
    calc(100% - min(1.823vw, 3.241vh)) min(2.315vh, 1.302vw),
    calc(100% - min(0.885vw, 1.574vh)) min(2.315vh, 1.302vw);
  background-size:
    min(0.99vw, 1.759vh) min(0.99vw, 1.759vh),
    min(0.99vw, 1.759vh) min(0.99vw, 1.759vh);
  background-repeat: no-repeat;
`;

const SubmitButton = styled.button`
  align-self: center;
  width: min(16.667vw, 29.63vh);
  height: 7.407vh;
  margin-top: 6.296vh;
  border: 0;
  border-radius: min(0.521vw, 0.926vh);
  background: #46cd58;
  color: #ffffff;
  font-size: min(2.188vw, 3.889vh);
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0;
  cursor: pointer;
`;

export default Detail;
