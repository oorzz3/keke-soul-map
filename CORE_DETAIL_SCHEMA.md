## v0.6.2 生命靈數詳情頁狀態分層

版本：v0.6.2

- `renderNumerologyDetail` 將生命靈數詳情頁分成 calculated、static-interpretation 與 planning 三層。
- calculated：沿用 v0.6.0 生命靈數正式 1～9 化簡計算。
- static-interpretation：沿用 v0.6.1 `data/numerology-meanings.js` 靜態解讀資料層。
- planning：保留未來延伸解讀架構，但減少首頁與詳情頁的工程測試語感。
- v0.6.2 不改 `features/numerology-calculator.js` 計算邏輯。

## v0.6.0 生命靈數正式計算接入

- `numerology` 仍沿用既有 detail data schema，不改 `data/detail-pages-data.js` schema。
- 新增計算來源：`data/site-data.js` 的 `coreInputProfile.birth.solarDate`。
- 新增計算器：`features/numerology-calculator.js`。
- `renderNumerologyDetail` 會在既有 mock / planning 內容上方顯示 calculated 結果。
- 計算欄位：`lifePathNumber`、`birthDayNumber`、`personalYear`、`personalMonth`、`personalDay`。
- 計算方法：`digit-reduction-1-to-9`；本版不保留 11 / 22 / 33 master number。
- 紫微、八字、西洋星盤、姓名學 schema 與正式演算法狀態不變。

# 科科命理宇宙站｜五大核心詳情頁 Schema 對照表

版本：v0.4.1
狀態：mock / planning / experiment 文件化
定位：本文件只記錄目前資料結構與頁面對照，不代表正式命理計算已完成。

## 五大核心總表

| 核心頁 | route id | route | data profile | detail renderer | root CSS class | 狀態 |
| --- | --- | --- | --- | --- | --- | --- |
| 紫微斗數 | ziwei | #/module/ziwei | ziweiProfile | renderZiweiDetail | ziwei-detail | mock |
| 八字四柱 | bazi | #/module/bazi | baziProfile | renderBaziDetail | bazi-detail | mock |
| 西洋星盤 | astrology | #/module/astrology | astrologyProfile | renderAstrologyDetail | astrology-detail | mock |
| 生命靈數 | numerology | #/module/numerology | numerologyProfile | renderNumerologyDetail | numerology-detail | experiment / mock |
| 姓名學 | name | #/module/name | nameProfile | renderNameDetail | name-detail | mock |

## 紫微斗數 ziwei

必要欄位：

- ziweiProfile
- palaceOverview
- interpretationBlocks
- dataNotes

主要 renderer：

- renderZiweiDetail
- renderZiweiProfile
- renderZiweiPalaceOverview
- renderZiweiInterpretation
- renderZiweiDataNotes

安全線：

- mock 命盤骨架
- 不是正式命盤
- 尚未接入正式紫微斗數排盤演算法

## 八字四柱 bazi

必要欄位：

- baziProfile
- pillarOverview
- fiveElementOverview
- tenGodOverview
- interpretationBlocks
- dataNotes

主要 renderer：

- renderBaziDetail
- renderBaziProfile
- renderBaziPillarOverview
- renderBaziFiveElements
- renderBaziTenGodOverview
- renderBaziInterpretation
- renderBaziDataNotes

安全線：

- mock 八字骨架
- 不是正式命盤
- 尚未接入正式八字四柱排盤演算法

## 西洋星盤 astrology

必要欄位：

- astrologyProfile
- axisOverview
- planetOverview
- houseOverview
- aspectOverview
- interpretationBlocks
- dataNotes

主要 renderer：

- renderAstrologyDetail
- renderAstrologyProfile
- renderAstrologyAxisOverview
- renderAstrologyPlanetOverview
- renderAstrologyHouseOverview
- renderAstrologyAspectOverview
- renderAstrologyInterpretation
- renderAstrologyDataNotes

安全線：

- mock 星盤骨架
- 不是正式星盤
- 尚未接入正式西洋星盤計算

## 生命靈數 numerology

必要欄位：

- numerologyProfile
- coreNumberOverview
- birthBreakdownDraft
- rhythmOverview
- numberMeaningOverview
- actionNotes
- interpretationBlocks
- dataNotes

主要 renderer：

- renderNumerologyDetail
- renderNumerologyProfile
- renderNumerologyCoreNumbers
- renderNumerologyBirthBreakdown
- renderNumerologyRhythmOverview
- renderNumerologyNumberMeanings
- renderNumerologyActionNotes
- renderNumerologyInterpretation
- renderNumerologyDataNotes

安全線：

- mock / experiment 靈數骨架
- 不是正式計算結果
- 尚未接入正式生命靈數計算

注意：不得使用舊 renderer 名稱：

- renderNumerologyCycles
- renderNumerologyMeanings

## 姓名學 name

必要欄位：

- nameProfile
- nameStructureOverview
- characterOverview
- fiveGridOverview
- soundMeaningOverview
- usageScenarioOverview
- interpretationBlocks
- dataNotes

主要 renderer：

- renderNameDetail
- renderNameProfile
- renderNameStructureOverview
- renderNameCharacterOverview
- renderNameFiveGridOverview
- renderNameSoundMeaningOverview
- renderNameUsageScenarioOverview
- renderNameInterpretation
- renderNameDataNotes

安全線：

- mock / planning 姓名學骨架
- 不是正式姓名學結果
- 尚未接入正式姓名學計算
- 不提供改名建議

## 共同規則

- 五大核心頁都必須透過 hash route 進入。
- 五大核心頁都必須由 renderSpecialDetailContent(page) 分流。
- 五大核心頁都必須保留 detail-note，說明目前不是正式命理結果。
- 所有文字進入 innerHTML 前都應使用 escapeHtml。
- 目前不接 API、不接資料庫、不讀取使用者個資。
- 目前所有資料都是 mock / planning / experiment。
- 正式資料接入前，不得移除安全線文案。
- 姓名學不得提供改名建議或吉凶分數。

## 後續可能拆檔方向

- app.js 未來可拆五大 renderer helper。
- check-site.js 未來可拆 rules。
- detail-pages-data.js 未來可拆核心資料檔。
## v0.6.1 生命靈數解讀資料層

版本：v0.6.1

- `numerology` 不改 `data/detail-pages-data.js` schema。
- 新增資料層：`data/numerology-meanings.js`。
- `KekeNumerologyMeanings` 提供 `lifePathMeanings`、`birthDayMeanings`、`personalYearMeanings`、`personalMonthMeanings`、`personalDayMeanings` 與 `safetyLines`。
- `renderNumerologyDetail` 會先顯示 calculated panel，再顯示 static interpretation panel，後方保留 mock / planning 架構。
- `features/numerology-calculator.js` 沿用 v0.6.0 的 `digit-reduction-1-to-9` 規則。
- 本版不新增紫微、八字、西洋星盤或姓名學正式演算法。
