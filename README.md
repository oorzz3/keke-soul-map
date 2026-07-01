## v0.6.3 生命靈數主線封章與五大核心模組施工模板

目前版本：v0.6.3。

v0.6.3 封章生命靈數主線，將 v0.6.0 正式計算、v0.6.1 靜態解讀資料層、v0.6.2 詳情頁產品化文案與 v0.6.2.1 首頁語意修正整理成五大核心模組施工模板。

- 新增 `CORE_MODULE_TEMPLATE.md`：記錄 input / calculator / meaning / homepage / detail / safety / check 七層標準。
- `data/site-data.js` 新增 `coreModuleTemplate`，狀態為 `template-locked`。
- 生命靈數保留 calculated、static-interpretation 與 planning 三層範例。
- 其他四大核心仍維持 partial / planning，不新增正式演算法。
- 農民曆與神明生日仍是輔助提醒，不新增 `#/module/almanac` 或 `#/module/deity`。
## v0.6.2.1 首頁生命靈數重複語意修正

目前版本：v0.6.2.1。

v0.6.2.1 修正首頁 rhythm row 與命盤核心矩陣同時強調生命靈數造成的語意重複；核心矩陣保留生命靈數入口，小節奏卡改為今日數字節奏，聚焦個人年、個人月與個人日。

- 命盤核心矩陣的生命靈數入口保留。
- rhythm row 小卡改名為「今日數字節奏」。
- 小卡主視覺改為個人日，不再用「生命靈數 7」作為 rhythm row 主視覺。
- `data/numerology-meanings.js` 保留既有 1～9、生日數與個人節奏解讀主內容，只更新版本資料。
- `features/numerology-calculator.js` 演算法維持 v0.6.0 規則，v0.6.2.1 不改計算邏輯。
- 首頁 layout、五大核心 mini visual、ready / partial chip、農民曆與神明生日短卡都維持原狀。

## v0.6.1 生命靈數解讀資料層整理

目前版本：v0.6.1。

v0.6.1 在 v0.6.0 生命靈數正式計算基礎上，新增 `data/numerology-meanings.js` 靜態解讀資料層，讓 `lifePathNumber`、`birthDayNumber`、`personalYear`、`personalMonth`、`personalDay` 可以對應到穩定文字資料。

- 新增 `KekeNumerologyMeanings`。
- 新增 `lifePathMeanings`、`birthDayMeanings`、`personalYearMeanings`、`personalMonthMeanings`、`personalDayMeanings`。
- 新增 `safetyLines`，標明生命靈數只作自我觀察與節奏提醒。
- `features/numerology-calculator.js` 演算法維持 v0.6.0 規則，不新增 master number 模式。
- `#/module/numerology` 會顯示 calculated panel 與 static interpretation panel。
- 本版不新增 API、fetch、後端、資料庫、登入、表單或 localStorage 個資寫入。

## v0.6.0 生命靈數正式計算接入

目前版本：v0.6.0。

v0.6.0 以 `data/site-data.js` 的 `coreInputProfile.birth.solarDate` 作為資料來源，新增 `features/numerology-calculator.js`，接入生命靈數正式 1～9 化簡規則，並同步首頁生命靈數卡與 `#/module/numerology` 詳情頁。

- 已計算：生命靈數、生日數、個人年、個人月、個人日。
- 計算方法：`digit-reduction-1-to-9`，本版不保留 11 / 22 / 33 master number。
- 資料來源：靜態 seed `coreInputProfile.birth.solarDate`，目前不新增表單、不儲存個資、不接 API / 後端 / 資料庫。
- 紫微、八字、西洋星盤、姓名學仍維持 mock / planning 或 partial 狀態，本版不接入正式演算法。

## v0.5.1.7 五大核心輸入資料欄位鎖定

目前版本：v0.5.1.7。

v0.5.1.7 鎖定五大核心命盤未來正式運算所需的共用輸入欄位、各核心欄位需求與資料完整度狀態。首頁只輕量顯示 `seed`、`local-static` 與 ready / partial 狀態，不新增表單、不儲存使用者個資、不接 API / 後端 / 資料庫，也不開始正式命盤運算。

- 新增 `coreInputProfile`：五大核心共用輸入 seed。
- 新增 `coreInputSchema`：欄位用途、共用欄位、選填欄位與安全線。
- 新增 `coreCalculationRequirements`：五大核心各自 requiredFields / optionalFields / blockedBy / readiness。
- `numerology` 標記為 `ready`；`ziwei`、`bazi`、`astrology`、`name` 標記為 `partial`。

