import styled from 'styled-components';
import Header from '../components/Header';
import Nav from '../components/Nav';
import QuestionsMain from '../components/QuestionsComponent/QuestionsMain';
import Footer from '../components/Footer';
import LoginHeader from '../components/LoginHeader';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 45px;
  background-color: white;
`;

function Main() {
  const isLogin = localStorage.getItem('accessToken');
  return (
    <div>
      {isLogin ? <LoginHeader /> : <Header />}
      <Container>
        <Nav />
        <QuestionsMain />
      </Container>
      <Footer />
    </div>
  );
}

export default Main;
