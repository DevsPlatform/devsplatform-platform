# DevsPlatform

> 비전공자를 위한 개발자 학습 플랫폼

## 프로젝트 소개

**DevsPlatform**은 비전공자들이 개발 공부 시 겪는 공식문서의 높은 진입장벽을 해소하고, 개발 학습을 지원하는 종합 플랫폼입니다.

### 해결하고자 하는 문제

- 공식문서가 너무 어렵고 전문적으로 작성되어 있음
- 기본 개념 설명 없이 바로 고급 내용으로 들어감
- 실무자 관점에서 작성되어 학습자 친화적이지 않음

### 우리의 해결책

- 공식문서와 개발서적을 쉽게 번역/해석하여 제공
- 기본 개념부터 숙련 개념까지 단계별 설명
- 학습자 중심의 직관적인 콘텐츠 구성

## 주요 기능

### Docs

- **공식문서 쉬운 해석**: MDN, React 공식문서 등을 비전공자도 이해할 수 있게 번역
- **GitHub 기반 협업**: MDN처럼 오픈소스 방식으로 누구나 기여 가능
- **단계별 학습**: 기본 → 심화 단계별 구성
- **빠른 검색**: 원하는 내용을 쉽게 찾을 수 있는 검색 시스템

### Community

- **질문과 답변**: 개발 관련 질문을 자유롭게 주고받는 공간
- **경험 공유**: 학습 과정, 프로젝트 경험, 취업 후기 등 공유
- **디시갤러리 스타일**: 익숙한 커뮤니티 형태로 편리한 소통

### Chat

- **실시간 소통**: 현재 접속한 개발자들과 실시간 채팅
- **코드 공유**: 코드를 실시간으로 공유하고 함께 디버깅
- **학습 그룹**: 같은 주제를 공부하는 사람들끼리 그룹 형성

### AI Assistant

- **맞춤형 답변**: 사이트 내 Docs를 학습한 전용 AI가 정확한 답변 제공
- **24시간 지원**: 언제든지 개발 관련 질문에 대한 즉각적인 도움
- **신뢰할 수 있는 정보**: 검증된 문서 기반으로 답변하여 높은 신뢰성

## 기술 스택

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

### Backend (예정)

- **Runtime**: Node.js
- **Database**: PostgreSQL / MongoDB
- **Real-time**: WebSocket
- **AI**: 자체 학습 모델

## 프로젝트 구조

```
devsplatform/
├── devsplatform-platform (메인 Next.js 프로젝트) ← 현재 레포
├── devsplatform-docs (Docs 콘텐츠 전용)
├── devsplatform-backend (백엔드 API)
└── devsplatform-ai (AI 모델)
```

## 특별한 점

### 자체 AI 모델

- OpenAI API가 아닌 사이트 전용 학습 모델 개발
- Docs 콘텐츠를 기반으로 한 신뢰할 수 있는 답변

### 오픈소스 협업

- GitHub을 통한 문서 기여 시스템
- 누구나 PR로 새로운 문서나 개선사항 제안 가능

### 초보자 중심

- 전문 용어 대신 쉬운 설명 우선
- 비전공자의 눈높이에 맞춘 콘텐츠

## 개발 로드맵

### Phase 1: 기반 구축 _현재 단계_

- [x] 프로젝트 기획 및 구조 설계
- [x] GitHub 조직 및 레포지토리 생성
- [ ] Next.js 15 프로젝트 초기 세팅
- [ ] 기본 라우팅 및 레이아웃 구성
- [ ] Tailwind CSS 디자인 시스템

### Phase 2: Docs 시스템

- [ ] GitHub 기반 문서 관리 시스템 구축
- [ ] Markdown 파싱 및 렌더링
- [ ] 검색 기능 구현
- [ ] 카테고리별 분류 시스템

### Phase 3: 사용자 시스템

- [ ] 회원가입/로그인 시스템
- [ ] 사용자 프로필 관리
- [ ] 권한 관리 시스템

### Phase 4: Community

- [ ] 게시판 CRUD 기능
- [ ] 댓글 및 대댓글 시스템
- [ ] 실시간 알림 시스템

### Phase 5: Chat

- [ ] WebSocket 기반 실시간 채팅
- [ ] 코드 공유 및 실행 환경
- [ ] 그룹 채팅 기능

### Phase 6: AI Assistant

- [ ] 자체 AI 모델 학습 및 배포
- [ ] 챗봇 UI 구현
- [ ] Docs 기반 질의응답 시스템

## 기여하기

이 프로젝트는 오픈소스로 진행되며, 모든 기여를 환영합니다!

### 기여 방법

1. 이슈 등록으로 버그 신고나 기능 제안
2. Fork 후 Pull Request로 코드 기여
3. 문서 개선 및 번역 기여 (추후 docs 레포에서)

### 개발 환경 설정

```bash
# 레포지토리 클론
git clone https://github.com/devsplatform/devsplatform-platform.git

# 의존성 설치
cd devsplatform-platform
npm install

# 개발 서버 실행
npm run dev
```

## 팀

- **Frontend**: [@YourUsername](https://github.com/YourUsername)
- **Backend**: [@BackendTeammate](https://github.com/BackendTeammate)

## 라이선스

이 프로젝트는 [MIT License](LICENSE) 하에 배포됩니다.

---

이 프로젝트가 도움이 되었다면 Star를 눌러주세요!

궁금한 점이 있으시면 [Issues](https://github.com/devsplatform/devsplatform-platform/issues)에서 언제든 질문해주세요.
