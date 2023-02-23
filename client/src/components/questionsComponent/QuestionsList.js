import styled from 'styled-components';
import Parser from 'html-react-parser';
import { useNavigate } from 'react-router-dom';

const ListContainer = styled.li`
  display: flex;
  min-height: 100px;
  padding: 12px;
  border-bottom: 1px solid #e4e4e5;
  /* background-color: lightblue; */
  padding-left: 32px;
  cursor: pointer;
`;

const ListInfo = styled.div`
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  width: 96px;
  margin-top: 6px;
  margin-right: 16px;
  margin-bottom: 4px;
  font-size: 13px;
  justify-content: center;
  text-align: right;

  > div {
    margin-bottom: 7px;
  }

  > .votes {
    font-weight: 500;
  }
`;

const ListContent = styled.div`
  flex-grow: 1;
  margin-top: 5px;

  /* border: 1px solid black; */

  > .contentTitle {
    max-width: 600px;
    color: #2260a7;
    margin-bottom: 0.3846rem;
    padding-right: 24px;
    font-weight: 500;
    font-size: 17px;
  }

  > .content {
    color: #3b3f44;
    margin-bottom: 8px;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 600px;
    word-break: break-word;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-height: 1.35;
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
  font-size: 13px;
  gap: 3px;
`;

const UserCardInfo = styled.div`
  display: flex;
  gap: 3px;
`;

function QuestionsList({ list }) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/question/${list.id}`);
  };

  return (
    <ListContainer>
      <ListInfo>
        <div className="votes">0 vote</div>
        <div className="answers">
          {list.comments === undefined
            ? '0 answer'
            : list.comments.length === 1
            ? `${list.comments.length} answer`
            : `${list.comments.length} answers`}
        </div>
        <div className="views">
          {parseInt(list.views) <= 1 ? `${list.views} view` : `${list.views} views`}
        </div>
      </ListInfo>
      <ListContent onClick={onClick}>
        <div className="contentTitle">{list.title}</div>
        <div className="content">{Parser(list.content)}</div>
        <TagWrapper>
          <Tag>
            <li>javascript</li>
            <li>java</li>
          </Tag>
          <Writer>
            <div className="polite">★</div>
            <UserCardInfo>
              <div className="userCardLink">{list.member_id}</div>
              <div className="userCardAwards">26</div>
            </UserCardInfo>
            <div className="userCardTime">{list.created}</div>
          </Writer>
        </TagWrapper>
      </ListContent>
    </ListContainer>
  );
}

export default QuestionsList;
