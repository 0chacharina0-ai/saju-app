# 프로젝트 요약: 운시엘 (Unsiel) — AI 사주 운세 서비스

## 1. 프로젝트 개요

**운시엘**은 AI가 오행(목화토금수)과 우주의 기운으로 풀어주는 한국 사주 운세 서비스입니다. 사용자가 이름·생년월일·출생시간을 입력하면 사주팔자를 계산하고, 무료 미리보기 후 결제를 거쳐 정밀 분석 리포트를 제공합니다.

- **브랜드명**: 운시엘 (Unsiel)
- **메타**: `운시엘 · AI 사주 운세 | 우주가 풀어주는 나의 사주패자`
- **언어**: 한국어 (`lang="ko"`)
- **빌드 도구**: v0.app 부트스트랩 → Next.js 16

---

## 2. 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Next.js 16.2.6 (App Router, webpack) |
| UI | React 19, Tailwind CSS 4, shadcn/ui, tw-animate-css |
| 애니메이션 | Framer Motion 12, 커스텀 CSS keyframes |
| 폰트 | Noto Sans KR, Space Grotesk, Pretendard Variable (CDN) |
| 사주 계산 | lunar-javascript (음양력 변환, 팔자, 대운, 세운) |
| 아이콘 | lucide-react |
| 백엔드 | Supabase (Postgres, RLS, Edge Functions) |
| AI | Anthropic Claude API (Edge Function 통해 호출) |
| 분석 | Vercel Analytics (production only) |
| 배포 | Netlify (`netlify.toml` 존재) |

---

## 3. 디자인 시스템

- **테마**: 다크 코스믹 HUD (Cockpit HUD 스타일)
- **베이스 컬러**: 딥 매트 블루 `#0B1021`
- **서피스**: 소프트 차콜 `#1E293B`
- **프라이머리**: 뮤트 사이언 (OKLCH)
- **액센트**: 소프트 슬레이트
- **오행 컬러**: 목(초록)·화(코랄)·토(앰버)·금(실버)·수(블루) — 각각 HUD 튜닝
- **그라데이션**: 보라-마젠타 → 사이언 (코스믹 테마, CSS 클래스: `text-destiny-gradient`, `btn-cosmic`, `aurora-*`)
- **애니메이션**: 별 반짝임(twinkle), 떠다님(float), 그라데이션 팬(gradient-pan), 매우 느린 회전(spin-very-slow)
- **한글 타이포**: Pretendard Variable, letter-spacing -0.018em (본문), -0.028em (제목), line-height 1.62 (본문), 1.24 (제목), `word-break: keep-all`
- **반경 시스템**: 1rem 기준, sm~4xl 스케일
- **배경 요소**: 별필드(StarField 컴포넌트), 라디얼 글로우 레이어, 오로라 효과

---

## 4. 핵심 사용자 플로우 (메인 페이지 `app/page.tsx`)

```
form → teaser (무료 미리보기) → pay (결제) → post-pay (시작 화면)
→ biorhythm (바이오리듬 퀴즈) → additional (추가 질문) → loading (4초) → result (정밀 리포트)
```

| 단계 | 컴포넌트 | 설명 |
|------|----------|------|
| form | `SajuForm` | 이름, 생년월일, 출생시간, 양력/음력, 성별 입력 |
| teaser | `SajuTeaser` | 무료 만세력 미리보기 (시차 보정 없이 표준시) |
| pay | — | 결제 (현재 mock) |
| post-pay | `PostPayStart` | 결제 완료 후 "시작하기" 화면 |
| biorhythm | `BiorhythmQuiz` | 7문항 성향 퀴즈 + 시지 경계선 질문 (표준시 vs 지방시 추천) |
| additional | `AdditionalQuestions` | 고민 영역, 연애 상태, 자유 질문 |
| loading | `LoadingScreen` | 4초 로딩 |
| result | `SajuResultView` | 정밀 분석 리포트 표시 |

### 시주 경계선 처리
- 출생 시간이 시지(2시간 단위) 경계(1,3,5,...,23시) 근처인지 판정
- 경계선 근처면 추가 질문(`BOUNDARY_QUESTIONS`)으로 표준시/지방시 결정
- `evaluateBoundaryAnswers()`로 local vs standard 추천

---

## 5. 사주 계산 엔진 (`lib/saju.ts`)

`lunar-javascript` 라이브러리 기반:

- **입력**: 연/월/일/시, 양력/음력/윤달, 도시별 시차(offsetMin), 성별
- **출력**:
  - 4주(연주·월주·일주·시주): 천간/지지 한자+한글, 오행, 동물, 십신, 납음, 순공
  - 오행 카운트 (목화토금수 8자 중 분포)
  - 합충 형해 원진 삼합 감지 (천간합/충, 지지육합/충/형/해, 삼합, 원진, 귀문관)
  - 대운(10년 주기) + 유년(년별) + 유월(월별) — 성별에 따른 순역행
  - 일간(Day Master), 우세/부족 오행, 태원·태식·명궁·신궁
  - 음력/양력 표시 문자열
