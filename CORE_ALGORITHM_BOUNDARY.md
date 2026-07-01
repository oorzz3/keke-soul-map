# 科科命理宇宙站｜命理運算總架構文件 v0.7.2

本文件是第二核心前置憲法，用來約束姓名學、八字四柱、紫微斗數與西洋星盤正式接入前的資料來源、演算法邊界、測試案例與安全線。

v0.7.0 建立總架構文件；v0.7.1 鎖定姓名學為第二核心候選；v0.7.2 讓姓名學詳情頁對齊 `nameCalculationBoundary`，並新增 `LAZY_QA_CHECKLIST.md`。本版不新增姓名學 calculator，不新增姓名學 meaning data，不改首頁 UI，也不將姓名學標示為 calculated。

## 1. 文件目的

- 鎖定五大核心命盤從資料到畫面的施工順序。
- 保留生命靈數作為目前唯一 calculated reference。
- 明確標示姓名學、八字四柱、紫微斗數與西洋星盤仍屬 planning / partial。
- 避免在資料來源、流派規則與測試案例尚未確認前宣稱正式計算完成。
- 讓 check-site 先擋掉偷渡 calculator、meaning data、API、fetch、資料庫、登入與核心狀態誤升級。

## 2. 五大核心七層標準

每一個核心命盤都必須依照 `CORE_MODULE_TEMPLATE.md` 的順序補齊：

1. input layer
2. calculator layer
3. meaning layer
4. homepage layer
5. detail layer
6. safety layer
7. check layer

任何模組若缺少資料來源、測試案例、演算法邊界或 safety layer，都不可進入 calculated。

## 3. 狀態定義

- planning：僅有方向規劃、欄位草案或頁面占位，不代表可計算。
- partial：已有部分資料欄位、mock 頁面或需求盤點，但仍缺正式演算法或資料表。
- static-interpretation：只有靜態解讀資料，可搭配 calculated 結果顯示，但本身不是計算器。
- calculated：已具備穩定輸入、calculator layer、可重複測試案例、meaning layer、安全線與 check-site 檢查。
- not calculated：明確標示目前不得視為正式計算結果。

v0.7.2 中，只有生命靈數可以維持 calculated；姓名學、八字四柱、紫微斗數與西洋星盤都必須維持 planning / partial 或 not calculated。

## 4. 生命靈數完成參考

生命靈數是目前唯一 calculated core。

- input layer：`coreInputProfile.birth.solarDate`
- calculator layer：`features/numerology-calculator.js`
- meaning layer：`data/numerology-meanings.js`
- homepage layer：首頁今日數字節奏與生命靈數核心入口
- detail layer：`#/module/numerology`
- safety layer：`data/numerology-meanings.js` 的 `safetyLines`
- check layer：`numerology-calculation-checks`、`numerology-interpretation-checks`、`number-rhythm-semantics`

目前計算規則仍沿用 v0.6.0：1～9 化簡規則，master number 11 / 22 / 33 暫時 disabled。

## 5. v0.7.2 姓名學 metadata 前置

姓名學為第二核心候選，但 v0.7.2 只做 metadata 前置。

metadata 目的：

- 鎖定 input layer 來源：`coreInputProfile.personal.fullName`。
- 鎖定 requiredFields：`fullName`。
- 鎖定 optionalFields：`familyName`、`givenName`、`gender`。
- 鎖定 blockedBy：筆畫表、授權、規則版本、繁簡政策、異體字政策、缺字 fallback、五格算法版本與複姓政策。
- 鎖定 ruleDecisionsNeeded、testCasePlan 與 safetyLines。

v0.7.2 中姓名學仍為 planning / partial / not calculated。姓名學資料尚未具備正式筆畫資料表、正式計算規則、完整測試案例與正式解讀資料，因此不可宣稱為正式姓名學結果，也不可提供改名建議。此處的 test cases 僅作未來驗收規劃，不代表已接入正式 calculator。

## 6. 姓名學輸入與邊界

狀態：planning / partial / not calculated

requiredFields：

- fullName

optionalFields：

- familyName
- givenName
- gender

blockedBy：

- strokeTable
- strokeSourceLicense
- strokeRuleVersion
- traditionalSimplifiedPolicy
- variantCharacterPolicy
- missingCharacterFallback
- fiveGridAlgorithmVersion
- compoundSurnamePolicy

