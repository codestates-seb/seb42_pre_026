import styled from 'styled-components';
import Aside from './Aside';
import QuestionsList from './QuestionsList';
import dummyData from '../dummyData';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Pagination, PaginationItem } from '@mui/material';

const MainArea = styled.div`
  padding: 24px;
  display: flex;
  max-width: 1000px;
  flex: 1 0 auto;
  border-left: 1px solid #e4e4e5;
`;

const MainBar = styled.div`
  flex: 10;
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
`;

const CreateButton = styled.button`
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

const QuestionsContainer = styled.ul`
  list-style: none;
  margin: 0 0 30px -24px;
  border-top: 1px solid #e4e4e5;
`;

const PagenationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0 20px 0;
`;

const PerPage = styled.div`
  > button {
    width: 27px;
    height: 22px;
    font-size: 12px;
    margin-left: 3px;
  }

  > .pageTab {
    background-color: #ffffff;
    border: 0.5px solid #dad9db;
    border-radius: 0.15rem;
    color: #414247;
    &:hover {
      background-color: lightgray;
    }
  }

  > .pageFocused {
    border-radius: 0.15rem;
    border: none;
    background-color: #f48123;
    font-weight: 600;
    color: white;
  }

  > span {
    color: #252728;
    margin-left: 10px;
    font-size: 11.5px;
    font-weight: 500;
  }
`;

function Main() {
  // 페이지 당 표시할 데이터 개수 상태
  const [limit, setLimit] = useState(15);
  const limitList = [15, 30, 50];
  // 현재 페이지 번호
  const [page, setPage] = useState(1);
  // 각 페이지에서 첫 데이터의 위치(index) 계산
  const offset = (page - 1) * limit;
  const numAllPages = Math.ceil(dummyData.length / limit);

  return (
    <MainArea>
      <MainBar>
        <MainBarHeader>
          <div className="mainBarHeaderTitle">All Questions</div>
          <Link to="/new">
            <CreateButton className="askQuestion">Ask Question</CreateButton>
          </Link>
        </MainBarHeader>

        <MainBarFilter>
          <div className="questionsCount">{dummyData.length.toLocaleString()} questions</div>
          <SelectFilter>
            <div className="newest">Newest</div>
            <div className="active">Active</div>
            <div className="bountied">Bountied</div>
            <div className="unanswered">Unanswered</div>
            <div className="more">More</div>
          </SelectFilter>
          <OpenFilter>Filter</OpenFilter>
        </MainBarFilter>

        <QuestionsContainer>
          {dummyData.slice(offset, offset + limit).map((value) => {
            return <QuestionsList list={value} key={value.id} setPage={setPage} />;
          })}
        </QuestionsContainer>
        <PagenationWrapper>
          <Pagination
            count={numAllPages}
            onClick={(e) => setPage(e.target.outerText)}
            variant="outlined"
            shape="rounded"
            boundaryCount={1}
            siblingCount={2}
            size="small"
            color="primary"
            renderItem={(item) => <PaginationItem {...item} sx={{ fontSize: 12 }} />}
          />
          <PerPage>
            {limitList.map((el, idx) => {
              return (
                <button
                  className={el === limit ? 'pageFocused' : 'pageTab'}
                  key={idx}
                  value={el}
                  onClick={(e) => setLimit(Number(e.target.value))}>
                  {el}
                </button>
              );
            })}
            <span>per page</span>
          </PerPage>
        </PagenationWrapper>
      </MainBar>
      <Aside />
    </MainArea>
  );
}

export default Main;
