# mumax3 を用いた LLG 計算
作成日：2025年11月23日

## 概要
- mumax3 は **GPU (CUDA)** を用いてマイクロ磁気計算を行うためのオープンソースコードであり、  
  **Landau–Lifshitz–Gilbert (LLG) 方程式**を有限差分で離散化して時間発展を解く。
- 計算対象は連続体磁化 $\mathbf{M}(\mathbf{r}, t)$ であり、  
  計算領域を格子セルに分割し、各セルの単位磁化ベクトル $\mathbf{m} = \mathbf{M}/M_s$ を更新していく。
- 入力は `.mx3` スクリプトで記述し、
  - 材料定数（Ms, Aex, Ku, α など）
  - メッシュサイズ・セルサイズ
  - 外部磁場や電流、境界条件
  - 出力設定（スナップショット、テーブル出力など）
  を指定する。

## LLG 方程式の基本形
- mumax3 が解いている標準的な LLG 方程式（Gilbert 形式の一例）：
  $$
    \frac{d\mathbf{m}}{dt}
    = -\gamma\,\mathbf{m}\times\mathbf{H}_\text{eff}
      + \alpha\,\mathbf{m}\times\frac{d\mathbf{m}}{dt}
  $$
  - $\mathbf{m}$：単位磁化ベクトル（$|\mathbf{m}|=1$）
  - $\gamma$：ジャイロ磁気比
  - $\alpha$：Gilbert 減衰定数
  - $\mathbf{H}_\text{eff}$：有効磁場
- 有効磁場 $\mathbf{H}_\text{eff}$ はエネルギー汎関数から決まり、  
  mumax3 では次のような寄与を自動的に足し合わせる：
  - 交換相互作用（exchange）
  - 静磁場（demag）
  - 一軸／立方晶異方性（anisotropy）
  - 外部磁場（Zeeman）
  - スピン移行トルク(STT), スピン軌道トルク(SOT) など（必要に応じて）

## 空間離散化（有限差分格子）
- 計算領域を直方体のグリッドに分割：
  - `SetGridsize(nx, ny, nz)`：セル数を指定
  - `SetCellsize(dx, dy, dz)`：各セルの物理サイズ [m] を指定
- 各セルに一つの $\mathbf{m}_{ijk}$ が割り当てられ、
  - 交換場などは近傍セルとの差分
  - 静磁場は FFT による畳み込み
  によって計算される。
- 空間差分は**有限差分 (FDM)** であり、セルサイズを小さくすると精度は上がるが計算コストも増える。

## mumax3 スクリプトの基本構成
典型的な `.mx3` スクリプトは次のような構造を持つ：

1. メッシュ・セルサイズの設定
2. 材料パラメータの指定（Ms, Aex, Ku, α など）
3. 初期磁化の設定
4. 外部磁場・電流・時間シーケンスの設定
5. 出力（保存・ログ）の設定
6. `Run(t_end)` による時間発展

### 最小限の例（単純な一軸異方性薄膜の緩和計算）
```go
// 単位系: mumax3 では SI 単位（m, s, A/m, J/m^3）を基本にする

// 1. メッシュ設定
SetGridsize(128, 64, 1)          // セル数 nx, ny, nz
SetCellsize(5e-9, 5e-9, 5e-9)    // セルサイズ dx, dy, dz [m]

// 2. 材料定数
Msat = 8e5                        // 飽和磁化 [A/m]
Aex  = 1.3e-11                    // 交換剛性 [J/m]
Ku1  = 5e4                        // 一軸異方性定数 [J/m^3]
anisU = vector(0, 0, 1)           // 異方性 easy axis（z 方向）
alpha = 0.02                      // Gilbert 減衰定数

// 3. 初期磁化
m = uniform(1, 0, 0)              // 全セルを x 方向に揃える

// 4. 外部磁場（例: 0）
B_ext = vector(0, 0, 0)

// 5. 出力設定
TableAdd(B_ext)
TableAdd(m)                       // 空間平均磁化
TableAutoSave(1e-9)               // 1 ns ごとに table.txt に出力
autosave(m, 5e-9)                 // 5 ns ごとに m フィールドを保存

// 6. 時間発展
Run(50e-9)                        // 50 ns まで時間発展
