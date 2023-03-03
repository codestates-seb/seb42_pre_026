import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../util/Logo';
import SearchIcon from '../util/SearchIcon';

const HeaderContainer = styled.header`
  display: flex;
  position: fixed !important;
  left: 0;
  top: 0;
  min-width: auto;
  width: 100%;
  min-height: 50px;
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
  background-color: hsl(210, 8%, 97.5%);
  border-top: 3px solid hsl(27, 90%, 55%);
  align-items: center;
  margin: 0;
  padding: 0;
  font-size: 13px;
`;

const NavContainer = styled.nav`
  display: flex;
  width: 100%;
  height: 100%;
  padding-right: 10px;
  align-items: center;
  vertical-align: baseline;
  padding: 0 85px;
  @media screen and (max-width: 1200px) {
    padding: 0;
  }
`;

const LogoBox = styled.div`
  display: flex;
  background-color: transparent;
  width: 172px;
  height: 50px;
  line-height: 17px;
  padding: 0 8px;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: hsl(210, 8%, 90%);
  }
`;

const Ol = styled.ol`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 2px 0;
  @media screen and (max-width: 730px) {
    display: none;
  }
`;

const Li = styled.li`
  margin-top: -1px;
  button {
    color: hsl(210, 8%, 35%);
    display: flex;
    align-items: center;
    padding: 6px 12px;
    position: relative;
    border: none;
    font: unset;
    background: none;
    box-shadow: none;
    cursor: pointer;
    user-select: none;
    border-radius: 1000px;
    margin: 2px;
    white-space: nowrap;
  }
  button:hover {
    border-radius: 40px;
    background-color: hsl(210, 8%, 90%);
    color: hsl(210, 8%, 35%);
    padding: 6px 12px;
  }
`;

const Form = styled.form`
  display: flex;
  padding: 0 calc(8px * 1);
  align-items: center;
  flex-shrink: 10000;
  flex-grow: 1;
`;

const Container = styled.div`
  position: relative;
  flex-grow: 1;
  margin: 0;
  padding: 0;
  svg {
    position: absolute;
    margin-left: 9px;
    margin-top: 8px;
  }
`;

const Input = styled.input`
  width: 100%;
  border-color: hsl(210, 8%, 75%);
  background-color: hsl(0, 0%, 100%);
  color: hsl(210, 8%, 45%);
  line-height: calc((13 + 2) / 13);
  margin: 0;
  padding: 0.6em 0.7em;
  border: 1px solid hsl(210, 8%, 75%);
  border-radius: 3px;
  font-size: 13px;
  padding-left: 32px;
  &:focus {
    outline: none !important;
    border-color: hsl(206, 93%, 83.5%);
    box-shadow: rgba(0, 116, 204, 0.15) 0px 0px 0px 4px;
  }
`;

const Nav = styled.nav`
  height: 47px;
  ol {
    display: flex;
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    align-items: center;
    padding-bottom: 5px;
    width: auto;
  }
  li {
    margin: 10px 2px;
    cursor: pointer;
  }
`;

const ButtonStyle = styled.button`
  position: relative;
  width: ${({ width }) => width || '60px'};
  display: inline-block;
  padding: 0.5em 0.5em 0.5em 0.5em;
  color: ${({ color }) => color || 'hsl(0,0%,100%)'};
  border: 1px solid ${({ borderColor }) => borderColor || 'transparent'};
  border-radius: 3px;
  background-color: ${({ backgroundColor }) => backgroundColor || 'hsl(206,100%,52%)'};
  font-size: 13px;
  font-weight: normal;
  line-height: calc((13 + 2) / 13);
  text-align: center;
  height: 34px;
  margin-top: 6px;
  box-shadow: inset 0 1px 0 0 hsl(0deg 0% 100% / 40%);
  &:hover {
    background-color: ${({ hover }) => hover || 'hsl(206, 100%, 40%)'};
  }
`;

function Header() {
  return (
    <>
      <HeaderContainer>
        <NavContainer>
          <LogoBox>
            <Link to="/">
              <Logo />
            </Link>
          </LogoBox>
          <Ol>
            <Li>
              <button>About</button>
            </Li>
            <Li>
              <button>Products</button>
            </Li>
            <Li>
              <button>For Teams</button>
            </Li>
          </Ol>
          <Form>
            <Container>
              <SearchIcon />
              <Input type="text" placeholder="Search..." maxLength={240} />
            </Container>
          </Form>
          <Nav>
            <ol>
              <li>
                <Link to="/login">
                  <ButtonStyle
                    backgroundColor="hsl(205,46%,92%)"
                    borderColor="hsl(205,41%,63%)"
                    color="hsl(205,47%,42%)"
                    hover="#b3d3ea">
                    Log in
                  </ButtonStyle>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <ButtonStyle width="70px">Sign up</ButtonStyle>
                </Link>
              </li>
            </ol>
          </Nav>
        </NavContainer>
      </HeaderContainer>
    </>
  );
}

export default Header;
