import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Aside from '../Aside';
import Answer from './Answer';
import NewAnswer from './NewAnswer';
import Parser from 'html-react-parser';
import { useConfirm } from 'material-ui-confirm';
import useFetch from '../../hooks/useFetch';
import ContentEditModal from './ContentEditModal';
import moment from 'moment';

const MainArea = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e4e4e5;
  width: 1100px;
`;

const MainBar = styled.div`
  flex: 1;
  width: 100%;
`;

const MainBarHeader = styled.div`
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
  padding-right: 18px;
  padding-top: 10px;
  width: 100%;
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
  margin-left: auto;
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

/* eslint-disable */
function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const confirm = useConfirm();

  const data = useFetch(`/question/${id}`);
  const comments = data.comments;
  const blankComment = comments === undefined || comments.length === 0;
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const isLogin = localStorage.getItem('accessToken');
  const isPost = localStorage.getItem('username') === data.memberEmail;

  const onDelete = () => {
    const token = localStorage.getItem('accessToken');
    confirm({ description: 'This will permanently delete question.' })
      .then(() => {
        axios
          .delete(`/question/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then(() => {
            navigate('/');
          });
      })
      .catch(() => {});
  };

  // ?????? open
  const openEditModalHandler = () => {
    setEditModalOpen(true);
    setNewTitle(data.title);
    setNewContent(data.content);
    document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
  };

  const buttonClick = () => {
    if (isLogin) {
      navigate('/new');
    } else {
      confirm({ title: 'Login required.' })
        .then(() => {
          navigate('/login');
        })
        .catch(() => {});
    }
  };

  return (
    <MainArea>
      <MainBar>
        <MainBarHeader>
          <h1 className="mainBarHeaderTitle">{data.title}</h1>
          <CreateButton className="askQuestion" onClick={buttonClick}>
            Ask Question
          </CreateButton>
        </MainBarHeader>
        <MainBarInfo>
          <SpanContainer>
            <span className="infoTitle">Asked</span>
            <span>{data.created ? moment(data.created).fromNow() : '-'}</span>
          </SpanContainer>
          <SpanContainer>
            <span className="infoTitle">Modified</span>
            <span>{data.modified ? moment(data.modified).fromNow() : '-'}</span>
          </SpanContainer>
          <SpanContainer>
            <span className="infoTitle">Viewed</span>
            <span>{data.viewCount ? data.viewCount : 0}</span>
          </SpanContainer>
        </MainBarInfo>
        <ContentContainer>
          <PostContainer>
            <div className="content">{Parser(data.content)}</div>
            <UserInfoContainer>
              {isPost ? (
                <ButtonContainer>
                  <EditButton onClick={openEditModalHandler}>Edit</EditButton>
                  {editModalOpen ? (
                    <ContentEditModal
                      newTitle={newTitle}
                      setNewTitle={setNewTitle}
                      newContent={newContent}
                      setNewContent={setNewContent}
                      contentId={data.questionId}
                      setEditModalOpen={setEditModalOpen}
                    />
                  ) : null}
                  <DeleteButton onClick={onDelete}>Delete</DeleteButton>
                </ButtonContainer>
              ) : null}

              <UserInfo>
                <div className="userInfoTime">
                  <span>asked </span>
                  <span>{data.created && moment(data.created).format('MMM DD YYYY, HH:MM')}</span>
                </div>
                <div className="userId">{data.memberName}</div>
              </UserInfo>
            </UserInfoContainer>
            <CommentTitle>
              {blankComment
                ? null
                : comments.length === 1
                ? '1 Answer'
                : `${comments.length} Answers`}
            </CommentTitle>
            {comments &&
              comments.map((comment) => {
                return <Answer comment={comment} key={comment.commentId} />;
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
