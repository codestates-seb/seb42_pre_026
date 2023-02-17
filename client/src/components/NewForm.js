import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.form`
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TextContainer = styled.div`
  padding: 24px;
  margin-top: 24px;
  background-color: white;
  border: 1px solid #d6d6d6;
  border-radius: 3px;
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid #a7abb3;
  border-radius: 5px;
  padding: 7.9px 9.1px;
  margin: 6px 0 10px 0;
  &:focus {
    outline-style: none;
    border: 1px solid #0a95ff;
    transition: 0.2s;
  }
  ::placeholder {
    color: #a7abb3;
  }
`;

const TitleLabel = styled.div`
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;

const TitleSpan = styled.div`
  font-size: 12px;
  padding: 2px 0;
`;

const Content = styled.textarea`
  width: 100%;
  height: 190px;
  border: 1px solid #a7abb3;
  border-radius: 5px;
  padding: 7.9px 9.1px;
  margin: 6px 0 10px 0;
  &:focus {
    outline-style: none;
    border: 1px solid #0a95ff;
    transition: 0.2s;
  }
`;

const SubmitButton = styled.button`
  width: 15%;
  height: 37.78px;
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: #0a95ff;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  &:hover {
    background: rgba(10, 149, 255, 0.6);
    color: white;
    transition: 0.2s;
  }
`;

const DiscardButton = styled.button`
  height: 37.78px;
  padding: 0px 12px;
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: transparent;
  color: #ab252a;
  border: none;
  border-radius: 5px;
  &:hover {
    background: #fdf1f2;
  }
`;

const ButtonContainer = styled.div`
  width: 90%;
`;

function NewForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const handleTitle = (e) => setTitle(e.target.value);
  const handleContent = (e) => setContent(e.target.value);
  return (
    <FormContainer>
      <TextContainer>
        <TitleLabel htmlFor="title">Title</TitleLabel>
        <TitleSpan>Be specific and imagine you’re asking a question to another person.</TitleSpan>
        <TitleInput
          type="text"
          name="title"
          value={title}
          onChange={handleTitle}
          placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
        />
      </TextContainer>
      <TextContainer>
        <TitleLabel htmlFor="content">What are the details of your problem?</TitleLabel>
        <TitleSpan>
          Introduce the problem and expand on what you put in the title. Minimum 20 characters.
        </TitleSpan>
        <Content type="text" name="content" value={content} onChange={handleContent} />
        <SubmitButton>Post your question</SubmitButton>
      </TextContainer>
      <ButtonContainer>
        <DiscardButton onClick={() => navigate('/')}>Discard draft</DiscardButton>
      </ButtonContainer>
    </FormContainer>
  );
}

export default NewForm;
