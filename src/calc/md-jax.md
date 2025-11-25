# JAX / JAX-MD を用いた MD 計算

## 参考にしたドキュメント
- [JAX 公式ドキュメント（jax.readthedocs.io）](https://jax.readthedocs.io/en/latest/)  
- [JAX GitHub リポジトリ](https://github.com/google/jax)  
- [JAX-MD 公式 GitHub リポジトリ](https://github.com/google/jax-md) 

## 概要

- JAX は
  - NumPy 互換 API
  - 自動微分（auto-diff）
  - just-in-time コンパイル（JIT）
  - GPU/TPU を活用した高速演算  
  を統合した Python ベースの数値計算ライブラリである。

- JAX-MD は JAX 上に構築された分子動力学（MD）ライブラリであり、
  - 「全て Python + JAX で書かれた MD コード」
  - 「自動微分可能」「JIT 最適化」「GPU/TPU 対応」
  - 損失関数やポテンシャルを「微分可能な関数」として定義できる  
  といった特徴を持つ。

- JAX-MD による MD 計算では、
  - ポテンシャルエネルギー関数を Python で定義し、
  - その勾配（力）を JAX の `grad` で自動的に計算し、
  - 時間積分（Verlet 法など）も JAX-MD のユーティリティを用いて実装する。  

  すべてが「JAX の計算グラフ」に乗るため、勾配の伝播やエンドツーエンドの最適化が容易であり、  
  「MD × 機械学習」「逆問題としての MD」などに適した環境が整っている。

## JAX / JAX-MD による MD の基本構造

- JAX-MD を用いた MD の典型的な流れ
  - 1. 系の粒子数・ボックスサイズ・初期座標・初期速度を定義する。
  - 2. ポテンシャルエネルギー関数（例：Lennard-Jones）を定義し、`jax.grad` から力を得る。
  - 3. `jax_md.simulate` モジュールの積分器（NVE, Langevin など）を用いて時間発展関数を構成する。
  - 4. `jax.jit` で MD ステップ関数をコンパイルし、GPU/TPU 上で高速実行する。
  - 5. 途中経過を `numpy` / `pandas` / `matplotlib` 等を用いて解析・可視化する（座標保存はユーザ側で実装）。

- 主なコンポーネントの例
  - `jax_md.space`  
    - 周期境界条件（PBC）、ボックス定義、距離計算などの幾何学処理。
  - `jax_md.energy`  
    - Lennard-Jones, EAM 的ポテンシャル、電荷相互作用などのエネルギー関数。
  - `jax_md.simulate`  
    - NVE, Langevin, Brownian などの積分器実装。
  - `jax_md.partition`  
    - neighbor list の構築（大規模系の高速化に必須）。

## 代表的なポテンシャル・エネルギーモデル

- 組み込みポテンシャル（examples）
  - Lennard-Jones（単純系のテストに頻用）
  - Soft-sphere, Yukawa 相互作用などの簡易ポテンシャル
  - 一部の EAM 風ポテンシャル、長距離相互作用の例など

- カスタムポテンシャル
  - ユーザが任意の Python 関数としてポテンシャルエネルギー `E(R)` を定義し、
  - `jax.grad(E)` で力 `F = -∂E/∂R` を自動微分から得ることができる。
  - これにより、ニューラルネットワークポテンシャルなども自然に実装可能。

- 機械学習ポテンシャル
  - NequIP, MACE, Allegro など JAX 互換の GNN ベースポテンシャルを組み合わせれば、
  - 「JAX-MD による GNN ポテンシャル MD」が実現できる（個別プロジェクト側の実装に依存）。

## JAX-MD による MD の典型的なコード構造（シンプルな例）

以下は、2D Lennard-Jones 系を NVE で時間発展させるごく簡略化した例：

```python
import jax
import jax.numpy as jnp
from jax_md import space, energy, simulate

# 1. 系の設定（2D ボックス・周期境界）
box_size = 10.0
dim = 2
N = 64

key = jax.random.PRNGKey(0)
# ランダム初期配置（単位ボックス上） → 実ボックスにスケール
R = jax.random.uniform(key, (N, dim))
R = R * box_size

# 2. 空間と距離関数の定義（周期境界）
displacement, shift = space.periodic(box_size)

# 3. ポテンシャルエネルギー関数（LJ）
sigma = 1.0
epsilon = 1.0
energy_fn = energy.lennard_jones(displacement, sigma=sigma, epsilon=epsilon)

# 4. 積分器の設定（NVE, Velocity Verlet 風）
dt = 1e-3
init_fn, apply_fn = simulate.nve(energy_fn, shift, dt)

# 初期状態（位置・速度など）を生成
key, subkey = jax.random.split(key)
state = init_fn(subkey, R, jnp.ones((N,)))  # 質量=1.0 の例

# 5. JIT コンパイルした 1 ステップ更新関数
@jax.jit
def step_fn(state):
    return apply_fn(state)

# 6. MD ループ（Python 側でループしてもよいし、scan を用いてもよい）
def run_simulation(state, n_steps=1000):
    traj = []
    for i in range(n_steps):
        state = step_fn(state)
        traj.append(state.position)
    return traj

traj = run_simulation(state, n_steps=1000)
```

- 上記はあくまで「JAX-MD での構造 → エネルギー関数 → 積分器 → JIT 実行」の流れのイメージであり、
- 実際には neighbor list や NVT/NPT、3D、解析コードなどを組み合わせていく。

## JAX / JAX-MD による MD 計算フロー
- 系と目的の整理
  - 例：2D LJ ガラス形成、ソフトマター系の粗視化モデル、ML ポテンシャルによる材料のダイナミクスなど。

- ポテンシャル・エネルギーモデルの設計
  - jax_md.energy の既存関数を使うか、自作ポテンシャル E(R; θ) を定義する。
  - 機械学習モデル（GNN, MLP 等）を埋め込む場合は、E の中でニューラルネットワークを呼び出す。

-初期構造／初期条件の準備
  - ランダム配置、格子配置、外部ファイルから読み込んだ構造（ASE・pymatgen などと連携）を用意。
  - 初期速度は Maxwell-Boltzmann 分布等で割り当てる（これも自作関数で実装）。

- MD 条件の設定
  - アンサンブル：simulate.nve, simulate.nvt_langevin などから選ぶ。
  - 時間刻み：系の振動スペクトル・質量・ポテンシャルの硬さから 0.5–2 fs 程度を目安に調整。
  - ステップ数：平衡化とサンプリングの両方をカバーするように決定（例：1–10 ns 相当）。

- 実装と最適化
  - MD ステップ関数は jax.jit でコンパイルし、GPU/TPU 上で実行する。
  - 多数ステップをまとめて回したい場合は jax.lax.scan を用いると高速化・コード整理がしやすい。
  - neighbor list (jax_md.partition) を併用して O(N^2) から O(N) 近傍計算へ削減する。

- 解析
  - 生成した座標列を jnp.asarray から numpy に変換し、RDF, MSD, 構造因子などを計算。
  - 必要に応じて matplotlib、pandas、MDAnalysis 等と連携。

## JAX / JAX-MD MD の典型的な応用例
- 粗視化モデル・ソフトマター
  - ポリマー、コロイド、活性物質などを粗視化ポテンシャルで記述し、大規模 MD を GPU 上で実行。

- 逆問題・最適化
  - 「特定のターゲット構造やダイナミクスを実現するようにポテンシャルパラメータ θ を最適化する」など、
  - MD 自体を勾配ベース最適化ループの中に組み込む。

- 機械学習ポテンシャルの学習・検証
  - DFT/AIMD データを教師として、GNN/MLP ポテンシャルを学習し、JAX-MD で MD を実行。
  - 「学習済みポテンシャル + JAX-MD」というフル JAX パイプラインで高速・自動微分可能な MD を構築。

- Nonequilibrium プロセス・拡散・レオロジー
  - 剪断流れ、引張・圧縮、温度勾配などを印加した nonequilibrium MD を、外力や境界条件を関数として埋め込む形で実装。

## 注意点
- JAX の「関数型」スタイル
  - JAX は「副作用の少ない純関数」を推奨しており、ループの外側で変数を書き換えるスタイルは避ける必要がある。

  - そのため、MD ステップも「state_in → state_out を返す純関数」として書き、scan や jit と組み合わせるのが基本になる。

- GPU/TPU の活用前提
  - CPU のみでも動作するが、JAX の本領は GPU/TPU 利用時に発揮される。
  - 大きな系や長時間 MD を行う場合は、GPU 環境を前提に設計するほうが良い。

- メモリとチェックポイント
  - 全ステップの座標を保存するとメモリを圧迫するため、出力間隔を粗くする・オンザフライで統計量を計算するなどの工夫が必要。
  - 長大なシミュレーションでは、途中途中で状態をファイルに書き出して再開可能にしておく。

- 数値安定性
  - 時間刻み、質量スケール、ポテンシャルの硬さなどによっては数値発散しやすい。
  - まずは小さな系・短時間でテストし、エネルギー保存や温度の安定性を確認してから本番条件へ拡張する。

- 再現性と乱数
  - JAX の乱数は「PRNGKey」を明示的に扱うスタイルになっている。
  - 初期速度や構造生成など、乱数に依存する部分は Key を記録しておくと再現性が確保しやすい。