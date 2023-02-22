import styled from 'styled-components';
import SnsButtons from '../components/LoginComponent/SnsButtons';
import SignupInfo from '../components/SignupComponent/SignupInfo';
import SignupForm from '../components/SignupComponent/SignupForm';
import Header from '../components/Header';

const Container = styled.div`
  display: flex;
  padding: 24px;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Signup() {
  return (
    <>
      <Header />
      <Container>
        <SignupInfo />
        <FormContainer>
          <SnsButtons text={'Sign up'} />
          <SignupForm />
        </FormContainer>
      </Container>
    </>
  );
}

export default Signup;
