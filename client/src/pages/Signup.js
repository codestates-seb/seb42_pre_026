import styled from 'styled-components';
import SnsButtons from '../components/SnsButtons';
import SignupInfo from '../components/SignupInfo';
import SignupForm from '../components/SignupForm';

const DeleteHeader = styled.header`
  background-color: cornflowerblue;
  color: white;
  width: 100%;
  height: 48px;
  font-size: 22px;
  text-align: center;
`;

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
      <DeleteHeader>헤더</DeleteHeader>
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
