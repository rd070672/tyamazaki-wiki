# 線形粘弾性モデルの基礎  
粘弾性は、応力とひずみの関係が時間に依存する材料応答である。線形粘弾性ではボルツマン重ね合わせ原理に立脚し、緩和関数・クリープ関数・複素弾性率を用いて実験データとモデルを厳密に接続できるのである。

## 参考ドキュメント
1. 日本機械学会 Mechanical Engineering Dictionary（MED）  
   ボルツマンの重ね合せ原理（日本語）  
   https://www.jsme.or.jp/jsme-medwiki/doku.php?id=07%3A1012281

2. 小野測器  
   制振材料とその性能測定について（WLF 方程式の説明を含む，日本語）  
   https://www.onosokki.co.jp/HP-WK/c_support/newreport/damp/damp_9.htm

3. コロナ社 公開資料  
   応力緩和とクリープ（日本語PDF）  
   https://www.coronasha.co.jp/data/docs1/978-4-339-07246-4_2.pdf?t=1589965555575

## 1. 粘弾性の位置づけ
弾性体は、ひずみ $\varepsilon$ に対して応力 $\sigma$ が瞬時に決まり、履歴依存を持たない。一次元で
$$
\sigma(t)=E\,\varepsilon(t)
$$
である。

粘性体（ニュートン粘性）は、ひずみ速度 $\dot{\varepsilon}$ に応力が比例し、
$$
\sigma(t)=\eta\,\dot{\varepsilon}(t)
$$
である。

粘弾性体は、この両者が混在し、同一の入力（応力履歴あるいはひずみ履歴）に対する応答が時間にわたり変化する。観測される代表現象は、応力緩和（ひずみ一定で応力が減衰する）とクリープ（応力一定でひずみが増加する）である。



## 2. 線形性とボルツマン重ね合わせ原理

線形粘弾性であるとは、(i) 小さな変形域で材料の応答が入力に比例し、(ii) 履歴の寄与が加法的に足し合わさることである。一次元のひずみ制御表現では、緩和弾性率 $E(t)$ を用いて
$$
\sigma(t)=\int_{-\infty}^{t} E(t-\tau)\,\dot{\varepsilon}(\tau)\,d\tau
$$
と書ける。これは畳み込み（ヘリディタリ積分）であり、因果律（$t-\tau<0$ の寄与が無い）を組み込んだ形である。

応力制御表現では、クリープコンプライアンス $J(t)$ を用いて
$$
\varepsilon(t)=\int_{-\infty}^{t} J(t-\tau)\,\dot{\sigma}(\tau)\,d\tau
$$
と書ける。

線形粘弾性では、$E(t)$ と $J(t)$ は互いに独立ではなく、ラプラス変換を介して関係づけられる。ラプラス変換を
$$
\mathcal{L}[f](s)=\hat{f}(s)=\int_{0}^{\infty} f(t)e^{-st}\,dt
$$
とすると、（初期値条件を適切に扱ったうえで）一般に
$$
\hat{E}(s)\,\hat{J}(s)=\frac{1}{s^{2}}
$$
が成立する枠組みが得られる（表現の選び方により $s$ の因子が変わる場合があるため、どの量を定義しているかを式の冒頭で固定する必要がある）。



## 3. 構成要素

## 3.1 ばね（spring）
フック弾性を表し、
$$
\sigma=E\varepsilon
$$
である。エネルギーを可逆的に蓄える。

## 3.2 ダッシュポット（dashpot）
ニュートン粘性を表し、
$$
\sigma=\eta\dot{\varepsilon}
$$
である。エネルギーを散逸する。

これらを直列・並列に結合した機械模型が、粘弾性モデルの最も基本的な表現となる。



## 4. 基本モデル

以下では一次元を基本とし、$\sigma(t)$ と $\varepsilon(t)$ を同一直線方向の応力・ひずみとして扱う。



## 4.1 マクスウェル模型（Maxwell）

