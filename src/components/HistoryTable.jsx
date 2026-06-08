const HistoryTable = ({ filteredHistory }) => {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden', marginBottom: '30px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
          <tr style={{ backgroundColor: '#fdfdfd', borderBottom: '1px solid #ddd' }}>
            <th style={{ padding: '20px 15px', fontWeight: '600', width: '20%' }}>점수</th>
            <th style={{ padding: '20px 15px', fontWeight: '600', width: '30%' }}>학습 방식</th>
            <th style={{ padding: '20px 15px', fontWeight: '600', width: '25%' }}>학습 언어</th>
            <th style={{ padding: '20px 15px', fontWeight: '600', width: '25%' }}>날짜</th>
          </tr>
        </thead>
        <tbody>
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: idx !== filteredHistory.length - 1 ? '1px solid #eee' : 'none' }}>
                <td style={{ padding: '20px 15px', color: '#333' }}>{item.score}</td>
                <td style={{ padding: '20px 15px', color: '#333' }}>{item.type}</td>
                <td style={{ padding: '20px 15px', color: '#333' }}>{item.lang}</td>
                <td style={{ padding: '20px 15px', color: '#333' }}>{item.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ padding: '40px', color: '#888', fontSize: '16px' }}>
                해당 언어의 기록이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;