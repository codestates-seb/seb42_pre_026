import styled from 'styled-components';

const ListContainer = styled.li`
  display: flex;
  border: 1px solid black;
  height: 140px;
  padding: 12px;
`;

const ListInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  width: 96px;
  border: 1px solid black;
  margin-right: 16px;
  margin-bottom: 4px;
  font-size: 12px;

  > div {
    margin-bottom: 3px;
  }
`;

const ListContent = styled.div`
  flex: 1 0 auto;
  border: 1px solid black;
`;

function QuestionsList() {
  return (
    <ListContainer>
      <ListInfo>
        <div className="votes">0 votes</div>
        <div className="answers">0 answers</div>
        <div className="views">0 views</div>
      </ListInfo>
      <ListContent>content</ListContent>
    </ListContainer>
  );
}

export default QuestionsList;
