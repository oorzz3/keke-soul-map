# 科科命理宇宙站 / keke-soul-map

GitHub Pages: https://oorzz3.github.io/keke-soul-map/

科科命理宇宙站是一個手機優先的命盤總控台靜態網站，使用純 HTML / CSS / JavaScript，可直接部署於 GitHub Pages。

目前版本：

- 網站版本：v0.3.0
- 網站資料層版本：v0.2
- 靜態資源快取版本：v0.3.0

## 專案定位

- 首頁 = 命盤總控台
- 小卡片 = 各命理系統入口
- 點進卡片 = 對應命盤詳情頁
- 農民曆 / 神明生日 = 輔助提醒，不是主軸
- 命樹 = 多命盤系統整合入口

## v0.3.0 重點

v0.3.0 新增 hash router 與命盤詳情頁骨架：

- 新增 `features/router.js`
- 新增 `data/detail-pages-data.js`
- 新增 `dashboardView` / `detailView` 切換
- 命盤核心卡片可進入詳情頁
- 詳情頁顯示 `mock` / `experiment` / `planning` 狀態
- 本版只做 mock / planning，不做真正命理演算法
- 保留首頁總控台、lunar 農民曆實驗、神明生日資料表與日期測試模式

路由範例：

```text
index.html#/module/ziwei
index.html#/module/bazi
index.html#/module/astrology
index.html#/module/numerology
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

GitHub Pages 更新後如果看到舊畫面，可以先使用 Ctrl + F5 強制重新整理。v0.3.0 已將主要靜態資源引用更新為 `v=0.3.0`，降低瀏覽器吃到舊檔的機率。

## 下一步建議

v0.3.1 可強化詳情頁資料結構與 route/schema 檢查，再評估是否把不同命盤系統拆成更細的資料檔。
