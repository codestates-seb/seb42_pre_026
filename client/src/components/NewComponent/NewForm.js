import { useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TextEditor from './TextEditor';
import axios from 'axios';
import Parser from 'html-react-parser';
import { toast } from 'react-toastify';

const FormContainer = styled.form`
  width: 80%;
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
  // TextEditor 길이조절
  .ck-editor__top {
    padding-top: 10px;
  }
  .ck-editor__editable_inline {
    min-height: 200px;
    padding: 0px 18px;
    font-size: 14px;
  }
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

const SubmitButton = styled.button`
  width: 150px;
  height: 37.78px;
  margin-top: 20px;
  background-color: ${(props) => (props.disabled ? '#badcff' : '#0a95ff')};
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  &:hover {
    background: ${(props) => (props.disabled ? '#badcff' : 'hsl(206, 100%, 40%)')};
    transition: 0.2s;
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
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
  const titleRef = useRef();
  const navigate = useNavigate();
  const [content, setContent] = useState({
    title: '',
    content: '',
  });
  const titleLength = content.title.length;
  const blankContent = Parser(content.content).length !== 0;

  const handleContent = useCallback((e) => {
    const { name, value } = e.target;
    setContent({
      ...content,
      [name]: value,
    });
  }, []);

  const handleSubmit = (e) => {
    const token = localStorage.getItem('accessToken');
    e.preventDefault();
    if (blankContent) {
      const contentLength = Parser(content.content).props.children.length;
      if (contentLength < 20) {
        toast.warning('Too short! Minimum 20 characters.');
        return;
      }
    }
    axios
      .post(
        '/question',
        {
          title: content.title,
          content: content.content,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then(() => {
        toast.success('Post Success!');
      })
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        toast.error('Post Failed!');
      });
  };

  return (
    <FormContainer>
      <TextContainer>
        <TitleLabel htmlFor="title">Title</TitleLabel>
        <TitleSpan>Be specific and imagine you’re asking a question to another person.</TitleSpan>
        <TitleInput
          ref={titleRef}
          type="text"
          name="title"
          onChange={handleContent}
          placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
        />
      </TextContainer>
      <TextContainer>
        <TitleLabel htmlFor="content">What are the details of your problem?</TitleLabel>
        <TitleSpan>
          Introduce the problem and expand on what you put in the title. Minimum 20 characters.
        </TitleSpan>
        <TextEditor type="text" name="content" setContent={setContent} content={content} />
        <SubmitButton onClick={handleSubmit} disabled={!(titleLength && blankContent)}>
          Post your question
        </SubmitButton>
      </TextContainer>
      <ButtonContainer>
        <DiscardButton onClick={() => navigate('/')}>Discard draft</DiscardButton>
      </ButtonContainer>
    </FormContainer>
  );
}

export default NewForm;
