import styled from 'styled-components';

const HeaderArea = styled.div`
  background-color: orange;
  width: 100%;
  top: 0;
  left: 0;
  height: 45px;
  position: fixed;
`;

function Header() {
  return <HeaderArea>Header</HeaderArea>;
}

export default Header;
