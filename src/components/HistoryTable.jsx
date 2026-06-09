import styled from 'styled-components';

const HistoryTable = ({ filteredHistory }) => {
  return (
    <TableContainer>
      <StyledTable>
        <colgroup>
          <col style={{ width: '20%' }} />
          <col style={{ width: '30%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
        </colgroup>
        <thead>
          <HeaderRow>
            <TableHeader>점수</TableHeader>
            <TableHeader>학습 방식</TableHeader>
            <TableHeader>학습 언어</TableHeader>
            <TableHeader>날짜</TableHeader>
          </HeaderRow>
        </thead>
        <Tbody>
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item, idx) => (
              <DataRow key={idx}>
                <TableData>{item.score}<span style={{ fontSize: '16px', fontWeight: '400' }}> /100</span></TableData>
                <TableData>{item.type}</TableData>
                <TableData>{item.lang}</TableData>
                <TableData>{item.date}</TableData>
              </DataRow>
            ))
          ) : (
            <tr style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
              <EmptyData rowSpan="5">
                연습 기록이 없습니다.
              </EmptyData>
            </tr>
          )}
        </Tbody>
      </StyledTable>
    </TableContainer>
  );
};

const TableContainer = styled.div`
  flex: 1;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

const StyledTable = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  display: flex;
  flex-direction: column;
`;

const HeaderRow = styled.tr`
  display: table;
  width: 100%;
  table-layout: fixed;
  background-color: #fdfdfd;
  border-bottom: 1px solid #ddd;
`;

const TableHeader = styled.th`
  padding: 20px 15px;
  font-weight: 600;
  font-size: 18px;
`;

const Tbody = styled.tbody`
  display: block;
  overflow-y: auto;
  flex: 1;
`;

const DataRow = styled.tr`
  display: table;
  width: 100%;
  table-layout: fixed;
  border-bottom: 1px solid #eee;
`;

const TableData = styled.td`
  padding: 20px 15px;
  color: #333;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
`;

const EmptyData = styled.td`
  display: table-cell;
  vertical-align: middle;
  padding: 40px;
  color: #888;
  font-size: 16px;
  text-align: center;
`;

export default HistoryTable;
