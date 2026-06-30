window.KekeSoulData = {
  siteMeta: {
    appName: "科科命理宇宙站",
    version: "v0.5.1.6",
    dataVersion: "v0.2",
    cacheVersion: "v0.5.1.6",
    status: "首頁核心五卡辨識度小修",
    updatedNote: "v0.5.1.6 在 v0.5.1.5 穩定首頁 renderer 基礎上，為五大核心命盤卡片補上識別用 mini visual，讓紫微、八字、星盤、生命靈數與姓名學更容易一眼分辨，同時不改首頁整體布局。"
  },
  versionPolicy: {
    productVersion: "v0.5.1.6",
    cacheVersion: "v0.5.1.6",
    dataVersion: "v0.2",
    note: "productVersion 對應網站功能封章，cacheVersion 用於 GitHub Pages 靜態資源快取，dataVersion 對應資料層結構。"
  },
  routeMeta: {
    enabled: true,
    mode: "hash",
    currentVersion: "v0.5.1.6",
    homeRoutes: ["#/", "#/dashboard"],
    detailPrefix: "#/module/",
    note: "v0.5.1.6 保留 hash router、dashboard zone、五大核心詳情頁、流年 / 九運詳情頁與後半段模組，並依首頁 Blueprint 重排 dashboard 視覺骨架。"
  },
  dashboardLayout: {
    mode: "core-five-card-visual-pass",
    version: "v0.5.1.6",
    heroBand: "dashboard-hero-band",
    coreGrid: "dashboard-core-grid",
    rhythmRow: "dashboard-rhythm-row",
    supportStrip: "dashboard-support-strip",
    bottomInsightStrip: "bottomInsightStrip",
    rule: "首頁只顯示濃縮摘要；首頁以命盤核心為主，農民曆與神明生日只保留短摘要。",
    density: "production dashboard compact",
    note: "v0.5.1.6 保留 hero band、core grid、rhythm row、support strip 與 bottom insight strip，只補強五大核心卡辨識度。"
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
