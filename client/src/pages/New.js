import styled from 'styled-components';
import NewInfo from '../components/NewComponent/NewInfo';
import NewForm from '../components/NewComponent/NewForm';
import LoginHeader from '../components/LoginHeader';
import Footer from '../components/Footer';

const Container = styled.div`
  padding: 24px;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 70px;
`;

function New() {
  return (
    <>
      <LoginHeader />
      <Container>
        <NewInfo />
        <NewForm />
      </Container>
      <Footer />
    </>
  );
}

export default New;
