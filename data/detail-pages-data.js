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
    status: "planning",
    route: "#/module/luck",
    summary: "整理年度、九運與長週期趨勢，作為命盤核心之外的節奏參考。",
    dashboardResult: {
      label: "目前結果",
      value: "流年節奏規劃中",
      note: "先以 planning 資料顯示，未接入正式流年或九運計算。"
    },
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
