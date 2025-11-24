# WIEN2k

## 参考ドキュメント
- 公式サイト（最新版・アップデート情報）：http://susi.theochem.tuwien.ac.at/  

---

## 概要

- WIEN2k は、周期固体の電子構造計算のための全電子 DFT コード。  
- 基底は full-potential (linearized) augmented plane-wave + local orbitals [FP-(L)APW+lo] 法で、バンド構造計算としては最も厳密な手法の一つ。
- 相対論効果（スピン軌道相互作用など）を含む計算が可能で、多くのオプション・ポストプロセスツール（w2w, w2web など）を備える。  

## 最新バージョン

- 現在の最新版は WIEN2k_24.1。
- 公開日は 2024 年 8 月 5 日。
- 23.2 → 24.x では、バグ修正といくつかの新機能が追加されている（init 系ツールの挙動変更など）。

## ライセンスと入手方法

- ライセンス形態：有償・プロプライエタリ（アカデミック版と商用版あり）。
- 購入・登録は公式サイトから行う：  
  - 公式サイト：http://susi.theochem.tuwien.ac.at/ (not https) 
- 登録ユーザーは「registered users」ページから最新版（WIEN2k_24.x）の tar アーカイブとアップデート情報を取得できる。

## インストールの概要（Linux クラスタ / ワークステーション）

- サポート OS：Linux / Unix 系。計算サーバ・HPC クラスタ上での利用を想定。 
- 必要ソフトウェア（例）：
  - Fortran コンパイラ（Intel oneAPI ifx/ifort または gfortran）  
  - C/C++ コンパイラ  
  - MPI（並列版を使う場合）  
  - FFTW3 などの数値ライブラリ（ELPA 連携は推奨）
- 典型的な手順（23.2, 24.1 で類似）：
  - ダウンロードした `WIEN2k_24.1.tar` を作業ディレクトリに配置。  
  - `tar -xvf WIEN2k_24.1.tar` で展開し、同梱スクリプト `./check_minimal_software_requirements.sh` で依存関係をチェック。
  - `./expand_lapw` でソースを展開し、`./siteconfig` でコンパイラやライブラリ、MPI 設定を対話的に指定。
  - `make` またはバージョンに応じたビルドスクリプトでコンパイル。  
  - モジュール環境では `WIEN2K/24.1-...` などのモジュールが提供されている場合もある。

## 利用上のポイント

- 入門用には、w2web（ブラウザベース GUI）や多数の tutorial が提供されている。
- 大規模計算では、OpenMP と MPI のハイブリッド並列、ELPA を用いた固有値ソルバなどを活用することで性能を向上できる。{index=14}  
- 23.2 以降では `init_lapw` の挙動が変更され、バッチモードが標準になっている（対話モードは `init_lapw -m`）。 



