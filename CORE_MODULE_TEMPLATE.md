# 科科命理宇宙站｜五大核心模組施工模板 v0.6.3

## 1. 模組定位

五大核心模組包含紫微斗數、八字四柱、西洋星盤、生命靈數與姓名學。每一個核心模組都應該先建立清楚的資料來源、計算邊界、解讀資料層、首頁摘要、詳情頁分層與安全線，再逐步接入正式計算。

首頁是命盤總控台，核心模組卡片只顯示濃縮摘要；完整欄位、解讀與狀態放在 detail page。

## 2. input layer

input layer 由 `coreInputProfile` 作為共用 seed 資料來源，包含姓名、生日、出生時間、時區與地點等未來五大核心可能共用的欄位。

模組若需要額外欄位，應建立 module-specific input，不要把演算法細節塞進首頁 renderer。

## 3. calculator layer

calculator layer 必須維持純前端、純靜態、可檢查。完成前保持 planning 或 partial 狀態，不宣稱正式計算。

正式接入時計算器應獨立放在 `features/`，例如生命靈數已完成的 `features/numerology-calculator.js`。

## 4. meaning layer

meaning layer 是靜態解讀資料，必須獨立於 calculator。計算器只負責算出資料，解讀資料由獨立 data 檔對應。

生命靈數已完成範例是 `data/numerology-meanings.js`，並以 static-interpretation 狀態接在 calculated 結果後方。

## 5. homepage layer

homepage layer 只顯示濃縮摘要，不顯示大段 schema、blockedBy、完整安全線或工程資料表。

首頁卡片應保留：核心名稱、簡短主題、資料狀態 chip、必要的小型 visual。輔助提醒不可搶走五大核心主軸。

## 6. detail layer

detail layer 應清楚分層：

- calculated：正式數字或命盤計算結果。
- static-interpretation：靜態解讀資料。
- planning：未來延伸解讀架構。

生命靈數 detail page 目前已使用這三層作為標準模板。

## 7. safety layer

每個核心模組都要有 safety layer。文字必須溫和，不做恐嚇式斷言，不作重大人生決策依據，不提供醫療、法律、財務或投資建議。

如果資料尚未完整，必須明確顯示 mock、planning、partial 或 experiment。

## 8. check layer

check layer 需由 `scripts/check-site.js` 保護：

- 版本同步。
- 禁止 `fetch(`。
- 禁止 `localStorage.setItem` 個資寫入。
- 禁止 package.json / node_modules。
- 禁止後端、API、登入、資料庫偷渡。
- 禁止新增 `#/module/almanac` 與 `#/module/deity`。
- 檢查 mock / planning / calculated / static-interpretation 分層。

## 9. 禁止事項

- 不新增後端。
- 不接 API。
- 不新增資料庫。
- 不新增登入或會員。
- 不新增個資表單。
- 不新增 localStorage 個資寫入。
- 不把農民曆或神明生日升級成五大核心命盤。
- 不在資料來源、演算法與安全線未明確前宣稱正式命理結果。

## 10. 生命靈數已完成範例

生命靈數目前是五大核心裡第一條完成的標準範例：

- `features/numerology-calculator.js`
- `data/numerology-meanings.js`
- `data/site-data.js` `numerologyCalculation`
- `data/site-data.js` `numerologyInterpretation`
- `data/site-data.js` `numberRhythmCard`
- `app.js` `renderNumerology`
- `app.js` `renderNumerologyCalculationPanel`
- `app.js` `renderNumerologyInterpretationPanel`
- `app.js` `renderNumerologySafetyLines`
- `scripts/check-site.js` `numerology-calculation-checks`
- `scripts/check-site.js` `numerology-interpretation-checks`
- `scripts/check-site.js` `number-rhythm-semantics`

這條主線證明一個核心模組可以用「input layer → calculator layer → meaning layer → homepage layer → detail layer → safety layer → check layer」逐步封章。

## 11. 後續核心接入順序建議

1. 姓名學：先建立筆畫規則與資料表，不急著斷言。
2. 八字：先建立節氣 / 日柱 / 時柱演算法邊界。
3. 紫微：先確認農曆轉換、命宮身宮與安星規則。
4. 西洋星盤：先確認星曆資料、經緯度與宮位制。
5. 多系統整合：最後再做命樹與總結，不提前混算。

