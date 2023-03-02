import styled from 'styled-components';
import Aside from '../Aside';
import QuestionsList from './QuestionsList';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import axios from 'axios';
import { useConfirm } from 'material-ui-confirm';

const MainArea = styled.div`
  padding: 24px;
  display: flex;
  border-left: 1px solid #e4e4e5;
`;

const MainBar = styled.div`
  flex: 10;
`;

const MainBarHeader = styled.div`
  margin-bottom: 12px;
  display: flex;
  padding-top: 10px;

  > .mainBarHeaderTitle {
    font-size: 28px;
    flex: 1 auto;
    margin-bottom: 8px;
    font-weight: 400;
    word-break: break-word;
    line-height: 1.35;
  }
`;

const CreateButton = styled.button`
  width: 100px;
  height: 34px;
  font-size: 13px;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 3px;
  color: white;
  background-color: hsl(206, 100%, 52%);
  border: none;
  box-shadow: inset 0 1px 0 0 hsl(0deg 0% 100% / 40%);
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
    font-size: 18px;
    font-weight: 400;
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
  margin: 70px 0 20px 0;
`;

const PerPage = styled.div`
  > button {
    width: 27px;
    height: 23px;
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

/* eslint-disable */
function QuestionsMain() {
  const [questionData, setQuestionData] = useState([]);
  // 페이지 당 표시할 데이터 개수 상태
  const [limit, setLimit] = useState(15);
  // 현재 페이지 번호
  const [page, setPage] = useState(1);

  const limitList = [15, 30, 50];
  // 각 페이지에서 첫 데이터의 위치(index) 계산
  const offset = (page - 1) * limit;
  const numAllPages = Math.ceil(questionData.length / limit);

  const getQuestionData = async () => {
    const res = await axios.get('http://125.176.52.40:8080/question');
    setQuestionData(res.data);
  };

  useEffect(() => {
    getQuestionData();
  }, []);

  // 페이지네이션 페이지 이동 이벤트 핸들러
  const handlePageChange = (e, page) => {
    setPage(page);
  };

  const isLogin = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const confirm = useConfirm();

  const buttonClick = () => {
    if (isLogin) {
      navigate('/new');
    } else {
      confirm({ title: 'Login required.' })
        .then(() => {
          navigate('/login');
        })
        .catch(() => {});
    }
  };

  return (
    <MainArea>
      <MainBar>
        <MainBarHeader>
          <div className="mainBarHeaderTitle">All Questions</div>
          <CreateButton className="askQuestion" onClick={buttonClick}>
            Ask Question
          </CreateButton>
        </MainBarHeader>

        <MainBarFilter>
          <div className="questionsCount">
            {questionData.length <= 1
              ? `${questionData.length} question`
              : `${questionData.length} questions`}
          </div>
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
          {questionData.slice(offset, offset + limit).map((value) => {
            return <QuestionsList list={value} key={value.questionId} />;
          })}
        </QuestionsContainer>
        <PagenationWrapper>
          <Pagination
            count={numAllPages}
            onChange={handlePageChange}
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

export default QuestionsMain;
