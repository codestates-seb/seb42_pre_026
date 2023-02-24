import styled from 'styled-components';
import QuestionDetail from '../components/QuestionDetailComponent/QuestionDetail';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import LoginHeader from '../components/LoginHeader';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 45px;
  background-color: white;
  width: 100%;
`;

function Question() {
  const isLogin = localStorage.getItem('accessToken');
  return (
    <>
      {isLogin ? <LoginHeader /> : <Header />}
      <Container>
        <Nav />
        <QuestionDetail />
      </Container>
      <Footer />;
    </>
  );
}

export default Question;
