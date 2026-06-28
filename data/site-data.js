window.KekeSoulData = {
  siteMeta: {
    appName: "科科命理宇宙站",
    version: "v0.2.5",
    dataVersion: "v0.2",
    cacheVersion: "v0.2.5",
    status: "首頁主軸重排 × 命盤核心優先",
    updatedNote: "首頁視覺重心改為命盤核心，農民曆與神明生日保留為每日輔助提醒。"
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
    mode: "experiment",
    source: "data/deity-birthdays.js",
    note: "本版為神明生日 seed 資料表實驗，資料仍需人工校對。"
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
    { title: "紫微斗數", note: "命宮、主星與生命焦點", icon: "紫", href: "#module-title" },
    { title: "八字四柱", note: "年柱、月柱、日柱、時柱", icon: "八", href: "#module-title" },
    { title: "西洋星盤", note: "太陽、月亮、上升與行星", icon: "星", href: "#module-title" },
    { title: "生命靈數", note: "核心數字與個人週期", icon: "7", href: "#life-number-title" },
    { title: "姓名學", note: "姓名、總格與五行氣質", icon: "名", href: "#module-title" },
    { title: "流年 / 九運", note: "年度主題與大環境趨勢", icon: "運", href: "#today-title" },
    { title: "農民曆", note: "今日宜忌與 lunar 實驗資料", icon: "曆", href: "#almanac-title" },
    { title: "神明生日", note: "祈福方向與生日資料表", icon: "神", href: "#deity-title" },
    { title: "易經占問", note: "問題入口與占問紀錄", icon: "易", href: "#deity-title" },
    { title: "命樹", note: "整合多元命理系統", icon: "樹", href: "#tree-title" },
    { title: "資料庫 / 備份", note: "JSON、匯入與備份紀錄", icon: "庫", href: "#tool-title" }
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
