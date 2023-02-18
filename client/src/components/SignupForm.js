import { useCallback, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Signupform = styled.form`
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

const FormContainer = styled.div`
  width: 230px;
  display: column;
`;

const SignupInput = styled.input`
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

const SignupLabel = styled.label`
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
  width: 100%;
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

function SignupForm() {
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const handleName = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const handleEmail = useCallback((e) => {
    setEmail(e.target.value);
    //* 이메일 형식인지 확인
    const regex = /^[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]/;
    if (!regex.test(e.target.value)) {
      setEmailMessage('The email is not a valid email address.');
      setEmailValid(true);
    } else {
      setEmailMessage('');
      setEmailValid(false);
    }
  }, []);

  const handlePassword = useCallback((e) => {
    setPassword(e.target.value);
    //* 최소 8자리 이상이면서 숫자, 특수문자가 각각 1개 이상
    const regex = /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    if (!regex.test(e.target.value)) {
      setPasswordMessage('The password is not a valid password.');
      setPasswordValid(true);
    } else {
      setPasswordMessage('');
      setPasswordValid(false);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length < 1) {
      nameRef.current.focus();
      return;
    }
    if (email.length < 1 || emailValid) {
      emailRef.current.focus();
      return;
    }
    if (password.length < 1 || passwordValid) {
      passwordRef.current.focus();
      return;
    }
    //* api 주소 받아서 변경할 것
    axios
      .post('/api/post', {
        name,
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        alert('회원가입 성공!');
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        navigate(`/signup`);
      });
  };

  return (
    <>
      <Signupform>
        <FormContainer>
          <SignupLabel htmlFor="name">Display name</SignupLabel>
          <SignupInput ref={nameRef} type="text" name="name" value={name} onChange={handleName} />
          <SignupLabel htmlFor="email">Email</SignupLabel>
          <SignupInput
            ref={emailRef}
            type="text"
            name="email"
            value={email}
            onChange={handleEmail}
          />
          {email.length > 0 && <Check>{emailMessage}</Check>}
          <PasswordContainer>
            <SignupLabel htmlFor="password">password</SignupLabel>
          </PasswordContainer>
          <SignupInput
            ref={passwordRef}
            name="password"
            type="password"
            value={password}
            onChange={handlePassword}
          />
          {password.length > 0 && <Check>{passwordMessage}</Check>}
          <SubmitButton onClick={handleSubmit}>Sign up</SubmitButton>
        </FormContainer>
      </Signupform>
      <HelpContainer>
        Already have an account?
        <SpanStyle onClick={() => navigate('/login')}>Log in</SpanStyle>
      </HelpContainer>
    </>
  );
}

export default SignupForm;
