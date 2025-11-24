# VASP の計算方法

## 参考ドキュメント
- VASP マニュアル（VASP Wiki）：https://vasp.at/wiki/The_VASP_Manual
- VASP チュートリアル（単原子例）：https://www.vasp.at/tutorials/latest/molecules/part1/ 
- Materials Project による計算詳細：https://docs.materialsproject.org/methodology/materials-methodology/calculation-details

---

## 概要  
- VASP は平面波基底およびプロジェクター強化ウェーブ（PAW）法を用いた周期固体の電子構造計算コード。
- 主に密度汎関数理論 (DFT) を基盤とし、バンド構造・状態密度・構造最適化・応力解析などが可能。

## 入力ファイルの構成  
- `POSCAR`：構造情報（格子ベクトル・原子位置）
- `INCAR`：計算制御パラメータ（例：ENCUT, ISMEAR, IBRION）
- `KPOINTS`：k-点メッシュ設定（例：Monkhorst-Pack や Gamma 点）  
- `POTCAR`：ポテンシャル（PAW セット）ファイル群 

## 基本的な計算手順  
- 構造を用意し、入力ファイルを設定する。  
- 電子収束（静電子構造計算）を実行し、Kohn-Sham 方程式を反復的に解く。
- 必要に応じて、原子位置／格子定数の最適化（構造緩和）を行う。  
- 得られた構造から、バンド構造・状態密度（DOS）・磁気モーメントなどの物性を計算。  
- 結果（出力ファイル：`OUTCAR`, `DOSCAR`, `PROCAR` 等）を解析・可視化する。  

## 計算精度・収束のポイント  
- エネルギーカットオフ（ENCUT）は使用ポテンシャルと原子種に依存。十分な値に設定することが重要。  
- k‐点メッシュ密度が粗いと誤差が大きくなるため、特にバンド構造・DOSにはメッシュ収束の確認が必要。  
- Smearing（例：ISMEAR, SIGMA）の設定が金属解析では重要。
- 電子・イオンの収束基準（例：EDIFF, EDIFFG）を適切に設定して構造変化を抑制。  

## 応用モード・注意事項  
- ハイブリッド汎関数（HSE, PBE0）や GW 法を用いる場合、設定がさらに専門的。
- スピン軌道計算・非コリニア計算の場合は SOC（Spin-Orbit Coupling）やスピン偏極（ISPIN）などを有効化。  
- 計算コストが非常に高いため、並列実行・メモリ要求・I/O ボトルネックなど運用環境も考慮すべき。  
- 計算の種類（構造最適化・応力解析・フォノン計算）により最適な入力パラメータが異なるため、該当用途のチュートリアルを参照する。



