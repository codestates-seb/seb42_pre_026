import styled from 'styled-components';
import NewInfo from '../components/NewComponent/NewInfo';
import NewForm from '../components/NewComponent/NewForm';
import Header from '../components/Header';

const DeleteFooter = styled.footer`
  background-color: cornflowerblue;
  color: white;
  width: 100%;
  height: 290px;
  font-size: 22px;
  text-align: center;
`;

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
      <Header />
      <Container>
        <NewInfo />
        <NewForm />
      </Container>
      <DeleteFooter>푸터</DeleteFooter>
    </>
  );
}

export default New;
