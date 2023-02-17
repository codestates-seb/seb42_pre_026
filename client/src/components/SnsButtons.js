import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { GrGithub, GrFacebook } from 'react-icons/gr';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SnsButton = styled.button`
  width: 280px;
  height: 40px;
  border-radius: 5px;
  margin: 4px 0;
  padding: 10px;
  border: none;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bgColor || 'white'};
  color: ${(props) => props.color || 'white'};
  border: ${(props) => props.border || 'none'};
  &:hover {
    background-color: ${(props) => props.hover || 'black'};
  }
  .icons {
    padding-right: 5px;
  }
`;

function SnsButtons({ text }) {
  return (
    <>
      <ButtonContainer>
        <SnsButton color={'black'} border={'2px solid #ececec'} hover={'#ececec'}>
          <FcGoogle className="icons" size={22} />
          {text} with Google
        </SnsButton>
        <SnsButton bgColor={'#2b2f33'}>
          <GrGithub className="icons" size={22} />
          {text} with GitHub
        </SnsButton>
        <SnsButton bgColor={'#4867aa'} hover={'#304986'}>
          <GrFacebook className="icons" size={22} />
          {text} with Facebook
        </SnsButton>
      </ButtonContainer>
    </>
  );
}

export default SnsButtons;
