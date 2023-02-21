import styled from 'styled-components';

const NavArea = styled.div`
  background-color: pink;
  width: 150px;
  height: 350px;
  position: sticky;
  top: 45px;
  font-size: 13px;

  /* 너비가 640px 보다 좁은 경우 Nav를 숨김 처리 */
  @media screen and (max-width: 640px) {
    display: none;
  }
`;

const LeftSideBar = styled.div`
  background-color: lightblue;
  margin: 30px 0 8px 0;
  padding: 4px;
`;

const MainNavTitle = styled.ul`
  list-style: none;

  > .teams {
    margin-top: 24px;
  }
`;

const SubNavTitle = styled.ul`
  list-style: none;
  margin-top: 16px;

  > .collectives {
    margin-top: 16px;
  }
`;

function Nav() {
  return (
    <NavArea>
      <LeftSideBar>
        <MainNavTitle>
          <li>Home</li>
          <li>
            <SubNavTitle>
              <li>PUBLIC</li>
              <li>Questions</li>
              <li>Tags</li>
              <li>Users</li>
              <li>Companies</li>
              <li className="collectives">COLLECTIVES</li>
              <li>Explore Collectives</li>
            </SubNavTitle>
          </li>
          <li className="teams">TEAMS</li>
          <li>Create free Team</li>
        </MainNavTitle>
      </LeftSideBar>
    </NavArea>
  );
}

export default Nav;
