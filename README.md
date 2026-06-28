# 科科命理宇宙站 / keke-soul-map

GitHub Pages: https://oorzz3.github.io/keke-soul-map/

科科命理宇宙站是一個手機優先的命盤總控台靜態網站，使用純 HTML / CSS / JavaScript，可直接部署於 GitHub Pages。

目前版本：

- 網站版本：v0.3.3
- 網站資料層版本：v0.2
- 靜態資源快取版本：v0.3.3

## 專案定位

- 首頁 = 命盤總控台
- 小卡片 = 各命理系統入口
- 點進卡片 = 對應命盤詳情頁
- 農民曆 / 神明生日 = 輔助提醒，不是主軸
- 命樹 = 多命盤系統整合入口

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

GitHub Pages 更新後如果看到舊畫面，可以先使用 Ctrl + F5 強制重新整理。v0.3.3 已將主要靜態資源引用更新為 `v=0.3.3`，降低瀏覽器吃到舊檔的機率。

## 下一步建議

v0.3.3 可開始逐步深化單一命盤詳情頁 mock，例如紫微斗數詳情頁，但仍建議先維持 mock / planning，不急著接真正排盤演算法。
