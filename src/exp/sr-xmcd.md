# X線吸収分光（XAS）とX線磁気円二色性（XMCD）の原理

XASは、元素選択的に局所電子状態と局所構造を読む分光であり、XMCDはそこへ円偏光と磁化の自由度を導入して、元素別の磁気モーメントを分離して捉える手法である。両者は「内殻準位からの光吸収」という同一の遷移確率を起点とし、光の偏光・検出モード・解析法の違いが得られる情報の次元を決めるのである。

## 参考ドキュメント
1. KEK 放射光利用技術入門コース −XAFS(基礎編)（日本語PDF）
   https://cupal.kek.jp/e_learning/XAFS%E3%83%A9%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0%E8%B3%87%E6%96%99_1%E5%9F%BA%E7%A4%8E_.pdf
2. B. T. Thole et al., “X-ray circular dichroism as a probe of orbital magnetization,” Phys. Rev. Lett. 68, 1943 (1992).
   https://link.aps.org/doi/10.1103/PhysRevLett.68.1943
3. P. Carra et al., “X-ray circular dichroism and local magnetic fields,” Phys. Rev. Lett. 70, 694 (1993).
   https://link.aps.org/doi/10.1103/PhysRevLett.70.694

## 1. 用語と全体像
XAS（X-ray Absorption Spectroscopy）は、入射X線のエネルギー$E=\hbar\omega$を掃引し、吸収係数$\mu(E)$のエネルギー依存性を測る手法である。吸収端近傍の情報は電子状態・局所対称性・価数に敏感であり、吸収端より高エネルギー側の微細構造は周囲原子の幾何配置（距離・配位数・熱振動・乱れ）を反映する。

XASの区分はしばしば次の語で整理される。
- XANES（X-ray Absorption Near Edge Structure）：吸収端から概ね数10 eV程度の領域であり、価数、局所対称性、空軌道状態密度、コアホール効果（多体効果）などが支配的である。
- EXAFS（Extended X-ray Absorption Fine Structure）：吸収端より高エネルギー側（数10 eV〜1 keV程度）で、光電子の散乱干渉に由来する振動構造である。

XMCD（X-ray Magnetic Circular Dichroism）は、円偏光X線に対する吸収の差分として定義され、磁化$\mathbf{M}$の向きと光の角運動量（ヘリシティ）を結びつけることで、軌道・スピン由来の磁性情報を抽出する。典型的には
$$
\Delta\mu(E)=\mu^{+}(E)-\mu^{-}(E)
$$
で与えられ、$\mu^{+},\mu^{-}$は右・左円偏光（あるいはヘリシティ反転）に対応する吸収である。

## 2. 吸収係数$\mu(E)$の物理：遷移確率としてのXAS

### 2.1 フェルミの黄金律と電気双極子遷移
X線吸収は、初期状態$|i\rangle$（内殻電子が占有）から最終状態$|f\rangle$（内殻ホール＋励起電子）への遷移であり、遷移確率はフェルミの黄金律で与えられる。
$$
w_{i\to f}\propto \left|\langle f|\hat{H}_{\mathrm{int}}|i\rangle\right|^{2}\delta(E_f-E_i-\hbar\omega)
$$
X線領域では相互作用は電磁場との結合であり、近似として電気双極子（E1）遷移が支配的となる。このとき遷移演算子は偏光ベクトル$\boldsymbol{\epsilon}$を用いて$\boldsymbol{\epsilon}\cdot\mathbf{r}$で表され、吸収係数は
$$
\mu(\omega)\propto \sum_f \left|\langle f|\boldsymbol{\epsilon}\cdot\mathbf{r}|i\rangle\right|^2 \delta(E_f-E_i-\hbar\omega)
$$
となる。現実のスペクトルはコアホール寿命による線幅$\Gamma$と装置分解能により、$\delta$関数はローレンツ関数やガウス関数との畳み込みで広がる。

### 2.2 光学定数との関係：$\beta$と吸収
X線領域の複素屈折率を
$$
n(E)=1-\delta(E)+i\beta(E)
$$
と書くと、吸収係数は波長$\lambda$を用いて
$$
\mu(E)=\frac{4\pi}{\lambda}\beta(E)
$$
で与えられる。ここで$\delta(E)$は分散、$\beta(E)$は吸収に対応する。$\mu(E)$が測定で得られる量であることは、共鳴散乱（異常分散）や共鳴回折とも連続して理解できることを意味する。

## 3. 選択則と吸収端：K端とL端の意味

