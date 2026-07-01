(function () {
  const METHOD = "digit-reduction-1-to-9";

  function pad2(value) {
    return String(value).padStart(2, "0");
  }

  function isLeapYear(year) {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
  }

  function parseSolarDate(solarDate) {
    if (typeof solarDate !== "string" || solarDate.trim() === "") {
      return { status: "missing", reason: "solarDate missing" };
    }

    const match = solarDate.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);

    if (!match) {
      return { status: "error", reason: "invalid solarDate" };
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const monthDays = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month < 1 || month > 12 || day < 1 || day > monthDays[month - 1]) {
      return { status: "error", reason: "invalid solarDate" };
    }

    return {
      status: "ok",
      year,
      month,
      day,
      value: `${year}-${pad2(month)}-${pad2(day)}`
    };
  }

  function digitSum(value) {
    return String(value)
      .replace(/\D/g, "")
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }

  function reduceNumber(value) {
    let total = digitSum(value);

    if (!total) {
      return null;
    }

    while (total > 9) {
      total = digitSum(total);
    }

    return total;
  }

  function calculateLifePathNumber(solarDate) {
    const parsed = parseSolarDate(solarDate);

    if (parsed.status !== "ok") {
      return null;
    }

    return reduceNumber(`${parsed.year}${pad2(parsed.month)}${pad2(parsed.day)}`);
  }

  function calculateBirthDayNumber(solarDate) {
    const parsed = parseSolarDate(solarDate);

    if (parsed.status !== "ok") {
      return null;
    }

    return reduceNumber(parsed.day);
  }

  function calculatePersonalYear(solarDate, targetDate) {
    const birth = parseSolarDate(solarDate);
    const target = parseSolarDate(targetDate);

    if (birth.status !== "ok" || target.status !== "ok") {
      return null;
    }

    return reduceNumber(`${pad2(birth.month)}${pad2(birth.day)}${target.year}`);
  }

  function calculatePersonalMonth(solarDate, targetDate) {
    const target = parseSolarDate(targetDate);
    const personalYear = calculatePersonalYear(solarDate, targetDate);

    if (target.status !== "ok" || personalYear === null) {
      return null;
    }

    return reduceNumber(`${personalYear}${target.month}`);
  }

  function calculatePersonalDay(solarDate, targetDate) {
    const target = parseSolarDate(targetDate);
    const personalMonth = calculatePersonalMonth(solarDate, targetDate);

    if (target.status !== "ok" || personalMonth === null) {
      return null;
    }

    return reduceNumber(`${personalMonth}${target.day}`);
  }

  function getTodayIsoDate() {
    const today = new Date();
    return `${today.getFullYear()}-${pad2(today.getMonth() + 1)}-${pad2(today.getDate())}`;
  }

  function calculateFromProfile(coreInputProfile, options) {
    const source = "coreInputProfile.birth.solarDate";
    const profile = coreInputProfile || {};
    const solarDate = profile.birth && profile.birth.solarDate;
    const parsedBirth = parseSolarDate(solarDate);
    const targetDate = options && options.targetDate ? options.targetDate : getTodayIsoDate();
    const parsedTarget = parseSolarDate(targetDate);

    if (parsedBirth.status === "missing") {
      return {
        status: "missing",
        source,
        method: METHOD,
        reason: "solarDate missing",
        solarDate: "",
        targetDate,
        lifePathNumber: null
      };
    }

    if (parsedBirth.status !== "ok") {
      return {
        status: "error",
        source,
        method: METHOD,
        reason: "invalid solarDate",
        solarDate: String(solarDate || ""),
        targetDate,
        lifePathNumber: null
      };
    }

    if (parsedTarget.status !== "ok") {
      return {
        status: "error",
        source,
        method: METHOD,
        reason: "invalid targetDate",
        solarDate: parsedBirth.value,
        targetDate: String(targetDate || ""),
        lifePathNumber: null
      };
    }

    const lifePathNumber = calculateLifePathNumber(parsedBirth.value);
    const birthDayNumber = calculateBirthDayNumber(parsedBirth.value);
    const personalYear = calculatePersonalYear(parsedBirth.value, parsedTarget.value);
    const personalMonth = calculatePersonalMonth(parsedBirth.value, parsedTarget.value);
    const personalDay = calculatePersonalDay(parsedBirth.value, parsedTarget.value);

    return {
      status: "ok",
      source,
      method: METHOD,
      solarDate: parsedBirth.value,
      targetDate: parsedTarget.value,
      lifePathNumber,
      birthDayNumber,
      personalYear,
      personalMonth,
      personalDay,
      summary: {
        lifePathLabel: `生命靈數 ${lifePathNumber}`,
        rhythmLabel: `個人年 ${personalYear} / 個人月 ${personalMonth} / 個人日 ${personalDay}`,
        note: "本版依生日數字化簡規則計算，作為自我觀察與節奏提醒。"
      }
    };
  }

  window.KekeNumerologyCalculator = {
    calculateFromProfile,
    calculateLifePathNumber,
    calculateBirthDayNumber,
    calculatePersonalYear,
    calculatePersonalMonth,
    calculatePersonalDay,
    reduceNumber,
    parseSolarDate,
    getTodayIsoDate
  };
})();
