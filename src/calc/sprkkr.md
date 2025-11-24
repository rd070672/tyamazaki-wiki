# SPR-KKR の計算例

## 参考ドキュメント
- [Munich SPR-KKR 公式ページ](https://www.ebert.cup.uni-muenchen.de/old/index.php?option=com_content&view=article&id=8%3Asprkkr&catid=4%3Asoftware&Itemid=7&lang=en)

---

## 概要
- SPR-KKR（Munich SPR-KKR）は、スピン分極・相対論効果・グリーン関数形式を特徴とする第一原理電子構造計算コード（KKR 法）。
- バルク結晶、表面・界面、クラスター、ランダム合金（CPA）、各種スペクトロスコピー（XAS, XMCD, ARPES 等）の計算が可能。
- ここでは、典型的な バルク bcc Fe の SCF + DOS と Fe–Co 合金（CPA）を例に、計算フローのイメージを整理する。

## 入力と基本フロー
- 主な実行プログラム（例）
  - `kkrgen`：入力カードから構造・ポテンシャルの初期設定を生成
  - `kkrscf`：自己無撞着（SCF）計算
  - `kkrdos`：DOS 計算
  - `kkrspc`：各種スペクトル計算（XAS, XMCD など）
- 入力ファイル例
  - `inputcard`（構造、格子、原子種、CPA 設定など）
  - `potfile`（初期ポテンシャル、`kkrgen` で生成）
- 一般的な手順
  - 1. `inputcard` を準備
  - 2. `kkrgen` で初期ポテンシャル生成
  - 3. `kkrscf` で SCF 収束
  - 4. 収束したポテンシャルを用いて `kkrdos` 等で DOS・スペクトル計算

## 計算例 1：バルク bcc Fe の SCF + DOS
- 目的
  - bcc Fe のスピン分極電子構造・状態密度（DOS）・磁気モーメントを求める。
- 典型的な設定（inputcard のイメージ）
  - 系：bcc Fe（1 原子／単位胞）
  - 空間：バルク（3D-periodic）
  - 交換相関：LDA または GGA（例：PBE）
  - スピン：スピン分極（FM）
  - k 点：バルク用の 3D k メッシュ（例：10×10×10 程度から収束確認）
- フロー
  - 1. bcc Fe の格子定数、原子位置を `inputcard` に記述
  - 2. `kkrgen` を実行し、初期 `potfile` を生成
  - 3. `kkrscf` を実行し、エネルギー・電荷・磁気モーメントが収束するまで反復
  - 4. SCF 収束後、`kkrdos` を用いて全 DOS・部分 DOS（Fe s/p/d、スピン別）を計算
  - 5. 出力 DOS データを gnuplot や xmgrace（`.agr`）で可視化  
    （Fe の SCF+DOS 例は公式配布パッケージにも含まれている）

## 計算例 2：Fe–Co ランダム合金（CPA）による DOS 計算
- 目的
  - bcc Fe–Co ランダム固溶体 Fe\_{1–x}Co\_x の組成依存 DOS・磁気モーメントを KKR–CPA で評価。
- CPA 設定のポイント
  - 同一格子サイトに Fe, Co を確率的に配置する「有効媒質」を構成する。
  - `inputcard` の「TYPES」「OCCUPATION」ブロックに原子種と濃度（CONC）を記述。
- フロー
  - 1. bcc 格子・原子サイトを定義（1 サイトに Fe/Co を混合）
  - 2. CPA あり（ランダム合金）のフラグを `inputcard` で有効化
  - 3. `kkrgen` → `kkrscf` で SCF 収束（CPA 付き）
  - 4. 各組成 x（例：x = 0.0, 0.25, 0.5, 0.75, 1.0）について DOS・磁気モーメントを評価
  - 5. 組成依存の DOS・モーメント変化を比較・プロット（FeCo 合金の公式例でも類似のファイルが配布されている）

## 計算例 3：表面・クラスター・スペクトル
- 表面・クラスター
  - 実空間クラスター法や 2D‐表面グリーン関数モードを使うことで、表面状態や吸着原子の電子構造を扱える。
- XAS / XMCD などのスペクトル
  - `kkrspc` モジュールで XAS, XMCD などのスペクトル計算が可能。
  - 例：特定サイトのコアホールを導入して XAS を計算するチュートリアルが公開されている。
- 合金・高エントロピー合金
  - KKR–CPA を用いて高エントロピー合金 (HEA) の DOS・磁性を評価した例も多数報告されている。