## v0.5.1.6 首頁核心五卡辨識度小修

目前版本：v0.5.1.6。

v0.5.1.6 在 v0.5.1.5 穩定首頁 renderer 基礎上，為五大核心命盤卡片補上識別用 mini visual。紫微、八字、西洋星盤、生命靈數與姓名學現在各自有不同的小視覺提示，但首頁整體 layout、hero band、節奏列、support strip、router、農民曆與神明生日流程都維持不變。

## v0.5.1.5 首頁 render 重複區塊清理

目前版本：v0.5.1.5。

v0.5.1.5 清理 v0.5.1.4 production prototype 移植後殘留的重複首頁 renderer，只保留唯一生效的首頁 render 版本。首頁畫面、hash router、五大核心詳情頁、流年 / 九運詳情頁、農民曆與神明生日 support 流程都維持不變。

# 科科命理宇宙站 / keke-soul-map

## v0.5.1.4 首頁 production prototype 移植

目前版本：v0.5.1.7。

v0.5.1.4 依據首頁 production prototype v2 移植視覺骨架，重整 hero band、core grid、rhythm row、support strip 與 bottom insight strip。首頁保留五大核心命盤與既有 hash router，農民曆與神明生日維持 support 短卡，不新增 `#/module/almanac` 或 `#/module/deity`。

本版仍是純 HTML / CSS / JS，未新增 npm、API、後端、資料庫或正式命理演算法。

GitHub Pages: https://oorzz3.github.io/keke-soul-map/

科科命理宇宙站是一個手機優先的命盤總控台靜態網站，使用純 HTML / CSS / JavaScript，可直接部署於 GitHub Pages。

目前版本：

- 網站版本：v0.5.1.7
- 網站資料層版本：v0.2
- 靜態資源快取版本：v0.5.1.7

## 專案定位

- 首頁 = 命盤總控台
- 小卡片 = 各命理系統入口
- 點進卡片 = 對應命盤詳情頁
- 農民曆 / 神明生日 = 輔助提醒，不是主軸
- 命樹 = 多命盤系統整合入口

## v0.5.1.4 首頁 Blueprint 視覺二修

v0.5.1.4 依照首頁建構圖重排 dashboard 骨架，從「內容瘦身」推進到實際視覺結構調整。

- 首頁改以 `dashboard-hero-band`、`dashboard-core-grid`、`dashboard-rhythm-row`、`dashboard-support-strip` 四段呈現。
- 本命摘要改成橫向 hero band，五大命盤核心維持主視覺。
- 今日摘要、生命靈數與命樹保留為中卡節奏區。
- 農民曆、神明生日與資料工具短卡化，只保留首頁必要摘要。
- 農民曆 / 神明生日仍是 support / anchor，不新增 `#/module/almanac` 或 `#/module/deity`。
- 本版仍是純 HTML / CSS / JS，未新增 npm、API、後端或資料庫。

## v0.5.1.2 首頁架構圖對齊 × Dashboard 密度收束

v0.5.1.2 依照命理宇宙站總控台參考圖，收束首頁 dashboard 的資訊密度。

- 首頁主軸維持命盤核心優先，五大核心入口仍是主要視覺。
- 首頁卡片只顯示濃縮摘要：標題、主結果 / 摘要、短提醒或狀態。
- 農民曆與神明生日維持 dashboard support card / anchor，不新增 detail route。
- 農民曆安全線、mock / experiment 說明保留於 `almanacSupport` metadata、`SUPPORT_MODULE_SCHEMA.md` 與 `scripts/check-site.js`。
- `dashboardLayout` 記錄首頁架構圖對齊與密度收束規則。
- 純 HTML / CSS / JS 靜態網站邊界仍保留。

## v0.5.1.1 農民曆 support card 瘦身補丁

v0.5.1.1 瘦身首頁農民曆 support card，讓它回到短卡片 / 快速掃讀定位。

- 移除首頁農民曆卡片的大段安全線顯示。
- 前台只保留今日陽曆、今日農曆、農曆月日、輕量節奏資訊與短提醒。
- 安全線仍保留於 `almanacSupport` metadata、`SUPPORT_MODULE_SCHEMA.md` 與 `scripts/check-site.js`。
- 不新增農民曆 detail route，不新增 `#/module/almanac`。
- 不改 `features/almanac-engine.js`，不改 `vendor/lunar/lunar.js`。
- 純 HTML / CSS / JS 靜態網站邊界仍保留。

## v0.5.1 農民曆 support 區塊整理

v0.5.1 整理首頁農民曆 support 區塊，農民曆仍是首頁 dashboard support card / anchor，不新增 `#/module/almanac`。

