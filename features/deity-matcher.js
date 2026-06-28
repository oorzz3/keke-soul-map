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

  function buildMatchResult(source) {
    const matches = findByLunarDate(source.lunarMonth, source.lunarDay);
    const isTest = source.mode === "test";
    const emptyMessage = isTest
      ? "測試日期未命中神明生日 seed 資料表。"
      : "今日未命中神明生日 seed 資料表。";
    const okMessage = isTest
      ? "測試日期命中神明生日 seed 資料表。"
      : "今日命中神明生日 seed 資料表。";

    return {
      status: matches.length > 0 ? "ok" : "empty",
      mode: source.mode,
      testMode: isTest,
      testMessage: source.testMessage,
      lunarMonth: source.lunarMonth,
      lunarDay: source.lunarDay,
      lunarMonthText: source.lunarMonthText,
      lunarDayText: source.lunarDayText,
      matches,
      message: matches.length > 0 ? okMessage : emptyMessage
    };
  }

  function getTestModeResult() {
    if (!window.KekeDateTestMode || typeof window.KekeDateTestMode.getTestLunarDate !== "function") {
      return null;
    }

    return window.KekeDateTestMode.getTestLunarDate();
  }

  function getTodaySource() {
    if (!window.KekeAlmanacEngine || typeof window.KekeAlmanacEngine.getTodayAlmanac !== "function") {
      return {
        status: "error",
        mode: "today",
        testMode: false,
        testMessage: "目前使用今日模式。",
        lunarMonth: null,
        lunarDay: null,
        lunarMonthText: "本次未取得",
        lunarDayText: "本次未取得",
        matches: [],
        message: "KekeAlmanacEngine 未載入，無法取得今日農曆月日。"
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
        mode: "today",
        testMode: false,
        testMessage: "目前使用今日模式。",
        lunarMonth: null,
        lunarDay: null,
        lunarMonthText,
        lunarDayText,
        matches: [],
        message: almanac?.errorMessage || "本次未取得農曆月日。"
      };
    }

    return {
      mode: "today",
      testMode: false,
      testMessage: "目前使用今日模式。",
      lunarMonth,
      lunarDay,
      lunarMonthText,
      lunarDayText
    };
  }

  function getTodayMatches() {
    try {
      if (!Array.isArray(window.KekeDeityBirthdays)) {
        return {
          status: "error",
          mode: "today",
          testMode: false,
          testMessage: "目前使用今日模式。",
          lunarMonth: null,
          lunarDay: null,
          lunarMonthText: "本次未取得",
          lunarDayText: "本次未取得",
          matches: [],
          message: "KekeDeityBirthdays 未載入，無法比對神明生日資料表。"
        };
      }

      const testDate = getTestModeResult();

      if (testDate && testDate.enabled && testDate.status === "error") {
        return {
          status: "error",
          mode: "test",
          testMode: true,
          testMessage: testDate.message,
          lunarMonth: null,
          lunarDay: null,
          lunarMonthText: testDate.lunarMonthText,
          lunarDayText: testDate.lunarDayText,
          matches: [],
          message: "測試農曆月日參數不合法。"
        };
      }

      if (testDate && testDate.enabled && testDate.status === "ok") {
        return buildMatchResult({
          mode: "test",
          testMessage: testDate.message,
          lunarMonth: testDate.lunarMonth,
          lunarDay: testDate.lunarDay,
          lunarMonthText: testDate.lunarMonthText,
          lunarDayText: testDate.lunarDayText
        });
      }

      const todaySource = getTodaySource();

      if (todaySource.status === "error") {
        return todaySource;
      }

      return buildMatchResult(todaySource);
    } catch (error) {
      return {
        status: "error",
        mode: "today",
        testMode: false,
        testMessage: "目前使用今日模式。",
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
