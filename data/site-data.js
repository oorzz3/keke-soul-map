window.KekeSoulData = {
  siteMeta: {
    appName: "科科命理宇宙站",
    version: "v0.7.4",
    dataVersion: "v0.2",
    cacheVersion: "v0.7.4",
    status: "姓名學筆畫規則邊界 × 資料表規格文件",
    updatedNote: "v0.7.4 新增 NAME_STROKE_RULES_SPEC.md，鎖定姓名學筆畫規則、資料表欄位、授權來源、fallback、測試案例與未來版本邊界；本版不新增姓名學 calculator、不新增姓名學 meaning data、不改首頁 UI，也不將姓名學標示為 calculated。"
  },
  versionPolicy: {
    productVersion: "v0.7.4",
    cacheVersion: "v0.7.4",
    dataVersion: "v0.2",
    note: "productVersion 對應網站功能封章，cacheVersion 用於 GitHub Pages 靜態資源快取，dataVersion 對應資料層結構。"
  },
  routeMeta: {
    enabled: true,
    mode: "hash",
    currentVersion: "v0.7.4",
    homeRoutes: ["#/", "#/dashboard"],
    detailPrefix: "#/module/",
    note: "v0.7.4 保留 hash router、dashboard zone、五大核心詳情頁、流年 / 九運詳情頁與後半段模組；本版只新增姓名學筆畫規則與資料表規格文件，不新增姓名學 calculator 或 meaning data。"
  },
  dashboardLayout: {
    mode: "core-input-schema-lock",
    version: "v0.7.4",
    heroBand: "dashboard-hero-band",
    coreGrid: "dashboard-core-grid",
    rhythmRow: "dashboard-rhythm-row",
    supportStrip: "dashboard-support-strip",
    bottomInsightStrip: "bottomInsightStrip",
    rule: "首頁只顯示濃縮摘要；首頁以命盤核心為主，農民曆與神明生日只保留短摘要。",
    density: "production dashboard compact",
    note: "v0.7.4 保留 hero band、core grid、rhythm row、support strip 與 bottom insight strip，不重排首頁；本版只補姓名學規則邊界文件與 metadata。"
  },
  coreInputProfile: {
    ownerLabel: "科科",
    dataStatus: "seed",
    privacyMode: "local-static",
    source: "manual seed",
    updatedAt: "2026-07-01",
    personal: {
      displayName: "科科",
      givenName: "科",
      familyName: "",
      fullName: "科科",
      gender: "male",
      note: "目前為本機靜態 seed 資料，不含正式會員或資料庫儲存。"
    },
    birth: {
      solarDate: "1990-06-09",
      solarDateDisplay: "1990/06/09",
      birthTimeLabel: "午時",
      birthTimeRange: "11:00-13:00",
      birthHour24: 11,
      birthMinute: 0,
      timeAccuracy: "range",
      timezone: "Asia/Taipei",
      calendarType: "solar",
      lunarDate: null,
      lunarDateStatus: "future",
      locationLabel: "Taiwan",
      latitude: null,
      longitude: null,
      locationAccuracy: "country"
    },
    calculationReadiness: {
      numerology: "ready",
      name: "partial",
      bazi: "partial",
      ziwei: "partial",
      astrology: "partial"
    }
  },
  coreInputSchema: {
    version: "v0.7.4",
    purpose: "五大核心命盤運算前置欄位鎖定",
    sharedFields: [
      "displayName",
      "fullName",
      "gender",
      "solarDate",
      "birthTimeLabel",
      "birthTimeRange",
      "timezone",
      "calendarType",
      "locationLabel"
    ],
    optionalFields: [
      "birthHour24",
      "birthMinute",
      "lunarDate",
      "latitude",
      "longitude"
    ],
    privacyLines: [
      "本版僅使用靜態 seed 資料。",
      "本版不儲存使用者個資。",
      "本版不提供登入、會員或雲端同步。",
      "未來若加入表單，需另開資料安全線。"
    ]
  },
  coreCalculationRequirements: {
    numerology: {
      label: "生命靈數",
      status: "ready",
      calculationStatus: "calculated",
      requiredFields: ["solarDate"],
      optionalFields: ["displayName"],
      nextStep: "已完成生命靈數 1～9 化簡計算與靜態解讀資料層；後續可評估 master number 模式或更細緻的解讀資料。",
      blockedBy: []
    },
    name: {
      label: "姓名學",
      status: "partial",
      requiredFields: ["fullName"],
      optionalFields: ["familyName", "givenName", "gender"],
      nextStep: "v0.7.4 已新增姓名學筆畫規則與資料表規格文件；後續需先決定筆畫來源、規則版本與資料授權，仍不可宣稱正式計算。",
      blockedBy: [
        "strokeTable",
        "strokeSourceLicense",
        "strokeRuleVersion",
        "traditionalSimplifiedPolicy",
        "variantCharacterPolicy",
        "missingCharacterFallback",
        "fiveGridAlgorithmVersion",
        "compoundSurnamePolicy"
      ]
    },
    bazi: {
      label: "八字四柱",
      status: "partial",
      requiredFields: ["solarDate", "birthTimeRange", "timezone"],
      optionalFields: ["locationLabel"],
      nextStep: "需確認節氣換算、日柱計算與時辰規則。",
      blockedBy: ["solarTermEngine", "dayPillarAlgorithm"]
    },
    ziwei: {
      label: "紫微斗數",
      status: "partial",
      requiredFields: ["solarDate", "birthTimeRange", "gender"],
      optionalFields: ["lunarDate"],
      nextStep: "需確認農曆轉換、命宮身宮與主星安星規則。",
      blockedBy: ["lunarConversion", "ziweiStarRules"]
    },
    astrology: {
      label: "西洋星盤",
      status: "partial",
      requiredFields: ["solarDate", "birthTimeRange", "timezone"],
      optionalFields: ["latitude", "longitude", "locationLabel"],
      nextStep: "需確認星曆資料、經緯度與宮位制。",
      blockedBy: ["ephemeris", "geoCoordinates", "houseSystem"]
    }
  },
  nameCalculationBoundary: {
    version: "v0.7.4",
    moduleId: "name",
    label: "姓名學",
    candidateOrder: 2,
    status: "planning",
    calculationStatus: "not-calculated",
    source: "coreInputProfile.personal.fullName",
    boundarySource: "CORE_ALGORITHM_BOUNDARY.md",
    ruleSpecSource: "NAME_STROKE_RULES_SPEC.md",
    strokeTableStatus: "not-selected",
    strokeRuleStatus: "undecided",
    algorithmReadiness: "blocked",
    requiredFields: ["fullName"],
    optionalFields: ["familyName", "givenName", "gender"],
    blockedBy: [
      "strokeTable",
      "strokeSourceLicense",
      "strokeRuleVersion",
      "traditionalSimplifiedPolicy",
      "variantCharacterPolicy",
      "missingCharacterFallback",
      "fiveGridAlgorithmVersion",
      "compoundSurnamePolicy"
    ],
    ruleDecisionsNeeded: [
      "筆畫資料表來源與授權",
      "康熙筆畫或現代筆畫規則",
      "繁體與簡體處理政策",
      "異體字與缺字 fallback",
      "五格算法版本",
      "三才五行規則",
      "複姓與單姓處理",
      "姓名學結果不得直接作為改名建議"
    ],
    testCasePlan: [
      "科科 seed 名稱",
      "單姓單名",
      "單姓雙名",
      "複姓測試",
      "異體字測試",
      "缺字 fallback 測試"
    ],
    safetyLines: [
      "本版不提供正式姓名學計算。",
      "本版不提供改名建議。",
      "本版不宣稱姓名決定命運。",
      "本版不宣稱姓名學資料已完整。",
      "本版不得作為重大人生、法律、財務、醫療或投資決策依據。"
    ],
    nextStep: "v0.7.4 已新增姓名學筆畫規則與資料表規格文件；後續需先確認筆畫表、規則版本、資料授權與測試案例，仍不可宣稱正式計算。",
    nextMilestone: "先決定筆畫資料表來源、授權與五格規則版本，再評估 placeholder。",
    futureVersionPlan: [
      "v0.7.5 可評估姓名學筆畫 seed 資料表。",
      "v0.7.6 可評估姓名學 calculator placeholder。",
      "v0.8.0 之後才評估正式姓名學計算接入。"
    ]
  },
  numerologyCalculation: {
    enabled: true,
    version: "v0.7.4",
    status: "calculated",
    source: "coreInputProfile.birth.solarDate",
    method: "digit-reduction-1-to-9",
    masterNumberMode: "disabled",
    note: "計算規則仍沿用 v0.6.0：生命靈數先採用 1～9 化簡規則，不保留 11 / 22 / 33 master number。"
  },
  numerologyInterpretation: {
    enabled: true,
    version: "v0.7.4",
    status: "static-interpretation",
    source: "data/numerology-meanings.js",
    dependsOn: "features/numerology-calculator.js",
    scope: [
      "lifePathNumber",
      "birthDayNumber",
      "personalYear",
      "personalMonth",
      "personalDay"
    ],
    note: "v0.7.4 延續 v0.6.1 靜態解讀資料層；本版只補姓名學 metadata 前置，不改生命靈數計算與解讀主資料。"
  },
  numberRhythmCard: {
    version: "v0.7.4",
    status: "homepage-copy-adjusted",
    displayName: "今日數字節奏",
    source: "KekeNumerologyCalculator",
    focus: ["personalYear", "personalMonth", "personalDay"],
    note: "首頁 rhythm row 改以今日數字節奏呈現，避免與命盤核心矩陣的生命靈數入口重複。"
  },
  coreModuleTemplate: {
    version: "v0.7.4",
    status: "template-locked",
    source: "CORE_MODULE_TEMPLATE.md",
    basedOn: "numerology",
    standardLayers: [
      "input layer",
      "calculator layer",
      "meaning layer",
      "homepage layer",
      "detail layer",
      "safety layer",
      "check layer"
    ],
    completedReference: {
      moduleId: "numerology",
      calculator: "features/numerology-calculator.js",
      meanings: "data/numerology-meanings.js",
      homepageCard: "renderNumerology",
      detailPanels: [
        "renderNumerologyCalculationPanel",
        "renderNumerologyInterpretationPanel",
        "renderNumerologySafetyLines"
      ],
      checks: [
        "numerology-calculation-checks",
        "numerology-interpretation-checks",
        "number-rhythm-semantics"
      ]
    },
    nextCoreCandidates: [
      "name",
      "bazi",
      "ziwei",
      "astrology"
    ],
    note: "v0.7.4 以 NAME_STROKE_RULES_SPEC.md 補充姓名學筆畫規則與資料表規格；後續核心接入需先明確資料來源、計算邊界、測試案例、解讀資料層與安全線。"
  },
  layoutMeta: {
    primaryFocus: "命盤核心",
    secondaryFocus: "每日輔助提醒",
    note: "首頁以命盤系統為主，農民曆與神明生日作為輔助提醒。"
  },
  almanacEngine: {
    enabled: true,
    mode: "experiment",
    source: "lunar-javascript",
    note: "本版為 lunar-javascript 實驗資料，暫不取代人工校對資料。"
  },
  almanacSupport: {
    enabled: true,
    mode: "experiment",
    anchor: "#almanac-title",
    cardType: "dashboard support card",
    displayName: "農民曆",
    displayFocus: "今日農曆 / 節氣資訊 / 資料狀態 / 溫和提醒",
    source: "features/almanac-engine.js + vendor/lunar/lunar.js",
    statusLabel: "experiment",
    frontNote: "農曆摘要，輕量提醒。",
    compactNote: "今日只作節奏參考。",
    safetyLines: [
      "目前為 lunar-javascript 實驗資料。",
      "暫不取代人工校對資料。",
      "不提供正式農民曆吉凶斷言。",
      "不提供正式宜忌、沖煞或時辰判定。"
    ],
    displayNotes: [
      "首頁只顯示今日農民曆摘要與資料狀態。",
      "本版不新增農民曆 detail route。",
      "未來可再整理農民曆詳情或 support 區塊。"
    ]
  },
  deityMatcher: {
    enabled: true,
    mode: "seed",
    source: "data/deity-birthdays.js",
    note: "本版使用 seed 資料表測試命中，不代表資料表已完整。"
  },
  dateTestMode: {
    enabled: true,
    mode: "query",
    source: "URL query",
    note: "可用 testLunarMonth 與 testLunarDay 測試神明生日資料表命中。"
  },
  testSeeds: [
    {
      label: "觀音佛辰",
      lunarMonth: 2,
      lunarDay: 19,
      note: "測試觀世音菩薩佛辰命中"
    },
    {
      label: "媽祖聖誕",
      lunarMonth: 3,
      lunarDay: 23,
      note: "測試天上聖母媽祖聖誕命中"
    },
    {
      label: "關聖帝君",
      lunarMonth: 6,
      lunarDay: 24,
      note: "測試關聖帝君聖誕命中"
    },
    {
      label: "今日模式",
      lunarMonth: null,
      lunarDay: null,
      note: "回到今日農曆比對"
    }
  ],
  profile: {
    name: "科科",
    birthday: "1990/06/09",
    zodiac: "雙子座",
    birthTime: "午時 11:00-13:00",
    summary: "靈動好奇、思維敏捷，擅長連結與學習，生命課題在於專注與深化。"
  },
  todaySummary: {
    label: "今日科科摘要",
    displayLabel: "今日科科摘要",
    theme: "專注與收斂",
    suitable: "整理資料、學習研究、寫筆記、靜心祈福",
    avoid: "衝動決策、情緒爭辯、同時開太多新坑",
    caution: "分心、晚睡、想很多但沒有落地",
    quote: "先完成最重要的一件事，比什麼都強。"
  },
  numerology: {
    lifeNumber: 7,
    personalYear: 7,
    personalMonth: 4,
    personalDay: 2
  },
  modules: [
    {
      title: "紫微斗數",
      note: "命宮、十二宮位與主星",
      icon: "紫",
      href: "#/module/ziwei"
    },
    {
      title: "八字四柱",
      note: "年、月、日、時與五行分布",
      icon: "干",
      href: "#/module/bazi"
    },
    {
      title: "西洋星盤",
      note: "太陽、月亮、上升與行星相位",
      icon: "星",
      href: "#/module/astrology"
    },
    {
      title: "生命靈數",
      note: "生命數字與個人節奏",
      icon: "7",
      href: "#/module/numerology"
    },
    {
      title: "姓名學",
      note: "姓名結構、五格與字義",
      icon: "名",
      href: "#/module/name"
    },
    {
      title: "流年 / 九運",
      note: "年度節奏與九運趨勢",
      icon: "運",
      href: "#/module/luck"
    },
    {
      title: "農民曆",
      note: "每日輔助提醒與 lunar 實驗資料",
      icon: "曆",
      href: "#almanac-title"
    },
    {
      title: "神明生日",
      note: "神明生日 seed 資料表實驗",
      icon: "神",
      href: "#deity-title"
    },
    {
      title: "易經占問",
      note: "占問入口與紀錄規劃",
      icon: "卦",
      href: "#/module/yijing"
    },
    {
      title: "命樹",
      note: "多命盤系統整合入口",
      icon: "樹",
      href: "#/module/soul-tree"
    },
    {
      title: "資料庫 / 備份",
      note: "JSON、匯入與備份紀錄",
      icon: "庫",
      href: "#/module/database"
    }
  ],
  almanac: {
    solarDate: "2026/06/28",
    lunarDate: "五月十四",
    good: "祭祀、整理、學習",
    avoid: "衝動決策",
    luckyHours: "辰時 07-09、巳時 09-11、申時 15-17",
    clash: "展示資料",
    mockNote: "這是 mock 展示資料，不代表真實當日資料。"
  },
  deityDay: {
    title: "觀世音菩薩 佛辰",
    lunarDate: "五月十九",
    blessing: "平安、慈悲、圓滿",
    mockNote: "這是 mock 展示資料，不代表真實當日資料。"
  },
  soulTree: {
    title: "多系統整合",
    root: "根：八字",
    trunk: "幹：日主 / 本命",
    crown: "枝葉：紫微、星盤、生命靈數、姓名學",
    description: "多元命理系統整合成一棵屬於科科的命理之樹，看見全貌，找到方向。"
  },
  tools: ["匯出 JSON", "匯入資料", "備份紀錄"]
};
