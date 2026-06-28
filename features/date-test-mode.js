(function () {
  const fallbackOff = {
    enabled: false,
    status: "off",
    lunarMonth: null,
    lunarDay: null,
    lunarMonthText: "本次未啟用",
    lunarDayText: "本次未啟用",
    message: "目前使用今日模式。"
  };
  const fallbackError = {
    enabled: true,
    status: "error",
    lunarMonth: null,
    lunarDay: null,
    lunarMonthText: "本次未取得",
    lunarDayText: "本次未取得",
    message: "測試農曆月日參數不合法。"
  };
  const monthTexts = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
  const dayTexts = [
    "",
    "初一",
    "初二",
    "初三",
    "初四",
    "初五",
    "初六",
    "初七",
    "初八",
    "初九",
    "初十",
    "十一",
    "十二",
    "十三",
    "十四",
    "十五",
    "十六",
    "十七",
    "十八",
    "十九",
    "二十",
    "廿一",
    "廿二",
    "廿三",
    "廿四",
    "廿五",
    "廿六",
    "廿七",
    "廿八",
    "廿九",
    "三十"
  ];

  function hasLocation() {
    return typeof window !== "undefined" && window.location && typeof window.location.search === "string";
  }

  function parseInteger(value) {
    if (!/^\d+$/.test(String(value || ""))) {
      return null;
    }

    const parsed = Number(value);
    return Number.isInteger(parsed) ? parsed : null;
  }

  function isValidLunarDate(lunarMonth, lunarDay) {
    return Number.isInteger(lunarMonth)
      && Number.isInteger(lunarDay)
      && lunarMonth >= 1
      && lunarMonth <= 12
      && lunarDay >= 1
      && lunarDay <= 30;
  }

  function getTestLunarDate() {
    if (!hasLocation() || typeof URLSearchParams === "undefined") {
      return { ...fallbackOff };
    }

    const params = new URLSearchParams(window.location.search);
    const hasMonth = params.has("testLunarMonth");
    const hasDay = params.has("testLunarDay");

    if (!hasMonth && !hasDay) {
      return { ...fallbackOff };
    }

    const lunarMonth = parseInteger(params.get("testLunarMonth"));
    const lunarDay = parseInteger(params.get("testLunarDay"));

    if (!isValidLunarDate(lunarMonth, lunarDay)) {
      return { ...fallbackError };
    }

    return {
      enabled: true,
      status: "ok",
      lunarMonth,
      lunarDay,
      lunarMonthText: monthTexts[lunarMonth] || "本次未取得",
      lunarDayText: dayTexts[lunarDay] || "本次未取得",
      message: "目前使用測試模式。"
    };
  }

  function getCurrentPath() {
    return "index.html";
  }

  function buildTestUrl(lunarMonth, lunarDay) {
    if (!isValidLunarDate(Number(lunarMonth), Number(lunarDay))) {
      return "index.html#deity-title";
    }

    const params = new URLSearchParams();
    params.set("testLunarMonth", String(Number(lunarMonth)));
    params.set("testLunarDay", String(Number(lunarDay)));
    return `${getCurrentPath()}?${params.toString()}#deity-title`;
  }

  function clearTestUrl() {
    return "index.html#deity-title";
  }

  window.KekeDateTestMode = {
    getTestLunarDate,
    buildTestUrl,
    clearTestUrl
  };
})();
