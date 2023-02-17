import styled from 'styled-components';

const NavArea = styled.div`
  background-color: green;
  width: 150px;
  height: 350px;
  position: sticky;
  top: 45px;

  /* 너비가 640px 보다 좁은 경우 Nav를 숨김 처리 */
  @media screen and (max-width: 640px) {
    display: none;
  }
`;

function Nav() {
  return <NavArea>Nav</NavArea>;
}

export default Nav;
