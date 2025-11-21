let posts = [
  {
    id: "1",
    name: "김사과",
    userid: "apple",
    text: "Node.js 배우는 중인데 Express 진짜 편하다! :로켓:",
    createdAt: Date.now().toString(),
    url: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: "2",
    name: "오렌지",
    userid: "orange",
    text: "오늘의 커피 :커피:️ + 코딩 = 최고의 조합!",
    createdAt: Date.now().toString(),
    url: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: "3",
    name: "이메론",
    userid: "melon",
    text: "Elasticsearch 연동 완료! 실시간 검색 API 짜릿해 :돋보기:",
    createdAt: Date.now().toString(),
    url: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: "4",
    name: "반하나",
    userid: "banana",
    text: "JavaScript 비동기 너무 어렵다... Promises, async/await, 뭐가 뭔지 :울음:",
    createdAt: Date.now().toString(),
    url: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    id: "5",
    name: "채리",
    userid: "cherry",
    text: "새 프로젝트 시작! Express + MongoDB + EJS 조합 좋아요 :전구:",
    createdAt: Date.now().toString(),
    url: "https://randomuser.me/api/portraits/women/29.jpg",
  },
];

// 모든 포스트를 리턴
export async function getAll() {
  return posts;
}

// 사용자 아이디(userid)에 대한 포스트를 리턴
export async function getAllByUserid(userid) {
  return posts.filter((post) => post.userid === userid); // 내가 받은 userid랑 사용자 userid가 같은지 확인
}

// 글 번호(id)에 대한 포스트를 리턴
export async function getById(id) {
  return posts.find((post) => post.id === id); // 모든 게시글 중에서 전달받은 id와 일치하는 게시글을 찾아 반환
}

// 포스트를 작성
// 새로운 게시글을 생성하여 목록의 맨 앞에 추가하고 반환
export async function create(userid, name, text) {
  const post = {
    id: Date.now().toString(), // 현재 시간을 기반으로 고유 ID 생성
    userid, // 게시글 작성자 ID (단축 속성)
    name, // 작성자 이름 (단축 속성)
    text, // 게시글 내용
    createdAt: Date.now().toString(), // 생성 시간(문자열)
  };

  // 새 게시글을 기존 게시글 배열 앞에 추가
  posts = [post, ...posts];

  return post;
}

// 포스트를 변경
export async function update(id, text) {
  const post = posts.find((post) => post.id === id);
  if (post) {
    post.text = text;
  }
  return post;
}

// 포스트를 삭제
export async function remove(id) {
  posts = posts.filter((post) => post.id !== id);
}
