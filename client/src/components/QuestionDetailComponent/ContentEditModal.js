import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const EditModalView = styled.div`
  text-align: left;
  border-radius: 5px;
  background-color: white;
  width: 700px;
  height: 500px;
  color: black;
  font-weight: 600;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.19), 0 10px 10px rgba(0, 0, 0, 0.1);

  > .editModalTitle {
    font-size: 25px;
    font-weight: 500;
    margin: 10px 0px 10px 40px;
    padding-top: 10px;
  }
`;

const EditModalContentArea = styled.div`
  max-width: 700px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .ck-editor {
    max-width: 630px;
  }

  .ck-editor__editable_inline {
    height: 280px;
    padding: 0px 18px;
    font-size: 14px;
  }

  .inputTitle {
    width: 630px;
  }
`;

const EditModalButtonArea = styled.div`
  text-align: center;
  margin-top: -17px;

  > .editButton + .editCancelButton {
    margin-top: 20px;
    margin-left: 15px;
  }

  > .editButton {
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
    &:disabled {
      cursor: default;
      opacity: 0.5;
    }
  }

  > .editCancelButton {
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
  }
`;

const TitleInput = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid #a7abb3;
  border-radius: 5px;
  padding: 7.9px 9.1px;
  margin: 10px 0 20px 0;
  &:focus {
    outline-style: none;
    border: 1px solid #3679ea;
    transition: 0.2s;
  }
  ::placeholder {
    color: #a7abb3;
  }
`;

/* eslint-disable */
const CommentEditModal = ({
  newTitle,
  setNewTitle,
  newContent,
  setNewContent,
  contentId,
  setEditModalOpen,
}) => {
  // Content 수정 모달 close 이벤트 핸들러
  const closeEditModalHandler = () => {
    setEditModalOpen(false);
    const scrollY = document.body.style.top;
    document.body.style.cssText = '';
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  };

  // Patch
  const onClickSubmitButton = async (contentId) => {
    const editContent = {
      title: newTitle,
      content: newContent,
    };
    await axios
      .patch(`http://125.176.52.40:8080/questions/${contentId}`, editContent)
      .then(() => {
        closeEditModalHandler();
        toast.success('Edit Success!');
      })
      .then(() => {
        setTimeout(() => {
          location.reload();
        }, '3000');
        window.scrollTo(0, 0);
      })
      .catch(() => {
        toast.error('Edit Failed!');
      });
  };

  return (
    <EditModalBackdrop>
      <EditModalView>
        <div className="editModalTitle">Edit Question</div>
        <EditModalContentArea>
          <div className="inputTitle">
            <TitleInput
              type="text"
              value={newTitle}
              placeholder="new title here..."
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <CKEditor
            editor={ClassicEditor}
            data={newContent}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              setNewContent(data);
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
          />
        </EditModalContentArea>
        <EditModalButtonArea>
          <button
            className="editButton"
            disabled={!(newContent.length !== 0 && newTitle.length !== 0)}
            onClick={() => {
              onClickSubmitButton(contentId);
              closeEditModalHandler();
            }}>
            Edit
          </button>
          <button className="editCancelButton" onClick={closeEditModalHandler}>
            Cancel
          </button>
        </EditModalButtonArea>
      </EditModalView>
    </EditModalBackdrop>
  );
};

export default CommentEditModal;
