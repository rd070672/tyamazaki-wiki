# MAELAS（Magneto-ELAStic properties calculation code）

## 参考ドキュメント 
- GitHub リポジトリ： https://github.com/pnieves2019/MAELAS
- 論文 P. Nieves et al., “Automated calculations of exchange magnetostriction”, Computational Materials Science 224 (2023) 112158 

---

## 概要  
- MAELAS は磁気ひずみ・磁気弾性定数（magnetostrictive coefficients / magnetoelastic constants）を第一原理計算から自動的に評価するためのソフトウェア。
- 主に VASP の出力（構造変形・スピン軸変更・エネルギー変化など）を利用して計算を行う。
- バージョン 2.0 では、非立方晶系（非-cubic）材料でも精度を改善するための新しい手法（線形フィッティング法）を実装。 

## 入手・依存環境  
- 公式 GitHub リポジトリ： https://github.com/pnieves2019/MAELAS 
- 必要条件（Ubuntu Linux の例）：
  - Python3 (≥ 3.6) がインストールされていること。
  - Pythonパッケージ（例：pymatgen ≥2020.4.29, numpy ≥1.18.4, scipy ≥1.4.1）など。

## インストール手順（簡易）  
- リポジトリをクローンまたは ZIP 取得： `git clone https://github.com/pnieves2019/MAELAS.git`  
- 必要なら `chmod +x install-requirements.sh` を実行。
- `python3 setup.py install --user --install_reqs` を実行してユーザー環境にインストール。 
- インストール後、実行ファイル `maelas` が `~/.local/bin/` 等に配置されるため、`PATH` にそのディレクトリを含める。例：  
  `export PATH=/home/$USER/.local/bin:$PATH` 

## 基本的な使い方  
- 初期構造のリラックス： `maelas -r -i POSCAR0 -k 40` などを実行して構造を取得。
- 入力構造をもとに、変形構造を生成：  
  - `maelas -g -mode 1 -i POSCAR_rlx -k 70 -n 7 -s 0.01`（モード1：異方性磁歪係数） 
  - `maelas -g -mode 2 -i …`（モード2：異方性磁気弾性定数）
  - `maelas -g -mode 3 -i …`（モード3：等方性磁気弾性／磁歪係数）
- 計算後、結果抽出：  
  - `maelas -d -mode 1 -i POSCAR_rlx -n 7 > results.out` など。

## 出力・計算対象量  
- 異方性磁歪係数 $λ^{ani}$、自発体積磁歪 $ω_s^{ani}$。
- 異方性磁気弾性定数 $b^{ani}$。 
- 等方性磁気弾性定数 $b^{iso}$、等方性磁歪係数 $λ^{iso}$。

## 備考  
- MAELAS は VASP の SOC（スピン軌道結合）を有効にしたスピン偏極計算を前提としていることが多い。 
- 変形パラメータ（-s）や変形数（-n）は材料の対称性・変形量に応じて調整が必要。
- 同梱マニュアルや GitHub の `INSTALL`／`README` を必ずバージョンに合わせて参照すること。異なるバージョン間で仕様が変わる。  