### 3.1 双極子選択則
電気双極子（E1）遷移では
$$
\Delta l=\pm 1,\quad \Delta m=0,\pm 1
$$
が基本となる。したがって、K端（$1s$）では主に$p$状態（$l=1$）へ遷移し、L端（$2p$）では主に$d$状態（$l=2$）へ遷移する。3d遷移金属の磁性では$d$軌道が中心であるため、L$_{2,3}$端（$2p_{1/2},2p_{3/2}$）XAS/XMCDが元素別$d$状態の磁性に直接結びつくのである。

### 3.2 スピン軌道分裂とL$_2$/L$_3$
$2p$内殻はスピン軌道相互作用により$j=l\pm 1/2$へ分裂し、L$_3$（$2p_{3/2}$）とL$_2$（$2p_{1/2}$）の二つの吸収端を与える。この分裂がXMCDのサムルール定量（軌道・スピンの分離）に必須である。

## 4. XANESが担う情報：価数・対称性・空軌道

XANESは「局所電子構造の指紋」に近い。代表的には次が支配的である。
- 化学シフト：価数増加に伴い内殻束縛エネルギーが増大し、吸収端が高エネルギーへシフトする傾向にある。
- ホワイトライン：遷移先の空状態密度が大きいと、吸収端直後に強いピークが現れる。遷移金属L端では$d$空孔数$n_h$と関連づけて議論されることが多い。
- 事前ピーク（pre-edge）：電気四重極（E2）遷移や$pd$混成により、本来禁制の遷移が弱く現れる。局所対称性や混成の指標となる。
- 多体効果：コアホールが最終状態を強く変え、単純な一電子DOS像からずれる。強相関酸化物や希土類では原子多重項・電荷移動（charge-transfer）を含む模型が必要となることが多い。

## 5. EXAFSが担う情報：散乱干渉としての振動構造

### 5.1 $k$空間と$\chi(k)$
吸収端より高エネルギー側では、励起電子は光電子として近傍原子に散乱され、戻ってきた波と干渉して吸収強度を変調する。光電子の波数$k$は
$$
k=\sqrt{\frac{2m_e}{\hbar^2}(E-E_0)}
$$
で定義され、$E_0$は吸収端エネルギー（実務上は微分最大などで定めることが多い）である。吸収係数から滑らかな背景$\mu_0(E)$を除き
$$
\chi(E)=\frac{\mu(E)-\mu_0(E)}{\Delta\mu_0(E)}
$$
を定義し、$k$へ変数変換して$\chi(k)$として扱う。

### 5.2 標準的なEXAFS式
単散乱近似の代表式は
$$
\chi(k)=\sum_j \frac{N_j S_0^2 f_j(k)}{kR_j^2}\exp(-2k^2\sigma_j^2)\exp\left(-\frac{2R_j}{\lambda(k)}\right)\sin\left(2kR_j+\delta_j(k)\right)
$$
である。ここで$R_j$は吸収原子からの距離、$N_j$は配位数、$\sigma_j^2$はデバイワラー因子（静的乱れ＋熱振動）、$\lambda(k)$は非弾性平均自由行程、$f_j(k)$は散乱振幅、$\delta_j(k)$は位相である。EXAFSが「局所構造（短距離秩序）」を得意とする理由は、$\chi(k)$が近傍原子の散乱位相と振幅に直接依存する点にある。

## 6. 偏光と異方性：XLDと配向情報

XASは偏光依存性を持ち、線偏光を用いると結晶場・軌道占有・配向の情報が得られる。線二色性（XLD）を
$$
\mathrm{XLD}(E)=\mu^{\parallel}(E)-\mu^{\perp}(E)
$$
と定義すると、局所対称性の低下、薄膜の配向、軌道秩序などが反映される。磁性体では、磁気線二色性（XMLD）がスピン配列（特に反強磁性）に敏感となる場合がある。

## 7. 検出モード：透過・蛍光・電子収量

XASは吸収そのものを直接測るというより、吸収に伴う副生成物（透過減衰、蛍光、電子）を指標として$\mu(E)$に換算することが多い。検出モードは情報深さ、歪み（非線形性）、S/Nを変える。

### 7.1 検出モードの整理
| 検出モード | 観測量の例 | 情報深さの傾向 | 長所 | 注意すべき点 |
|---|---|---|---|---|
| 透過法 | $I/I_0=\exp(-\mu t)$ | バルク | $\mu(E)$へ最も素直 | 試料厚さ$t$の制約が強い |
| TFY（全蛍光収量） | 蛍光総強度 | 比較的バルク | 厚い試料でも可能 | 自己吸収・飽和により歪むことがある |
| PFY（部分蛍光収量） | 特定線の蛍光 | バルク寄り | 背景低減 | 自己吸収の影響は残り得る |
| IPFY（逆部分蛍光収量） | 代替線の逆信号 | バルク | 自己吸収を抑えた$\mu$推定が可能 | 実装と統計に工夫が要る |
| TEY（全電子収量） | 試料電流 | 表面寄り（nm〜） | 軟X線で高感度 | 絶縁体で帯電し得る |
| PEY/AEY（部分/オージェ電子収量） | 高運動エネルギー電子 | より表面寄り | 表面・界面に敏感 | 帯電、表面汚染の影響が出やすい |

