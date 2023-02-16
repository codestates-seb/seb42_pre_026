import { useState } from 'react';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { GrGithub, GrFacebook } from 'react-icons/gr';

const DeleteHeader = styled.header`
  background-color: cornflowerblue;
  color: white;
  width: 100%;
  height: 48px;
  font-size: 22px;
  text-align: center;
`;

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  width: 255px;
`;

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
    background-color: #25292e;
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

const FormContainer = styled.form`
  width: 255px;
  height: 100%;
  margin-top: 20px;
  border: 1px solid rgb(214, 217, 220);
  border-radius: 5px;
  padding: 12px;
  background: white;
  box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.2);
`;

const LoginForm = styled.div`
  width: 230px;
  display: column;
`;

const LoginInput = styled.input`
  width: 230px;
  height: 20px;
  border: 1px solid rgb(214, 217, 220);
  border-radius: 5px;
  padding: 7.9px 9.1px;
  margin: 6px 0 6px 0;
  &:focus {
    outline-style: none;
    border: 1px solid #0a95ff;
    transition: 0.2s;
  }
`;

const LoginLabel = styled.label`
  display: block;
  margin: 1px;
  font-weight: 600;
`;

const SubmitButton = styled.button`
  width: 250px;
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

const Check = styled.div`
  font-size: 12px;
  color: red;
`;

const PasswordContainer = styled.div`
  width: 245px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
`;

const SpanStyle = styled.span`
  display: block;
  font-size: 12px;
  color: #0a95ff;
  padding-left: 5px;
  &:hover {
    cursor: pointer;
    color: rgba(10, 149, 255, 0.6);
  }
`;

const HelpContainer = styled.div`
  font-size: 14px;
  width: 100%;
  padding-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      // eslint-disable-next-line
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
    if (regex.test(password)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  return (
    <>
      <DeleteHeader>헤더</DeleteHeader>
      <Container>
        <LogoContainer>
          <svg aria-hidden="true" width="32" height="37" viewBox="0 0 32 37">
            <path d="M 26 33 v -9 h 4 v 13 H 0 V 24 h 4 v 9 h 22 Z" fill="#c2c3c4" />
            <path
              d="m 21.5 0 l -2.7 2 l 9.9 13.3 l 2.7 -2 L 21.5 0 Z M 26 18.4 L 13.3 7.8 l 2.1 -2.5 l 12.7 10.6 l -2.1 2.5 Z M 9.1 15.2 l 15 7 l 1.4 -3 l -15 -7 l -1.4 3 Z m 14 10.79 l 0.68 -2.95 l -16.1 -3.35 L 7 23 l 16.1 2.99 Z M 23 30 H 7 v -3 h 16 v 3 Z"
              fill="#F77F2B"
            />
          </svg>
        </LogoContainer>
        {/* SNS Buttons */}
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
        {/* login form */}
        <FormContainer>
          <LoginForm>
            <LoginLabel htmlFor="email">e-mail</LoginLabel>
            <LoginInput type="text" name="email" value={email} onChange={handleEmail} />
            {/* 유효성 검사 조건 추후에 변경예정 */}
            {!emailValid && email.length > 5 && (
              <Check>The email is not a valid email address.</Check>
            )}
            <PasswordContainer>
              <LoginLabel htmlFor="password">password</LoginLabel>
              <SpanStyle>Forgot password?</SpanStyle>
            </PasswordContainer>
            <LoginInput
              name="password"
              type="password"
              value={password}
              onChange={handlePassword}
            />
            {/* 유효성 검사 조건 추후에 변경예정 */}
            {!passwordValid && password.length > 1 && <Check>Password cannot be empty.</Check>}
            <SubmitButton>Log in</SubmitButton>
          </LoginForm>
        </FormContainer>
        <HelpContainer>
          Don’t have an account?
          <SpanStyle>Sign up</SpanStyle>
        </HelpContainer>
      </Container>
    </>
  );
}

export default Login;
