import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as MW from "../styles/styledMyBookWrite";

const MyBookWrite = () => {
  const navigate = useNavigate();

  const goLogin = () => {
    navigate(`/login`);
  };

  const goJoin = () => {
    navigate(`/join`);
  };

  return (
    <MW.Container>
      <header>
        <MW.Nav>
          <MW.NavContent>
            <MW.Logo>
              <img
                id="logo"
                src={`${process.env.PUBLIC_URL}/images/logo.png`}
                alt="logo"
              />
            </MW.Logo>
            <MW.MovingContent>
              <div id="library">내 서재</div>
              <div id="bookroom">책방</div>
              <div id="comparison">장례식장 비교</div>
              <div id="market">마켓</div>
            </MW.MovingContent>
            <div id="bar"> | </div>
            <MW.Account>
              <div id="login" onClick={goLogin}>
                로그인
              </div>
              <div id="join" onClick={goJoin}>
                회원가입
              </div>
            </MW.Account>
          </MW.NavContent>
        </MW.Nav>
      </header>
      {/*  */}
      <body></body>
      {/*  */}
      <footer>
        <MW.Footer>
          <MW.Introduction>
            <div id="introduce">나의 별에게 보내는 편지</div>
            <img
              id="logo"
              src={`${process.env.PUBLIC_URL}/images/logo.png`}
              alt="logo"
            />
            <div id="team">멋쟁이사자처럼 동덕여자대학교 12기 효녀손팀</div>
            <div id="name">전지영, 하성언, 김하희, 김민주, 정세윤</div>
            <div id="sns">인스타 아이디</div>
          </MW.Introduction>
        </MW.Footer>
      </footer>
    </MW.Container>
  );
};

export default MyBookWrite;