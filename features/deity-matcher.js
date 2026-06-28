(function () {
  function getBirthdayTable() {
    return Array.isArray(window.KekeDeityBirthdays) ? window.KekeDeityBirthdays : [];
  }

  function isUsableNumber(value) {
    return typeof value === "number" && Number.isFinite(value);
  }

  function findByLunarDate(lunarMonth, lunarDay) {
    const monthNumber = Number(lunarMonth);
    const dayNumber = Number(lunarDay);

    if (!Number.isFinite(monthNumber) || !Number.isFinite(dayNumber)) {
      return [];
    }

    return getBirthdayTable().filter((item) => (
      Number(item.lunarMonth) === monthNumber && Number(item.lunarDay) === dayNumber
    ));
  }

  function getTodayMatches() {
    try {
      if (!window.KekeAlmanacEngine || typeof window.KekeAlmanacEngine.getTodayAlmanac !== "function") {
        return {
          status: "error",
          lunarMonth: null,
          lunarDay: null,
          lunarMonthText: "本次未取得",
          lunarDayText: "本次未取得",
          matches: [],
          message: "KekeAlmanacEngine 未載入，無法取得今日農曆月日。"
        };
      }

      if (!Array.isArray(window.KekeDeityBirthdays)) {
        return {
          status: "error",
          lunarMonth: null,
          lunarDay: null,
          lunarMonthText: "本次未取得",
          lunarDayText: "本次未取得",
          matches: [],
          message: "KekeDeityBirthdays 未載入，無法比對神明生日資料表。"
        };
      }

      const almanac = window.KekeAlmanacEngine.getTodayAlmanac();
      const lunarMonth = almanac ? almanac.lunarMonth : null;
      const lunarDay = almanac ? almanac.lunarDay : null;
      const lunarMonthText = almanac?.lunarMonthText || "本次未取得";
      const lunarDayText = almanac?.lunarDayText || "本次未取得";

      if (!isUsableNumber(lunarMonth) || !isUsableNumber(lunarDay)) {
        return {
          status: "error",
          lunarMonth: null,
          lunarDay: null,
          lunarMonthText,
          lunarDayText,
          matches: [],
          message: almanac?.errorMessage || "本次未取得農曆月日。"
        };
      }

      const matches = findByLunarDate(lunarMonth, lunarDay);

      if (matches.length === 0) {
        return {
          status: "empty",
          lunarMonth,
          lunarDay,
          lunarMonthText,
          lunarDayText,
          matches,
          message: "今日未命中神明生日 seed 資料表。"
        };
      }

      return {
        status: "ok",
        lunarMonth,
        lunarDay,
        lunarMonthText,
        lunarDayText,
        matches,
        message: "今日命中神明生日 seed 資料表。"
      };
    } catch (error) {
      return {
        status: "error",
        lunarMonth: null,
        lunarDay: null,
        lunarMonthText: "本次未取得",
        lunarDayText: "本次未取得",
        matches: [],
        message: error && error.message ? error.message : "神明生日資料表比對失敗。"
      };
    }
  }

  window.KekeDeityMatcher = {
    findByLunarDate,
    getTodayMatches
  };
})();
