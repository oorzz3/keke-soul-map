# 科科命理宇宙站｜懶懶驗收清單 v0.7.3

## 30 秒驗收

1. 首頁版本 badge 是否顯示 v0.7.3。
2. 首頁 UI 是否沒有爆版。
3. 生命靈數是否仍是唯一 calculated core。
4. 姓名學是否仍顯示 planning / not-calculated。
5. 姓名學頁是否沒有正式姓名學計算結果。
6. 姓名學頁是否沒有改名建議。
7. 農民曆與神明生日是否沒有升格成五大核心。
8. 小丸回報 run-check-site 是否 0 fail / 0 high risk。
9. GitHub Desktop 是否只有本版預期修改檔。
10. 若以上都正常，才可以進行本機 commit；本版仍不 push。

## 小丸本機 commit 測試

1. 小丸施工完成後會先回報 git status。
2. 小丸只會 stage 本版預期修改檔，不使用 `git add .`。
3. 小丸可以執行本機 commit。
4. 小丸不 push。
5. commit 後 GitHub Desktop 應該只顯示 Push origin。
6. 科科確認後再自行按 Push origin。

## 不可上傳狀況

- 出現 features/name-calculator.js。
- 出現 data/name-meanings.js。
- 出現 fetch / API / 後端 / 資料庫 / 登入 / 表單 / npm。
- 姓名學被標成 calculated。
- 首頁爆版。
- check-site 有失敗或高風險。
- 小丸直接 push。
