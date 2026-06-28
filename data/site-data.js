window.KekeSoulData = {
  siteMeta: {
    appName: "科科命理宇宙站",
    version: "v0.2.1",
    dataVersion: "v0.2",
    cacheVersion: "v0.2.1",
    status: "資料模組化 × 版本顯示",
    updatedNote: "版本號已顯示於網站畫面，方便確認 GitHub Pages 是否更新成功。"
  },
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
    { title: "紫微斗數", note: "命宮、主星與人生主題", icon: "紫", href: "#module-title" },
    { title: "八字四柱", note: "年柱、月柱、日柱、時柱", icon: "八", href: "#module-title" },
    { title: "西洋星盤", note: "太陽、月亮、上升摘要", icon: "星", href: "#module-title" },
    { title: "生命靈數", note: "核心數字與年度節奏", icon: "數", href: "#life-number-title" },
    { title: "姓名學", note: "總格、五格與名字氣質", icon: "名", href: "#module-title" },
    { title: "流年 / 九運", note: "年度焦點與長期趨勢", icon: "運", href: "#today-title" },
    { title: "農民曆", note: "今日宜忌與時辰提醒", icon: "曆", href: "#almanac-title" },
    { title: "神明生日", note: "祈福方向與節日備忘", icon: "神", href: "#deity-title" },
    { title: "易經占問", note: "靜態入口，待後續展開", icon: "易", href: "#deity-title" },
    { title: "命樹", note: "整合多系統的生命地圖", icon: "樹", href: "#tree-title" },
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