- 新增 / 整理 `almanacSupport` metadata，補充資料來源、experiment 狀態與安全線。
- 農民曆卡片顯示今日陽曆、今日農曆、資料狀態與資料來源。
- 目前為 `lunar-javascript` experiment，暫不取代人工校對。
- 不提供正式農民曆吉凶斷言，不提供正式宜忌、沖煞或時辰判定。
- `SUPPORT_MODULE_SCHEMA.md` 已更新為 v0.5.1，標記農民曆進入 support整理 / experiment。
- 純 HTML / CSS / JS 靜態網站邊界仍保留，不新增 npm / API / 後端。

## v0.5.0 流年 / 九運 mock 詳情頁深化

v0.5.0 開始後半段第一個模組深化：`#/module/luck` 從通用 detail page 升級為流年 / 九運 mock detail page。

- `SUPPORT_MODULE_SCHEMA.md` 已更新為 v0.5.0，標記 luck 進入 mock detail。
- 新增流年 / 九運摘要、年度節奏、九運週期、年度時間軸、主題整合、行動提醒、解讀重點與資料狀態提醒。
- 本版仍未接入正式流年 / 九運計算。
- 不提供正式運勢判斷，不提供吉凶分數。
- 農民曆與神明生日仍是 dashboard support card / anchor，沒有新增 detail route。
- 純 HTML / CSS / JS 靜態網站邊界仍保留，不新增 npm / API / 後端。

## v0.4.2 後半段模組 schema 文件化

v0.4.2 新增 `SUPPORT_MODULE_SCHEMA.md`，把後半段模組的 route / anchor、data source、renderer / feature、狀態與安全線整理成文件。

- `CORE_DETAIL_SCHEMA.md` 與 `SUPPORT_MODULE_SCHEMA.md` 並存。
- 後半段模組包含：流年 / 九運、農民曆、神明生日、易經占問、命樹、資料庫。
- 本版只做 schema 文件化，未新增正式命理計算、正式占問或正式資料庫。
- 農民曆與神明生日仍是 dashboard support card / anchor，沒有新增 detail route。
- 純 HTML / CSS / JS 靜態網站邊界仍保留，不新增 npm / API / 後端。
- v0.4.x 階段以文件化與地基整理為主，v0.5.x 才開始深化後半段模組。

## v0.4.1 五大核心 schema 文件化

v0.4.1 新增 `CORE_DETAIL_SCHEMA.md`，把五大核心詳情頁的 route、data schema、renderer、CSS class 與 mock / planning / experiment 安全線整理成文件。

- 五大核心詳情頁已完成 mock / planning 骨架。
- 本版只做 schema 文件化，未新增正式命理計算。
- `CORE_DETAIL_SCHEMA.md` 記錄紫微、八字、星盤、生命靈數、姓名學的必要欄位與 renderer 對照。
- 目前不是正式算命工具，而是命理資料結構與頁面原型。
- 純 HTML / CSS / JS 靜態網站邊界仍保留，不新增 npm / API / 後端。

## v0.4.0 五大核心詳情頁節奏整理

v0.4.0 是五大核心詳情頁整理封章版，整理紫微斗數、八字四柱、西洋星盤、生命靈數與姓名學的 mock / planning 詳情頁節奏，讓後續正式資料接入前的地基更乾淨。

- 五大核心詳情頁都保留專屬 detail renderer。
- 生命靈數 renderer 命名已收束為 `renderNumerologyRhythmOverview` 與 `renderNumerologyNumberMeanings`。
- `scripts/check-site.js` 已更新版本、檢查訊息與舊 renderer 名稱殘留檢查。
- 五大核心詳情頁都明確標示 mock / planning，仍未接入正式命理計算。
- 姓名學頁仍明確標示不提供改名建議。
- 保留首頁總控台、hash router、lunar、神明生日與日期測試模式。
- 仍維持純 HTML / CSS / JS 靜態網站，不新增 npm / API / 後端。

## v0.3.9 姓名學詳情頁 mock 深化

v0.3.9 深化 `index.html#/module/name`，先建立姓名學詳情頁的 mock / planning 資料與渲染骨架，仍不做正式姓名學計算。

