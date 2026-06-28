(function () {
  function fallbackResult(status, errorMessage) {
    return {
      source: "lunar-javascript",
      solarDate: "本次未取得",
      lunarText: "本次未取得",
      gzYear: "本次未取得",
      zodiac: "本次未取得",
      week: "本次未取得",
      yi: "本次未取得",
      ji: "本次未取得",
      rawText: "本次未取得",
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
      return value.length > 0 ? value.join("、") : "本次未取得";
    }

    return value ? String(value) : "本次未取得";
  }

  window.KekeAlmanacEngine = {
    getTodayAlmanac: function () {
      try {
        if (!window.Solar || typeof window.Solar.fromDate !== "function") {
          return fallbackResult("error", "Solar 未載入，請確認 vendor/lunar/lunar.js 是否已先載入。");
        }

        const today = new Date();
        const solar = window.Solar.fromDate(today);
        const lunar = solar.getLunar();
        const gzYear = typeof lunar.getYearInGanZhi === "function"
          ? lunar.getYearInGanZhi()
          : "本次未取得";
        const zodiac = typeof lunar.getYearShengXiao === "function"
          ? lunar.getYearShengXiao()
          : "本次未取得";
        const week = typeof solar.getWeekInChinese === "function"
          ? solar.getWeekInChinese()
          : "本次未取得";
        const yi = typeof lunar.getDayYi === "function"
          ? toText(lunar.getDayYi())
          : "本次未取得";
        const ji = typeof lunar.getDayJi === "function"
          ? toText(lunar.getDayJi())
          : "本次未取得";
        const lunarText = typeof lunar.toString === "function"
          ? lunar.toString()
          : "本次未取得";

        return {
          source: "lunar-javascript",
          solarDate: formatDate(today),
          lunarText,
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
