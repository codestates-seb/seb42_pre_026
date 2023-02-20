import styled from 'styled-components';

const AnswerContainer = styled.div`
  padding-top: 10px;
  border-bottom: 1px solid #e4e4e5;
  h2 {
    font-size: 20px;
    flex: 1 auto;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 16px 0;
    font-weight: 500;
    max-width: 600px;
    word-break: break-word;
    line-height: 1.35;
  }
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

function Answer() {
  return (
    <AnswerContainer>
      <h2>1 Answer</h2>
      <PostContainer>
        <p>
          The bounty expires in 2 hours. Answers to this question are eligible for a +50 reputation
          bounty. Hermawan Wiwid is looking for an answer from a reputable source. I want to predict
          spatio-temporal data and I found STNN (Spatio Temporal Neural Network) research with the
          github repository here (https://github.com/edouardelasalles/stnn), at the end of the repo
          description, it is explained regarding the dataset but I have difficulty understanding how
          a data spatial with its attributes transformed into only 1 dimension and then crossed with
          the time dimension into only 2 dimensions?
        </p>
        <UserInfoContainer>
          <ButtonContainer>
            <EditButton>Edit</EditButton>
            <DeleteButton>Delete</DeleteButton>
          </ButtonContainer>
          <UserInfo>
            <div className="userInfoTime">
              <span>answered </span>
              <span>2 days ago</span>
            </div>
            <div className="userId">Jamie</div>
          </UserInfo>
        </UserInfoContainer>
      </PostContainer>
    </AnswerContainer>
  );
}

export default Answer;