- 新增 `nameProfile` 姓名學摘要。
- 新增 `nameStructureOverview`，規劃姓氏、名字與暱稱 / 稱呼。
- 新增 `characterOverview`，保留單字筆畫與字義草稿。
- 新增 `fiveGridOverview`，規劃天格、人格、地格、外格與總格。
- 新增 `soundMeaningOverview` 與 `usageScenarioOverview`，整理音義語感與使用情境。
- 新增姓名學解讀重點與資料狀態提醒。
- `app.js` 新增 `renderNameDetail` 與相關 renderer。
- 尚未接入正式姓名學計算，內容不可視為正式命理判斷。
- 不提供改名建議，不做吉凶分數或姓名優劣斷言。
- 保留紫微、八字、西洋星盤、生命靈數詳情頁、首頁總控台、hash router、lunar、神明生日與日期測試模式。

## v0.3.8 生命靈數詳情頁 mock 深化

v0.3.8 深化 `index.html#/module/numerology`，先建立生命靈數詳情頁的 mock 資料與渲染骨架，仍不做正式生命靈數計算。

- 新增 `numerologyProfile` 靈數摘要。
- 新增 `coreNumberOverview`，規劃生命靈數、生日數與命運數。
- 新增 `birthBreakdownDraft`，保留年份、月份、日期、總和拆解欄位。
- 新增 `rhythmOverview`，規劃個人年、個人月與個人日節奏。
- 新增 `numberMeaningOverview`，整理數字 1～9 的意義對照。
- 新增 `actionNotes` 行動節奏、解讀重點與資料狀態提醒。
- `app.js` 新增 `renderNumerologyDetail` 與相關 renderer。
- 尚未接入正式生命靈數計算，內容不可視為正式命理判斷。
- 保留紫微、八字、西洋星盤詳情頁、其他 mock 詳情頁、首頁總控台、hash router、lunar、神明生日與日期測試模式。

## v0.3.7 西洋星盤詳情頁 mock 深化

v0.3.7 深化 `index.html#/module/astrology`，先建立西洋星盤詳情頁的 mock 資料與渲染骨架，仍不做真正西洋星盤計算。

- 新增 `astrologyProfile` 星盤摘要。
- 新增 `axisOverview`，規劃太陽、月亮、上升三軸。
- 新增 `planetOverview`，規劃水星、金星、火星、木星、土星。
- 新增 `houseOverview`，保留十二宮位 planning 骨架。
- 新增 `aspectOverview`，規劃合相、對分相、四分相、三分相、六分相。
- 新增星盤解讀重點與資料狀態提醒。
- `app.js` 新增 `renderAstrologyDetail` 與相關 renderer。
- 尚未接入正式西洋星盤計算，內容不可視為正式命理判斷。
- 保留紫微詳情頁、八字詳情頁、其他 mock 詳情頁、首頁總控台、hash router、lunar、神明生日與日期測試模式。

## v0.3.6 八字四柱詳情頁 mock 深化

v0.3.6 深化 `index.html#/module/bazi`，先建立八字四柱詳情頁的 mock 資料與渲染骨架，仍不做真正八字排盤。

- 新增 `baziProfile` 八字命盤摘要。
- 新增 `pillarOverview`，規劃年柱、月柱、日柱、時柱欄位。
- 新增 `fiveElementOverview`，保留木、火、土、金、水的 mock 分布欄位。
- 新增 `tenGodOverview`，整理比劫、食傷、財星、官殺、印星的 planning 結構。
- 新增八字解讀重點與資料狀態提醒。
- `app.js` 新增 `renderBaziDetail` 與相關 renderer。
- 尚未接入正式八字排盤演算法，內容不可視為正式命理判斷。
- 保留紫微詳情頁、其他 mock 詳情頁、首頁總控台、hash router、lunar、神明生日與日期測試模式。
## v0.3.5 紫微斗數詳情頁 mock 深化

v0.3.5 深化紫微斗數詳情頁 mock，讓 `index.html#/module/ziwei` 不只顯示通用 sections，而是先長出命盤內頁骨架。

- 新增紫微命盤摘要
- 新增命宮 / 身宮 / 主星組合 mock 欄位
- 新增十二宮位規劃
- 新增解讀重點
- 新增資料狀態提醒
- 本版仍尚未接入正式演算法，不做真正紫微斗數排盤、星曜計算或出生時間推算
- 其他命盤詳情頁仍維持既有 mock / planning
- 首頁三段式 dashboard、hash router、lunar、deity matcher、date test mode 均保留

## v0.3.4 工程整理版

v0.3.4 先整理工程工具，不新增命理內容，也不改首頁視覺。

- 小貓龍蝦檢查改為分組輸出，讓後續驗收比較好讀
- `scripts/check-site.js` 補上共用 helper，降低大量零散字串檢查的維護負擔
- `data/site-data.js` 新增 `versionPolicy`
- 保留首頁三段式總控台、hash router、detail pages、lunar、deity matcher、date test mode

