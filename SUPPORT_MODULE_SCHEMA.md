# 科科命理宇宙站｜後半段模組 Schema 對照表

版本：v0.4.2
狀態：planning / experiment / seed 文件化
定位：本文件只記錄後半段模組目前結構與頁面對照，不代表正式命理計算、正式占問或正式資料庫功能已完成。

## 後半段總表

| 模組 | 顯示名 | route / anchor | 類型 | data source | 主要 renderer / feature | 狀態 |
| --- | --- | --- | --- | --- | --- | --- |
| 運 | 流年 / 九運 | #/module/luck | detail route | data/detail-pages-data.js | renderDetailPage 通用詳情頁 | planning |
| 曆 | 農民曆 | #almanac-title | dashboard support card / anchor | features/almanac-engine.js + vendor/lunar/lunar.js | renderTodayCard / almanac card 相關 render | experiment |
| 神 | 神明生日 | #deity-title | dashboard support card / anchor | data/deity-birthdays.js + features/deity-matcher.js | deity matcher / deity card 相關 render | seed |
| 卦 | 易經占問 | #/module/yijing | detail route | data/detail-pages-data.js | renderDetailPage 通用詳情頁 | planning |
| 樹 | 命樹 | #/module/soul-tree | detail route | data/detail-pages-data.js + dashboard tree card | renderDetailPage 通用詳情頁 / tree card | planning |
| 庫 | 資料庫 | #/module/database | detail route | data/detail-pages-data.js + export/import UI | renderDetailPage 通用詳情頁 / tools card | planning |

注意：

- 農民曆與神明生日目前不是 detail route。
- 農民曆目前主要在首頁 support card 顯示。
- 神明生日目前主要在首頁 support card 顯示，並受日期測試模式影響。
- 本版不新增 #/module/almanac 或 #/module/deity。
- 本版只文件化現況。

## 運｜流年 / 九運 luck

目前型態：

- detail route
- route: #/module/luck
- data source: data/detail-pages-data.js
- renderer: renderDetailPage 通用詳情頁
- 狀態：planning

目前必要欄位：

- id
- order
- navLabel
- icon
- category
- title
- subtitle
- status
- route
- summary
- dashboardResult 或 dashboardPreview
- sections

安全線：

- 目前只做 planning 架構
- 尚未接入正式流年 / 九運計算
- 不提供正式運勢判斷
- 不提供吉凶分數

後續深化方向：

- v0.5.0 可先深化流年 / 九運 mock 詳情頁
- 建立年度節奏、九運主題、時間軸與資料狀態提醒

## 曆｜農民曆 almanac

目前型態：

- dashboard support card / anchor
- anchor: #almanac-title
- data source: features/almanac-engine.js + vendor/lunar/lunar.js + data/site-data.js
- 狀態：experiment

目前相關結構：

- almanacEngine
- KekeAlmanacEngine
- getTodayAlmanac
- lunar-javascript
- test seeds 可能輔助日期驗收

安全線：

- 目前為 lunar-javascript 實驗資料
- 暫不取代人工校對資料
- 不提供正式農民曆吉凶斷言
- 不新增正式農民曆資料庫

後續深化方向：

- v0.5.x 可整理農民曆詳情或 dashboard support 區塊
- 先補資料狀態提醒與欄位對照，不急著做新 route

## 神｜神明生日 deity

目前型態：

- dashboard support card / anchor
- anchor: #deity-title
- data source: data/deity-birthdays.js + features/deity-matcher.js + features/date-test-mode.js
- 狀態：seed

目前相關結構：

- KekeDeityBirthdays
- KekeDeityMatcher
- KekeDateTestMode
- testLunarMonth
- testLunarDay
- seed 資料表

安全線：

- seed 資料表不代表完整神明生日資料庫
- 命中只代表資料表測試命中
- 不提供宗教斷言
- 不宣稱資料完整
- 日期測試模式不可破壞

後續深化方向：

- v0.5.x 可整理神明生日詳情或 dashboard support 區塊
- 可文件化 seed 欄位與測試方式
- 不急著接正式資料庫

## 卦｜易經占問 yijing

目前型態：

- detail route
- route: #/module/yijing
- data source: data/detail-pages-data.js
- renderer: renderDetailPage 通用詳情頁
- 狀態：planning

目前必要欄位：

- id
- order
- navLabel
- icon
- category
- title
- subtitle
- status
- route
- summary
- dashboardResult 或 dashboardPreview
- sections

安全線：

- 目前只做 planning 架構
- 尚未接入正式易經占問
- 不做神諭式斷言
- 不做吉凶判定
- 不儲存提問內容

後續深化方向：

- v0.5.x 可做易經占問 mock 骨架
- 先定義問題、卦象、爻辭、解讀、資料狀態提醒
- 不做真正起卦與占問結果

## 樹｜命樹 soul-tree

目前型態：

- detail route
- route: #/module/soul-tree
- data source: data/detail-pages-data.js + dashboard tree card
- renderer: renderDetailPage 通用詳情頁 / tree card
- 狀態：planning

目前必要欄位：

- id
- order
- navLabel
- icon
- category
- title
- subtitle
- status
- route
- summary
- dashboardResult 或 dashboardPreview
- sections

安全線：

- 目前只做 planning 架構
- 尚未接入五大核心正式整合
- 不宣稱已完成跨系統命理整合
- 不提供最終命運結論

後續深化方向：

- v0.5.x 可做命樹整合頁 mock 深化
- 以五大核心頁作為來源，整理共通主題、差異主題與資料狀態
- 不做正式合盤演算法

## 庫｜資料庫 database

目前型態：

- detail route
- route: #/module/database
- data source: data/detail-pages-data.js + tools card
- renderer: renderDetailPage 通用詳情頁 / tools card
- 狀態：planning

目前必要欄位：

- id
- order
- navLabel
- icon
- category
- title
- subtitle
- status
- route
- summary
- dashboardResult 或 dashboardPreview
- sections

安全線：

- 目前只做 planning 架構
- 沒有真正資料庫
- 沒有後端
- 沒有登入
- 沒有雲端同步
- 匯出 / 匯入目前仍是前端工具概念
- 不儲存使用者個資

後續深化方向：

- v0.5.x 可做資料庫 / 備份頁 mock 深化
- 文件化 JSON 匯出、匯入、備份紀錄與資料版本
- 不接正式資料庫

## 共同規則

- 後半段模組分成 detail route 與 dashboard support card / anchor。
- detail route 模組目前走 #/module/...。
- 農民曆與神明生日目前走首頁 support card 與 anchor，不新增 detail route。
- 所有後半段模組目前都是 planning / experiment / seed。
- 不接 API、不接資料庫、不讀取使用者個資。
- 不提供正式命理判斷、正式占問結果、宗教斷言或吉凶分數。
- 日期測試模式只用於神明生日 seed 命中驗收，不代表正式日曆功能。
- 後續 v0.5.x 才開始逐一深化後半段模組。

## v0.5.x 深化順序建議

- v0.5.0 流年 / 九運 mock 深化
- v0.5.1 農民曆 support 區塊整理
- v0.5.2 神明生日 support 區塊整理
- v0.5.3 易經占問 mock 深化
- v0.5.4 命樹整合頁 mock 深化
- v0.5.5 資料庫 / 備份頁 mock 深化
