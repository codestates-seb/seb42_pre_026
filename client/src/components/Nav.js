import styled from 'styled-components';
import { FaGlobeAmericas, FaInfoCircle } from 'react-icons/fa';

const NavArea = styled.div`
  width: 150px;
  height: 350px;
  position: sticky;
  top: 45px;
  font-size: 12px;

  /* 너비가 640px 보다 좁은 경우 Nav를 숨김 처리 */
  @media screen and (max-width: 640px) {
    display: none;
  }
`;

const LeftSideBar = styled.div`
  margin: 30px 0 8px 0;
`;

const MainNavTitle = styled.ul`
  list-style: none;
  color: #62676b;

  > .home {
    font-weight: 500;
    padding-left: 10px;
    &:hover {
      color: black;
    }
  }

  > .teams {
    font-size: 10px;
    margin-top: 15px;
    padding-left: 10px;

    > .infoicon {
      margin-left: 85px;
      vertical-align: middle;
    }
  }

  > .createfreedteam {
    font-weight: 500;
    padding-left: 25px;
    height: 30px;
    line-height: 30px;
    &:hover {
      color: black;
    }
  }
`;

const SubNavTitle = styled.ul`
  list-style: none;
  margin-top: 16px;

  > .public {
    font-size: 10px;
    padding-left: 10px;
    margin-bottom: 4px;
  }

  > .collectives {
    font-size: 10px;
    margin-top: 16px;
    padding-left: 10px;

    > .infoicon {
      vertical-align: middle;
      margin-left: 51px;
    }
  }

  > .questions {
    font-weight: 700;
    color: black;
    padding-left: 5px;
    background-color: #f0f2f4;
    height: 30px;
    line-height: 30px;
    border-right: 3px solid #f48123;

    > .globeicon {
      vertical-align: middle;
      margin: -4px 5px 0 5px;
    }
  }

  > .tags,
  .users,
  .companies,
  .explorecolectives {
    font-weight: 500;
    padding-left: 25px;
    height: 30px;
    line-height: 30px;
    &:hover {
      color: black;
    }
  }
`;

function Nav() {
  return (
    <NavArea>
      <LeftSideBar>
        <MainNavTitle>
          <li className="home">Home</li>
          <li>
            <SubNavTitle>
              <li className="public">PUBLIC</li>
              <li className="questions">
                <FaGlobeAmericas className="globeicon" size="15" />
                <span>Questions</span>
              </li>
              <li className="tags">Tags</li>
              <li className="users">Users</li>
              <li className="companies">Companies</li>
              <li className="collectives">
                COLLECTIVES
                <FaInfoCircle className="infoicon" size="11" />
              </li>
              <li className="explorecolectives">Explore Collectives</li>
            </SubNavTitle>
          </li>
          <li className="teams">
            TEAMS
            <FaInfoCircle className="infoicon" size="11" />
          </li>
          <li className="createfreedteam">Create free Team</li>
        </MainNavTitle>
      </LeftSideBar>
    </NavArea>
  );
}

export default Nav;
