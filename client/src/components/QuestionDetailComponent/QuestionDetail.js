import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Aside from '../Aside';
import Answer from './Answer';
import NewAnswer from './NewAnswer';
import Parser from 'html-react-parser';
import { useConfirm } from 'material-ui-confirm';
import useFetch from '../../hooks/useFetch';

const MainArea = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e4e4e5;
  max-width: 1100px;
`;

const MainBar = styled.div`
  flex: 10;
  width: 100%;
`;

const MainBarHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  padding-right: 18px;
  padding-bottom: 5px;
  > .mainBarHeaderTitle {
    font-size: 30px;
    flex: 1 auto;
    margin-right: 8px;
    margin-bottom: 8px;
    font-weight: 400;
    max-width: 600px;
    word-break: break-word;
    line-height: 1.35;
    padding-left: 10px;
  }
`;

const CreateButton = styled.button`
  width: 100px;
  height: 34px;
  font-size: 13px;
  margin-bottom: 12px;
  padding: 10px;
  border-radius: 3px;
  color: white;
  background-color: hsl(206, 100%, 52%);
  border: none;
  box-shadow: inset 0 1px 0 0 hsl(0deg 0% 100% / 40%);
  &:hover {
    background-color: hsl(206, 100%, 40%);
  }
`;

const MainBarInfo = styled.div`
  border-bottom: 1px solid #e4e4e5;
  margin-bottom: 16px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: row;
  padding-left: 10px;
`;

const SpanContainer = styled.div`
  margin-bottom: 8px;
  margin-right: 16px;
  font-size: 13px;
  > .infoTitle {
    margin-bottom: 8px;
    margin-right: 4px;
    color: gray;
    font-weight: 500;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const PostContainer = styled.div`
  /* width: 100%; */
  padding-right: 18px;
  padding-top: 10px;
  .content {
    font-size: 16px;
    word-break: break-word;
    line-height: 1.35;
    padding-left: 10px;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 16px 0;
  padding-top: 10px;
`;

const UserInfo = styled.div`
  padding: 12px;
  border-radius: 3px;
  background-color: #e1ecf4;
  max-width: 200px;
  text-align: left;
  > .userInfoTime {
    margin: 1px 0 4px 0;
    font-size: 12px;
    color: #3b3f44;
  }
  > .userId {
    font-size: 14px;
    font-weight: 500;
    color: hsl(206, 100%, 52%);
    margin-bottom: 0;
  }
`;

const ButtonContainer = styled.div`
  width: 400;
  display: flex;
  align-items: flex-end;
  padding-bottom: 10px;
`;

const EditButton = styled.button`
  width: 50px;
  height: 20px;
  background-color: transparent;
  color: #0a95ff;
  border: none;
  font-weight: bold;
  &:hover {
    opacity: 0.7;
    transition: 0.2s;
  }
`;

const DeleteButton = styled.button`
  width: 70px;
  height: 20px;
  background-color: transparent;
  color: #ff8a3d;
  border: none;
  font-weight: bold;
  &:hover {
    opacity: 0.7;
    transition: 0.2s;
  }
`;

const CommentTitle = styled.h2`
  font-size: 20px;
  flex: 1 auto;
  margin-right: 8px;
  padding-top: 15px;
  padding-left: 3px;
  font-weight: 500;
  max-width: 600px;
  word-break: break-word;
  line-height: 1.35;
`;

function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const confirm = useConfirm();

  const data = useFetch(`http://localhost:3001/questions/${id}`);
  const comments = useFetch(`http://localhost:3001/comments?postid=${id}`);
  const blankComment = comments.content !== '';

  const onDelete = () => {
    confirm({ description: 'This will permanently delete question.' })
      .then(() => {
        axios.delete(`http://localhost:3001/questions/${id}`).then(() => {
          navigate('/');
        });
      })
      .catch(() => {});
  };

  return (
    <MainArea>
      <MainBar>
        <MainBarHeader>
          <h1 className="mainBarHeaderTitle">{data.title}</h1>
          <Link to="/new">
            <CreateButton className="askQuestion">Ask Question</CreateButton>
          </Link>
        </MainBarHeader>
        <MainBarInfo>
          <SpanContainer>
            <span className="infoTitle">Asked</span>
            <span>21 days ago</span>
          </SpanContainer>
          <SpanContainer>
            <span className="infoTitle">Modified</span>
            <span>today</span>
          </SpanContainer>
          <SpanContainer>
            <span className="infoTitle">Viewed</span>
            <span>{data.views}</span>
          </SpanContainer>
        </MainBarInfo>
        <ContentContainer>
          <PostContainer>
            <div className="content">{Parser(data.content)}</div>
            <UserInfoContainer>
              <ButtonContainer>
                <EditButton>Edit</EditButton>
                <DeleteButton onClick={onDelete}>Delete</DeleteButton>
              </ButtonContainer>
              <UserInfo>
                <div className="userInfoTime">
                  <span>asked </span>
                  <span>Feb 10 at 20:37</span>
                </div>
                <div className="userId">{data.username}</div>
              </UserInfo>
            </UserInfoContainer>
            <CommentTitle>
              {comments.length === 1
                ? '1 Answer'
                : comments.length > 1
                ? `${comments.length} Answers`
                : null}
            </CommentTitle>
            {blankComment &&
              comments.map((comment) => {
                return <Answer comment={comment} key={comment.id} />;
              })}
            <NewAnswer />
          </PostContainer>
          <Aside />
        </ContentContainer>
      </MainBar>
    </MainArea>
  );
}

export default QuestionDetail;
