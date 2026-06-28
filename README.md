# 科科命理宇宙站 / keke-soul-map

GitHub Pages: https://oorzz3.github.io/keke-soul-map/

科科命理宇宙站是一個手機優先的命理宇宙站靜態首頁儀表板。現階段目標是先建立可部署、可檢查、可逐步擴充的首頁骨架，讓後續命理資料與模組可以穩定接上。

目前版本：

- 目前網站版本：v0.2.2
- 網站資料層版本：v0.2
- 靜態資源快取版本：v0.2.2

## v0.2 目標

v0.2 的目標是資料模組化：把首頁 mock data 從 `index.html` / `app.js` 抽出到 `data/site-data.js`，讓首頁結構、渲染邏輯與展示資料分開管理。這樣未來要接農民曆、神明生日表、生命靈數、命樹、人類圖、塔羅、奇門、六爻等模組時，可以先從資料層擴充。

## 快取提醒

GitHub Pages 更新後若看到舊畫面，可先使用 Ctrl + F5 強制重新整理。v0.2.2 已為 `style.css`、`vendor/lunar/lunar.js`、`features/almanac-engine.js`、`data/site-data.js`、`app.js` 加入靜態資源版本參數，降低瀏覽器吃到舊快取而造成空卡片的機率。

## 已完成功能

- 本命摘要
- 今日科科摘要
- 生命靈數卡
- 命理模組入口
- 今日農民曆 mock 卡
- 今日神明生日 mock 卡
- 命樹卡
- 資料工具區
- 小貓龍蝦檢查腳本
- 首頁 mock data 模組化
- 網站畫面版本號顯示
- lunar-javascript 農民曆實驗資料區

## 本機檢查方式

可雙擊執行：

```bat
run-check-site.bat
```

也可以在專案根目錄執行：

```bat
node scripts/check-site.js
```

## 目前限制

- 全部資料都是 mock 展示資料
- 尚未做真正命理計算
- 尚未接 API / 後端 / 資料庫
- 按鈕目前是靜態入口
- lunar-javascript 目前只作實驗資料，不取代人工校對資料、正式民俗資料庫或神明生日資料表
- 不使用 npm / CDN / API

## 協作規則

- 小科寫規格
- 小丸施工
- 科科驗收
- 科科手動 commit / push

## lunar-javascript 實驗

v0.2.2 以單檔 vendor 方式導入 `lunar-javascript`：

- `vendor/lunar/lunar.js`：官方單檔版
- `vendor/lunar/LICENSE`：MIT License
- `features/almanac-engine.js`：本專案的農民曆實驗引擎包裝層

本版只顯示 lunar 實驗資料，並保留原本 mock 展示資料。實驗資料暫不取代人工校對資料。

## 下一步建議

後續可先建立獨立的農民曆資料比對清單，確認 lunar 輸出、人工校對資料與神明生日資料表的分工，再決定是否擴大接入。

## 資料層

`data/site-data.js` 目前掛載 `window.KekeSoulData`，集中存放首頁 mock data，包括本命摘要、今日摘要、生命靈數、命理模組、農民曆 mock、神明生日 mock、命樹與底部工具。這一層目前只放展示資料，還沒有真正命理計算。

版本資訊也集中在 `data/site-data.js` 的 `siteMeta`，目前包含網站版本、資料層版本、快取版本與狀態文字。網站畫面會直接顯示版本號，方便確認 GitHub Pages 是否更新成功。`almanacEngine` 則記錄 lunar 實驗資料的開關、來源與注意事項。
