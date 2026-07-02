# 科科命理宇宙站｜姓名學字庫 seed 規劃 v0.7.5

## 1. 文件目的

這份文件是未來姓名學筆畫資料表建立前的 seed 規劃文件，用來先整理字庫欄位、狀態、第一批測試字元、fallback 方向與測試案例。本文件不是正式筆畫資料表，不是姓名學正式演算法，不是改名建議，也不是 calculated 功能。

## 2. 目前狀態

- 模組：姓名學
- 狀態：planning
- 計算狀態：not-calculated
- 角色：second core candidate
- 階段：stroke seed planning only
- 本版不新增正式筆畫資料表 JS。
- 本版不新增 name calculator。
- 本版不新增 name meanings data。
- 本版不提供正式姓名學計算。
- 本版不提供改名建議。
- 本版不宣稱姓名決定命運。

## 3. seed 規劃原則

1. seed 先服務測試案例，不追求完整字庫。
2. 每一筆資料都必須標記來源、授權與狀態。
3. 無法確認的字不猜筆畫，只標記 `needs-review` 或 `missing`。
4. 康熙筆畫與現代筆畫可同時保留欄位，但正式採用哪一套仍待規則決策。
5. 異體字、繁簡字與缺字 fallback 必須可追蹤，不可默默合併。
6. seed 文件只規劃，不等於正式資料表。

## 4. seed 資料表欄位草案

| 欄位 | 說明 |
| --- | --- |
| `id` | seed 資料唯一識別，例如 `char-ke` |
| `char` | 原始字元 |
| `normalizedChar` | 正規化後字元 |
| `kangxiStroke` | 康熙筆畫，尚未確認可為 null |
| `modernStroke` | 現代筆畫，尚未確認可為 null |
| `strokeStatus` | 筆畫狀態 |
| `variantGroup` | 異體字群組 |
| `variantOf` | 若此字為異體字，指向主要字 |
| `traditionalSimplifiedGroup` | 繁簡字群組 |
| `source` | 資料來源 |
| `sourceLicense` | 來源授權 |
| `sourceNote` | 來源備註 |
| `fallbackPolicy` | 命中不到或需轉換時的處理方式 |
| `testCategory` | 測試分類 |
| `notes` | 人工校對備註 |

## 5. 第一批 seed 字元規劃

本段只做規劃，不建立正式資料表。

### 科科 seed 名稱相關字元

- 科

### 常見姓氏測試字

- 王
- 林
- 陳
- 李
- 張

### 常見名字測試字

- 子
- 宇
- 芯
- 怡
- 祐
- 萱

### 複姓測試

- 歐
- 陽
- 司
- 馬

### 異體字 / 需人工確認測試

- 峰 / 峯
- 台 / 臺

### 缺字 fallback 測試

- 使用「未知字 placeholder」描述，不在本文件亂塞罕見字。

## 6. 字元狀態分類

`strokeStatus` 可規劃：

- `planned`：已列入規劃，尚未確認筆畫。
- `verified`：已人工校對。
- `needs-review`：需要人工複核。
- `missing`：資料表尚未收錄。
- `fallback-only`：只可作 fallback，不可輸出正式筆畫。

`sourceLicense` 可規劃：

- `unknown`：授權未知，不可正式使用。
- `public-domain`：可公開使用，但仍需記錄來源。
- `manually-curated`：人工整理資料。
- `needs-review`：授權需再確認。

`fallbackPolicy` 可規劃：

- `exact`：原字精準命中。
- `normalized`：使用正規化字元。
- `variant`：使用異體字群組命中。
- `missing`：未命中。
- `manual-review`：需人工校對。

## 7. 缺字與異體字處理方向

- 缺字時不自行猜筆畫。
- 異體字需保留原字與正規化字，不可只顯示合併結果。
- 峰 / 峯、台 / 臺 這類測試字需標記 `variantGroup`。
- 繁簡差異需透過 `traditionalSimplifiedGroup` 記錄。
- 若 sourceLicense 未確認，資料只能用於規劃或測試，不得作正式計算。

## 8. 測試案例分組

- 科科 seed 名稱。
- 單姓單名。
- 單姓雙名。
- 複姓雙名。
- 異體字 normalize。
- 繁簡字差異。
- 缺字 fallback。
- 筆畫缺漏。
- sourceLicense 未確認。
- 不應產生改名建議。

## 9. 不做事項

- 不新增正式筆畫資料表 JS。
- 不新增 name calculator。
- 不新增 name meanings data。
- 不提供正式姓名學計算。
- 不提供改名建議。
- 不宣稱姓名決定命運。
- 不把姓名學標示為 calculated。

## 10. 未來檔案規劃

未來若進入資料表階段，可考慮新增：

- `data/name-stroke-seed.js`

但 v0.7.5 不新增此檔。

未來若進入 placeholder 階段，才可考慮：

- `features/name-calculator-placeholder.js`

但 v0.7.5 不新增此檔。

## 11. 安全線

- 姓名學目前仍是 planning / not-calculated。
- 本文件只作 seed planning，不代表正式筆畫資料表。
- 本文件不提供改名建議。
- 本文件不宣稱姓名決定命運。
- 本文件不得作為重大人生、法律、財務、醫療或投資決策依據。

## 12. 何時才可以建立正式資料表

至少需要先完成：

1. `NAME_STROKE_RULES_SPEC.md` 的規則決策。
2. seed 字元清單。
3. sourceLicense 確認。
4. 缺字與異體字 fallback 政策。
5. 測試案例與人工驗收標準。

## 13. 何時才可以接 placeholder

至少需要先具備：

1. `data/name-stroke-seed.js` 草案。
2. 清楚的輸入與輸出格式。
3. 不輸出正式姓名學結論的 placeholder 安全線。
4. check-site 可阻擋姓名學誤標 calculated。

## 14. v0.7.5 結論

v0.7.5 是姓名學字庫 seed 規劃版，只補資料表前置文件與 metadata。本版不新增正式筆畫資料表、不新增姓名學 calculator、不新增姓名學 meaning data，也不提供改名建議。
