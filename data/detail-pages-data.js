window.KekeDetailPages = {
  ziwei: {
    id: "ziwei",
    title: "紫微斗數",
    subtitle: "命宮、主星與人生主題",
    status: "mock",
    route: "#/module/ziwei",
    summary: "以命宮、主星與十二宮位看見個人性格、人生課題與行動方向。",
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
    title: "八字四柱",
    subtitle: "年柱、月柱、日柱與時柱",
    status: "mock",
    route: "#/module/bazi",
    summary: "以出生年月日時的四柱結構，整理日主、五行分布與生命節奏。",
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
    title: "西洋星盤",
    subtitle: "太陽、月亮、上升與行星落點",
    status: "mock",
    route: "#/module/astrology",
    summary: "以星座、宮位與相位整理人格傾向、情緒模式與對外互動方式。",
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
    title: "生命靈數",
    subtitle: "核心數字與年度節奏",
    status: "experiment",
    route: "#/module/numerology",
    summary: "以生日數字整理生命主題、個人年、個人月與每日行動提醒。",
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
    title: "姓名學",
    subtitle: "姓名結構、五格與語感提示",
    status: "mock",
    route: "#/module/name",
    summary: "以姓名字形、筆畫與語感整理個人識別、能量感與使用情境。",
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
    title: "流年 / 九運",
    subtitle: "年度主題與長週期節奏",
    status: "planning",
    route: "#/module/luck",
    summary: "整理年度、九運與長週期趨勢，作為命盤核心之外的節奏參考。",
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
    title: "易經占問",
    subtitle: "問題、卦象與反思紀錄",
    status: "planning",
    route: "#/module/yijing",
    summary: "作為提問與反思入口，未來可整理問題、卦象、解讀與後續紀錄。",
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
    title: "命樹",
    subtitle: "多命盤系統整合入口",
    status: "planning",
    route: "#/module/soul-tree",
    summary: "把八字、紫微、星盤、生命靈數與姓名學整合成一棵命理之樹。",
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
    title: "資料庫 / 備份",
    subtitle: "資料匯出、匯入與備份紀錄",
    status: "planning",
    route: "#/module/database",
    summary: "先規劃靜態資料與備份入口，未來再評估本機儲存與匯出匯入流程。",
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
