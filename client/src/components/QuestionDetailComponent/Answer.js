import styled from 'styled-components';
import Parser from 'html-react-parser';
import axios from 'axios';
import { useConfirm } from 'material-ui-confirm';

const AnswerContainer = styled.div`
  padding-top: 15px;
  border-bottom: 1px solid #e4e4e5;
  .comment {
    padding-top: 10px;
    padding-left: 10px;
    font-size: 16px;
    word-break: break-word;
    line-height: 1.35;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-top: 10px;
`;

const UserInfo = styled.div`
  padding: 12px;
  border-radius: 3px;
  text-align: left;
  align-items: flex-end;
  > .userInfoTime {
    margin: 1px 0 4px 0;
    font-size: 12px;
    color: #3b3f44;
  }
  > .userId {
    font-size: 14px;
    font-weight: 500;
    color: hsl(206, 100%, 52%);
    margin-bottom: 0px;
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

function Answer({ comment }) {
  const confirm = useConfirm();

  const onDelete = () => {
    confirm({ description: 'This will permanently delete answer.' })
      .then(() => {
        axios.delete(`http://localhost:3001/comments/${comment.id}`).then(() => {
          location.reload();
          window.scrollTo(0, 0);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AnswerContainer>
      <div className="comment">{Parser(comment.comment)}</div>
      <UserInfoContainer>
        <ButtonContainer>
          <EditButton>Edit</EditButton>
          <DeleteButton onClick={onDelete}>Delete</DeleteButton>
        </ButtonContainer>
        <UserInfo>
          <div className="userInfoTime">
            <span>answered </span>
            <span>2 days ago</span>
          </div>
          <div className="userId">{comment.username}</div>
        </UserInfo>
      </UserInfoContainer>
    </AnswerContainer>
  );
}

export default Answer;