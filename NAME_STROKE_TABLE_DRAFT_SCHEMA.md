# 科科命理宇宙站｜姓名學 seed 資料表草案規格 v0.7.6

## 1. 文件目的

這份文件是未來 `data/name-stroke-seed.js` 建立前的資料表草案規格，用來先鎖定 JS 資料結構、單筆字元欄位、欄位型別、允許值、第一批 seed 字元、fallback 流程、測試案例與檢查方向。

本文件不是正式筆畫資料表，不是正式姓名學演算法，不是改名建議，也不是 calculated 功能。

## 2. 目前狀態

目前姓名學仍是：

- planning
- not-calculated
- second core candidate
- stroke table draft schema only

本版不得：

- 不新增 `data/name-stroke-seed.js`
- 不新增 `features/name-calculator.js`
- 不新增 `data/name-meanings.js`
- 不提供正式姓名學計算
- 不提供改名建議
- 不宣稱姓名決定命運

## 3. 與 v0.7.4 / v0.7.5 的關係

- v0.7.4：先建立 `NAME_STROKE_RULES_SPEC.md`，整理姓名學筆畫規則、資料來源、授權、異體字、複姓、五格規則與安全線。
- v0.7.5：新增 `NAME_STROKE_SEED_PLAN.md`，規劃第一批 seed 字元、欄位方向、狀態分類、fallback 與測試分組。
- v0.7.6：把 seed 規劃推進成未來 JS 資料表草案規格，但仍不建立 `data/name-stroke-seed.js`。

## 4. 未來檔案草案

未來若通過資料表規格審查，才可考慮新增：

- `data/name-stroke-seed.js`

但 v0.7.6 不新增此檔。

未來若進入 placeholder 階段，才可考慮新增：

- `features/name-calculator-placeholder.js`

但 v0.7.6 不新增此檔，也不新增正式姓名學 calculator。

## 5. JS 資料結構草案

以下只可作為文件中的草案，不可在 v0.7.6 建立成正式 JS 檔：

```js
window.KekeNameStrokeSeed = {
  meta: {
    version: "draft",
    status: "draft-only",
    sourcePolicy: "manual-curated",
    calculationStatus: "not-calculated"
  },
  characters: [
    {
      id: "char-ke-001",
      char: "科",
      normalizedChar: "科",
      kangxiStroke: null,
      modernStroke: null,
      strokeStatus: "planned",
      variantGroup: null,
      variantOf: null,
      traditionalSimplifiedGroup: null,
      source: null,
      sourceLicense: "unknown",
      sourceNote: "待人工確認",
      fallbackPolicy: "manual-review",
      testCategory: ["keke-seed"],
      notes: "科科 seed 名稱用字，尚未填正式筆畫。"
    }
  ]
};
```

## 6. 單筆字元資料 schema

每筆字元資料未來應代表一個可檢查、可追溯、可人工複核的姓名學字元 seed。單筆資料不得直接輸出姓名學結論，只能提供未來 placeholder 或正式計算前的基礎資料。

必要欄位草案：

- `id`
- `char`
- `normalizedChar`
- `kangxiStroke`
- `modernStroke`
- `strokeStatus`
- `variantGroup`
- `variantOf`
- `traditionalSimplifiedGroup`
- `source`
- `sourceLicense`
- `sourceNote`
- `fallbackPolicy`
- `testCategory`
- `notes`

## 7. 欄位型別與允許值

`id`

- 型別：string
- 必填
- 未來需唯一

`char`

- 型別：string
- 必填
- 單一字元為主

`normalizedChar`

- 型別：string
- 可與 `char` 相同
- 用於異體字或簡繁轉換後對照

`kangxiStroke`

- 型別：number 或 null
- v0.7.6 不填正式數值

`modernStroke`

- 型別：number 或 null
- v0.7.6 不填正式數值

`strokeStatus`

允許值：

- planned
- verified
- needs-review
- missing
- fallback-only

`variantGroup`

- 型別：string 或 null

`variantOf`

- 型別：string 或 null

`traditionalSimplifiedGroup`

- 型別：string 或 null

`source`

- 型別：string 或 null

`sourceLicense`

允許值：

- unknown
- public-domain
- manually-curated
- needs-review

`sourceNote`

- 型別：string

