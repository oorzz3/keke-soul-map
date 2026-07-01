# 科科命理宇宙站｜命理運算總架構文件 v0.7.0

本文件是 v0.7.0 的第二核心前置憲法，用來約束後續姓名學、八字四柱、紫微斗數與西洋星盤接入前的資料來源、演算法邊界、測試案例與安全線。

v0.7.0 只新增總架構文件與檢查規則，不新增第二核心 calculator，不新增第二核心 meaning data，不改首頁 UI，不把任何新核心標成 calculated。

## 1. 文件目的

- 鎖定五大核心命盤從資料到畫面的施工順序。
- 保留生命靈數作為目前唯一 calculated reference。
- 明確標示姓名學、八字四柱、紫微斗數與西洋星盤仍屬 planning / partial。
- 避免在資料來源、流派規則與測試案例尚未確認前宣稱正式計算完成。
- 讓後續 check-site 可以先擋掉偷渡 calculator、meaning data、API、fetch、資料庫、登入與核心狀態誤升級。

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

v0.7.0 中，只有生命靈數可以維持 calculated；姓名學、八字四柱、紫微斗數與西洋星盤都必須維持 planning / partial 或 not calculated。

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

## 5. 姓名學輸入與邊界

狀態：partial / not calculated

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

需要先確認：

- 筆畫資料表來源與授權。
- 使用康熙筆畫、現代筆畫或其他規則。
- 繁體、簡體、異體字與罕見字策略。
- 找不到字時的 fallback 顯示。
- 五格算法版本與三才五行規則。
- 複姓、單姓與空白姓氏處理。

test cases：

- 科科 seed 名稱。
- 單姓單名。
- 單姓雙名。
- 複姓測試。
- 異體字測試。
- 缺字 fallback 測試。

安全線：

- v0.7.0 不新增姓名學 calculator。
- v0.7.0 不新增姓名學 meaning data。
- v0.7.0 不宣稱姓名學可正式計算。

## 6. 八字四柱輸入與邊界

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

需要先確認：

- 節氣換算來源。
- 年柱是否以節氣切換。
- 日柱演算法與校驗案例。
- 時柱規則與子時切日策略。
- 時區、夏令時間與真太陽時是否納入。

test cases：

- 科科 seed：1990-06-09 午時。
- 節氣前後日期。
- 子時前後日期。
- 無出生時間案例。
- 不同 timezone policy 的比較案例。

安全線：

- 不可只靠 mock 頁面或文字推導八字。
- 不可在缺少節氣與日柱校驗前標示 calculated。

## 7. 紫微斗數輸入與邊界

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

需要先確認：

- 公曆轉農曆來源與閏月策略。
- 命宮、身宮定位規則。
- 主星安星規則。
- 流派版本與校驗盤。
- 性別、陰陽與順逆行規則。

test cases：

- 科科 seed。
- 公曆轉農曆校驗。
- 閏月案例。
- 無出生時間案例。
- 已知參考命盤比對案例。

安全線：

- 不可把農曆轉換成功視為紫微斗數完成。
- 不可在缺少安星規則與參考盤前標示 calculated。

## 8. 西洋星盤輸入與邊界

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

需要先確認：

- 星曆資料來源與授權。
- 出生地經緯度來源。
- 時區與夏令時間策略。
- 宮位制，例如 Placidus 或 Whole Sign。
- 上升與宮位計算方式。
- 參考星盤測試案例。

test cases：

- 科科 seed。
- 無出生地案例。
- 無出生時間案例。
- 不同 houseSystem 比較案例。
- 已知參考星盤比對案例。

安全線：

- 不可用文字模板假裝行星位置已計算。
- 不可在缺少星曆、經緯度與宮位制前標示 calculated。

## 9. 首頁顯示規則

v0.7.0 不調整首頁 UI。

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

## 10. check-site 防偷渡規則

v0.7.0 的 check layer 應檢查：

- `CORE_ALGORITHM_BOUNDARY.md` 存在。
- 文件包含五大核心、七層標準、requiredFields、optionalFields、blockedBy、test cases、planning、partial、calculated、not calculated。
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

## 11. v0.7.0 結論

v0.7.0 是命理運算總架構文件版，不是第二核心啟動版。

建議下一步：

1. v0.7.1：姓名學 metadata 前置。
2. v0.7.2：姓名學 placeholder 骨架。
3. v0.8.0：若筆畫表、授權與規則版本確認，再評估姓名學正式計算。
