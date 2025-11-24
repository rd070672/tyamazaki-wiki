# Phonopy（音響・格子振動計算パッケージ）

---

## 概要
- Phonopy は、固体の格子振動（フォノン）および熱物性を第一原理計算の出力から解析するためのオープンソースソフトウェア。
- 主な機能：フォノン分散、フォノン DOS、内部エネルギー・エントロピー・比熱、グルーネイゼンパラメータ、準調和近似 (QHA) による熱膨張など。
- 対応コード例：VASP、WIEN2k、Quantum ESPRESSO、ABINIT など。

## 最新バージョン
- 現在の最新安定版：v2.44.0（2025年時点）。
- 変更点やバグフィックスは公式ドキュメントの Change Log に記載。

## 入手・インストール
- 公式サイト：https://phonopy.github.io/phonopy/
- conda-forge 経由のインストール例（推奨）  
  - `conda install -c conda-forge phonopy`
- ソースコードからのインストール例  
  - `git clone https://github.com/phonopy/phonopy.git`
  - `cd phonopy`
  - `pip install .`  （仮想環境内での実行を推奨）

## 基本的なワークフロー（VASP の例）
- 構造準備：`POSCAR`（単位格子）を用意。
- supercell 生成と変位構造作成（有限変位法）を行う。
- 生成された各変位構造について、VASP 等で力（FORCE）を計算。
- 得られた力から `FORCE_SETS` または `FORCE_CONSTANTS` を作成。
- `FORCE_CONSTANTS` を読み込み、フォノン分散・DOS・熱物性を計算。
- 必要に応じて QHA により温度依存の体積・比熱などを評価。

## 主な入力・出力ファイル
- 主な入力
  - `POSCAR`（構造）
  - `SPOSCAR` / 変位構造群
  - `FORCE_SETS` または `FORCE_CONSTANTS`
- 主な出力
  - `FORCE_CONSTANTS`（力定数）
  - `band.yaml` / `band.dat`（フォノン分散）
  - `total_dos.dat` / `partial_dos.dat`（フォノン DOS）
  - `thermal_properties.yaml`（熱物性）
  - QHA 用の各種 `qha_*` ファイル など

## 代表的なオプション
- `--dim nx ny nz`：supercell の倍率指定。
- `--band`：フォノン分散の計算・出力。
- `--mesh nx ny nz`：フォノン DOS・熱物性計算用の q メッシュ指定。
- `--nac`：LO–TO 分裂を考慮した非解析項補正の有効化（極性イオン結晶など）。
- `--readfc`：既存の `FORCE_CONSTANTS` を読み込んで再計算。

## 注意点・運用上のポイント
- 力計算（DFT）の収束条件（エネルギー・力）、k 点メッシュ、ENCUT などがフォノン精度に直結する。
- 極性結晶では Born 有効電荷・高周波誘電率（ε∞）を用いた NAC 設定が重要。
- supercell が大きいほど計算コストが増大するため、対称性を活用しつつ収束性を事前に確認する。
- QHA では複数体積条件でのフォノン計算が必要であり、計算負荷が大きくなる点に注意。

## 参考リンク
- Phonopy 公式サイト：https://phonopy.github.io/phonopy/
- VASP 連携ドキュメント：https://phonopy.github.io/phonopy/vasp.html
- ワークフロー解説：https://phonopy.github.io/phonopy/workflow.html
