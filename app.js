const modules = [
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
];

const navItems = [
  { title: "首頁總覽", icon: "首", href: "#top" },
  { title: "個人資料", icon: "人", href: "#profile-title" },
  { title: "紫微斗數", icon: "紫", href: "#module-title" },
  { title: "八字四柱", icon: "八", href: "#module-title" },
  { title: "西洋星盤", icon: "星", href: "#module-title" },
  { title: "生命靈數", icon: "數", href: "#life-number-title" },
  { title: "農民曆", icon: "曆", href: "#almanac-title" },
  { title: "神明生日", icon: "神", href: "#deity-title" },
  { title: "易經占問", icon: "易", href: "#deity-title" },
  { title: "命樹", icon: "樹", href: "#tree-title" },
  { title: "資料庫", icon: "庫", href: "#tool-title" }
];

function renderModules() {
  const moduleGrid = document.querySelector("#moduleGrid");

  moduleGrid.innerHTML = modules.map((item) => `
    <a class="module-item" href="${item.href}">
      <span class="module-icon" aria-hidden="true">${item.icon}</span>
      <span>
        <strong>${item.title}</strong>
        <small>${item.note}</small>
      </span>
      <span class="module-arrow" aria-hidden="true">›</span>
    </a>
  `).join("");
}

function renderDesktopNav() {
  const desktopNav = document.querySelector("#desktopNav");

  desktopNav.innerHTML = navItems.map((item) => `
    <a href="${item.href}">
      <span aria-hidden="true">${item.icon}</span>
      <span>${item.title}</span>
    </a>
  `).join("");
}

renderModules();
renderDesktopNav();