`fallbackPolicy`

允許值：

- exact
- normalized
- variant
- missing
- manual-review

`testCategory`

- 型別：string array

`notes`

- 型別：string

## 8. 第一批 seed 資料草案

v0.7.6 只在文件中列出草案，不建立 JS 檔。

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

### 異體字 / 正規化測試

- 峰
- 峯
- 台
- 臺

### fallback 測試

- 使用 placeholder 描述，不亂塞罕見字。

v0.7.6 不填入正式筆畫數值。所有筆畫數值目前應維持 `null` 或 planned-only 概念。正式筆畫需等來源、授權與人工複核規則確認後才可填入。

## 9. fallback 與人工複核流程

未來查字時，建議流程如下：

1. 先找 `char` exact match。
2. 找不到時查 `normalizedChar`。
3. 若仍找不到，檢查 `variantGroup`。
4. 若仍無法確認，標記 `strokeStatus: "missing"`。
5. 若需要人工判斷，標記 `fallbackPolicy: "manual-review"`。
6. 不可因缺字自動給出正式筆畫。
7. 不可因缺字產生改名建議。

## 10. 測試案例對應

測試分組應至少包含：

- 科科 seed 名稱
- 單姓單名
- 單姓雙名
- 複姓雙名
- 異體字 normalize
- 繁簡字差異
- 缺字 fallback
- 筆畫缺漏
- sourceLicense 未確認
- 不應產生改名建議

## 11. check-site 未來檢查方向

若未來真的建立 `data/name-stroke-seed.js`，check-site 應至少檢查：

- `KekeNameStrokeSeed` 是否存在。
- `meta.calculationStatus` 是否仍是 `not-calculated`，直到正式計算版核准。
- `characters` 是否為陣列。
- 每筆是否有 `id`、`char`、`normalizedChar`、`strokeStatus`、`sourceLicense`、`fallbackPolicy`、`testCategory`。
- `strokeStatus` 是否只使用允許值。
- `sourceLicense` 是否只使用允許值。
- `fallbackPolicy` 是否只使用允許值。
- `kangxiStroke` / `modernStroke` 是否為 number 或 null。
- 不可出現正式姓名學結論或改名建議。

## 12. 不做事項

v0.7.6 不做：

- 不新增 `data/name-stroke-seed.js`
- 不新增 `features/name-calculator.js`
- 不新增 `data/name-meanings.js`
- 不新增正式姓名學計算
- 不新增正式姓名學筆畫資料表
- 不填入正式筆畫數值
- 不把姓名學標成 calculated
- 不提供改名建議
- 不宣稱姓名決定命運

## 13. 安全線

- 姓名學目前仍是 planning / not-calculated。
- 生命靈數仍是唯一 calculated core。
- 姓名學資料表未建立前，不可輸出正式姓名學結果。
- 姓名學筆畫來源、授權、異體字、繁簡字、五格規則未確認前，不可填正式筆畫。
- 本文件不得作為改名建議、重大人生、醫療、法律、財務或投資決策依據。

## 14. 何時才可建立 data/name-stroke-seed.js

至少要先完成：

1. `NAME_STROKE_RULES_SPEC.md` 規則邊界已審核。
2. `NAME_STROKE_SEED_PLAN.md` seed 規劃已審核。
3. `NAME_STROKE_TABLE_DRAFT_SCHEMA.md` 欄位型別與允許值已審核。
4. 第一批 seed 字元清單已確認。
5. sourceLicense 與人工複核流程已有明確策略。
6. check-site 能阻擋姓名學誤標 calculated。

## 15. 何時才可進入 placeholder

至少要先完成：

1. `data/name-stroke-seed.js` draft-only 資料檔。
2. 不輸出正式姓名學結論的 placeholder 規格。
3. 不提供改名建議的 safety line。
4. 缺字、異體字、繁簡字、sourceLicense 未確認時的 fallback 行為。
5. check-site 能阻擋正式計算偷渡。

## 16. v0.7.6 結論

v0.7.6 是姓名學 seed 資料表草案規格版，只把 v0.7.5 的 seed 規劃推進成未來 JS 資料表設計。本版不新增 `data/name-stroke-seed.js`、不新增姓名學 calculator、不新增姓名學 meaning data、不填正式筆畫，也不提供改名建議。
