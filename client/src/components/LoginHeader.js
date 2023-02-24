import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../util/Logo';
import SearchIcon from '../util/SearchIcon';
import profile from '../util/profile.png';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { useConfirm } from 'material-ui-confirm';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { toast } from 'react-toastify';

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
  @media screen and (max-width: 640px) {
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
  height: 50px;
  margin: 0px;
  overflow-x: auto;
  ol {
    display: flex;
    height: 100%;
    list-style: none;
    margin-left: auto;
    overflow-x: auto;
    align-items: center;
  }
  li {
    display: inline-flex;
    margin-left: auto;
    margin: 0;
    padding: 0;
    cursor: pointer;
    &:hover {
      background-color: hsl(210, 8%, 90%);
    }
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    height: 50px;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px;
  img {
    width: 24px;
    height: 24px;
    border-radius: 3px;
  }
  span {
    text-decoration: none;
    margin-left: 5px;
    font-size: 12px;
    font-weight: 700;
  }
`;

const Logout = styled.button`
  border-style: none;
  background-color: transparent;
`;

function LoginHeader() {
  const navigate = useNavigate();
  const confirm = useConfirm();

  const onLogout = () => {
    // axios.get('/api/users/logout').then((res) => {
    //   if (res.data.success) {
    //     navigate('/');
    //   } else {
    //     toast.err('Logout Failed');
    //   }
    // });
    confirm({ title: 'Are you sure you want to log out?' })
      .then(() => {
        localStorage.clear();
        navigate('/');
        location.reload();
        window.scrollTo(0, 0);
      })
      .catch(() => {});
  };

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
              <button>Products</button>
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
                <ProfileBox>
                  <img src={profile} alt="img" />
                  <span>1</span>
                </ProfileBox>
              </li>
              <li>
                <div>
                  <svg
                    aria-hidden="true"
                    className="svg-icon iconInbox"
                    width="20"
                    height="18"
                    viewBox="0 0 20 18">
                    <path
                      fill="hsl(210,8%,35%)"
                      d="M4.63 1h10.56a2 2 0 0 1 1.94 1.35L20 10.79V15a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-4.21l2.78-8.44c.25-.8 1-1.36 1.85-1.35Zm8.28 12 2-2h2.95l-2.44-7.32a1 1 0 0 0-.95-.68H5.35a1 1 0 0 0-.95.68L1.96 11h2.95l2 2h6Z"></path>
                  </svg>
                </div>
              </li>
              <li>
                <div>
                  <svg width="18" height="18" viewBox="0 0 26 26">
                    <path
                      fill={'hsl(210,8%,35%)'}
                      d="M21 4V2H5v2H1v5c0 2 2 4 4 4v1c0 2.5 3 4 7 4v3H7s-1.2 2.3-1.2 3h14.4c0-.6-1.2-3-1.2-3h-5v-3c4 0 7-1.5 7-4v-1c2 0 4-2 4-4V4h-4zM5 11c-1 0-2-1-2-2V6h2v5zm11.5 2.7l-3.5-2-3.5 1.9L11 9.8 7.2 7.5h4.4L13 3.8l1.4 3.7h4L15.3 10l1.4 3.7h-.1zM23 9c0 1-1 2-2 2V6h2v3z"></path>
                  </svg>
                </div>
              </li>
              <li>
                <div>
                  <svg
                    aria-hidden="true"
                    className="svg-icon iconHelp"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18">
                    <path
                      fill="hsl(210,8%,35%)"
                      d="M9 1C4.64 1 1 4.64 1 9c0 4.36 3.64 8 8 8 4.36 0 8-3.64 8-8 0-4.36-3.64-8-8-8Zm.81 12.13c-.02.71-.55 1.15-1.24 1.13-.66-.02-1.17-.49-1.15-1.2.02-.72.56-1.18 1.22-1.16.7.03 1.2.51 1.17 1.23ZM11.77 8c-.59.66-1.78 1.09-2.05 1.97a4 4 0 0 0-.09.75c0 .05-.03.16-.18.16H7.88c-.16 0-.18-.1-.18-.15.06-1.35.66-2.2 1.83-2.88.39-.29.7-.75.7-1.24.01-1.24-1.64-1.82-2.35-.72-.21.33-.18.73-.18 1.1H5.75c0-1.97 1.03-3.26 3.03-3.26 1.75 0 3.47.87 3.47 2.83 0 .57-.2 1.05-.48 1.44Z"></path>
                  </svg>
                </div>
              </li>
              <li>
                <div>
                  <Logout onClick={onLogout}>
                    <RiLogoutBoxRFill size={20} color={'hsl(210,8%,35%)'} />
                  </Logout>
                </div>
              </li>
            </ol>
          </Nav>
        </NavContainer>
      </HeaderContainer>
    </>
  );
}

export default LoginHeader;
