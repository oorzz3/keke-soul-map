# 科科命理宇宙站 / keke-soul-map

GitHub Pages: https://oorzz3.github.io/keke-soul-map/

科科命理宇宙站是一個手機優先的命盤總控台靜態網站，使用純 HTML / CSS / JavaScript，可直接部署於 GitHub Pages。

目前版本：

- 網站版本：v0.3.9
- 網站資料層版本：v0.2
- 靜態資源快取版本：v0.3.9

## 專案定位

- 首頁 = 命盤總控台
- 小卡片 = 各命理系統入口
- 點進卡片 = 對應命盤詳情頁
- 農民曆 / 神明生日 = 輔助提醒，不是主軸
- 命樹 = 多命盤系統整合入口

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
- 中層：今日科科摘要、生命靈數節奏與命樹整合摘要
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

GitHub Pages 更新後如果看到舊畫面，可以先使用 Ctrl + F5 強制重新整理。v0.3.9 已將主要靜態資源引用更新為 `v=0.3.9`，降低瀏覽器吃到舊檔的機率。

## 下一步建議

v0.3.9 後可評估五大核心詳情頁 renderer 是否需要共用 helper，或逐步準備 v0.4.0 總控台視覺整合；仍建議先維持 mock / planning，不急著接真正排盤演算法。