ばね $E$ とダッシュポット $\eta$ の直列結合である。直列なのでひずみは加算され、応力は共通である。
$$
\varepsilon=\varepsilon_{s}+\varepsilon_{d},\qquad \sigma=\sigma_{s}=\sigma_{d}
$$
ばね：$\sigma=E\varepsilon_{s}$、ダッシュポット：$\sigma=\eta\dot{\varepsilon}_{d}$ より
$$
\dot{\varepsilon}=\frac{1}{E}\dot{\sigma}+\frac{1}{\eta}\sigma
$$
が得られる。緩和時間
$$
\tau=\frac{\eta}{E}
$$
が支配パラメータである。

ひずみステップ $\varepsilon(t)=\varepsilon_{0}H(t)$ に対し、応力は指数緩和する：
$$
\sigma(t)=E\varepsilon_{0}\,e^{-t/\tau}
$$
したがって緩和弾性率は
$$
E(t)=E\,e^{-t/\tau}
$$
である。



## 4.2 ケルビン・フォークト模型（Kelvin–Voigt）

ばね $E$ とダッシュポット $\eta$ の並列結合である。並列なのでひずみは共通で、応力が加算される。
$$
\sigma=\sigma_{s}+\sigma_{d}=E\varepsilon+\eta\dot{\varepsilon}
$$
応力ステップ $\sigma(t)=\sigma_{0}H(t)$ に対して
$$
\eta\dot{\varepsilon}+E\varepsilon=\sigma_{0}
$$
より、遅れ時間（retardation time）
$$
\tau_{r}=\frac{\eta}{E}
$$
を用いて
$$
\varepsilon(t)=\frac{\sigma_{0}}{E}\left(1-e^{-t/\tau_{r}}\right)
$$
となる。したがってクリープコンプライアンスは
$$
J(t)=\frac{1}{E}\left(1-e^{-t/\tau_{r}}\right)
$$
である。



## 4.3 標準線形固体（Standard Linear Solid, Zener）

弾性的な瞬時応答と、有限の時間での緩和・遅れを同時に表す最小の三要素模型である。表現は同値なものが複数あるが、ここでは「ばね $E_{\infty}$ と Maxwell 要素（ばね $E_{1}$ とダッシュポット $\eta$ の直列）を並列」に採る。

このとき緩和弾性率は
$$
E(t)=E_{\infty}+E_{1}e^{-t/\tau},\qquad \tau=\frac{\eta}{E_{1}}
$$
の形をとる。$t\to 0^{+}$ での瞬時弾性率は $E(0^{+})=E_{\infty}+E_{1}$、$t\to\infty$ での長時間弾性率は $E(\infty)=E_{\infty}$ である。

構成式は微分形として
$$
\sigma+\frac{\eta}{E_{1}}\dot{\sigma}=(E_{\infty}+E_{1})\varepsilon+\eta\left(1+\frac{E_{\infty}}{E_{1}}\right)\dot{\varepsilon}
$$
と書ける。



## 4.4 Burgers 模型

クリープで現れる「瞬時ひずみ」「遅れ弾性」「定常流動」を同時に表す四要素模型である。代表的には Maxwell 模型と Kelvin–Voigt 模型を直列結合したものとして与えられる。

応力ステップ $\sigma_{0}H(t)$ に対するクリープコンプライアンスは、パラメータ表記に依存するが一般に
$$
J(t)=\frac{1}{E_{1}}+\frac{1}{E_{2}}\left(1-e^{-t/\tau_{2}}\right)+\frac{t}{\eta_{1}},\qquad \tau_{2}=\frac{\eta_{2}}{E_{2}}
$$
のように、有限時間で飽和する項と線形に増加する流動項を含む。



## 4.5 モデルの比較

| モデル | 構成式（一次元） | 応力緩和（$\varepsilon=\varepsilon_{0}H(t)$） | クリープ（$\sigma=\sigma_{0}H(t)$） | 表現できる現象 |
|---|---|---|---|---|
| 弾性 | $\sigma=E\varepsilon$ | $\sigma=E\varepsilon_{0}$ | $\varepsilon=\sigma_{0}/E$ | 即時弾性のみ |
| 粘性 | $\sigma=\eta\dot{\varepsilon}$ | $\sigma=0$（ひずみ保持には無限の操作が必要） | $\varepsilon=(\sigma_{0}/\eta)t$ | 流動のみ |
| Maxwell | $\dot{\varepsilon}=\dot{\sigma}/E+\sigma/\eta$ | $E(t)=E e^{-t/\tau}$ | $J(t)=1/E+t/\eta$ | 緩和・流動 |
| Kelvin–Voigt | $\sigma=E\varepsilon+\eta\dot{\varepsilon}$ | 緩和を適切に出しにくい | $J(t)=(1/E)(1-e^{-t/\tau_{r}})$ | 遅れ弾性（流動なし） |
| SLS(Zener) | 3要素 | $E(t)=E_{\infty}+E_{1}e^{-t/\tau}$ | 飽和するクリープ | 緩和と有限クリープ |
| Burgers | 4要素 | 条件により複指数 | $J(t)=1/E_{1}+1/E_{2}(1-e^{-t/\tau_{2}})+t/\eta_{1}$ | 緩和・遅れ弾性・流動 |



