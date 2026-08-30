import type { ReportData } from '../types'

export const sampleReport: ReportData = {
  id: 'sample-001',
  name: '김OO',
  gender: 'female',
  birthDate: '1992-03-15',
  birthTime: '14:30',
  solarTimeAdjust: '표준시와 태양시 시차 -32분을 정밀 보정한 진짜 명식',
  dayMaster: '갑목(큰 나무의 기운)',
  dayMasterExplain:
    '태어난 날의 기운이 바르고 곧은 큰 나무입니다. 성장하려는 힘이 강하고, 한 번 마음먹은 일은 끝까지 밀고 나가는 추진력이 뛰어납니다. 다만 그만큼 고집이 세고, 유연하게 양보하는 일이 조금 어렵습니다.',
  pillars: [
    {
      position: '연주',
      heavenlyStem: '임수',
      earthlyBranch: '신(원숭이)',
      stemMeaning: '큰 바다·강물처럼 넓고 깊은 지혜의 기운',
      branchMeaning: '빠르고 임기응변에 강한 움직임의 자리',
      hiddenStems: ['경금', '임수', '무토'],
    },
    {
      position: '월주',
      heavenlyStem: '계수',
      earthlyBranch: '묘(토끼)',
      stemMeaning: '이슬·비처럼 부드럽고 섬세한 수용의 기운',
      branchMeaning: '따뜻하고 예민한 초봄의 자리',
      hiddenStems: ['을목'],
    },
    {
      position: '일주',
      heavenlyStem: '갑목',
      earthlyBranch: '인(호랑이)',
      stemMeaning: '바르고 곧은 큰 나무의 기운 (나 자신)',
      branchMeaning: '힘차게 뻗어나가는 새봄의 자리',
      hiddenStems: ['갑목', '병화', '무토'],
    },
    {
      position: '시주',
      heavenlyStem: '신금',
      earthlyBranch: '미(양)',
      stemMeaning: '단정하고 결정력 있는 칼·보석의 기운',
      branchMeaning: '늦여름의 무르익음과 저장의 자리',
      hiddenStems: ['기토', '정화', '을목'],
    },
  ],
  elementBalance: [
    { element: '목(나무)', count: 3, ratio: 0.3 },
    { element: '화(불)', count: 1, ratio: 0.1 },
    { element: '토(흙)', count: 2, ratio: 0.2 },
    { element: '금(쇠)', count: 2, ratio: 0.2 },
    { element: '수(물)', count: 2, ratio: 0.2 },
  ],
  sinsang: [
    {
      key: 'cheon-gan-chung',
      name: '천간충',
      category: '충',
      plainExplain: '위쪽 글자 두 개가 서로 부딪히는 형태입니다.',
      lifeEffect:
        '겉으로 드러난 일이나 관계에 급격한 변화가 올 수 있습니다. 이직, 이사, 관계의 전환이 잦은 편이지만 변화 속에서 새 길이 열리는 힘도 강합니다.',
    },
    {
      key: 'ji-ji-samhab',
      name: '지지삼합',
      category: '합',
      plainExplain: '아래쪽 글자 세 개가 힘을 합쳐 한 덩어리를 이룹니다.',
      lifeEffect:
        '사람을 모으고 관계를 넓히는 힘이 큽니다. 조직이나 공동체에서 든든한 연대를 만들고, 뜻이 맞는 사람들과 오래 협력하는 운이 깔려 있습니다.',
    },
    {
      key: 'ji-ji-hyeong',
      name: '지지형',
      category: '형',
      plainExplain: '아래쪽 글자들이 서로 부대끼고 긁히는 형태입니다.',
      lifeEffect:
        '가까운 사람과 마찰이나 오해가 생기기 쉽습니다. 말실수를 줄이고, 중요한 결정은 감정이 아닌 이성으로 내리면 상처를 크게 줄일 수 있습니다.',
    },
    {
      key: 'won-jin',
      name: '원진',
      category: '원진',
      plainExplain: '서로 마음에 들지 않아 은근히 부대끼는 자리입니다.',
      lifeEffect:
        '정이 많은 만큼 서운함도 커지기 쉽습니다. 가까운 관계일수록 기대를 조금 내려놓고, 거리감을 지키며 관계를 관리하는 것이 마음 편한 길입니다.',
    },
  ],
  personaShadow: {
    persona:
      '밖에서는 단정하고 책임감 강한 사람으로 보입니다. 맡은 일을 끝까지 해내고, 체면과 예의를 중시합니다. 누구에게나 친절하지만 감정을 잘 드러내지 않아 단단해 보입니다.',
    shadow:
      '혼자 있을 때는 생각이 많고 완벽주의가 강해집니다. 해야 할 일을 미루면서 자책하고, 타인의 시선을 과도하게 의식해 스스로를 옥죄는 경향이 있습니다.',
    summary:
      '겉으로는 흔들림 없는 사람이지만, 안에서는 인정받고 싶은 욕구와 자유롭고 싶은 마음이 줄다리기를 합니다. 이 긴장을 아는 것이 관계와 커리어의 열쇠입니다.',
  },
  love: {
    instinctType: '눈빛이 강하고 리드하는 사람',
    instinctDesc:
      '본능적으로는 자신감 넘치고 이끌어 주는 사람에게 끌립니다. 강한 카리스마와 확신 있는 말투에 마음이 기웁니다.',
    synergyType: '말을 잘 들어주고 안정감을 주는 사람',
    synergyDesc:
      '실제로 만나 보면, 내 이야기를 끝까지 들어주고 감정을 수용해 주는 따뜻한 사람에서 시너지가 납니다. 안정감과 신뢰가 관계를 오래 지속시킵니다.',
    timingNarrative:
      '인연의 물결이 가장 또렷해지는 시기는 20대 후반에서 30대 중반, 그리고 30대 후반의 두 번째 물결입니다. 20대 후반에는 만남의 기회가 많고, 30대 중반 이후에는 관계를 책임지는 성숙함이 생겨 진지한 인연이 자리 잡기 좋습니다.',
    marriageWindow:
      '결혼 적령기로는 28~34세가 가장 안정적입니다. 40대 초반에는 새로운 인연보다 기존 관계를 굳히는 방향이 유리합니다. 20대 초반의 인연은 배우기 위한 과정일 확률이 높고, 40대 이후의 새 출발은 신중한 조건 확인이 필요합니다.',
  },
  career: {
    organization: 45,
    independent: 55,
    organizationDesc:
      '조직 안에서는 기획과 추진을 맡는 역할이 잘 맞습니다. 책임을 다하는 만큼 인정받지만, 융통성이 부족한 상사와 마찰이 날 수 있습니다.',
    independentDesc:
      '독립·프리랜스·창업의 기운이 조금 더 강합니다. 자기 주도로 일하는 환경에서 추진력과 끈기가 빛을 발합니다.',
    recommendation:
      '초기에는 조직에서 실무와 인맥을 쌓고, 30대 중반 이후 독립 또는 부업 창업으로 방향을 넓히는 것이 가장 이상적입니다.',
  },
  family: {
    parentDistance:
      '연주(부모·조상 자리)와 일주(나 자신)의 오행 관계를 통해 본 부모와의 심리적 거리감, 정서적 지원 유무, 그리고 건강한 독립 타이밍을 분석합니다.',
    emotionalSupport:
      '부모의 기운이 물(수)로 흘러나와 나의 나무(목)를 길러 주는 형태입니다. 정서적 지원이 깊은 편이나, 과보호로 인해 심리적 거리감이 애매하게 느껴질 수 있습니다.',
    independenceTiming:
      '경제적·정서적 독립은 20대 후반 이후로 잡는 것이 건강합니다. 부모의 의견과 나의 선택 사이에서 경계를 또렷이 세울수록 관계가 오히려 안정됩니다.',
  },
  daewun: [
    {
      ageRange: '24~33세',
      stemBranch: '갑인',
      title: '뿌리를 내리고 힘을 키우는 시기',
      narrative:
        '스스로를 단단하게 세우는 10년입니다. 일의 기반을 다지고, 나만의 전문성을 만드는 데 집중하세요. 빠른 성과보다는 탄탄한 기초가 이 시기의 진짜 성과입니다.',
    },
    {
      ageRange: '34~43세',
      stemBranch: '을묘',
      title: '가지를 뻗고 세력을 넓히는 시기',
      narrative:
        '쌓아 둔 기반을 바탕으로 영향력을 넓히는 시기입니다. 직장에서 책임 있는 자리를 맡거나, 독립·창업을 시도하기 좋습니다. 사람을 모으는 일에 에너지를 쓰세요.',
    },
    {
      ageRange: '44~53세',
      stemBranch: '병진',
      title: '꽃을 피우고 결실을 맺는 시기',
      narrative:
        '그동안 키워 온 일이 겉으로 드러나는 시기입니다. 명성과 실적이 따르나, 그만큼 책임과 스트레스도 큽니다. 건강 관리와 손익의 균형이 이 시기의 핵심입니다.',
    },
  ],
  yearFortunes: [
    {
      year: 2025,
      stemBranch: '을사',
      title: '껍질을 벗고 준비하는 해',
      summary:
        '내실을 다지고 다음 도약을 준비하는 해입니다. 겉으로 드러난 성과보다 보이지 않는 기반이 중요합니다.',
      keyword: '내실, 정리, 전환 준비',
      love: '관계의 기준을 다시 점검하는 시기입니다. 옅은 인연은 정리되고, 진짜 인연은 윤곽이 잡힙니다.',
      career: '업무 범위가 넓어지지만, 한 번에 성과를 내기는 어렵습니다. 작은 성공을 모아 두세요.',
      wealth: '큰 지출보다 꾸준히 모으는 것이 유리한 해입니다. 투자는 보수적으로 접근하세요.',
      health: '소화기와 피로가 누적되기 쉽습니다. 규칙적인 식사와 수면이 보약입니다.',
    },
    {
      year: 2026,
      stemBranch: '병오',
      title: '빛을 발하고 도약하는 해',
      summary:
        '2026년은 태양의 기운을 받아 그동안 준비한 일이 빛을 발하는 해입니다. 용기 있게 나서면 큰 성과로 이어집니다.',
      keyword: '도약, 인정, 가시화',
      love: '감정이 활짝 열리는 해입니다. 새로운 인연이 들어오거나, 기존 관계가 한 단계 깊어집니다.',
      career: '주목받는 자리가 늘고, 승진·이직·독립의 기회가 겹칩니다. 자신감을 갖고 앞에 서세요.',
      wealth: '활동량이 늘며 수입도 커지지만, 과신은 금물입니다. 수익의 일부는 안전 자산으로 분리하세요.',
      health: '에너지가 넘치지만 심장과 혈압 관리가 필요합니다. 무리한 일정은 피하세요.',
    },
    {
      year: 2027,
      stemBranch: '정미',
      title: '결실을 거두고 갈무리하는 해',
      summary:
        '2027년은 수확의 기운이 강하지만, 동시에 다음 단계를 위해 에너지를 비축해야 하는 해입니다.',
      keyword: '수확, 갈무리, 다음 설계',
      love: '관계의 현실적 조건이 중요해지는 시기입니다. 감정만으로는 유지하기 어렵고, 신뢰와 책임이 시험받습니다.',
      career: '성과를 인정받는 한 해이나, 자리를 옮기기보다 현재 자리에서 영향력을 굳히는 것이 유리합니다.',
      wealth: '수익이 안정되지만, 늘어난 만큼 지출도 커집니다. 미래를 위한 적립을 우선하세요.',
      health: '피부와 호흡기가 예민해집니다. 환기와 수분 섭취를 챙기세요.',
    },
  ],
  monthFortunes: [
    {
      month: 1,
      title: '새 해의 첫 단추',
      summary: '계획을 세우고 인맥을 정리하는 달입니다. 무리한 시작보다 점검이 먼저입니다.',
      luckyColor: '따뜻한 베이지',
      avoidAction: '서두른 약속과 과한 공약',
      career: '연초 기획에 참여할 기회가 생깁니다. 의견을 문서로 정리해 두세요.',
      wealth: '작은 지출이 모이는 달입니다. 고정비를 점검하세요.',
      relationship: '오랜 지인의 연락이 도움이 됩니다.',
      health: '수면 부족이 누적됩니다. 밤 11시 이전 취칥을 목표로 하세요.',
      opportunityDays: [
        { day: 8, guide: '계약서 검토와 서명에 유리한 날' },
        { day: 15, guide: '새 미팅·제안을 넣기 좋은 날' },
        { day: 23, guide: '이직 관련 면접·정보 수집에 좋은 날' },
      ],
      cautionDays: [
        { day: 4, guide: '감정적 지출을 줄여야 하는 날' },
        { day: 12, guide: '상사와 마찰이 생기기 쉬운 날' },
        { day: 27, guide: '서두른 약속은 나중에 후회하는 날' },
      ],
    },
    {
      month: 2,
      title: '관계의 물결',
      summary: '인연이 들어오고 나가는 달입니다. 새 사람보다 기존 사람을 챙기는 것이 유리합니다.',
      luckyColor: '파스텔 핑크',
      avoidAction: '충동적인 고백과 이별 통보',
      career: '협업이 잦아집니다. 문서와 역할을 명확히 하세요.',
      wealth: '경조사비가 늘어납니다. 예산을 따로 빼 두세요.',
      relationship: '오해가 생기기 쉬운 달입니다. 있는 그대로 말하세요.',
      health: '피로가 호르몬 균형을 흔듭니다. 가벼운 산책이 좋습니다.',
      opportunityDays: [
        { day: 7, guide: '오랜 인연 다시 연결하기 좋은 날' },
        { day: 18, guide: '공동 프로젝트 제안에 유리한 날' },
        { day: 26, guide: '감정을 나누고 오해를 푸는 날' },
      ],
      cautionDays: [
        { day: 3, guide: '충동적 고백은 자제해야 하는 날' },
        { day: 11, guide: '말실수가 구설수로 번지는 날' },
        { day: 22, guide: '약속을 한 번에 여러 개 잡지 마세요' },
      ],
    },
    {
      month: 3,
      title: '봄의 기운, 움직임',
      summary: '활동량이 늘고 기회가 겹치는 달입니다. 우선순위를 명확히 해야 성과가 남니다.',
      luckyColor: '연두색',
      avoidAction: '여러 일을 동시에 벌이기',
      career: '제안과 기회가 몰려옵니다. 가장 큰 것 하나에 집중하세요.',
      wealth: '부수입의 가능성이 있으나, 바로 재투자하지 마세요.',
      relationship: '새로운 만남보다 기존 관계에 집중할 때 더 안정됩니다.',
      health: '알레르기와 피로가 겹칩니다. 외출 후 샤워를 챙기세요.',
      opportunityDays: [
        { day: 6, guide: '계약·서명에 가장 좋은 날' },
        { day: 14, guide: '프레젠테이션·발표에 유리한 날' },
        { day: 28, guide: '이직 최종 결정을 내리기 좋은 날' },
      ],
      cautionDays: [
        { day: 5, guide: '과음·과식이 탈을 부르는 날' },
        { day: 19, guide: '문서 오류가 생기기 쉬운 날' },
        { day: 30, guide: '감정적 지출을 경계하는 날' },
      ],
    },
    {
      month: 4,
      title: '정체와 돌파',
      summary: '잠시 멈춤이 필요한 달입니다. 강행보다 우회가 빠릅니다.',
      luckyColor: '차분한 네이비',
      avoidAction: '억지로 일을 강행하기',
      career: '진척이 느린 시기입니다. 기반 점검에 시간을 쓰세요.',
      wealth: '큰 지출을 피하세요. 점검과 정리가 먼저입니다.',
      relationship: '혼자만의 시간이 필요한 달입니다. 거리감이 나쁜 것이 아닙니다.',
      health: '소화기가 예민합니다. 자극적인 음식을 줄이세요.',
      opportunityDays: [
        { day: 9, guide: '내부 점검·정리에 좋은 날' },
        { day: 17, guide: '스킬·학습 투자에 유리한 날' },
        { day: 25, guide: '조용한 자리에서 인연이 생기는 날' },
      ],
      cautionDays: [
        { day: 2, guide: '억지 추진이 역효과를 부르는 날' },
        { day: 13, guide: '상사와 충돌하기 쉬운 날' },
        { day: 21, guide: '과도한 약속은 피해야 하는 날' },
      ],
    },
    {
      month: 5,
      title: '가시화의 달',
      summary: '그동안 준비한 일이 겉으로 드러나는 달입니다. 용기 있게 앞에 서세요.',
      luckyColor: '선명한 레드',
      avoidAction: '주목받는 순간에 움츠러들기',
      career: '발표·제안·승진 관련 기회가 큽니다. 자신감을 보이세요.',
      wealth: '수익과 지출이 함께 늘어납니다. 비율을 관리하세요.',
      relationship: '나를 알아주는 사람이 가까워집니다. 솔직해지세요.',
      health: '심장·혈압 관리가 필요합니다. 카페인을 줄이세요.',
      opportunityDays: [
        { day: 5, guide: '대중 앞 발표·제안에 가장 좋은 날' },
        { day: 16, guide: '승진·이직 면접에 유리한 날' },
        { day: 24, guide: '공식 자리에서 인정받는 날' },
      ],
      cautionDays: [
        { day: 8, guide: '과도한 자신감이 화를 부르는 날' },
        { day: 18, guide: '말실수가 평판을 흔드는 날' },
        { day: 29, guide: '감정적 지출을 경계하는 날' },
      ],
    },
    {
      month: 6,
      title: '관계의 환기',
      summary: '사람과 사람 사이에서 균형을 잡는 달입니다. 부탁을 거절하는 연습이 필요합니다.',
      luckyColor: '맑은 하늘색',
      avoidAction: '모든 부탁을 다 받아주기',
      career: '협업과 조율이 많습니다. 역할을 문서로 정하세요.',
      wealth: '경조사·선물 지출이 큽니다. 예산 한도를 정하세요.',
      relationship: '거절하는 법을 익히면 관계가 오히려 건강해집니다.',
      health: '수면과 수분을 챙기세요. 수면 부족이 감정을 흔듭니다.',
      opportunityDays: [
        { day: 11, guide: '협상·조율에 유리한 날' },
        { day: 19, guide: '새 협력자를 만나기 좋은 날' },
        { day: 27, guide: '오해를 풀고 관계를 굳히는 날' },
      ],
      cautionDays: [
        { day: 4, guide: '부탁을 무조건 받지 마세요' },
        { day: 15, guide: '뒷담화가 구설수로 번지는 날' },
        { day: 23, guide: '과음·과식을 피하는 날' },
      ],
    },
    {
      month: 7,
      title: '에너지 조절',
      summary: '무더위와 함께 체력이 강조되는 달입니다. 페이스 조절이 성과를 결정합니다.',
      luckyColor: '시원한 민트',
      avoidAction: '무리한 야근과 외출',
      career: '한낮의 집중력이 떨어집니다. 오전에 핵심 일을 끝내세요.',
      wealth: '여가·휴가 지출이 큽니다. 즐기되 한도를 정하세요.',
      relationship: '짧은 여행이 관계에 환기를 줍니다.',
      health: '수분과 전해질을 챙기세요. 식중독을 조심하세요.',
      opportunityDays: [
        { day: 3, guide: '오전 집중 업무에 가장 좋은 날' },
        { day: 21, guide: '짧은 휴가·재충전에 유리한 날' },
        { day: 30, guide: '휴가 후 일정 정리에 좋은 날' },
      ],
      cautionDays: [
        { day: 7, guide: '무리한 야근이 컨디션을 무너뜨리는 날' },
        { day: 16, guide: '외식 중 체하기 쉬운 날' },
        { day: 25, guide: '감정적 지출을 줄이는 날' },
      ],
    },
    {
      month: 8,
      title: '수확의 전조',
      summary: '결실이 잡히기 시작하는 달입니다. 마무리에 집중하면 가을에 빛을 봅니다.',
      luckyColor: '골든 옐로',
      avoidAction: '새 일을 벌이기',
      career: '진행 중인 일을 마무리하세요. 새 시작은 가을로 미루세요.',
      wealth: '수익이 안정됩니다. 일부는 저축으로 분리하세요.',
      relationship: '진지한 대화가 관계를 한 단계 높입니다.',
      health: '피로가 누적됩니다. 주말에 푹 쉬세요.',
      opportunityDays: [
        { day: 6, guide: '마무리·결재에 유리한 날' },
        { day: 17, guide: '진지한 관계 대화에 좋은 날' },
        { day: 29, guide: '수익 정리·적립에 좋은 날' },
      ],
      cautionDays: [
        { day: 10, guide: '새 일을 벌이면 흐름이 흐트러지는 날' },
        { day: 22, guide: '약속을 한꺼번에 잡지 마세요' },
        { day: 31, guide: '감정 소모가 큰 날' },
      ],
    },
    {
      month: 9,
      title: '결실의 달',
      summary: '그동안 키워 온 일이 결과로 나타나는 달입니다. 수확과 갈무리를 함께 하세요.',
      luckyColor: '따뜻한 브라운',
      avoidAction: '수확을 전부 소비하기',
      career: '실적이 인정받는 달입니다. 다음 분기 설계도 함께 하세요.',
      wealth: '수익이 큽니다. 일부는 안전 자산으로 챙기세요.',
      relationship: '신뢰가 관계의 결실로 이어집니다.',
      health: '환절기 건강을 챙기세요. 감기 예방이 우선입니다.',
      opportunityDays: [
        { day: 4, guide: '실적 발표·보고에 가장 좋은 날' },
        { day: 18, guide: '다음 분기 계약에 유리한 날' },
        { day: 26, guide: '재물 정리·자산 배분에 좋은 날' },
      ],
      cautionDays: [
        { day: 9, guide: '과신이 실수를 부르는 날' },
        { day: 20, guide: '말실수가 평판을 흔드는 날' },
        { day: 28, guide: '과도한 경조사비를 조심하는 날' },
      ],
    },
    {
      month: 10,
      title: '균형과 조율',
      summary: '일과 관계의 균형이 시험받는 달입니다. 양보가 더 큰 결과를 가져옵니다.',
      luckyColor: '은은한 버건디',
      avoidAction: '자기 주장만 고집하기',
      career: '이해관계가 엇갈립니다. 한 발 양보가 해법입니다.',
      wealth: '지출을 점검하세요. 불필요한 고정비를 줄이세요.',
      relationship: '타인의 입장을 먼저 들으면 관계가 부드러워집니다.',
      health: '건강 검진을 챙기기 좋은 달입니다.',
      opportunityDays: [
        { day: 8, guide: '협상·조율에 유리한 날' },
        { day: 20, guide: '건강 검진 예약에 좋은 날' },
        { day: 30, guide: '지출 점검·재설계에 좋은 날' },
      ],
      cautionDays: [
        { day: 3, guide: '고집이 관계를 굳히는 날' },
        { day: 14, guide: '뒷담화가 구설수로 번지는 날' },
        { day: 25, guide: '충동 구매를 경계하는 날' },
      ],
    },
    {
      month: 11,
      title: '내실과 반성',
      summary: '한 해를 되돌아보고 다음 해를 설계하는 달입니다. 정리가 힘이 됩니다.',
      luckyColor: '차분한 슬레이트',
      avoidAction: '새 일을 무리하게 시작하기',
      career: '연말 정산과 실적 점검에 집중하세요.',
      wealth: '연말 지출을 통제하세요. 예산을 미리 정하세요.',
      relationship: '진심을 나누면 관계가 깊어집니다.',
      health: '수면과 체온 관리가 중요합니다.',
      opportunityDays: [
        { day: 7, guide: '연말 정산·점검에 유리한 날' },
        { day: 18, guide: '내년 설계에 좋은 날' },
        { day: 27, guide: '진심 어린 대화에 좋은 날' },
      ],
      cautionDays: [
        { day: 5, guide: '새 일을 무리하게 벌이는 날' },
        { day: 16, guide: '연말 과소비를 경계하는 날' },
        { day: 24, guide: '피로 누적을 조심하는 날' },
      ],
    },
    {
      month: 12,
      title: '매듭과 새 출발',
      summary: '한 해를 매듭짓고 다음 해의 씨앗을 심는 달입니다. 끝맺음이 곧 시작입니다.',
      luckyColor: '따뜻한 골드',
      avoidAction: '끝맺음을 미루기',
      career: '마무리와 인사 나눔이 다음 해의 인맥이 됩니다.',
      wealth: '남은 예산을 정리하고 내년 예산을 세우세요.',
      relationship: '감사 인사를 전하면 관계가 내년으로 이어집니다.',
      health: '연말 피로를 풀고 푹 쉬세요.',
      opportunityDays: [
        { day: 5, guide: '매듭·보고에 가장 좋은 날' },
        { day: 19, guide: '내년 목표 설정에 유리한 날' },
        { day: 28, guide: '감사 인사·인맥 정리에 좋은 날' },
      ],
      cautionDays: [
        { day: 11, guide: '끝맺음을 미루면 손해가 큰 날' },
        { day: 22, guide: '연말 과음·과소비를 경계하는 날' },
        { day: 31, guide: '피로 누적을 조심하는 날' },
      ],
    },
  ],
  topActionMonths: [3, 5, 9],
  topCautionMonths: [4, 10, 7],
}