透過法ではBeer–Lambert則
$$
I(E)=I_0(E)\exp\{-\mu(E)t\}
$$
が基礎である。TFYでは「蛍光強度$\propto$吸収」は近似であり、濃度・厚さ・幾何で自己吸収が起こると比例関係が崩れる。電子収量は脱出深さが短く、界面・表面の寄与が強くなる。

## 8. XMCDの起源：円偏光角運動量と磁化の結合

円偏光光子は光の角運動量を持ち、双極子遷移で$\Delta m=\pm 1$を選択する。磁性体では、交換相互作用とスピン軌道相互作用により、空状態の$m$成分とスピン成分が非対称になり得る。その結果、右・左円偏光で励起されやすい終状態の重みが変化し、吸収差$\Delta\mu(E)$が生じるのである。

測定幾何として、XMCD強度は概ね磁化の光軸方向成分に比例し、
$$
\Delta\mu(E)\propto \mathbf{M}\cdot\hat{\mathbf{k}}
$$
という投影則で理解できる（厳密には遷移行列要素と多体効果を含む）。したがって入射角を変えることで、面内・面外磁化成分の分離や、磁気異方性の議論（角度依存XMCD）へつながる。

## 9. XMCDサムルール：軌道・スピン磁気モーメントの分離

3d遷移金属のL$_{2,3}$端XMCDでは、内殻$2p$のスピン軌道分裂を利用して、軌道角運動量$\langle L_z\rangle$とスピン角運動量$\langle S_z\rangle$（厳密には磁気双極子項$\langle T_z\rangle$を含む）を積分強度から定量できる。

### 9.1 定義する積分量
背景除去後の和スペクトル$\Sigma\mu(E)=\mu^{+}(E)+\mu^{-}(E)$と差スペクトル$\Delta\mu(E)=\mu^{+}(E)-\mu^{-}(E)$を用いる。L$_3$領域とL$_2$領域の積分を
$$
A=\int_{L_3}\Delta\mu(E)\,dE,\quad
B=\int_{L_2}\Delta\mu(E)\,dE,\quad
C=\int_{L_2+L_3}\Sigma\mu(E)\,dE
$$
とする。$n_h$は$d$空孔数（holes）である。

### 9.2 軌道モーメント
軌道磁気モーメント$m_L$は
$$
m_L=-\frac{4}{3}\mu_B\,n_h\,\frac{\int_{L_2+L_3}\Delta\mu(E)\,dE}{\int_{L_2+L_3}\Sigma\mu(E)\,dE}
=-\frac{4}{3}\mu_B\,n_h\,\frac{A+B}{C}
$$
の形で与えられる（$\Delta\mu$の符号規約により全体符号は入れ替わり得る）。

### 9.3 スピンモーメント（磁気双極子項を含む）
スピン磁気モーメント$m_S$は磁気双極子項$m_T$と組で現れ、
$$
m_S+7m_T=-6\mu_B\,n_h\,\frac{A-2B}{C}
$$
の形で与えられる。立方対称に近いバルクでは$m_T$が小さいと近似されることもあるが、薄膜・界面・低対称では無視できない場合がある。

### 9.4 $n_h$と規格化の意味
$n_h$はサムルールにおける量子数であり、「強度比」からモーメントを絶対値で出すために必要である。実験だけで一意に決めにくい場合があり、第一原理計算（DFT/KKR）や多重項計算、あるいは既知の価数・電子数を制約として用いる議論が行われる。遷移金属酸化物では混成により整数価数像が崩れ得るため、$n_h$の定義（有効空孔数）自体を含めた解釈が重要となる。

## 10. XAS/XMCD解析で現れる代表的な補正・整形

### 10.1 背景と規格化
XASは吸収端をまたいで大きなステップ（edge jump）を持つため、前縁（pre-edge）領域で基線を合わせ、後縁（post-edge）でスケールを合わせる規格化がよく用いられる。L端では白色線や多重項が強いため、積分範囲の取り方（どこまでをL$_2$+L$_3$とみなすか）が結果に影響する。

### 10.2 エネルギー較正
単一スペクトル内の相対形状だけではなく、比較（試料間、温度間、測定日間）ではエネルギー軸の整合が要る。参照箔や既知の吸収端位置で較正する議論が一般的である。

