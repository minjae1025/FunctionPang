const ResetConfirmModal = ({ onClose, onConfirm }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1010 }}>
      <div style={{ backgroundColor: '#fff', width: '380px', borderRadius: '16px', padding: '35px 30px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', textAlign: 'center' }}>
        <div style={{ fontSize: '45px', marginBottom: '10px' }}>⚠️</div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '22px', fontWeight: 'bold', color: '#ff5c5c' }}>기록 초기화</h3>
        <p style={{ fontSize: '15px', color: '#555', margin: '0 0 30px 0', lineHeight: '1.4' }}>
          정말 모든 학습 기록을 초기화하시겠습니까?<br />
          <span style={{ color: '#999', fontSize: '13px' }}>(삭제된 데이터는 되돌릴 수 없습니다.)</span>
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button 
            onClick={onConfirm} 
            style={{ backgroundColor: '#ff5c5c', color: '#fff', border: 'none', padding: '10px 28px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}
          >
            삭제하기
          </button>
          <button 
            onClick={onClose} 
            style={{ backgroundColor: '#aaaaaa', color: '#fff', border: 'none', padding: '10px 28px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetConfirmModal;