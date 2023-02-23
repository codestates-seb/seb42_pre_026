import styled from 'styled-components';
import { OVERVIEW_BLOG, FEATURED_ON_META, COLLECTIVE_DETAILS } from '../util/AsideContent';

const Container = styled.div`
  display: block;
  float: right;
  width: 300px;
  min-width: 300px;
  margin: 0 0 15px 24px;
  box-sizing: inherit;
  height: 100%;

  @media screen and (max-width: 1100px) {
    display: none;
  }
`;

const UlContainer = styled.ul`
  display: block;
  list-style: none;
  list-style-type: disc;
  margin: 0;
  padding: 0;
  background-color: hsl(47, 87%, 94%);
  border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
  border-color: hsl(47, 65%, 84%);
`;

const Title = styled.li`
  display: flex;
  background-color: hsl(47, 83%, 91%);
  font-size: 12px;
  font-weight: bold;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border-bottom: 1px solid;
  border-top: 1px solid;
  border: 1px solid hsl(47, 65%, 84%);
  padding: 12px 15px;
  color: hsl(210, 8%, 35%);
`;

const Items = styled.li`
  display: flex;
  padding-left: 16px;
  padding-right: 16px;
  margin: 12px 0 12px 0;
`;

const TextBox = styled.div`
  flex-shrink: 0;
  flex-basis: 90%;
  margin-left: 10px;
  font-size: 13px;
  color: hsl(210, 8%, 25%);
  text-decoration: none;
  cursor: pointer;
`;

const Collectives = styled.div`
  position: relative;
  border: 1px solid hsl(210, 8%, 85%);
  margin-top: 16px;
  margin-bottom: 16px;
  background-color: hsl(0, 0%, 100%);
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
  border-radius: 3px;
  font-size: 13px;
`;

const Header = styled.div`
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-top: 1px solid hsl(210, 8%, 90%);
  padding: 12px 16px;
  background: hsl(210, 8%, 97.5%);
  color: hsl(210, 8%, 35%);
  font-size: 1.15rem;
  font-weight: normal;
  margin: 0;
  span {
    float: right;
    margin: 0 0 4px 8px;
    color: hsl(206, 100%, 40%);
    font-size: 11px;
    line-height: 19.5px;
  }
`;

const ContentContainer = styled.div`
  display: block;
  padding: 16px 15px;
  color: hsl(210, 8%, 25%);
  border-top: 1px solid hsl(210, 8%, 90%);
  align-items: center;
  color: hsl(210, 8%, 25%);
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  color: hsl(210, 8%, 25%);
`;

const ContentFlex = styled.div`
  display: flex;
  flex: 1 auto;
  justify-content: space-between;
`;

const JoinButton = styled.div`
  position: relative;
  display: inline-block;
  padding: 0.8em;
  color: hsl(206, 100%, 40%);
  border: 1px solid transparent;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  font-family: inherit;
  font-size: 12px;
  font-weight: normal;
  line-height: calc((13px + 2) / 13px);
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  border-color: hsl(206, 85%, 57.5%);
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`;

const IconTitle = styled.div`
  font-size: 1.15em;
  line-height: 1.3;
  color: hsl(210, 8%, 45%);
  width: 100%;
`;

const Members = styled.div`
  font-size: 12;
  margin-bottom: 8;
  color: hsl(210, 8%, 25%);
`;

const IconHeader = styled.div`
  flex-direction: row;
  width: 100px;
`;

const Desc = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow-wrap: break-word;
  overflow: hidden;
  font-size: 13px;
  color: hsl(210, 8%, 25%);
  margin-top: 10px;
`;

function Aside() {
  return (
    <Container>
      <UlContainer>
        <Title>The Overflow Blog</Title>
        {OVERVIEW_BLOG.map(({ icon, content }, i) => {
          return (
            <Items key={i}>
              {icon}
              <TextBox>{content}</TextBox>
            </Items>
          );
        })}
        <Title>Featured on Meta</Title>
        {FEATURED_ON_META.map(({ icon, content }, i) => {
          return (
            <Items key={i + 1}>
              {icon}
              <TextBox>{content}</TextBox>
            </Items>
          );
        })}
      </UlContainer>
      <Collectives>
        <Header>
          <span>see all</span>
          Collectives
        </Header>
        {COLLECTIVE_DETAILS.map(({ title, members, desc, icon }) => {
          return (
            <ContentContainer key={title}>
              <ContentHeader>
                <Icon src={icon} />
                <ContentFlex>
                  <IconHeader>
                    <IconTitle>{title}</IconTitle>
                    <Members>{members}</Members>
                  </IconHeader>
                  <div>
                    <JoinButton>Join</JoinButton>
                  </div>
                </ContentFlex>
              </ContentHeader>
              <Desc>{desc}</Desc>
            </ContentContainer>
          );
        })}
      </Collectives>
    </Container>
  );
}

export default Aside;
