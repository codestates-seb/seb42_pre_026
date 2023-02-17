import styled from 'styled-components';
import Aside from './Aside';

const MainArea = styled.div`
  display: flex;
  padding: 24px;
  max-width: 1000px;
  flex: 1 0 auto;
  border: 1px solid red;
`;

const MainBar = styled.div`
  /* border: 1px solid red; */
  flex: 10;
  height: 1000px;
`;

const MainBarHeader = styled.div`
  margin-bottom: 12px;
  display: flex;

  > .mainBarHeaderTitle {
    font-size: 24px;
    flex: 1 auto;
    margin-right: 8px;
    margin-bottom: 12px;
    font-weight: 400;
  }

  > .askQuestion {
    width: 90px;
    height: 33px;
    font-size: 12px;
    margin-bottom: 12px;
    border-radius: 0.15rem;
    color: white;
    background-color: hsl(206, 100%, 52%);
    border: none;
    &:hover {
      background-color: hsl(206, 100%, 40%);
    }
  }
`;

const MainBarFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  > .questionsCount {
    flex: 1 0 auto;
    margin-right: 12px;
  }
`;

const SelectFilter = styled.div`
  display: flex;
  flex-direction: row;
  height: 30px;
  font-size: 11px;
  border: 0.5px solid #a3a8ad;
  border-radius: 0.15rem;
  margin-right: 16px;

  > div {
    font-weight: 500;
    padding: 7px 10px 0 10px;
    color: #b3b7bc;
    border-right: 0.5px solid #a3a8ad;
    color: #6a747c;
    &:hover {
      color: #474c50;
      background-color: hsl(210, 8%, 97.5%);
    }
  }

  > .more {
    border: none;
  }
`;

const OpenFilter = styled.button`
  font-weight: 500;
  background-color: #e1ecf4;
  height: 30px;
  font-size: 11px;
  border: 0.5px solid #a3a8ad;
  border-radius: 0.15rem;
  padding: 0 10px 0 10px;
  color: #4d708a;
  border-right: 0.5px solid #92a7b7;
  &:hover {
    color: #2e5876;
    background-color: #b3d3ea;
  }
`;

function Main() {
  return (
    <MainArea>
      <MainBar>
        <MainBarHeader>
          <div className="mainBarHeaderTitle">All Questions</div>
          <button className="askQuestion">Ask Question</button>
        </MainBarHeader>
        <MainBarFilter>
          <div className="questionsCount">23,513,854 questions</div>
          <SelectFilter>
            <div className="newest">Newest</div>
            <div className="active">Active</div>
            <div className="bountied">Bountied</div>
            <div className="unanswered">Unanswered</div>
            <div className="more">More</div>
          </SelectFilter>
          <OpenFilter>Filter</OpenFilter>
        </MainBarFilter>
      </MainBar>
      <Aside />
    </MainArea>
  );
}

export default Main;