小貓龍蝦檢查分組：

- `version-sync`
- `required-files`
- `dashboard-structure`
- `router-checks`
- `detail-data-checks`
- `almanac-deity-checks`
- `risk-checks`
- `docs-checks`

版本策略：

- `productVersion`：標記功能與施工進度
- `cacheVersion`：用於 GitHub Pages 靜態資源刷新
- `dataVersion`：標記資料層結構版本

## v0.3.3 修正

v0.3.3 將首頁總控台重整為三段式版面：

- 上層：本命摘要與命盤核心
- 中層：今日科科摘要、今日數字節奏與命樹整合摘要
- 底層：農民曆、神明生日與資料工具
- moduleCard 收斂為命盤核心入口，不再混入整合工具與輔助提醒
- 命樹卡新增整合摘要，顯示流年 / 易經 / 命樹 / 資料庫目前結果
- 保留 hash router、detail pages、lunar、deity matcher、date test mode
- 本版仍只做版面重整，不新增真正命理演算法

## v0.3.2.2 修正

v0.3.2.2 整理首頁資訊層級，讓命盤核心維持主軸，日常提醒退回輔助位置。

- 生命靈數改為小節奏卡，不再與命盤核心搶主視覺
- 整合與工具加入目前結果摘要，入口更像可讀的規劃卡
- 農民曆與神明生日改為 compact 輔助提醒
- 保留 hash router、detail pages、lunar、deity matcher、date test mode
- 靜態資源快取參數更新為 v0.3.2.2

## v0.3.2.1 修正

v0.3.2.1 修正首頁命盤核心卡片寬度，避免紫微、八字、西洋星盤、生命靈數、姓名學被壓成直排牙籤卡。

- 命盤核心大卡改為佔據首頁主要寬度
- 核心卡片使用自適應最小寬度，不硬塞五張同排
- 桌機版以 2～3 欄為主，中寬畫面 2 欄，手機版 1 欄
- 整合與工具、輔助提醒仍保留，但不擠壓核心卡片
- router、detail pages、lunar、deity matcher、date test mode 均保留

## v0.3.2 重點

v0.3.2 將首頁命盤核心入口升級成更接近總控台的卡片預覽：

- 前五個命盤核心入口改為總控台式預覽卡
- `data/detail-pages-data.js` 新增 `dashboardPreview`
- 紫微、八字、星盤、生命靈數、姓名學提供首頁預覽欄位
- 流年 / 九運、易經占問、命樹、資料庫 / 備份改為整合與工具入口
- 農民曆與神明生日維持輔助提醒，不搶首頁主軸
- 本版仍只做 mock / planning，不做真正命理演算法
- 保留 hash router、detailView、lunar 農民曆實驗、神明生日資料表與日期測試模式

路由範例：

```text
index.html#/module/ziwei
index.html#/module/bazi
index.html#/module/astrology
index.html#/module/database
```

舊錨點仍保留，例如：

```text
index.html#deity-title
index.html?testLunarMonth=2&testLunarDay=19#deity-title
```

## 已完成功能

- 本命摘要
- 今日科科摘要
- 生命靈數卡
- 命盤核心入口
- 命盤詳情頁骨架
- 詳情頁上一個 / 下一個導覽
- 命樹卡
- 今日農民曆 mock 卡
- lunar-javascript 農民曆實驗資料
- 今日神明生日 mock 範例
- 神明生日 seed 資料表實驗
- 日期測試模式
- 資料工具區
- 版本號顯示
- 小貓龍蝦檢查腳本

## 本機檢查方式

雙擊：

```bat
run-check-site.bat
```

或執行：

```bat
node scripts/check-site.js
```

## 目前限制

- 詳情頁資料仍是 mock / planning 展示資料
- 尚未做真正紫微斗數演算法
- 尚未做真正八字排盤
- 尚未做真正西洋星盤計算
- 尚未接 API / 後端 / 資料庫
- 按鈕與資料工具目前多為靜態入口
- 神明生日 seed 資料表尚不完整，不代表正式民俗資料庫

## 協作規則

- 小科寫規格
- 小丸施工
- 科科驗收
- 科科手動 commit / push

## 快取提醒

GitHub Pages 更新後如果看到舊畫面，可以先使用 Ctrl + F5 強制重新整理。v0.5.1.7 已將主要靜態資源引用更新為 `v=0.5.1.7`，降低瀏覽器吃到舊檔的機率。

## 下一步建議

v0.5.2 可評估神明生日 support 區塊整理；仍建議先維持 mock / planning，不急著接真正排盤演算法。
