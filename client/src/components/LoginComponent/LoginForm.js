import { useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';

const FormContainer = styled.form`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  border: 1px solid rgb(214, 217, 220);
  border-radius: 5px;
  padding: 15px;
  background: white;
  box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 230px;
  display: column;
`;

const LoginInput = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid rgb(214, 217, 220);
  border-radius: 5px;
  padding: 7.9px 9.1px;
  margin: 6px 0 10px 0;
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
  width: 100%;
  height: 37.78px;
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: #0a95ff;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  &:hover {
    background: hsl(206, 100%, 40%);
    transition: 0.2s;
  }
`;

const PasswordContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

function LoginForm() {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handlePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.length < 1) {
      emailRef.current.focus();
      return;
    }
    if (password.length < 1) {
      passwordRef.current.focus();
      return;
    }

    await axios
      .post('/auth/login', {
        username: email,
        password,
      })
      .then((res) => {
        toast.success('Login Success!');
        localStorage.setItem('accessToken', res.headers.authorization);
        localStorage.setItem('username', res.data.username);
      })
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        toast.error('Login Failed!');
      });
  };

  return (
    <>
      <FormContainer>
        <InputContainer>
          <LoginLabel htmlFor="email">Email</LoginLabel>
          <LoginInput
            ref={emailRef}
            type="text"
            name="email"
            value={email}
            onChange={handleEmail}
          />
          <PasswordContainer>
            <LoginLabel htmlFor="password">password</LoginLabel>
            <SpanStyle>Forgot password?</SpanStyle>
          </PasswordContainer>
          <LoginInput
            ref={passwordRef}
            name="password"
            type="password"
            value={password}
            onChange={handlePassword}
          />
          <SubmitButton onClick={handleSubmit}>Log in</SubmitButton>
        </InputContainer>
      </FormContainer>
      <HelpContainer>
        Don’t have an account?
        <SpanStyle onClick={() => navigate('/signup')}>Sign up</SpanStyle>
      </HelpContainer>
    </>
  );
}

export default LoginForm;
