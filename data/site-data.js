window.KekeSoulData = {
  siteMeta: {
    appName: "科科命理宇宙站",
    version: "v0.3.5",
    dataVersion: "v0.2",
    cacheVersion: "v0.3.5",
    status: "紫微斗數詳情頁 mock 深化",
    updatedNote: "v0.3.5 深化紫微斗數詳情頁 mock 結構，建立命盤摘要、命宮主星、十二宮位與解讀重點骨架。"
  },
  versionPolicy: {
    productVersion: "v0.3.5",
    cacheVersion: "v0.3.5",
    dataVersion: "v0.2",
    note: "產品版本標記功能進度，cacheVersion 用於 GitHub Pages 靜態資源刷新，dataVersion 標記資料層結構。"
  },
  routeMeta: {
    enabled: true,
    mode: "hash",
    currentVersion: "v0.3.5",
    homeRoutes: ["#/", "#/dashboard"],
    detailPrefix: "#/module/",
    note: "v0.3.5 保留 hash router 與 dashboard zone，並深化紫微斗數 mock 詳情頁。"
  },
  layoutMeta: {
    primaryFocus: "命盤核心",
    secondaryFocus: "每日輔助提醒",
    note: "首頁以命盤核心總控台為主要視覺，農民曆與神明生日仍作為輔助提醒。"
  },
  almanacEngine: {
    enabled: true,
    mode: "experiment",
    source: "lunar-javascript",
    note: "本版為 lunar-javascript 實驗資料，暫不取代人工校對資料。"
  },
  deityMatcher: {
    enabled: true,
    mode: "experiment",
    source: "data/deity-birthdays.js",
    note: "本版使用 seed 資料表做神明生日比對，資料表仍需人工校對與擴充。"
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
      note: "命宮、主星與人生主題",
      icon: "紫",
      href: "#/module/ziwei"
    },
    {
      title: "八字四柱",
      note: "年柱、月柱、日柱、時柱",
      icon: "干",
      href: "#/module/bazi"
    },
    {
      title: "西洋星盤",
      note: "太陽、月亮、上升與行星",
      icon: "星",
      href: "#/module/astrology"
    },
    {
      title: "生命靈數",
      note: "核心數字與年度節奏",
      icon: "7",
      href: "#/module/numerology"
    },
    {
      title: "姓名學",
      note: "姓名結構、五格與語感",
      icon: "名",
      href: "#/module/name"
    },
    {
      title: "流年 / 九運",
      note: "年度焦點與長週期節奏",
      icon: "運",
      href: "#/module/luck"
    },
    {
      title: "農民曆",
      note: "每日宜忌與 lunar 實驗資料",
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
      note: "占問入口與反思紀錄",
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
  tools: [
    "匯出 JSON",
    "匯入資料",
    "備份紀錄"
  ]
};
