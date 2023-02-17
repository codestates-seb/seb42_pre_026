import styled from 'styled-components';
import { RiQuestionnaireFill } from 'react-icons/ri';
import { MdThumbsUpDown } from 'react-icons/md';
import { ImPriceTags } from 'react-icons/im';
import { FaTrophy } from 'react-icons/fa';

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 48px;
  margin-top: 80px;
  text-align: left;
  h1 {
    margin-bottom: 1em;
    font-weight: 500;
    font-size: 26px;
  }
  div {
    font-weight: 400;
    margin-bottom: 24px;
  }
  .little {
    font-size: 12px;
    color: #6a737c;
    margin-bottom: 0;
  }
  .blue {
    padding-top: 3px;
    font-size: 12px;
    color: #0995ff;
  }
  @media screen and (max-width: 640px) {
    display: none;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  .icons {
    color: #0995ff;
    font-size: 24px;
  }
  text {
    padding-left: 15px;
  }
`;

function SignupInfo() {
  return (
    <>
      <InfoContainer>
        <h1>Join the Stack Overflow community</h1>
        <IconWrapper>
          <RiQuestionnaireFill className="icons" />
          Get unstuck — ask a question
        </IconWrapper>
        <IconWrapper>
          <MdThumbsUpDown className="icons" />
          Unlock new privileges like voting and commenting
        </IconWrapper>
        <IconWrapper>
          <ImPriceTags className="icons" />
          Save your favorite tags, filters, and jobs
        </IconWrapper>
        <IconWrapper>
          <FaTrophy className="icons" />
          Earn reputation and badges
        </IconWrapper>
        <div className="little">Collaborate and share knowledge with a private group for FREE.</div>
        <div className="blue">Get Stack Overflow for Teams free for up to 50 users.</div>
      </InfoContainer>
    </>
  );
}
export default SignupInfo;
