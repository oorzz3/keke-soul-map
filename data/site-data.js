window.KekeSoulData = {
  siteMeta: {
    appName: "科科命理宇宙站",
    version: "v0.3.7",
    dataVersion: "v0.2",
    cacheVersion: "v0.3.7",
    status: "西洋星盤詳情頁 mock 深化",
    updatedNote: "v0.3.7 深化西洋星盤詳情頁 mock 結構，建立三軸、行星落點、十二宮位、相位關係與資料狀態骨架。"
  },
  versionPolicy: {
    productVersion: "v0.3.7",
    cacheVersion: "v0.3.7",
    dataVersion: "v0.2",
    note: "productVersion 對應網站功能封章，cacheVersion 用於 GitHub Pages 靜態資源快取，dataVersion 對應資料層結構。"
  },
  routeMeta: {
    enabled: true,
    mode: "hash",
    currentVersion: "v0.3.7",
    homeRoutes: ["#/", "#/dashboard"],
    detailPrefix: "#/module/",
    note: "v0.3.7 保留 hash router 與 dashboard zone，並深化西洋星盤 mock 詳情頁。"
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
