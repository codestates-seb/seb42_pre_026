import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { toast } from 'react-toastify';

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
  padding-left: 3px;
  padding-top: 20px;
  font-weight: 500;
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
  const [comment, setComment] = useState({ comment: '' });
  const blankComment = comment.length;
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/comments', {
        postid: id,
        comment,
      })
      .then(() => {
        location.reload();
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Post Failed!');
      });
  };
  return (
    <NewAnswerContainer>
      <NewAnswerTitle>Your Answer</NewAnswerTitle>
      <CKEditor
        editor={ClassicEditor}
        data=""
        onReady={(editor) => {}}
        onChange={(event, editor) => {
          const data = editor.getData();
          setComment(data);
        }}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
      />
      <SubmitButton
        onClick={handleSubmit}
        disabled={!(blankComment !== 0 && blankComment !== undefined)}>
        Post your answer
      </SubmitButton>
    </NewAnswerContainer>
  );
}

export default NewAnswer;
