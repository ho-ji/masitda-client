# 🌐 맛있다(Masitda) 프론트엔드

<br>

🔗 [링크](https://masitda.netlify.app/)

- 테스트 ID: test001

- 비밀번호: test001!

<br>

## 기술스택

<div>
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/Styled Components-DB7093.svg?&style=for-the-badge&logo=styled-components&logoColor=white"/> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">  
  <img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white" /> 
  <img src="https://img.shields.io/badge/Netlify-00C7B7.svg?&style=for-the-badge&logo=netlify&logoColor=white"/>
</div>

<br>

## 구현 페이지

<details>

<summary><b>홈</b></summary>
<br>

- 베스트 상품과 MD PICK 상품이 각각 7개씩 노출

- "더보기" 버튼으로 전체 상품 페이지로 이동

- 모바일에서는 스크롤 이동 버튼 없이 드래그로 탐색, 리스트 양 끝에서는 이동 버튼 미노출

<br>
<img width="363" alt="home" src="https://github.com/user-attachments/assets/a6bf1f5e-00a0-45ac-9fd3-68b09cf6359f">
</details>
<details>

<summary><b>베스트상품</b></summary>
<br>

- 상품 판매 수량 상위 50위 리스트

- 사용자가 상품 주문 시, Product DB에서 sales count 증가

- grid 레이아웃으로 상품 정보는 최소 200px에서 페이지 크기에 맞춰 크기 변화

<br>
<img width="363" alt="best" src="https://github.com/user-attachments/assets/0c809e11-20a6-4fd9-b3d2-590a3bc56bec">
</details>

<details>

<summary><b>MD Pick</b></summary>
<br>

- MD Pick DB에 있는 20개의 상품 리스트

- grid 레이아웃으로 상품 정보는 최소 200px에서 페이지 크기에 맞춰 크기 변화

<br> 
<img width="363" alt="mdpick" src="https://github.com/user-attachments/assets/0b41ae03-04c2-4d1d-85e1-fc0c88a44d0f">
</details>

<details>

<summary><b>로그인</b></summary>
<br>

- 로그인 정보가 없는 경우에만 진입 가능. 로그인 상태에서는 이전 페이지로 이동
- 아이디와 비밀번호 입력 후, 잘못된 경우 상황에 맞는 alert 표시

  - 입력이 공란일 경우: 입력 요청 alert
  - 입력이 잘못된 경우: 비밀번호 입력 초기화 및 포커스
  - 올바른 경우: 마이페이지로 이동

- 아이디/비밀번호 찾기, 비회원 주문조회, 회원가입 페이지 이동 가능

<br>
<img width="363" alt="login" src="https://github.com/user-attachments/assets/728ec51c-260d-4399-842a-3ad56e855d6a">
</details>

<details>

<summary><b>회원가입</b></summary>
<br>

- 모든 회원정보가 올바르게 입력되면 회원가입 버튼 활성화
- 회원정보 입력이 올바르지 않을 경우, 빨강색으로 에러 표시
  - 중복된 아이디
  - 조건에 맞지 않는 입력
  - 공란

<br>
<img width="363" alt="signup" src="https://github.com/user-attachments/assets/69f3863f-d1f8-4181-a381-ef764e41f0df">
</details>
<details>

<summary><b>ID/PW찾기</b></summary>
<br>

- 아이디찾기와 비밀번호 재설정 탭 메뉴

- 아이디찾기는 이름과 이메일이 일치할 경우, 해당하는 아이디 제공

- 비밀번호 재설정은 아이디와 이메일이 일치할 경우, 해당 이메일로 10분간 유효한 비밀번호 재설정 링크를 발송

<br>
<img width="363" alt="findidpw" src="https://github.com/user-attachments/assets/3352a56b-5ee7-4c62-a2d0-a6befc53fdb2">
</details>

<details>

<summary><b>비밀번호 재설정</b></summary>
<br>

- 비밀번호 재설정을 위해 발송된 이메일을 통해 페이지 진입

- 서버 DB를 통해 링크의 유효성을 확인하여, 유효할 경우에만 비밀번호 재설정 가능

- 새 비밀번호와 비밀번호 확인을 옯바르게 입력했을 경우, 비밀번호 재설정 가능

- 비밀번호 재설정 후, 로그인 페이지로 이동

<br>
<img width="363" alt="passwordreset" src="https://github.com/user-attachments/assets/a57e0824-1e13-4b7b-b750-13c9e10a478b">
</details>

<details>

<summary><b>비회원 주문목록</b></summary>
<br>

- 비회원 주문 완료 후 받은 주문번호와 연락처를 통해 비회원 주문 목록 확인 가능

<br>
<img width="363" alt="guestorder" src="https://github.com/user-attachments/assets/2bc73ef7-9971-43ad-87e1-6589e8601ac7">
<img width="363" alt="guestorderlist" src="https://github.com/user-attachments/assets/cd088d94-f39a-44a4-afa8-ff48c824aaf1">

</details>

<details>

<summary><b>마이페이지</b></summary>
<br>

- 사용자 이름, 총 주문횟수, 최근 주문 상품 최대 3개 조회 가능

  - 최근 주문 상품이 없을 경우, '최근 구매한 상품이 없습니다' 안내 문구

- 회원정보 수정 및 주문목록 페이지로 이동 가능

<br>
<img width="363" alt="user" src="https://github.com/user-attachments/assets/50808d93-b7fc-44af-9787-4e1262673dd5">
</details>

<details>

<summary><b>회원정보 수정</b></summary>
<br>

- 보안을 위해 비밀번호 확인 후 회원정보 수정

- 비밀번호, 이메일, 연락처 수정 가능

<br>
<img width="363" alt="usermodify" src="https://github.com/user-attachments/assets/20554b50-5317-4854-bcc5-acf756c088c4">
<img width="363" alt="usermodify-2" src="https://github.com/user-attachments/assets/7c73c2f0-9a82-444e-bf81-fcb43456606a">
</details>

<details>

<summary><b>주문목록</b></summary>
<br>

- 사용자의 전체 주문목록을 표시

  - 주문한 상품이 없을 경우, '현재 구매하신 상품이 없습니다' 안내 문구 표시

- 주문일자별로 해당 일자의 주문 상품 정보 표시

- 추가적인 주문내역이 있을 경우, 무한 스크롤로 추가 주문내역 표시

<br>
<img width="363" alt="myoder" src="https://github.com/user-attachments/assets/9ed6b607-2dce-4e9f-b5e7-a8acb17bf5ac">
</details>

<details>

<summary><b>장바구니</b></summary>

- 장바구니 상품 정보 표시

  - 장바구니가 비어있을 경우, '장바구니가 비어 있습니다' 안내 문구 표시

- 장바구니 상품에 대한 전체선택, 선택삭제, 바로구매, 삭제, 구매하기, 수량 변경 가능
  - 상품수량: 장바구니에 담긴 상품 종류의 수
  - 전체선택: 장바구니에 담긴 모든 상품을 선택/비선택 변경
  - 선택삭제: 상품 중 선택 된 상품만 삭제
  - 수량변경: +/- 버튼을 통해 장바구니에 담긴 수량 변경 가능(최소수량 1)
  - 바로구매: 바로구매 시, 해당 상품만 구매하는 페이지로 이동(모바일 미노출)
  - 삭제하기: 해당 상품만 삭제(모바일 시, 이미지버튼)
  - 구매하기: 선택된 상품들을 구해하는 페이지로 이동
  - 계속 쇼핑하기: 홈화면으로 이동
- 장바구니 상품에 맞춰 총 금액, 배송비(3만원 미만인 경우 3,000원)이 계산되어 결제금액 변경

<br>

<br>
<img width="363" alt="cart" src="https://github.com/user-attachments/assets/b9df83c2-9a4e-476a-a8b2-578439d4f1fd">

</details>

<details>

<summary><b>주문/결제</b></summary>
<br>

- 배송지 정보를 입력하고, 구매하기 버튼 시 주문 완료

- 배송지명, 연락처, 배송지, 상세주소를 모두 입력해야함
  - 배송지 정보는 '검색' 버튼을 클릭 시, 다음주소API로 주소 검색

<br>
<img width="363" alt="order" src="https://github.com/user-attachments/assets/ca2cd896-53c3-4338-91a0-750394dff779">
</details>

<details>

<summary><b>주문완료</b></summary>
<br>

- 주문 수량과 홈화면 이동 버튼 표시

- 비회원 주문일 경우, 주문번호도 같이 표시

<br>
<img width="363" alt="ordersuccess" src="https://github.com/user-attachments/assets/a65f8fe7-dc65-4a0c-b3b1-6a4b9050269f">
</details>

<br>

<br>

## 추가 구현

- 스켈레톤 UX 및 로딩 컴포넌트
  - 상품 정보, 주문 목록 등 데이터가 로드되기 전에는 스켈레톤 UX가 보여지도록 구현
  - 로그인, 장바구니 추가, 회원가입 등 사용자의 서버 요청 결과가 로드되기 전에는 로딩 컴포넌트가 보여지도록 구현
- 에러 처리
  - 에러 발생 시, Error Boundary를 통해 처리
  - ErrorFallback 컴포넌트를 보여주고 사용자에게 서버에 오류가 발생하여 '다시 시도' 버튼을 통해 재시도를 하도록 구현

<br>

<br>
