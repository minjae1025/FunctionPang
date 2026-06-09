import styled from 'styled-components';

const ResetConfirmModal = ({ onClose, onConfirm }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <Icon>⚠️</Icon>
        <Title>기록 초기화</Title>
        <Message>
          정말 모든 학습 기록을 초기화하시겠습니까?<br />
          <SubMessage>(삭제된 데이터는 되돌릴 수 없습니다.)</SubMessage>
        </Message>
        <ButtonGroup>
          <DeleteButton onClick={onConfirm}>삭제하기</DeleteButton>
          <CancelButton onClick={onClose}>취소</CancelButton>
        </ButtonGroup>
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1010;
`;

const ModalContent = styled.div`
  background-color: #fff;
  width: 380px;
  border-radius: 16px;
  padding: 35px 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Icon = styled.div`
  font-size: 45px;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  margin: 0 0 12px 0;
  font-size: 22px;
  font-weight: bold;
  color: #ff5c5c;
`;

const Message = styled.p`
  font-size: 15px;
  color: #555;
  margin: 0 0 30px 0;
  line-height: 1.4;
`;

const SubMessage = styled.span`
  color: #999;
  font-size: 13px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const BaseButton = styled.button`
  color: #fff;
  border: none;
  padding: 10px 28px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;
`;

const DeleteButton = styled(BaseButton)`
  background-color: #ff5c5c;
`;

const CancelButton = styled(BaseButton)`
  background-color: #aaaaaa;
`;

export default ResetConfirmModal;
