import styled from 'styled-components';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Main from '../components/Main';
import Footer from '../components/Footer';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 45px;
  background-color: white;
`;

function Questions() {
  return (
    <div>
      <Header />
      <Container>
        <Nav />
        <Main />
      </Container>
      <Footer />
    </div>
  );
}

export default Questions;
