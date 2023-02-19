import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

/* eslint-disable */
const TextEditor = ({ content, setContent }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data=""
      onReady={(editor) => {}}
      onChange={(event, editor) => {
        const data = editor.getData();
        setContent({
          ...content,
          content: data,
        });
      }}
      onBlur={(event, editor) => {}}
      onFocus={(event, editor) => {}}
    />
  );
};

export default TextEditor;
