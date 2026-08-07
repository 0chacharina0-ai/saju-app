/*
# AI 사주 리포트 로그 테이블

1. New Tables
- `ai_report_logs`: 엣지 함수 saju-ai 가 생성한 AI 리포트 결과를 서버 측에서 저장.
  - `id` (uuid, PK)
  - `mode` (text): 'MODE1_FULL' | 'MODE2_SUBSCRIPTION'
  - `payload` (jsonb): 요청에 담긴 내담자 정보
  - `result` (jsonb): AI 생성 결과 전체
  - `created_at` (timestamptz)

2. Security
- RLS 활성화.
- 단품·구독 서비스 모두 서버(service role)에서만 기록하고, 클라이언트는 직접 읽지 않으므로
  클라이언트(anon/authenticated)의 접근은 차단합니다 (정책 미부여 = deny-by-default).
  service role은 RLS를 우회하므로 엣지 함수에서 insert가 정상 동작합니다.
*/

CREATE TABLE IF NOT EXISTS ai_report_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mode text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  result jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE ai_report_logs ENABLE ROW LEVEL SECURITY;
