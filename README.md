# JIRA 스프린트 이슈 조회 도구

JIRA REST API를 사용해서 현재 스프린트의 이슈 목록을 조회하는 TypeScript 프로그램입니다.

## 설치 및 설정

### 1. 의존성 설치
```bash
pnpm install
```

### 2. 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 정보를 입력하세요:

```env
# JIRA 접속 정보
JIRA_HOST=https://pgmworks.atlassian.net
JIRA_USERNAME=your-email@example.com
JIRA_API_TOKEN=your-api-token-here
JIRA_BOARD_ID=4

# 프로젝트 키 (선택사항)
JIRA_PROJECT_KEY=PPLSC
```

### 3. JIRA API 토큰 생성

1. [Atlassian API 토큰 페이지](https://id.atlassian.com/manage-profile/security/api-tokens)에 접속
2. "API 토큰 생성" 클릭
3. 토큰 이름 입력 (예: "Sprint Issue Tool")
4. 생성된 토큰을 `.env` 파일의 `JIRA_API_TOKEN`에 입력

## 사용법

### 프로그램 실행
```bash
pnpm start
```

## 기능

- 🔍 현재 활성 스프린트 자동 감지
- 📋 스프린트 이슈 목록 조회
- 📊 상태별/담당자별 통계 제공
- 🏷️ 이슈 정보 (제목, 담당자, 우선순위, 타입 등) 표시
- 🎯 스프린트 목표 및 기간 정보 표시

## API 엔드포인트

이 프로그램은 다음 JIRA REST API를 사용합니다:

1. **활성 스프린트 조회**: `/rest/agile/1.0/board/{boardId}/sprint?state=active`
2. **스프린트 이슈 조회**: `/rest/agile/1.0/sprint/{sprintId}/issue`
3. **JQL 검색 (대안)**: `/rest/api/2/search?jql=project = PPLSC AND sprint in openSprints()`

## 오류 해결

### 401 인증 오류
- JIRA_USERNAME과 JIRA_API_TOKEN이 올바른지 확인
- API 토큰이 만료되지 않았는지 확인

### 403 권한 오류
- 해당 프로젝트에 대한 조회 권한이 있는지 확인
- 보드에 대한 접근 권한이 있는지 확인

### 404 리소스 없음 오류
- JIRA_BOARD_ID가 올바른지 확인 (URL의 `/boards/4`에서 4)
- 프로젝트 키가 올바른지 확인

## 구조

```
src/
├── app.ts          # 메인 프로그램
├── interfaces/     # TypeScript 인터페이스
└── utils/         # 유틸리티 함수
```

## 출력 예시

```
🚀 JIRA REST API를 사용한 스프린트 이슈 조회를 시작합니다...

🔍 활성 스프린트를 검색 중...
✅ 1개의 활성 스프린트를 발견했습니다.
🎯 현재 스프린트: Sprint 23
📋 스프린트 23의 이슈 목록을 가져오는 중...
✅ 15개의 이슈를 발견했습니다.

================================================================================
📊 스프린트: Sprint 23
📅 기간: 2024/1/15 ~ 2024/1/29
🎯 목표: 사용자 인증 시스템 개선
📋 총 이슈 수: 15개
================================================================================

🏷️  진행 중 (5개)
------------------------------------------------------------
1. [PPLSC-123] 로그인 API 개선
   👤 담당자: 김개발
   🏷️  타입: Story | 우선순위: High
   📅 생성: 2024/1/10 | 수정: 2024/1/20

...

📈 상태별 통계:
   진행 중: 5개 (33.3%)
   할 일: 7개 (46.7%)
   완료: 3개 (20.0%)

👥 담당자별 통계:
   김개발: 6개
   이프론트: 4개
   박백엔드: 3개
   할당되지 않음: 2개
``` 