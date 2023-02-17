import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => {
    setEmail(e.target.value);
    // 이메일 형식인지 확인
    const regex = /^[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]/;
    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    // 최소 8자리 이상이면서 숫자, 특수문자가 각각 1개 이상
    const regex = /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    if (regex.test(password)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  return (
    <>
      <Signupform>
        <FormContainer>
          <SignupLabel htmlFor="name">Display name</SignupLabel>
          <SignupInput type="text" name="name" value={name} onChange={handleName} />
          <SignupLabel htmlFor="email">Email</SignupLabel>
          <SignupInput type="text" name="email" value={email} onChange={handleEmail} />
          {!emailValid && email.length > 1 && (
            <Check>The email is not a valid email address.</Check>
          )}
          <PasswordContainer>
            <SignupLabel htmlFor="password">password</SignupLabel>
            <SpanStyle>Forgot password?</SpanStyle>
          </PasswordContainer>
          <SignupInput name="password" type="password" value={password} onChange={handlePassword} />
          {!passwordValid && password.length > 1 && (
            <Check>The password is not a valid password.</Check>
          )}
          <SubmitButton>Sign up</SubmitButton>
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
