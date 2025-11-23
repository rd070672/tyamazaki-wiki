# Bader charge analysis
作成日：2025年11月23日

## 概要
- Bader 解析は「ゼロ‐フラックス面（zero-flux surface）により電子密度を各原子に割り当てる」手法。
- 分子・固体の電子密度分布から、各原子に帰属する電子数（および電荷）を定量化できる。
- 基本形としては Bader コード（Henkelman グループ提供）が、VASP 等の出力を起点に利用されている。

## 主な入手・対応形式
- コード入手先： “Bader – code for partitioning the charge density” 公式サイト（Henkelman グループ）  
  -　URL： https://theory.cm.utexas.edu/henkelman/code/bader/ 
- 対応入力形式例：
  - VASP 出力（CHGCAR, AECCAR0/2） → Bader の「‐r」オプション参照。
  - Gaussian Cube フォーマット。
- 出力形式：
  - ACF.dat（各原子の電荷・体積）等。 

## 実行手順（Linux Ubuntu 例）
- VASP 計算結果を用意：
  - 必要なら `LAECHG = .TRUE.` を INCAR に設定し、AECCAR0/AECCAR2 出力を生成。
- CHGCAR（／AECCAR0+2）を取得したディレクトリで：
  ```bash
  bader CHGCAR -r AECCAR0 -r AECCAR2
