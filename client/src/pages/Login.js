import styled from 'styled-components';
import LoginForm from '../components/LoginComponent/LoginForm';
import SnsButtons from '../components/LoginComponent/SnsButtons';
import Header from '../components/Header';

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  width: 255px;
`;

function Login() {
  return (
    <>
      <Header />
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
        <SnsButtons text={'Log in'} />
        <LoginForm />
      </Container>
    </>
  );
}

export default Login;
