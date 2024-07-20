import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyPageModal from "./MyPageModal";
import * as MP from "../styles/StyledMP";
import { Nickname } from "../styles/StyledJoin";

const Managepet = ({ nickname }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const myPageRef = useRef(null);

  useEffect(() => {
    // 로그인 상태 확인 (예시: localStorage에 토큰이 있는지 확인)
    const token = localStorage.getItem("token");
    if (token) {
      console.log("로그인 되어있음");
      setIsLoggedIn(true);
    }
  }, []);

  const pets = [
    {
      id: 1,
      img: "/images/ProfileImg.svg",
      name: "쪼꼬",
      date: "2012.02.10 ~ 2024.07.01",
    },
    {
      id: 2,
      img: "/images/Pepper.svg",
      name: "후추",
      date: "2017.06.04 ~ ",
    },
  ];

  const [current, setCurrent] = useState(0);
  const nextpet = () => {
    setCurrent((prev) => (prev + 1) % pets.length);
  };
  const prevpet = () => {
    setCurrent((prev) => (prev - 1 + pets.length) % pets.length);
  };
  const showButtons = pets.length > 1;

  const goLogin = () => {
    navigate(`/login`);
  };

  const goHome = () => {
    navigate(`/`);
  };

  const goJoin = () => {
    navigate(`/join`);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // 예시로 localStorage에 저장된 토큰을 삭제
    setIsLoggedIn(false);
    navigate(`/`);
  };

  const profile = {
    // image: 'path_to_profile_image.jpg',
    name: nickname,
  };

  return (
    <MP.Container>
      <header>
        <MP.Nav>
          <MP.NavContent>
            <MP.Logo onClick={goHome}>
              <img
                id="logo"
                src={`${process.env.PUBLIC_URL}/images/logo.png`}
                alt="logo"
              />
            </MP.Logo>
            <MP.MovingContent>
              <div id="library">서재</div>
              <div id="bookroom">책방</div>
              <div id="comparison">장례식장 비교</div>
              <div id="market">마켓</div>
            </MP.MovingContent>
            <div id="bar"> | </div>
            <MP.Account>
              {isLoggedIn ? (
                <>
                  <div id="mypage" onClick={openModal} ref={myPageRef}>
                    마이페이지
                  </div>
                  <div id="logout" onClick={handleLogout}>
                    로그아웃
                  </div>
                </>
              ) : (
                <>
                  <div id="login" onClick={goLogin}>
                    로그인
                  </div>
                  <div id="join" onClick={goJoin}>
                    회원가입
                  </div>
                </>
              )}
            </MP.Account>
          </MP.NavContent>
        </MP.Nav>
      </header>
      <MyPageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        profile={profile}
        anchorRef={myPageRef}
      />
      <body>
        <MP.BodyContainer>
          <div id="title">나의 반려동물 관리</div>
          <MP.Slider>
            <MP.SlideButton onClick={prevpet} show={showButtons}>
              <img src={`${process.env.PUBLIC_URL}/images/Back.svg`} />
            </MP.SlideButton>
            <MP.BookContainer>
              {pets.map((pet, index) => {
                let large = index === current;
                let small =
                  (index === (current + 1) % pets.length &&
                    current !== pets.length - 1) ||
                  (index === (current - 1 + pets.length) % pets.length &&
                    current !== 0);
                let next =
                  index === (current + 1) % pets.length &&
                  current !== pets.length - 1;
                let prev =
                  index === (current - 1 + pets.length) % pets.length &&
                  current !== 0;
                let hidden = !(large || small);

                // 책이 하나만 있을 때는 큰 책으로 중앙에 위치
                if (pets.length === 1) {
                  large = true;
                  small = false;
                  next = false;
                  prev = false;
                  hidden = false;
                }

                return (
                  <MP.Book
                    key={pets.id}
                    large={large}
                    small={small}
                    next={next}
                    prev={prev}
                    hidden={hidden}
                  >
                    {/* 이미지, 제목, 작가 받아와야함 */}
                    <img id="img" src={`${process.env.PUBLIC_URL}${pet.img}`} />
                    <div id="name">{pet.name}</div>
                    <div id="date">{pet.date}</div>
                    <button id="bookbtn">서재 바로가기</button>
                  </MP.Book>
                );
              })}
            </MP.BookContainer>
            <MP.SlideButton onClick={nextpet} show={showButtons}>
              <img src={`${process.env.PUBLIC_URL}/images/Next.svg`} />
            </MP.SlideButton>
          </MP.Slider>
        </MP.BodyContainer>
      </body>
      <footer>
        <MP.Footer>
          <MP.Introduction>
            <div id="introduce">나의 별에게 보내는 편지</div>
            <img
              id="logo"
              src={`${process.env.PUBLIC_URL}/images/logo.png`}
              alt="logo"
            />
            <div id="team">멋쟁이사자처럼 동덕여자대학교 12기 효녀손팀</div>
            <div id="name">전지영, 하성언, 김하희, 김민주, 정세윤</div>
            <div id="sns">인스타 아이디</div>
          </MP.Introduction>
        </MP.Footer>
      </footer>
    </MP.Container>
  );
};

export default Managepet;