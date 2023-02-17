import styled from 'styled-components';
import NewInfo from '../components/NewInfo';
import NewForm from '../components/NewForm';

const DeleteHeader = styled.header`
  background-color: cornflowerblue;
  color: white;
  width: 100%;
  height: 48px;
  font-size: 22px;
  text-align: center;
`;

const DeleteFooter = styled.footer`
  background-color: cornflowerblue;
  color: white;
  width: 100%;
  height: 290px;
  font-size: 22px;
  text-align: center;
`;

const Container = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 70px;
`;

function New() {
  return (
    <>
      <DeleteHeader>헤더</DeleteHeader>
      <Container>
        <NewInfo />
        <NewForm />
      </Container>
      <DeleteFooter>푸터</DeleteFooter>
    </>
  );
}

export default New;
