(function () {
  const fallbackText = "本次未取得";

  function fallbackResult(status, errorMessage) {
    return {
      source: "lunar-javascript",
      solarDate: fallbackText,
      lunarText: fallbackText,
      lunarMonth: null,
      lunarDay: null,
      lunarMonthText: fallbackText,
      lunarDayText: fallbackText,
      gzYear: fallbackText,
      zodiac: fallbackText,
      week: fallbackText,
      yi: fallbackText,
      ji: fallbackText,
      rawText: fallbackText,
      status: status || "error",
      errorMessage: errorMessage || ""
    };
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  }

  function toText(value) {
    if (Array.isArray(value)) {
      return value.length > 0 ? value.join("、") : fallbackText;
    }

    return value ? String(value) : fallbackText;
  }

  function getNumberValue(source, methodName) {
    if (!source || typeof source[methodName] !== "function") {
      return null;
    }

    const value = source[methodName]();
    return typeof value === "number" && Number.isFinite(value) ? value : null;
  }

  function getTextValue(source, methodName) {
    if (!source || typeof source[methodName] !== "function") {
      return fallbackText;
    }

    return toText(source[methodName]());
  }

  window.KekeAlmanacEngine = {
    getTodayAlmanac: function () {
      try {
        if (!window.Solar || typeof window.Solar.fromDate !== "function") {
          return fallbackResult("error", "Solar 未載入，請確認 vendor/lunar/lunar.js 是否已正確載入。");
        }

        const today = new Date();
        const solar = window.Solar.fromDate(today);
        const lunar = solar.getLunar();
        const lunarMonth = getNumberValue(lunar, "getMonth");
        const lunarDay = getNumberValue(lunar, "getDay");
        const lunarMonthText = getTextValue(lunar, "getMonthInChinese");
        const lunarDayText = getTextValue(lunar, "getDayInChinese");
        const gzYear = getTextValue(lunar, "getYearInGanZhi");
        const zodiac = getTextValue(lunar, "getYearShengXiao");
        const week = getTextValue(solar, "getWeekInChinese");
        const yi = typeof lunar.getDayYi === "function" ? toText(lunar.getDayYi()) : fallbackText;
        const ji = typeof lunar.getDayJi === "function" ? toText(lunar.getDayJi()) : fallbackText;
        const lunarText = typeof lunar.toString === "function" ? lunar.toString() : fallbackText;

        return {
          source: "lunar-javascript",
          solarDate: formatDate(today),
          lunarText,
          lunarMonth,
          lunarDay,
          lunarMonthText,
          lunarDayText,
          gzYear,
          zodiac,
          week,
          yi,
          ji,
          rawText: `${formatDate(today)} ${lunarText} ${gzYear}年 ${zodiac} 星期${week}`,
          status: "ok",
          errorMessage: ""
        };
      } catch (error) {
        return fallbackResult("error", error && error.message ? error.message : "lunar 實驗資料計算失敗。");
      }
    }
  };
})();