ruleDecisionsNeeded：

- 筆畫資料表來源與授權。
- 康熙筆畫或現代筆畫規則。
- 繁體與簡體處理政策。
- 異體字與缺字 fallback。
- 五格算法版本。
- 三才五行規則。
- 複姓與單姓處理。
- 姓名學結果不得直接作為改名建議。

testCasePlan：

- 科科 seed 名稱。
- 單姓單名。
- 單姓雙名。
- 複姓測試。
- 異體字測試。
- 缺字 fallback 測試。

safetyLines：

- 本版不提供姓名學正式計算。
- 本版不提供改名建議。
- 本版不宣稱姓名學資料已完整。
- 本版不得作為重大人生、法律、財務、醫療或投資決策依據。

## 7. 八字四柱輸入與邊界

狀態：partial / not calculated

requiredFields：

- solarDate
- birthTimeRange
- timezone

optionalFields：

- birthHour24
- birthMinute
- locationLabel

blockedBy：

- solarTermEngine
- dayPillarAlgorithm
- hourPillarRule
- timezonePolicy
- ziHourBoundaryPolicy
- trueSolarTimePolicy
- testEphemerisOrReferenceCases

安全線：

- 不可只靠 mock 頁面或文字推導八字。
- 不可在缺少節氣與日柱校驗前標示 calculated。

## 8. 紫微斗數輸入與邊界

狀態：partial / not calculated

requiredFields：

- solarDate
- birthTimeRange
- gender

optionalFields：

- lunarDate
- birthHour24
- birthMinute

blockedBy：

- lunarConversion
- leapMonthPolicy
- mingGongRule
- shenGongRule
- mainStarPlacementRules
- schoolVersionPolicy
- testReferenceCharts

安全線：

- 不可把農曆轉換成功視為紫微斗數完成。
- 不可在缺少安星規則與參考盤前標示 calculated。

## 9. 西洋星盤輸入與邊界

狀態：partial / not calculated

requiredFields：

- solarDate
- birthTimeRange
- timezone

optionalFields：

- latitude
- longitude
- locationLabel
- birthHour24
- birthMinute

blockedBy：

- ephemerisSource
- ephemerisLicense
- geoCoordinates
- houseSystem
- ascendantCalculation
- timezoneAndDstPolicy
- testReferenceCharts

安全線：

- 不可用文字模板假裝行星位置已計算。
- 不可在缺少星曆、經緯度與宮位制前標示 calculated。

## 10. 首頁顯示規則

v0.7.2 不調整首頁 UI。

首頁可以保留：

- 生命靈數 calculated 狀態。
- 姓名學、八字四柱、紫微斗數、西洋星盤 partial 狀態。
- ready / partial chip。
- 五大核心 mini visual。

首頁不可新增：

- 第二核心正式計算結果。
- 大段演算法說明。
- 新表單。
- 新登入或會員入口。
- `#/module/almanac` 或 `#/module/deity`。

## 11. check-site 防偷渡規則

v0.7.2 的 check layer 應檢查：

- `nameCalculationBoundary` 存在。
- `moduleId: "name"`、`calculationStatus: "not-calculated"`、`requiredFields`、`optionalFields`、`blockedBy`、`ruleDecisionsNeeded`、`testCasePlan`、`safetyLines` 存在。
- 生命靈數仍為唯一 calculated core。
- 姓名學、八字四柱、紫微斗數、西洋星盤沒有被標示為 calculated。
- 不新增第二核心 calculator：
  - `features/name-calculator.js`
  - `features/bazi-calculator.js`
  - `features/ziwei-calculator.js`
  - `features/astrology-calculator.js`
- 不新增第二核心 meaning data：
  - `data/name-meanings.js`
  - `data/bazi-meanings.js`
  - `data/ziwei-meanings.js`
  - `data/astrology-meanings.js`
- 不新增 fetch、API、後端、資料庫、登入、會員、表單或個資儲存。

## 12. v0.7.2 結論

v0.7.2 是姓名學 metadata 前置版，不是姓名學計算啟動版。

建議下一步：

1. v0.7.2：姓名學 placeholder 骨架。
2. v0.7.3：姓名學測試案例與筆畫資料來源評估。
3. v0.8.0：若筆畫表、授權與規則版本確認，再評估姓名學正式計算。
