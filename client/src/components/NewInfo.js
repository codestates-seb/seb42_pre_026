import styled from 'styled-components';

const InfoContainer = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 24px;
`;

const InfoH1 = styled.h1`
  width: 100%;
  height: 90px;
  font-size: 28px;
  display: flex;
  text-align: left;
  align-items: center;
  margin-bottom: 18px;
`;

const NoticeContainer = styled.div`
  width: 100%;
  background-color: #ebf4fb;
  border: 1px solid #a6ceed;
  border-radius: 3px;
  padding: 24px;
`;

const InfoH2 = styled.h2`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 8px;
`;

const Notice = styled.p`
  font-size: 15px;
  line-height: 20px;
  padding-bottom: 15px;
  span {
    color: #0995ff;
    &:hover {
      cursor: pointer;
      color: rgba(10, 149, 255, 0.6);
    }
  }
`;

const InfoH5 = styled.h5`
  font-size: 14px;
  margin-bottom: 8px;
`;

const StepList = styled.ul`
  margin-left: 30px;
  font-size: 14px;
`;

function NewInfo() {
  return (
    <InfoContainer>
      <InfoH1>Ask a public question</InfoH1>
      <NoticeContainer>
        <InfoH2>Writing a good question</InfoH2>
        <Notice>
          You’re ready to <span>ask</span> a <span>programming-related question</span> and this form
          will help guide you through the process. <br /> Looking to ask a non-programming question?
          See <span>the topics here </span>
          to find a relevant site.
        </Notice>
        <InfoH5>Steps</InfoH5>
        <StepList>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Add “tags” which help surface your question to members of the community.</li>
          <li>Review your question and post it to the site.</li>
        </StepList>
      </NoticeContainer>
    </InfoContainer>
  );
}

export default NewInfo;
