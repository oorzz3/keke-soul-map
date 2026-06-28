# PROJECT_MAP

## 主要檔案

- `index.html`：靜態網站入口，保留 header、shell、main 容器與各首頁卡片容器；載入 `style.css`、`data/site-data.js`、`app.js`，並以版本參數控制瀏覽器快取。
- `style.css`：深色星夜視覺、卡片樣式、手機優先與桌機多欄響應式。
- `app.js`：讀取 `window.KekeSoulData`，渲染首頁卡片、命理模組入口、底部工具與桌機側欄導覽。

## 資料與素材

- `data/`：未來放命理 mock data、資料表或展示資料模組。
- `data/site-data.js`：首頁 mock data 與未來命理資料層，目前掛載 `window.KekeSoulData`。
- `assets/`：未來放圖片、icons 與其他靜態素材。
- `assets/images/`：未來放首頁或模組圖片。
- `assets/icons/`：未來放圖示素材。

## 檢查工具

- `scripts/check-site.js`：小貓龍蝦檢查腳本，檢查靜態網站必要檔案、資料夾、首頁內容、偏航關鍵字與 GitHub Pages 相容性。
- `run-check-site.bat`：Windows 雙擊檢查入口。