### 10.3 XMCD差分の取り方
XMCDは差分であるため、ドリフトや強度変動が残ると人工的な差が出る。ヘリシティ反転、磁場反転、両方の組合せで対称化し、奇偶成分を分けて評価するのが基本である。例えば磁場反転$\pm H$を用いると
$$
\Delta\mu(E)=\frac{1}{2}\left[\mu(E,+H)-\mu(E,-H)\right]
$$
のように定義でき、非磁性寄与の混入を減らせる。

## 11. 理論計算との接続

XAS/XMCDは終状態にコアホールを含むため、単純な基底状態DOSと1対1対応しないことがある。比較の粒度は目的で変えるのが自然である。
- XANES：多重散乱理論、コアホールを含むDFT、あるいは多重項・電荷移動模型で、ピーク系列や白色線を説明する。
- EXAFS：散乱振幅$f(k)$と位相$\delta(k)$を理論計算し、$R,N,\sigma^2$など構造パラメータをフィットする。
- XMCD：サムルールで得た$m_L,m_S$を第一原理計算の原子球内モーメントと対比する、あるいはスペクトル形状を相対比較する。

## 12. どの現象に強いか

| 対象の問い | XASで強い点 | XMCDで強い点 |
|---|---|---|
| 価数・化学状態 | 吸収端シフト、白色線、事前ピーク | 元素別に磁化がどの価数成分に乗るかを分離できる |
| 局所構造（短距離秩序） | EXAFSで$R,N,\sigma^2$ | 磁性原子の近傍構造変化と磁性変化の相関を議論できる |
| 薄膜・界面 | TEY/PEYで表面寄り、FYでバルク寄り | 深さ感度を変えつつ元素別磁化を追える |
| 強相関・多体効果 | XANES形状に強く出る | 多重項と交換分裂がXMCD形状に強く出る |
| 磁気異方性・磁化方向 | XLD/XMLDで軌道占有・対称性 | 角度依存XMCDで投影成分、サムルールで軌道寄与の議論が可能である |

## 13. まとめ

XASは、内殻電子の電気双極子遷移を通じて元素選択的に空状態と局所環境を読む分光であり、XANESとEXAFSが電子状態と局所構造を補完し合う体系である。XMCDは円偏光と磁化の結合により吸収差を作り、L$_{2,3}$端ではサムルールにより軌道・スピン磁気モーメントを分離して定量できる点に強みがある。検出モード、幾何、規格化の取り扱いを含めて「何が$\mu(E)$に比例し、どこで比例が崩れるか」を把握することが、信頼できる物性解釈を支えるのである。

## 関連研究
- C. T. Chen et al., “Experimental Confirmation of the X-Ray Magnetic Circular Dichroism Sum Rules for Iron and Cobalt,” Phys. Rev. Lett. 75, 152 (1995).
  https://link.aps.org/doi/10.1103/PhysRevLett.75.152
- M. Newville, Fundamentals of XAFS（XAFSの理論・測定・整形のまとまったノート）
  https://www.lehigh.edu/imi/teched/GlassCSC/SuppReading/Tutorials.pdf
- SPring-8 利用者情報：BL23SU（軟X線MCD実習資料、日本語PDF）
  https://www.spring8.or.jp/ext/ja/sp8summer_school/sp8ss2004/sp8ss2004doc/jisshu23su.pdf
- SPring-8 利用者情報：汎用XAFS､自動XAFS（日本語PDF）
  https://user.spring8.or.jp/ui/wp-content/uploads/Methods_all_4.pdf
- SPring-8 成果報告：TEY法とFY法によるXMCD計測（日本語PDF、自己吸収などの議論を含む）
  https://support.spring8.or.jp/report/Report_JSR/PDF_IAe_ALL/IAe_07B1853.pdf
- D. Asakura et al., “Material/element-dependent fluorescence-yield modes on soft XAS,” AIP Advances 6, 035105 (2016)（PFY/IPFY/TFYの使い分け）
  https://pubs.aip.org/aip/adv/article/6/3/035105/965391/Material-element-dependent-fluorescence-yield
- A. J. Achkar et al., “Bulk sensitive x-ray absorption spectroscopy free of self-absorption effects,” Phys. Rev. B 83, 081106 (2011)（FYの歪みとIPFY）
  https://link.aps.org/doi/10.1103/PhysRevB.83.081106
- J. Stöhr, NEXAFS Spectroscopy（TEYやAuger過程の直観的説明）
  https://www-ssrl.slac.stanford.edu/stohr/nexafs.htm
- KEK PFニュース：XMCD/XMLDの解説を含む記事（日本語PDF）
  https://www2.kek.jp/imss/pf/pfnews/38_4/saikin3.pdf