- **한국 지역 데이터**: 37개 도시, 경도 기반 KST(135°E) 시차 (offsetMin = round((경도-135)*4))

---

## 6. 리포트 생성 (`lib/report-generator.ts`)

`generateDeepReport()` — 817줄 규모의 정밀 리포트 생성기:

- **일간 특성**: 10천간별 성격·강점·약점·연애·재물 성향
- **지지 동물 특성**: 12지지별 성향 묘사
- **신강/신약 판별**: 일간 비율에 따라 극왕~극약 5단계
- **용신 추정**: 일간 강약에 따른 용신/희신 오행
- **건강/재물/커리어/연애**: 오행별 맵핑된 분석
- **해결책**: 장소·음식·행동·사람 (오행별)
- **감성 훅**: 오행별 서사적 도입 문장
- **리포트 섹션 구조**: 단계별(title, subtitle, toc, keywords, score, intro, highlight, episodes, insights, innerVsOuter, microScenario, closing)
- **통합 솔루션(IntegratedSolution)**: 카테고리별 액션 아이템

---

## 7. 페이지 라우트 구조

| 경로 | 용도 |
|------|------|
| `/` | 메인 사주 플로우 |
| `/admin` | 관리자 대시보드 (결제 통계, 사용자) |
| `/checkout` | 결제 페이지 |
| `/compatibility` | 궁합 분석 |
| `/daily-fortune` | 데일리 운세 |
| `/free-tarot` | 무료 타로 |
| `/guide` | 사주 가이드 |
| `/mbti-saju` | MBTI × 사주 |
| `/mypage` | 마이페이지 |
| `/newyear-2027` | 2027 신년운세 |
| `/theme/career` | 커리어 테마 |
| `/theme/health` | 건강 테마 |
| `/theme/love` | 연애 테마 |
| `/theme/wealth` | 재물 테마 |
| `/privacy` | 개인정보처리방침 |
| `/terms` | 이용약관 |
| `/refund` | 환불정책 |
| `/support` | 고객지원 |

---

## 8. 컴포넌트 목록

### 메인 플로우
- `SajuHero` — 히어로 섹션
- `CosmicLanding` — 코스믹 랜딩 소개
- `SajuForm` — 사주 입력 폼
- `SajuTeaser` — 무료 미리보기
- `PostPayStart` — 결제 후 시작 화면
- `BiorhythmQuiz` — 바이오리듬 퀴즈
- `AdditionalQuestions` — 추가 질문
- `LoadingScreen` — 로딩 화면
- `SajuResultView` — 결과 리포트
- `StarField` — 별 배경

### 기능 페이지
- `CompatibilityForm` / `CompatibilityResult` — 궁합
- `NewyearForm` — 신년운세 입력
- `ThemeForm` — 테마별 입력
- `NineCosmicGuardians` — 9 우주 수호자
- `SajuGuide` — 사주 가이드
- `CheckoutLanding` — 결제 랜딩
- `Mypage` — 마이페이지
- `SupportCenter` — 고객지원

### 공통
- `SiteHeader` — 헤더 네비게이션
- `SiteFooter` — 푸터
- `LoadingSpinner` — 스피너
- `ui/button.tsx` — shadcn 버튼

---

## 9. 라이브러리 모듈 (`lib/`)

| 파일 | 용도 |
|------|------|
| `saju.ts` | 사주 계산 엔진 (lunar-javascript) |
| `report-generator.ts` | 정밀 리포트 생성 (817줄) |
| `mock-data.ts` | 결제/통계 mock 데이터 |
| `compatibility-report.ts` | 궁합 리포트 |
| `newyear-report.ts` | 신년운세 리포트 |
| `theme-report.ts` | 테마별 리포트 |
| `mbti-data.ts` | MBTI 데이터 |
| `faq-data.ts` | FAQ 데이터 |
| `saju-guide.ts` | 사주 가이드 콘텐츠 |
| `text-utils.ts` | 텍스트 유틸 |
| `utils.ts` | shadcn cn() 유틸 |

---

## 10. 데이터베이스 (Supabase)

### 마이그레이션
1. `20260730060106_cosmic_saju_schema.sql` — saju_records, payments 테이블
2. `20260804014955_create_ai_report_logs.sql.sql` — ai_report_logs 테이블

### 테이블

#### `saju_records`
- id (uuid PK), name, birth_year/month/day/hour, calendar, gender, city, city_offset_min, biorhythm_answers (int[]), time_correction_recommended, concern_area, love_status, free_question, saju_result (jsonb), created_at
- RLS: anon+authenticated 전체 CRUD (로그인 없는 단일 테넌트)
- 인덱스: created_at DESC

