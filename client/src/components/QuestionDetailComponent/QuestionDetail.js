import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Aside from '../Aside';
import Answer from './Answer';
import NewAnswer from './NewAnswer';
// import Parser from 'html-react-parser';

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
  p {
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
  }
`;

const ButtonContainer = styled.div`
  width: 400;
  display: flex;
  align-items: flex-end;
`;

const EditButton = styled.button`
  width: 70px;
  height: 37.78px;
  margin-right: 5px;
  background-color: #0a95ff;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  &:hover {
    background: hsl(206, 100%, 40%);
    transition: 0.2s;
  }
`;

const DeleteButton = styled.button`
  width: 80px;
  height: 37.78px;
  background-color: #e2464b;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  &:hover {
    background: #ab252a;
    transition: 0.2s;
  }
`;

function QuestionDetail() {
  const { id } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/questions/${id}`).then((response) => {
      setData(response.data);
    });
  }, []);

  console.log(data);

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
            <p>{data.content}</p>
            <UserInfoContainer>
              <ButtonContainer>
                <EditButton>Edit</EditButton>
                <DeleteButton>Delete</DeleteButton>
              </ButtonContainer>
              <UserInfo>
                <div className="userInfoTime">
                  <span>asked </span>
                  <span>Feb 10 at 20:37</span>
                </div>
                <div className="userId">{data.username}</div>
              </UserInfo>
            </UserInfoContainer>
            <Answer />
            <NewAnswer />
          </PostContainer>
          <Aside />
        </ContentContainer>
      </MainBar>
    </MainArea>
  );
}

export default QuestionDetail;
