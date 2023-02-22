import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Aside from '../Aside';
import Answer from './Answer';
import NewAnswer from './NewAnswer';
import Parser from 'html-react-parser';
import { toast } from 'react-toastify';
import useFetch from '../../hooks/useFetch';

const MainArea = styled.div`
  padding: 24px;
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  border-left: 1px solid #e4e4e5;
  max-width: 1000px;
`;

const MainBar = styled.div`
  flex: 10;
`;

const MainBarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  > .mainBarHeaderTitle {
    font-size: 30px;
    flex: 1 auto;
    margin-right: 8px;
    margin-bottom: 8px;
    font-weight: 500;
    max-width: 600px;
    word-break: break-word;
    line-height: 1.35;
  }
`;

const CreateButton = styled.button`
  width: 90px;
  height: 33px;
  font-size: 12px;
  margin-bottom: 12px;
  margin-left: 12px;
  border-radius: 0.15rem;
  color: white;
  background-color: hsl(206, 100%, 52%);
  border: none;
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
  width: 100%;
  padding-right: 18px;
  div {
    font-size: 16px;
    margin-bottom: 16.5px;
    word-break: break-word;
    line-height: 1.35;
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
  margin-bottom: 8px;
  padding: 16px 0;
  font-weight: 500;
  max-width: 600px;
  word-break: break-word;
  line-height: 1.35;
`;

function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const data = useFetch(`http://localhost:3001/questions/${id}`);
  const comments = useFetch(`http://localhost:3001/comments?postid=${id}`);
  const blankComment = comments.content !== '';

  const onDelete = () => {
    if (confirm('Are you sure delete?')) {
      axios
        .delete(`http://localhost:3001/questions/${id}`)
        .then(() => {
          toast.success('Delete Success!');
        })
        .then(() => {
          navigate('/');
        })
        .catch(() => {
          toast.error('Delete Failed!');
        });
    }
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
            <div>{Parser(data.content)}</div>
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
            <CommentTitle>{comments ? comments.length : 0} Answer</CommentTitle>
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
