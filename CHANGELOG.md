# CHANGELOG

## v0.3.6｜八字四柱詳情頁 mock 深化

- 深化 `bazi` detail data。
- 新增八字命盤摘要、四柱規劃、五行分布、十神關係、解讀重點與資料狀態提醒。
- `app.js` 新增八字專屬詳情頁 renderer。
- 保留紫微詳情頁與其他命盤 mock / planning 詳情頁。
- 保留首頁總控台、hash router、lunar、神明生日與日期測試模式。
- 本版尚未接入正式八字排盤演算法。
## v0.3.5｜紫微斗數詳情頁 mock 深化

- 深化 `ziwei` detail data
- 新增紫微命盤摘要、十二宮位規劃、解讀重點與資料狀態提醒
- `app.js` 支援紫微專屬詳情頁渲染
- 保留其他命盤頁 mock / planning
- 保留首頁總控台、hash router、lunar、神明生日與日期測試模式

## v0.3.4｜小貓龍蝦檢查瘦身 × 版本策略收束

- 重構 `scripts/check-site.js` 的檢查分組
- 建立版本同步、必要檔案、首頁結構、router、detail data、lunar/deity、高風險與文件檢查分類
- 補充版本策略說明
- 保留首頁三段式總控台、hash router、詳情頁、lunar、神明生日與日期測試模式
- 不新增 npm / API / 後端

## v0.3.3｜首頁總控台版面重整版

- 首頁改為上層 / 中層 / 底層三段式 dashboard zone
- moduleCard 收斂為命盤核心入口
- 整合工具摘要移到命樹卡，讀取 dashboardResult
- 農民曆與神明生日維持 compact 輔助提醒
- 保留 hash router、detail pages、lunar、神明生日與日期測試模式
- 靜態資源快取參數更新為 v0.3.3

## v0.3.2.2｜首頁資訊層級整理版

- 調整生命靈數卡為小節奏摘要
- 整合與工具加入 dashboardResult 目前結果摘要
- 農民曆與神明生日改為 compact 輔助提醒
- 保留 hash router、detail pages、lunar、deity matcher 與日期測試模式
- 靜態資源快取參數更新為 v0.3.2.2

## v0.3.2.1｜命盤核心卡片寬度修正版

- 修正首頁命盤核心卡片被擠壓成直排窄卡的問題
- 命盤核心區改用更穩定的自適應欄寬
- 桌機版核心卡維持 2～3 欄，中寬畫面 2 欄，手機版 1 欄
- 整合與工具、輔助提醒維持小卡，不再擠壓核心卡
- 靜態資源快取參數更新為 v0.3.2.1

## v0.3.2｜命盤核心卡片升級版

- 首頁命盤核心區改為更接近總控台的預覽卡片
- 紫微、八字、星盤、生命靈數、姓名學新增 `dashboardPreview`
- 整合與工具、輔助提醒分組更清楚
- 保留 hash router、詳情頁、lunar、神明生日與日期測試模式
- 小貓龍蝦檢查加入命盤核心卡片檢查

## v0.3.1｜路由與詳情頁體驗修正版

- 強化 hash router 輔助函式
- 詳情頁新增上一個 / 下一個命盤導覽
- 側欄與模組卡新增 active 狀態
- route not found 頁面強化
- 保留首頁總控台、lunar、神明生日與日期測試模式

## v0.3.0｜hash router + 命盤詳情頁骨架 + 最小資料拆分

- 新增 `features/router.js`
- 新增 `data/detail-pages-data.js`
- 新增 `dashboardView` / `detailView` 切換
- 命盤核心卡片可進入詳情頁
- 詳情頁顯示 mock / experiment / planning 狀態
- 保留首頁總控台、lunar、神明生日與日期測試模式
- 小貓龍蝦檢查加入 route / detail 檢查

## v0.2.5｜首頁主軸重排版

- 首頁視覺重心改為命盤核心
- 命理模組與命樹提前
- 農民曆與神明生日降為輔助提醒區
- 保留 lunar 實驗、神明生日資料表與日期測試模式
- 小貓龍蝦檢查加入主軸重排檢查

## v0.2.4.1｜神明生日卡語意修正 × 回今日模式連結修正

- 神明生日卡主內容改為優先顯示資料表比對結果
- 原 mock deityDay 改為固定展示範例
- 修正本機 file:// 回今日模式跳到資料夾索引問題
- 靜態資源快取參數更新為 v0.2.4.1

## v0.2.4｜日期測試模式

- 新增 `features/date-test-mode.js`
- 支援 URL query 指定農曆月日測試神明生日資料表
- 神明生日資料表實驗區新增今日模式 / 測試模式
- 新增觀音、媽祖、關聖帝君測試入口
- 小貓龍蝦檢查加入日期測試模式檢查

## v0.2.3｜神明生日資料表實驗版

- 新增 `data/deity-birthdays.js` 神明生日 seed 資料表
- 新增 `features/deity-matcher.js`
- 讓神明生日卡可比對今日農曆與 seed 資料

## v0.2.2｜lunar-javascript 農民曆引擎實驗版

- 新增 `vendor/lunar/lunar.js` 與 LICENSE
- 新增 `features/almanac-engine.js`
- 今日農民曆卡片新增 lunar 實驗資料區
- 保留原 mock 展示資料

## v0.2.1｜版本號顯示 × 版本資料中心

- 新增網站畫面版本號
- 新增 `siteMeta` 版本資料
- 靜態資源快取參數更新為 v0.2.1
- 小貓龍蝦檢查腳本加入版本檢查

## v0.2.0.1

- 為 `style.css`、`data/site-data.js`、`app.js` 加上版本參數
- 降低 GitHub Pages / 瀏覽器快取舊檔造成空卡片的機率

## v0.2

- 資料模組化
- 將首頁 mock data 抽出到 `data/site-data.js`
- 由 `app.js` 讀取 `window.KekeSoulData` 並渲染首頁卡片

## v0.1.1

- 新增小貓龍蝦檢查腳本
- 新增可雙擊執行的 `run-check-site.bat`
- 新增 `.gitattributes`

## v0.1

- 手機優先首頁儀表板靜態版
- 建立本命摘要、今日摘要、生命靈數、命理模組入口、農民曆、神明生日、命樹與資料工具區

## v0.0.3

- 本機 clone / 小丸施工通道完成

## v0.0.2

- GitHub Pages 上線

## v0.0.1

- 建立 `index.html` 空殼頁

## v0.0

- 建立 GitHub repo
