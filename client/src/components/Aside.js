import styled from 'styled-components';

const AsideArea = styled.div`
  background-color: pink;
  width: 270px;
  margin-left: 24px;

  /* 너비가 980px 보다 좁은 경우 Aside를 숨김 처리 */
  @media screen and (max-width: 980px) {
    display: none;
  }
`;

function Aside() {
  return <AsideArea>Aside</AsideArea>;
}

export default Aside;