## 5. 周波数領域と複素弾性率

粘弾性の動的応答は、正弦波入力に対する位相遅れとして観測される。ひずみ制御を
$$
\varepsilon(t)=\varepsilon_{0}\sin(\omega t)
$$
とすると、応力は一般に
$$
\sigma(t)=\sigma_{0}\sin(\omega t+\delta)
$$
と書ける。ここで $\delta$ は位相差である。

複素弾性率を
$$
E^{*}(\omega)=\frac{\sigma_{0}}{\varepsilon_{0}}(\cos\delta+i\sin\delta)=E'(\omega)+iE''(\omega)
$$
と定義すると、
$$
E'(\omega)=\frac{\sigma_{0}}{\varepsilon_{0}}\cos\delta,\qquad
E''(\omega)=\frac{\sigma_{0}}{\varepsilon_{0}}\sin\delta
$$
である。$E'$ は貯蔵弾性率、$E''$ は損失弾性率である。損失正接（損失係数）は
$$
\tan\delta=\frac{E''}{E'}
$$
である。



## 6. 基本モデルの複素弾性率

## 6.1 Maxwell の複素弾性率
緩和時間 $\tau=\eta/E$ を用いると
$$
E^{*}(\omega)=E\frac{i\omega\tau}{1+i\omega\tau}
$$
よって
$$
E'(\omega)=E\frac{(\omega\tau)^{2}}{1+(\omega\tau)^{2}},\qquad
E''(\omega)=E\frac{\omega\tau}{1+(\omega\tau)^{2}}
$$
である。$\omega\tau\ll1$ では粘性支配、$\omega\tau\gg1$ では弾性支配へ移行する。

## 6.2 Kelvin–Voigt の複素弾性率
$$
E^{*}(\omega)=E+i\omega\eta
$$
よって
$$
E'(\omega)=E,\qquad E''(\omega)=\omega\eta
$$
である。

## 6.3 SLS(Zener) の複素弾性率
緩和弾性率 $E(t)=E_{\infty}+\sum E_{k}e^{-t/\tau_{k}}$ 型を持つため、一般に
$$
E^{*}(\omega)=E_{\infty}+\sum_{k}\frac{E_{k}(i\omega\tau_{k})}{1+i\omega\tau_{k}}
$$
の形へ拡張できる（一般化 Maxwell へ自然に接続する）。



## 7. 一般化モデルとスペクトル表現

## 7.1 一般化 Maxwell（Prony 級数）
緩和関数を指数関数和で近似する：
$$
E(t)=E_{\infty}+\sum_{k=1}^{N}E_{k}\,e^{-t/\tau_{k}}
$$
これは Maxwell 要素を多数並列化した模型（Wiechert 模型）と等価である。有限個の $\tau_{k}$ を選ぶことは、緩和時間が連続的に分布する実材料を、離散化して近似する操作である。

この表現は有限要素法などの数値計算に実装しやすく、内部変数（各 Maxwell 要素の応力）を用いることで畳み込み積分を逐次更新に置き換えられる。

## 7.2 一般化 Kelvin–Voigt
クリープ側の表現として
$$
J(t)=J_{0}+\sum_{k=1}^{N}J_{k}\left(1-e^{-t/\lambda_{k}}\right)
$$
が用いられる。ここで $\lambda_{k}$ は遅れ時間である。

## 7.3 連続スペクトル
離散和を連続化すると、緩和スペクトル $H(\tau)$ により
$$
E(t)=E_{\infty}+\int_{0}^{\infty} H(\tau)\,e^{-t/\tau}\,d(\ln\tau)
$$
のように書ける。$H(\tau)$ の同定は逆問題となり、測定窓（周波数域・時間域）が有限であることが解の不定性を生むため、正則化や物理拘束（単調性・非負性など）が重要になる。



## 8. 温度依存と時間温度換算則

多くの高分子や制振材料では、温度変化が緩和時間のスケールを大きく変える。時間温度換算則では、ある基準温度 $T_{0}$ に対して、温度 $T$ の曲線を時間（または周波数）軸方向に水平移動して重ね合わせる。

時間域では
$$
t'=\frac{t}{a_{T}},\qquad a_{T}>0
$$
周波数域では
$$
\omega'=\omega a_{T}
$$
の形でシフトする。$a_{T}$ はシフトファクターである。

## 8.1 WLF 式
ガラス転移温度近傍の非晶高分子などで広く用いられる経験式である：
$$
\log_{10} a_{T}=-\frac{C_{1}(T-T_{0})}{C_{2}+(T-T_{0})}
$$
$C_{1},C_{2}$ は材料定数である。

## 8.2 Arrhenius 型
活性化過程で支配される領域（より低温側など）では
$$
a_{T}=\exp\left[\frac{E_{a}}{R}\left(\frac{1}{T}-\frac{1}{T_{0}}\right)\right]
$$
が用いられることがある。

## 8.3 成立条件と限界
時間温度換算則がよく成立するのは、緩和機構が温度変化で一様に加速・減速し、スペクトル形状自体が保たれる場合（熱レオロジー的に単純である場合）である。結晶化、相分離、化学反応、含水率変化などで機構が変わる場合には、単一の $a_{T}$ で全域を表すことが破綻し得る。



## 9. 3次元連続体への拡張

一次元の議論は、テンソル形式へ自然に拡張できる。等方線形粘弾性では、体積変形（バルク）とせん断変形（デビエータ）を分離して考えるのが便利である。ひずみテンソル $\boldsymbol{\varepsilon}$ の体積成分 $\varepsilon_{m}=\mathrm{tr}(\boldsymbol{\varepsilon})/3$ と偏差成分 $\boldsymbol{\varepsilon}_{dev}$ を用いると、線形弾性では
$$
\boldsymbol{\sigma}=3K\,\varepsilon_{m}\mathbf{I}+2G\,\boldsymbol{\varepsilon}_{dev}
$$
である。

線形粘弾性では $K,G$ を時間依存関数へ拡張し、
$$
\boldsymbol{\sigma}(t)=3\int_{-\infty}^{t}K(t-\tau)\,\dot{\varepsilon}_{m}(\tau)\,d\tau\ \mathbf{I}
+2\int_{-\infty}^{t}G(t-\tau)\,\dot{\boldsymbol{\varepsilon}}_{dev}(\tau)\,d\tau
$$
のように書ける。実装上は $K(t),G(t)$ を Prony 級数で近似することが多い。



## 10. パラメータ同定の考え方

## 10.1 時間域
応力緩和試験から $E(t)$、クリープ試験から $J(t)$ を得て、指数和（Prony）で近似する。測定窓が有限であるため、短時間側・長時間側の外挿はモデル選択に強く依存する。特に $t\to 0^{+}$ の瞬時弾性率（装置剛性と慣性の影響を受けやすい）と、$t\to\infty$ の長時間弾性率（温度ドリフト・構造緩和・老化の影響を受けやすい）を別扱いにして拘束する設計がよく行われる。

## 10.2 周波数域（DMA など）
$E'(\omega),E''(\omega),\tan\delta$ を測定し、複素弾性率のモデル
$$
E^{*}(\omega)=E_{\infty}+\sum_{k}\frac{E_{k}(i\omega\tau_{k})}{1+i\omega\tau_{k}}
$$
へフィットする。温度系列を測る場合は、時間温度換算則でマスター曲線を構成してから同定する流れが多い。

## 10.3 物理拘束
線形粘弾性の熱力学整合性は、緩和関数の単調性や完全単調性（周波数応答の受動性）に関係する。数値フィットでは $E_{k}\ge 0$、$\tau_{k}>0$ のような制約を課し、非物理的な負の損失を防ぐ。



## 11. 取り扱い上の注意

- 線形域の確認  
  線形粘弾性が前提であるため、ひずみ振幅や応力振幅を変えて $E',E''$ が一定となる範囲を確認する必要がある。

- 温度制御  
  温度が $a_{T}$ を通じて緩和時間へ指数的に効く領域では、わずかな温度差が大きな見かけ差を生む。測定温度の安定化と、試料内部の温度均一性が支配的になる。

- 幾何と境界条件  
  せん断・引張・曲げなど、変形様式が異なると得られる量（$G^{*}$ と $E^{*}$）が異なる。等方性が成り立たない材料（配向材、積層材）では、モデルのテンソル拡張が必要である。

- 検出系のコンプライアンス  
  装置側のたわみや保持機構の緩みは、低周波側で材料の柔らかさとして混入しやすい。既知剛性のダミー試料や装置補正の手順を併用することが望ましい。



## 12. 近年の発展に触れる

## 12.1 分数階粘弾性
指数緩和（Prony）ではなく、べき法則的な緩和や広い時間スケールの分布を少数パラメータで表す目的で、分数階微分を用いる模型（分数階 Maxwell、分数階 Burgers など）が用いられることがある。分数階は、緩和スペクトルが広帯域にわたる材料の経験則を、連続分布の極限として捉える数学的枠組みでもある。

## 12.2 同定法の高度化
動的試験データからモデルを直接同定する手法（非パラメトリック同定、周波数帯域の最適設計など）が研究されている。モデルの自由度を増やすほど、測定窓外の挙動が不安定になり得るため、情報量とモデル複雑度の釣り合いが主題になる。


## まとめと展望

線形粘弾性は、ばねとダッシュポットに始まる最小模型から、緩和関数・複素弾性率・スペクトル表現へと一貫した理論体系を持つのである。今後は、温度や周波数の広帯域データと数値同定・物理拘束を統合し、材料の微視的緩和機構とモデルパラメータを往復させることで、単なる当てはめを越えて設計指針へ接続する方向が強まると考えられる。


## 参考文献・参考資料
- ANSYS Mechanical Material Reference  
  Viscoelasticity（Prony 系列と時間温度換算の扱い）  
  https://ansyshelp.ansys.com/public/Views/Secured/corp/v251/en/ans_mat/evis.html

- （日本語）化学研究評価機構 高分子試験・評価サービス  
  温度時間換算則  
  https://www.cerij.or.jp/service/05_polymer/rheology_temperature-time.html

- （日本語PDF）京都大学 高分子流変学（線型粘弾性・重畳原理を含む講義資料）  
  https://www.molsci.polym.kyoto-u.ac.jp/archives/PolymRheol.pdf

- Applied Mathematics, Brown University  
  Essentials of Linear Viscoelasticity（SLS/Zener の整理を含む）  
  https://appliedmath.brown.edu/sites/default/files/fractional/12%20EssentialsofLinearViscoelasticity.pdf

- Applied Mathematics, Brown University  
  Fractional Viscoelastic Models（分数階粘弾性のチュートリアル）  
  https://appliedmath.brown.edu/sites/default/files/fractional/13%20FractionalViscoelasticModels.pdf

- Amadori, S. et al., 2023  
  Identification of the extended standard linear solid material model from dynamical test measurements  
  https://www.sciencedirect.com/science/article/pii/S2352492823008504

- Wang, C. et al., 2025  
  Frequency range optimization for linear viscoelastic model parameter identification（Burgers 等の同定に関する議論）  
  https://www.sciencedirect.com/science/article/pii/S0020740324008580

- Maxwell, J. C., 1867  
  IV. On the dynamical theory of gases（原典PDF）  
  https://royalsocietypublishing.org/doi/pdf/10.1098/rstl.1867.0004

- Christensen, R. M., 1982  
  Theory of Viscoelasticity: An Introduction（書誌情報）  
  https://www.sciencedirect.com/book/9780121742522/theory-of-viscoelasticity

- Ferry, J. D., 1970（2nd ed.）  
  Viscoelastic Properties of Polymers（PDF所在例）  
  https://www.eng.uc.edu/~beaucag/Classes/Properties/Books/Viscoelastic%20Properties%20of%20Polymers%20Ferry.pdf