#### `payments`
- id (uuid PK), saju_record_id (FK), amount (기본 24,900원), original_amount (49,800원), status, payment_method, transaction_id, created_at, completed_at
- RLS: anon+authenticated 전체 CRUD
- 인덱스: status, saju_record_id, created_at DESC

#### `ai_report_logs`
- Edge Function 호출 로그 (mode, payload, result, created_at)

> **주의**: RLS가 `USING (true)` / `WITH CHECK (true)`로 전체 공개되어 있음 — 인증 없는 앱 구조이나, 필요시 보안 강화 검토 필요.

---

## 11. Edge Function: `saju-ai`

`supabase/functions/saju-ai/index.ts`

- **런타임**: Deno (Supabase Edge Function)
- **CORS**: 표준 헤더 세트 (OPTIONS 프리플라이트 처리)
- **AI 호출**: Anthropic Claude API (`claude-3-5-sonnet-20241022`)
- **환경변수**: `ANTHROPIC_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
- **모드**:
  - `MODE1_FULL`: 2026 병오년 신년운세 종합 + 1~12월 월별 캘린더 (단품 리포트)
  - `MODE2_SUBSCRIPTION`: 월 정기 구독 핀포인트 리포트 + 주간/데일리 푸시 (동적 서비스)
- **시스템 프롬프트**: 40년 경력 사주명리학 대가 페르소나, 감성적 서사, 전문용어 회피, "Insightful & Chic" 톤
- **페이로드**: name, gender, birthDate, birthTime, pillars, daewun, situation, targetMonth, targetDay
- **로깅**: 호출 결과를 `ai_report_logs` 테이블에 저장
- **폴백**: API 키 미설정 시 샘플 응답 반환

---

## 12. 결제 시스템

- **가격**: ₩24,900 (정가 ₩49,800, 50% 할인)
- **현재 상태**: Mock 데이터 (`lib/mock-data.ts`의 `saveSajuRecord`/`savePayment`는 no-op)
- **결제 상태**: pending / completed / failed / refunded
- **관리자 통계**: totalUsers 1,248 / totalRevenue ₩31,075,200 (mock)
- **Stripe**: 아직 연동되지 않음 (Stripe 스킬 필요 시 별도 설정)

---

## 13. 별도 서브프로젝트: `saju-app/`

`/saju-app/` 디렉토리에 별도 Vite + React + TypeScript 앱 존재:
- `src/App.tsx`, `src/components/` (DeepCards, FortuneHierarchy, PreviewSection, SajuPillar, Sinsang, ui)
- `src/data/sampleReport.ts`
- `src/lib/supabase.ts` (Supabase 클라이언트)
- 자체 Edge Function: `saju-app/supabase/functions/saju-ai/index.ts`
- Tailwind, PostCSS, OxLint 설정 포함

> 메인 Next.js 앱과는 독립적인 실험용/프로토타입 앱으로 보임.

---

## 14. 주요 기능 요약

1. **사주팔자 계산** — 4주(연월일시) 천간지지, 오행 분포, 일간 식별
2. **대운/세운/월운** — 10년 대운, 연별 유년, 월별 유월
3. **합충 형해 원진** — 천간합/충, 지지육합/충/형/해, 삼합, 원진, 귀문관 자동 감지
4. **시차 보정** — 한국 37개 도시 경도 기반 지방시, 표준시 선택
5. **바이오리듬 퀴즈** — 7문항 성향 분석 + 시지 경계선 질문
6. **AI 리포트** — Claude API 기반 신년운세, 월별 캘린더, 구독형 핀포인트
7. **정밀 리포트** — 오행별 건강/재물/커리어/연애 분석 + 해결책
8. **궁합 분석** — 두 사람 사주 비교
9. **신년운세** — 2027년 연간 운세
10. **테마별 분석** — 커리어/건강/연애/재물
11. **MBTI × 사주** — MBTI와 사주 연계
12. **관리자 대시보드** — 결제 통계, 사용자 관리
13. **무료 타로** — 별도 무료 서비스
14. **고객지원/FAQ** — 지원 센터

---

## 15. 현재 상태 및 참고사항

- 결제는 **mock 상태** (실제 결제 연동 필요 시 Stripe 설정)
- `ANTHROPIC_API_KEY` Edge Function 시크릿 설정 필요 (미설정 시 폴백 응답)
- RLS가 전체 공개(`USING true`)로 설정 — 인증 없는 구조이나 보안 검토 권장
- `saju-app/`은 별도 서브프로젝트 (메인 앱과 독립)
- Git 저장소 아님 (현재 디렉토리 기준)
- v0.app 연동 프로젝트 (`prj_yZtytXwrBrwHGAk2MrYXlZuJrG5n`)
