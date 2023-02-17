import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { GrGithub, GrFacebook } from 'react-icons/gr';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    width: 280px;
    height: 40px;
    border-radius: 5px;
    margin: 4px 0;
    padding: 10px;
    border: none;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    text {
      padding-left: 5px;
    }
  }
  .btn_google {
    border: 1px solid #ececec;
    background-color: white;
    &:hover {
      background-color: #ececec;
    }
  }
  .btn_github {
    background-color: #2b2f33;
    color: white;
    &:hover {
      background-color: black;
    }
  }
  .btn_facebook {
    background-color: #4867aa;
    color: white;
    &:hover {
      background-color: #304986;
    }
  }
`;

function SnsButtons() {
  return (
    <>
      <ButtonContainer>
        <button className="btn_google">
          <FcGoogle size={18} />
          <text>Log in with Google</text>
        </button>
        <button className="btn_github">
          <GrGithub size={18} />
          <text>Log in with GitHub</text>
        </button>
        <button className="btn_facebook">
          <GrFacebook size={18} />
          <text>Log in with Facebook</text>
        </button>
      </ButtonContainer>
    </>
  );
}

export default SnsButtons;
