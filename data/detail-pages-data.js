window.KekeDetailPages = {
  ziwei: {
    id: "ziwei",
    order: 1,
    navLabel: "紫微",
    icon: "紫",
    category: "命盤核心",
    title: "紫微斗數",
    subtitle: "命宮、主星與人生主題",
    status: "mock",
    route: "#/module/ziwei",
    summary: "以命宮、主星與十二宮位看見個人性格、人生課題與行動方向。",
    dashboardPreview: {
      headline: "命宮與主星",
      primaryValue: "命宮 / 主星",
      secondaryValue: "人生主題",
      tags: ["命宮", "主星", "十二宮"],
      note: "目前為 mock 首頁預覽，點入詳情頁可看欄位規劃。"
    },
    ziweiProfile: {
      chartStatus: "mock",
      chartType: "紫微斗數命盤骨架",
      palaceFocus: "命宮",
      bodyPalace: "身宮待定",
      mainStars: ["天府", "紫微待校", "武曲待校"],
      summary: "目前為 mock 命盤骨架，用來規劃未來紫微斗數詳情頁呈現方式。"
    },
    palaceOverview: [
      {
        palace: "命宮",
        category: "核心宮位",
        theme: "自我性格與人生主軸",
        mockStars: ["天府"],
        note: "目前為 mock，未接正式星曜計算。"
      },
      {
        palace: "兄弟宮",
        category: "關係宮位",
        theme: "手足、人際支援",
        mockStars: ["待建立"],
        note: "欄位規劃中。"
      },
      {
        palace: "夫妻宮",
        category: "關係宮位",
        theme: "伴侶關係與合作互動",
        mockStars: ["待建立"],
        note: "欄位規劃中。"
      },
      {
        palace: "子女宮",
        category: "關係宮位",
        theme: "子女、創造與照顧議題",
        mockStars: ["待建立"],
        note: "欄位規劃中。"
      },
      {
        palace: "財帛宮",
        category: "事業財務",
        theme: "金錢觀、資源流動與收入模式",
        mockStars: ["待建立"],
        note: "欄位規劃中。"
      },
      {
        palace: "疾厄宮",
        category: "內在修養",
        theme: "身心狀態、壓力與修復節奏",
        mockStars: ["待建立"],
        note: "欄位規劃中。"
      },
      {
        palace: "遷移宮",
        category: "外在行動",
        theme: "外出、移動與對外發展",
        mockStars: ["待建立"],
        note: "欄位規劃中。"
      },
      {
        palace: "交友宮",
        category: "關係宮位",
        theme: "朋友、團隊與社群連結",
        mockStars: ["待建立"],
        note: "欄位規劃中。"
      },
      {
        palace: "官祿宮",
        category: "事業財務",
        theme: "工作方向、職涯角色與成就感",
        mockStars: ["待建立"],
        note: "欄位規劃中。"
      },
      {
        palace: "田宅宮",
        category: "內在修養",
        theme: "居住環境、家庭基礎與安全感",
        mockStars: ["待建立"],
        note: "欄位規劃中。"
      },
      {
        palace: "福德宮",
        category: "內在修養",
        theme: "精神滋養、享受能力與內在安定",
        mockStars: ["待建立"],
        note: "欄位規劃中。"
      },
      {
        palace: "父母宮",
        category: "關係宮位",
        theme: "長輩、原生家庭與支持系統",
        mockStars: ["待建立"],
        note: "欄位規劃中。"
      }
    ],
    interpretationBlocks: [
      {
        title: "命宮觀察",
        level: "mock",
        content: "目前只作為命盤詳情頁展示用，未代表正式命宮結果。"
      },
      {
        title: "主星組合",
        level: "planning",
        content: "未來會依正式排盤結果整理主星、輔星與宮位互動。"
      },
      {
        title: "行動提醒",
        level: "planning",
        content: "未來可將命盤主題轉成每日或年度行動提醒。"
      }
    ],
    dataNotes: [
      "本頁目前為 mock / planning 架構。",
      "尚未接入正式紫微斗數排盤演算法。",
      "未來需補出生年月日時、節氣、農曆換算與星曜配置規則。",
      "本頁內容不得視為正式命理判斷。"
    ],
    sections: [
      {
        title: "這個系統看什麼",
        items: ["命宮", "主星組合", "十二宮位", "人生主題"]
      },
      {
        title: "科科目前資料狀態",
        items: ["目前為 mock 詳情頁", "尚未接入真正紫微斗數排盤演算法"]
      },
      {
        title: "未來要補",
        items: ["命宮定位", "主星計算", "十二宮位摘要", "流年提示"]
      }
    ]
  },
  bazi: {
    id: "bazi",
    order: 2,
    navLabel: "八字",
    icon: "干",
    category: "命盤核心",
    title: "八字四柱",
    subtitle: "年柱、月柱、日柱與時柱",
    status: "mock",
    route: "#/module/bazi",
    summary: "以出生年月日時的四柱結構，整理日主、五行分布與生命節奏。",
    dashboardPreview: {
      headline: "四柱總覽",
      primaryValue: "年 / 月 / 日 / 時",
      secondaryValue: "五行分布",
      tags: ["日主", "五行", "十神"],
      note: "目前為 mock 首頁預覽，尚未接入正式八字排盤。"
    },
    baziProfile: {
      chartStatus: "mock",
      chartType: "八字四柱命盤骨架",
      dayMaster: "日主待定",
      monthCommand: "月令待定",
      structureFocus: "四柱與五行分布",
      summary: "目前為 mock 八字骨架，用來規劃未來八字四柱詳情頁呈現方式。"
    },
    pillarOverview: [
      {
        pillar: "年柱",
        role: "背景",
        theme: "早年背景、家族脈絡與外在根基",
        stemBranch: "待建立",
        tenGod: "待建立",
        note: "目前為 mock，未接正式干支推算。"
      },
      {
        pillar: "月柱",
        role: "環境",
        theme: "成長環境、社會位置與月令氣勢",
        stemBranch: "待建立",
        tenGod: "待建立",
        note: "欄位規劃中，未接節氣切月。"
      },
      {
        pillar: "日柱",
        role: "自我",
        theme: "自我核心、日主與親密關係",
        stemBranch: "待建立",
        tenGod: "日主待定",
        note: "欄位規劃中，未接日柱推算。"
      },
      {
        pillar: "時柱",
        role: "未來",
        theme: "晚年走向、成果累積與未來延伸",
        stemBranch: "待建立",
        tenGod: "待建立",
        note: "欄位規劃中，未接出生時辰換算。"
      }
    ],
    fiveElementOverview: [
      {
        element: "木",
        status: "待計算",
        meaning: "生長、規劃、學習與伸展力",
        note: "目前為 mock，未計算五行比例。"
      },
      {
        element: "火",
        status: "待計算",
        meaning: "熱情、表達、曝光與行動力",
        note: "目前為 mock。"
      },
      {
        element: "土",
        status: "待計算",
        meaning: "穩定、承載、責任與整合力",
        note: "目前為 mock。"
      },
      {
        element: "金",
        status: "待計算",
        meaning: "規則、判斷、切割與執行力",
        note: "目前為 mock。"
      },
      {
        element: "水",
        status: "待計算",
        meaning: "流動、思考、資源與彈性",
        note: "目前為 mock。"
      }
    ],
    tenGodOverview: [
      {
        name: "比肩 / 劫財",
        theme: "自我、同儕、競爭與主體性",
        status: "planning"
      },
      {
        name: "食神 / 傷官",
        theme: "表達、創造、輸出與反骨感",
        status: "planning"
      },
      {
        name: "正財 / 偏財",
        theme: "金錢、資源、現實掌握與流動",
        status: "planning"
      },
      {
        name: "正官 / 七殺",
        theme: "規範、壓力、責任與行動紀律",
        status: "planning"
      },
      {
        name: "正印 / 偏印",
        theme: "學習、保護、理解與內在支撐",
        status: "planning"
      }
    ],
    interpretationBlocks: [
      {
        title: "日主觀察",
        level: "mock",
        content: "目前只作為八字詳情頁展示用，未代表正式日主結果。"
      },
      {
        title: "五行分布",
        level: "planning",
        content: "未來會依正式排盤結果整理五行比例、旺衰與平衡方向。"
      },
      {
        title: "十神關係",
        level: "planning",
        content: "未來可整理比劫、食傷、財星、官殺、印星對人生主題的影響。"
      }
    ],
    dataNotes: [
      "本頁目前為 mock / planning 架構。",
      "尚未接入正式八字四柱排盤演算法。",
      "未來需補出生年月日時、節氣切月、日柱推算與真太陽時校正。",
      "本頁內容不得視為正式命理判斷。"
    ],
    sections: [
      {
        title: "這個系統看什麼",
        items: ["四柱干支", "日主", "五行分布", "十神關係"]
      },
      {
        title: "科科目前資料狀態",
        items: ["目前為 mock 詳情頁", "尚未接入節氣與真太陽時計算"]
      },
      {
        title: "未來要補",
        items: ["節氣切月", "日柱推算", "五行強弱", "大運流年摘要"]
      }
    ]
  },
  astrology: {
    id: "astrology",
    order: 3,
    navLabel: "星盤",
    icon: "星",
    category: "命盤核心",
    title: "西洋星盤",
    subtitle: "太陽、月亮、上升與行星落點",
    status: "mock",
    route: "#/module/astrology",
    summary: "以星座、宮位與相位整理人格傾向、情緒模式與對外互動方式。",
    dashboardPreview: {
      headline: "星盤三軸",
      primaryValue: "太陽 / 月亮 / 上升",
      secondaryValue: "行星相位",
      tags: ["太陽", "月亮", "上升"],
      note: "目前為 mock 首頁預覽，尚未接入正式星盤計算。"
    },
    astrologyProfile: {
      chartStatus: "mock",
      chartType: "西洋星盤命盤骨架",
      chartFocus: "太陽 / 月亮 / 上升三軸",
      houseSystem: "宮位制待定",
      birthLocation: "出生地待定",
      summary: "目前為 mock 星盤骨架，用來規劃未來西洋星盤詳情頁呈現方式。"
    },
    axisOverview: [
      {
        axis: "太陽",
        theme: "核心意志、自我認同與人生方向",
        sign: "待建立",
        house: "待建立",
        note: "目前為 mock，未接正式行星位置計算。"
      },
      {
        axis: "月亮",
        theme: "情緒需求、安全感與內在反應",
        sign: "待建立",
        house: "待建立",
        note: "欄位規劃中，未接正式星盤計算。"
      },
      {
        axis: "上升",
        theme: "外在呈現、第一印象與人生入口",
        sign: "待建立",
        house: "第一宮待定",
        note: "欄位規劃中，未接出生時間與地點換算。"
      }
    ],
    planetOverview: [
      {
        planet: "水星",
        theme: "思考、溝通、學習與資訊處理",
        sign: "待建立",
        house: "待建立",
        status: "planning"
      },
      {
        planet: "金星",
        theme: "喜好、關係、美感與價值感",
        sign: "待建立",
        house: "待建立",
        status: "planning"
      },
      {
        planet: "火星",
        theme: "行動力、慾望、衝突與推進方式",
        sign: "待建立",
        house: "待建立",
        status: "planning"
      },
      {
        planet: "木星",
        theme: "擴張、信念、機會與成長方向",
        sign: "待建立",
        house: "待建立",
        status: "planning"
      },
      {
        planet: "土星",
        theme: "責任、限制、紀律與長期課題",
        sign: "待建立",
        house: "待建立",
        status: "planning"
      }
    ],
    houseOverview: [
      { house: "第一宮", theme: "自我形象、外在呈現與人生入口", status: "planning" },
      { house: "第二宮", theme: "金錢、資源、價值感與安全感", status: "planning" },
      { house: "第三宮", theme: "溝通、學習、手足與短距離移動", status: "planning" },
      { house: "第四宮", theme: "家庭、根基、內在安全與居住環境", status: "planning" },
      { house: "第五宮", theme: "創造、戀愛、玩樂與自我表達", status: "planning" },
      { house: "第六宮", theme: "工作日常、健康習慣與服務能力", status: "planning" },
      { house: "第七宮", theme: "伴侶、合作、契約與一對一關係", status: "planning" },
      { house: "第八宮", theme: "共享資源、深層連結、危機與轉化", status: "planning" },
      { house: "第九宮", theme: "遠行、信念、高等學習與世界觀", status: "planning" },
      { house: "第十宮", theme: "事業、名聲、社會位置與成就方向", status: "planning" },
      { house: "第十一宮", theme: "朋友、社群、願景與團體連結", status: "planning" },
      { house: "第十二宮", theme: "潛意識、隱藏課題、休息與靈性整合", status: "planning" }
    ],
    aspectOverview: [
      {
        aspect: "合相",
        angle: "0°",
        theme: "能量融合、主題集中與強化",
        status: "planning"
      },
      {
        aspect: "對分相",
        angle: "180°",
        theme: "拉扯、投射、關係鏡像與平衡",
        status: "planning"
      },
      {
        aspect: "四分相",
        angle: "90°",
        theme: "壓力、摩擦、挑戰與行動推力",
        status: "planning"
      },
      {
        aspect: "三分相",
        angle: "120°",
        theme: "流暢、天賦、自然支持與順手感",
        status: "planning"
      },
      {
        aspect: "六分相",
        angle: "60°",
        theme: "機會、協調、可培養的助力",
        status: "planning"
      }
    ],
    interpretationBlocks: [
      {
        title: "三軸觀察",
        level: "mock",
        content: "目前只作為星盤詳情頁展示用，未代表正式太陽、月亮或上升結果。"
      },
      {
        title: "行星落點",
        level: "planning",
        content: "未來會依正式星盤結果整理行星所在星座、宮位與人格主題。"
      },
      {
        title: "相位關係",
        level: "planning",
        content: "未來可整理主要相位形成的人格張力、天賦流動與行動提醒。"
      }
    ],
    dataNotes: [
      "本頁目前為 mock / planning 架構。",
      "尚未接入正式西洋星盤計算。",
      "未來需補出生年月日時、出生地、時區、宮位制與行星位置計算。",
      "本頁內容不得視為正式命理判斷。"
    ],
    sections: [
      {
        title: "這個系統看什麼",
        items: ["太陽星座", "月亮星座", "上升星座", "行星與宮位"]
      },
      {
        title: "科科目前資料狀態",
        items: ["目前為 mock 詳情頁", "尚未接入真正星盤計算"]
      },
      {
        title: "未來要補",
        items: ["出生地與時區", "行星位置", "宮位系統", "主要相位摘要"]
      }
    ]
  },

  numerology: {
    id: "numerology",
    order: 4,
    navLabel: "靈數",
    icon: "7",
    category: "命盤核心",
    title: "生命靈數",
    subtitle: "核心數字與年度節奏",
    status: "experiment",
    route: "#/module/numerology",
    summary: "以生日數字整理生命主題、個人年、個人月與每日行動提醒。",
    dashboardPreview: {
      headline: "核心數字",
      primaryValue: "生命靈數 7",
      secondaryValue: "個人年 / 月 / 日",
      tags: ["生命數", "節奏", "主題"],
      note: "目前為 experiment 首頁預覽，數字仍作展示用途。"
    },
    sections: [
      {
        title: "這個系統看什麼",
        items: ["生命靈數", "個人年", "個人月", "個人日"]
      },
      {
        title: "科科目前資料狀態",
        items: ["首頁已有 mock 數字展示", "詳情頁先整理欄位與解讀區塊"]
      },
      {
        title: "未來要補",
        items: ["生日數字計算", "年度節奏說明", "行動建議文案", "資料校對標籤"]
      }
    ],
    numerologyProfile: {
      chartStatus: "mock",
      chartType: "生命靈數命盤骨架",
      coreNumber: "7",
      rhythmFocus: "個人年 / 個人月 / 個人日",
      birthDateSource: "生日資料待正式校對",
      summary: "目前為 mock 靈數骨架，用來規劃未來生命靈數詳情頁呈現方式。"
    },
    coreNumberOverview: [
      {
        label: "生命靈數",
        value: "7",
        theme: "探索、分析、內在理解與獨處充電",
        status: "mock",
        note: "目前為展示用 mock 數字，不代表正式計算結果。"
      },
      {
        label: "生日數",
        value: "待建立",
        theme: "出生日期中的直覺天賦與外在表現",
        status: "planning",
        note: "未來會依生日拆解。"
      },
      {
        label: "命運數",
        value: "待建立",
        theme: "人生主題、長期方向與核心課題",
        status: "planning",
        note: "未來會依生日總和計算。"
      }
    ],
    birthBreakdownDraft: [
      {
        part: "年份",
        value: "待建立",
        meaning: "時代背景與長期生命底色",
        status: "planning"
      },
      {
        part: "月份",
        value: "待建立",
        meaning: "情緒節奏、反應模式與環境感受",
        status: "planning"
      },
      {
        part: "日期",
        value: "待建立",
        meaning: "日常表現、直覺行動與個人特色",
        status: "planning"
      },
      {
        part: "總和",
        value: "待建立",
        meaning: "生命主題與整體走向",
        status: "planning"
      }
    ],
    rhythmOverview: [
      {
        cycle: "個人年",
        value: "待計算",
        theme: "年度主題、外部節奏與大方向",
        note: "目前為 mock，未接正式個人年計算。"
      },
      {
        cycle: "個人月",
        value: "待計算",
        theme: "當月任務、行動節奏與調整方向",
        note: "目前為 mock。"
      },
      {
        cycle: "個人日",
        value: "待計算",
        theme: "今日提醒、互動方式與短節奏",
        note: "目前為 mock。"
      }
    ],
    numberMeaningOverview: [
      {
        number: "1",
        keyword: "開始",
        theme: "主動、開創、自我定位",
        status: "planning"
      },
      {
        number: "2",
        keyword: "合作",
        theme: "關係、協調、感受力",
        status: "planning"
      },
      {
        number: "3",
        keyword: "表達",
        theme: "創意、溝通、呈現",
        status: "planning"
      },
      {
        number: "4",
        keyword: "穩定",
        theme: "規劃、秩序、執行",
        status: "planning"
      },
      {
        number: "5",
        keyword: "變化",
        theme: "自由、移動、嘗試",
        status: "planning"
      },
      {
        number: "6",
        keyword: "照顧",
        theme: "責任、家庭、平衡",
        status: "planning"
      },
      {
        number: "7",
        keyword: "探索",
        theme: "分析、內省、研究",
        status: "mock"
      },
      {
        number: "8",
        keyword: "力量",
        theme: "資源、管理、成果",
        status: "planning"
      },
      {
        number: "9",
        keyword: "完成",
        theme: "整合、放下、視野",
        status: "planning"
      }
    ],
    actionNotes: [
      {
        title: "適合做什麼",
        level: "mock",
        content: "目前僅作為節奏區塊展示，未來可依個人日整理行動提醒。"
      },
      {
        title: "需要留意什麼",
        level: "planning",
        content: "未來可依數字節奏提醒過度消耗、拖延或衝動。"
      },
      {
        title: "今日一句話",
        level: "planning",
        content: "未來可把個人日轉成簡短提醒，用於首頁今日摘要。"
      }
    ],
    interpretationBlocks: [
      {
        title: "核心數字觀察",
        level: "mock",
        content: "目前只作為生命靈數詳情頁展示用，未代表正式生命靈數結果。"
      },
      {
        title: "個人節奏",
        level: "planning",
        content: "未來會依正式計算結果整理個人年、個人月與個人日。"
      },
      {
        title: "行動提醒",
        level: "planning",
        content: "未來可將數字節奏轉成每日可執行的提醒。"
      }
    ],
    dataNotes: [
      "本頁目前為 mock / planning 架構。",
      "尚未接入正式生命靈數計算。",
      "未來需補生日資料校對、生日數字拆解、個人年 / 月 / 日規則。",
      "本頁內容不得視為正式命理判斷。"
    ]
  },
  name: {
    id: "name",
    order: 5,
    navLabel: "姓名",
    icon: "名",
    category: "命盤核心",
    title: "姓名學",
    subtitle: "姓名結構、五格與語感提示",
    status: "mock",
    route: "#/module/name",
    summary: "以姓名字形、筆畫與語感整理個人識別、能量感與使用情境。",
    dashboardPreview: {
      headline: "姓名氣質",
      primaryValue: "科科",
      secondaryValue: "字義與語感",
      tags: ["姓名", "字義", "氣質"],
      note: "目前為 mock 首頁預覽，尚未接入正式姓名學規則。"
    },
    sections: [
      {
        title: "這個系統看什麼",
        items: ["姓名字義", "筆畫結構", "五格概念", "名字氣質"]
      },
      {
        title: "科科目前資料狀態",
        items: ["目前為 mock 詳情頁", "尚未接入正式姓名學規則"]
      },
      {
        title: "未來要補",
        items: ["筆畫資料表", "五格摘要", "音義提示", "使用場景備註"]
      }
    ],
    nameProfile: {
      chartStatus: "mock",
      chartType: "姓名學命盤骨架",
      displayName: "科科",
      analysisFocus: "字形 / 筆畫 / 五格 / 音義 / 使用情境",
      strokeStatus: "筆畫資料待正式校對",
      summary: "目前為 mock 姓名學骨架，用來規劃未來姓名學詳情頁呈現方式。"
    },
    nameStructureOverview: [
      {
        part: "姓氏",
        value: "待建立",
        theme: "家族來源、識別基礎與正式姓名起點",
        status: "planning",
        note: "目前尚未接入正式個人姓名資料。"
      },
      {
        part: "名字",
        value: "科科",
        theme: "日常識別、個人風格與他人記憶點",
        status: "mock",
        note: "目前為展示用 mock 名稱，不代表正式姓名學判斷。"
      },
      {
        part: "暱稱 / 稱呼",
        value: "科科",
        theme: "親近感、互動語氣與社群辨識度",
        status: "mock",
        note: "未來可整理不同情境下的稱呼版本。"
      }
    ],
    characterOverview: [
      {
        character: "科",
        position: "名字第 1 字",
        strokes: "待校對",
        elementHint: "五行待定",
        meaning: "知識、分類、條理與專業感的語意方向",
        status: "mock",
        note: "目前只做字義與欄位展示，未接正式筆畫或五行規則。"
      },
      {
        character: "科",
        position: "名字第 2 字",
        strokes: "待校對",
        elementHint: "五行待定",
        meaning: "重複字形成親切、輕快與容易記住的稱呼感",
        status: "mock",
        note: "目前只做語感展示，未接正式姓名學計算。"
      }
    ],
    fiveGridOverview: [
      {
        grid: "天格",
        value: "待建立",
        theme: "姓氏基礎、家族背景與外在起點",
        status: "planning",
        note: "未來需依正式姓名筆畫建立。"
      },
      {
        grid: "人格",
        value: "待建立",
        theme: "主要個性、行動方式與核心識別",
        status: "planning",
        note: "未來需依正式姓名筆畫建立。"
      },
      {
        grid: "地格",
        value: "待建立",
        theme: "早期經驗、人際互動與內在基礎",
        status: "planning",
        note: "未來需依正式姓名筆畫建立。"
      },
      {
        grid: "外格",
        value: "待建立",
        theme: "外在人緣、社交印象與互動方式",
        status: "planning",
        note: "未來需依正式姓名筆畫建立。"
      },
      {
        grid: "總格",
        value: "待建立",
        theme: "整體走向、長期累積與人生總結構",
        status: "planning",
        note: "未來需依正式姓名筆畫建立。"
      }
    ],
    soundMeaningOverview: [
      {
        item: "字音",
        theme: "讀音順口度、稱呼流暢度與記憶感",
        status: "planning",
        note: "目前只做觀察欄位，不做正式吉凶判定。"
      },
      {
        item: "字義",
        theme: "文字含義、象徵感與自我投射方向",
        status: "planning",
        note: "未來可整理每個字的語意來源與使用感。"
      },
      {
        item: "字形",
        theme: "視覺結構、平衡感與辨識度",
        status: "planning",
        note: "未來可整理字形複雜度與視覺印象。"
      },
      {
        item: "語感",
        theme: "他人聽到名字時的第一印象與親近感",
        status: "mock",
        note: "目前為 mock 語感觀察，不代表正式姓名學判斷。"
      }
    ],
    usageScenarioOverview: [
      {
        scenario: "正式文件",
        nameForm: "本名待建立",
        theme: "身分識別、正式場合與法律文件使用",
        status: "planning"
      },
      {
        scenario: "日常稱呼",
        nameForm: "科科",
        theme: "朋友互動、日常對話與親近感",
        status: "mock"
      },
      {
        scenario: "社群品牌",
        nameForm: "科科",
        theme: "網路識別、記憶點與個人小宇宙形象",
        status: "mock"
      }
    ],
    interpretationBlocks: [
      {
        title: "姓名結構觀察",
        level: "mock",
        content: "目前只作為姓名學詳情頁展示用，未代表正式姓名學結果。"
      },
      {
        title: "五格規劃",
        level: "planning",
        content: "未來可依正式姓名筆畫整理天格、人格、地格、外格與總格。"
      },
      {
        title: "音義語感",
        level: "planning",
        content: "未來可整理名字在不同情境中的語感、辨識度與互動印象。"
      }
    ],
    dataNotes: [
      "本頁目前為 mock / planning 架構。",
      "尚未接入正式姓名學計算。",
      "尚未接入正式筆畫、五格、三才五行或吉凶規則。",
      "本頁內容不得視為正式命理判斷，也不提供改名建議。"
    ]
  },
  luck: {
    id: "luck",
    order: 6,
    navLabel: "流年",
    icon: "運",
    category: "時間節奏",
    title: "流年 / 九運",
    subtitle: "年度主題與長週期節奏",
    status: "mock",
    route: "#/module/luck",
    summary: "整理年度、九運與長週期趨勢，作為命盤核心之外的節奏參考。",
    dashboardResult: {
      label: "目前結果",
      value: "2026 年度節奏觀察",
      note: "以 mock detail 資料顯示年度節奏與九運週期，未接入正式流年或九運計算。"
    },
    luckProfile: {
      chartStatus: "mock",
      chartType: "流年 / 九運節奏骨架",
      currentYear: "2026",
      currentCycle: "九運・離火運",
      cycleRange: "2024–2043",
      analysisFocus: "年度節奏 / 九運週期 / 主題整合 / 行動方向",
      summary: "目前為 mock 流年與九運骨架，用來規劃未來時間節奏詳情頁呈現方式。"
    },
    annualCycleOverview: [
      {
        label: "年度主題",
        value: "2026 丙午火馬年",
        theme: "外在節奏偏向啟動、曝光、熱度與快速變化。",
        status: "mock",
        note: "目前為展示用 mock 年度主題，不代表正式流年判斷。"
      },
      {
        label: "年度關鍵字",
        value: "熱度 / 轉換 / 推進",
        theme: "適合整理方向、調整節奏，避免只被外部變動牽著走。",
        status: "planning",
        note: "未來需接入正式年度資料與校對規則。"
      },
      {
        label: "年度提醒",
        value: "先穩住節奏，再追求突破",
        theme: "把年度節奏轉成可觀察、可調整的生活提醒。",
        status: "planning",
        note: "目前只做提醒文案骨架。"
      }
    ],
    nineLuckOverview: [
      {
        label: "九運週期",
        value: "九運・離火運",
        range: "2024–2043",
        theme: "火、光、影像、科技、文化、注意力與快速傳播。",
        status: "mock",
        note: "目前為九運 mock 主題展示，未接正式風水或命理判定。"
      },
      {
        label: "週期位置",
        value: "九運初期",
        range: "2024–2028",
        theme: "新週期建立期，適合觀察趨勢、建立新工具與新敘事。",
        status: "planning",
        note: "未來可細分初期、中段與後段。"
      },
      {
        label: "長期提醒",
        value: "避免只追熱點",
        range: "2024–2043",
        theme: "在變動快速的週期中，保留自己的資料、判斷與節奏。",
        status: "planning",
        note: "目前只做長週期提醒骨架。"
      }
    ],
    timelineOverview: [
      {
        period: "2024–2025",
        title: "九運開場",
        theme: "新週期開始，適合整理工具、學習新系統與建立基礎。",
        status: "planning"
      },
      {
        period: "2026",
        title: "年度聚焦",
        theme: "以 mock 方式標示為火馬年節奏觀察點，未代表正式流年。",
        status: "mock"
      },
      {
        period: "2027–2028",
        title: "節奏校正",
        theme: "觀察哪些方向值得持續，哪些只是短期熱度。",
        status: "planning"
      },
      {
        period: "2029–2034",
        title: "中段展開",
        theme: "未來可補九運中段主題，目前只保留時間軸位置。",
        status: "planning"
      },
      {
        period: "2035–2043",
        title: "後段整合",
        theme: "未來可補九運後段整理與收束方向。",
        status: "planning"
      }
    ],
    themeIntegration: [
      {
        title: "年度 × 九運",
        level: "mock",
        content: "目前先以年度節奏與九運週期做雙層觀察，避免把單一年份解讀成全部趨勢。"
      },
      {
        title: "外在變動 × 個人節奏",
        level: "planning",
        content: "未來可將流年 / 九運與五大核心命盤主題交叉整理，但本版不做正式整合。"
      },
      {
        title: "提醒 × 行動",
        level: "planning",
        content: "流年頁未來可把時間節奏轉成年度提醒、季度提醒與行動方向。"
      }
    ],
    actionNotes: [
      {
        title: "適合觀察",
        level: "mock",
        content: "觀察哪些外部趨勢只是熱度，哪些真正影響自己的長期方向。"
      },
      {
        title: "適合整理",
        level: "planning",
        content: "整理年度目標、工具系統、資料紀錄與可持續節奏。"
      },
      {
        title: "避免誤用",
        level: "planning",
        content: "不要把 mock 年度提醒當成正式運勢，也不要用來做重大決策。"
      }
    ],
    interpretationBlocks: [
      {
        title: "流年觀察",
        level: "mock",
        content: "目前只作為流年 / 九運詳情頁展示用，未代表正式流年推算結果。"
      },
      {
        title: "九運規劃",
        level: "planning",
        content: "未來可依正式資料整理九運週期、時間軸與長期主題。"
      },
      {
        title: "時間節奏整合",
        level: "planning",
        content: "未來可與五大核心命盤、農民曆與提醒系統交叉整理，但本版不做正式演算法。"
      }
    ],
    dataNotes: [
      "本頁目前為 mock / planning 架構。",
      "尚未接入正式流年 / 九運計算。",
      "尚未接入正式大運、小運、飛星、風水或年度資料校對規則。",
      "本頁內容不得視為正式運勢判斷，也不提供吉凶分數。",
      "本頁內容不得作為投資、健康、感情、工作或重大決策依據。"
    ],
    sections: [
      {
        title: "這個系統看什麼",
        items: ["年度焦點", "九運主題", "週期轉換", "行動節奏"]
      },
      {
        title: "科科目前資料狀態",
        items: ["目前為 planning 詳情頁", "只放欄位與未來內容方向"]
      },
      {
        title: "未來要補",
        items: ["年份資料表", "九運說明", "年度提醒", "與命盤核心的連動摘要"]
      }
    ]
  },
  yijing: {
    id: "yijing",
    order: 7,
    navLabel: "易經",
    icon: "卦",
    category: "時間節奏",
    title: "易經占問",
    subtitle: "問題、卦象與反思紀錄",
    status: "planning",
    route: "#/module/yijing",
    summary: "作為提問與反思入口，未來可整理問題、卦象、解讀與後續紀錄。",
    dashboardResult: {
      label: "目前結果",
      value: "占問入口規劃中",
      note: "先保留問題、卦象與解讀欄位，尚未建立正式占問流程。"
    },
    sections: [
      {
        title: "這個系統看什麼",
        items: ["提問情境", "本卦", "變卦", "行動提醒"]
      },
      {
        title: "科科目前資料狀態",
        items: ["目前為 planning 詳情頁", "尚未接入占問流程或卦象資料"]
      },
      {
        title: "未來要補",
        items: ["占問紀錄", "卦象資料表", "解讀模板", "回顧欄位"]
      }
    ]
  },
  "soul-tree": {
    id: "soul-tree",
    order: 8,
    navLabel: "命樹",
    icon: "樹",
    category: "命盤核心",
    title: "命樹",
    subtitle: "多命盤系統整合入口",
    status: "planning",
    route: "#/module/soul-tree",
    summary: "把八字、紫微、星盤、生命靈數與姓名學整合成一棵命理之樹。",
    dashboardResult: {
      label: "目前結果",
      value: "命盤整合入口",
      note: "根、幹、枝葉會整合紫微、八字、星盤、靈數與姓名學。"
    },
    sections: [
      {
        title: "這個系統看什麼",
        items: ["根：八字", "幹：日主 / 本命", "枝葉：紫微、星盤、靈數、姓名學"]
      },
      {
        title: "科科目前資料狀態",
        items: ["首頁已有命樹概念卡", "詳情頁先建立整合頁骨架"]
      },
      {
        title: "未來要補",
        items: ["系統關聯圖", "共同主題萃取", "衝突訊息標記", "整合式摘要"]
      }
    ]
  },
  database: {
    id: "database",
    order: 9,
    navLabel: "資料庫",
    icon: "庫",
    category: "工具資料",
    title: "資料庫 / 備份",
    subtitle: "資料匯出、匯入與備份紀錄",
    status: "planning",
    route: "#/module/database",
    summary: "先規劃靜態資料與備份入口，未來再評估本機儲存與匯出匯入流程。",
    dashboardResult: {
      label: "目前結果",
      value: "JSON 匯入匯出規劃中",
      note: "未來放個人資料、備份紀錄與資料版本檢查。"
    },
    sections: [
      {
        title: "這個系統看什麼",
        items: ["JSON 匯出", "資料匯入", "備份紀錄", "版本標記"]
      },
      {
        title: "科科目前資料狀態",
        items: ["目前為 planning 詳情頁", "底部工具仍是靜態入口"]
      },
      {
        title: "未來要補",
        items: ["資料格式定義", "匯出匯入驗證", "備份紀錄顯示", "localStorage 實驗"]
      }
    ]
  }
};
