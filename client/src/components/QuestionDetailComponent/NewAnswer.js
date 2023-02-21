import { useState } from 'react';
import styled from 'styled-components';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const NewAnswerContainer = styled.div`
  .ck-editor__top {
    padding-top: 10px;
  }
  .ck-editor__editable_inline {
    min-height: 200px;
    padding: 0px 18px;
    font-size: 14px;
  }
`;

const NewAnswerTitle = styled.h2`
  font-size: 20px;
  flex: 1 auto;
  margin-bottom: 19px;
  padding-top: 20px;
  font-weight: 500;
  max-width: 600px;
  word-break: break-word;
  line-height: 1.3;
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

/* eslint-disable */
function NewAnswer() {
  const { id } = useParams();
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/questions/${id}`, {
        comment,
      })
      .then(() => {
        toast.success('Post Success!');
      })
      .then(() => {
        navigate('/question');
      })
      .catch(() => {
        toast.error('Post Failed!');
      });
  };

  return (
    <NewAnswerContainer>
      <NewAnswerTitle>Your Answer</NewAnswerTitle>
      <CKEditor
        editor={ClassicEditor}
        data=""
        onReady={(editor) => { }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setComment({
            ...comment,
            comment: data,
          });
        }}
        onBlur={(event, editor) => { }}
        onFocus={(event, editor) => { }}
      />
      <SubmitButton onClick={handleSubmit}>Post your answer</SubmitButton>
    </NewAnswerContainer>
  );
}

export default NewAnswer;
