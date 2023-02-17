import styled from 'styled-components';

const ListContainer = styled.li`
  display: flex;
  min-height: 100px;
  padding: 12px;
  border-bottom: 1px solid #e4e4e5;
  /* background-color: lightblue; */
  padding-left: 32px;
`;

const ListInfo = styled.div`
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  text-align: right;
  width: 96px;
  margin-right: 16px;
  margin-bottom: 4px;
  font-size: 12px;

  > div {
    margin-bottom: 7px;
  }

  > .votes {
    font-weight: 500;
  }
`;

const ListContent = styled.div`
  flex-grow: 1;
  /* border: 1px solid black; */

  > .contentTitle {
    max-width: 600px;
    color: #2260a7;
    margin-bottom: 0.3846rem;
    padding-right: 24px;
    font-weight: 500;
    font-size: 15px;
  }

  > .content {
    color: #3b3f44;
    margin-bottom: 8px;
    font-size: 11.5px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 600px;
    word-break: break-word;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
`;

const TagWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Tag = styled.ul`
  font-size: 11px;
  display: flex;
  list-style: none;
  gap: 3px;
  line-height: 18px;
  margin-bottom: 1em;

  > li {
    padding: 2px 6px 2px 6px;
    color: #557d9a;
    margin-right: 4px;
    background-color: #e1ecf4;
    border-radius: 0.2rem;
  }
`;

const Writer = styled.div`
  display: flex;
  font-size: 11px;
  gap: 3px;
`;

const UserCardInfo = styled.div`
  display: flex;
  gap: 3px;
`;

function QuestionsList({ list }) {
  return (
    <ListContainer>
      <ListInfo>
        <div className="votes">{list.votes} votes</div>
        <div className="answers">{list.answers} answers</div>
        <div className="views">{list.views} views</div>
      </ListInfo>
      <ListContent>
        <div className="contentTitle">{list.title}</div>
        <div className="content">{list.content}</div>
        <TagWrapper>
          <Tag>
            <li>tag1</li>
            <li>tag2</li>
            <li>tag3</li>
          </Tag>
          <Writer>
            <div className="polite">★</div>
            <UserCardInfo>
              <div className="userCardLink">{list.username}</div>
              <div className="userCardAwards">{list.awards}</div>
            </UserCardInfo>
            <div className="userCardTime">asked 1 min ago</div>
          </Writer>
        </TagWrapper>
      </ListContent>
    </ListContainer>
  );
}

export default QuestionsList;
