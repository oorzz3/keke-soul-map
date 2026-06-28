# 科科命理宇宙站 / keke-soul-map

GitHub Pages: https://oorzz3.github.io/keke-soul-map/

科科命理宇宙站是一個手機優先的命盤總控台靜態網站，使用純 HTML / CSS / JavaScript，可直接部署於 GitHub Pages。

目前版本：

- 網站版本：v0.3.1
- 網站資料層版本：v0.2
- 靜態資源快取版本：v0.3.1

## 專案定位

- 首頁 = 命盤總控台
- 小卡片 = 各命理系統入口
- 點進卡片 = 對應命盤詳情頁
- 農民曆 / 神明生日 = 輔助提醒，不是主軸
- 命樹 = 多命盤系統整合入口

## v0.3.1 重點

v0.3.1 修正 v0.3.0 的路由與詳情頁使用體驗：

- 詳情頁加入「上一個命盤 / 返回總控台 / 下一個命盤」導覽
- 側欄與模組卡新增目前 route active 狀態
- route not found 頁面顯示未知路由、可能原因與可用詳情頁入口
- hash router 新增 `normalizeRoute`、`buildModuleRoute`、`getHomeRoute`、`isDashboardRoute`
- 本版仍只做 mock / planning，不做真正命理演算法
- 保留首頁總控台、lunar 農民曆實驗、神明生日資料表與日期測試模式

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

GitHub Pages 更新後如果看到舊畫面，可以先使用 Ctrl + F5 強制重新整理。v0.3.1 已將主要靜態資源引用更新為 `v=0.3.1`，降低瀏覽器吃到舊檔的機率。

## 下一步建議

v0.3.2 可開始逐步深化單一命盤詳情頁 mock，例如紫微斗數詳情頁，但仍建議先維持 mock / planning，不急著接真正排盤演算法。
