# Akai-KKR のインストールメモ（Ubuntu）


## 0. 参考にした日本語ドキュメント

- AkaiKKR 公式ドキュメント（アカデメイア版・GitHub Pages）  
  https://academeia.github.io/AkaiKKR_Documents/   

- 「AkaiKKRのインストール（Ubuntu 20.04）」解説ページ（五味仁氏）  
  https://members.elsi.jp/~hitoshi.gomi/AkaiKKRinst.html  

- HPCI アプリケーション紹介ページ（AkaiKKR の概要）  
  https://www.t4.cii.isct.ac.jp/en/hpci-apps 

- AkaiKKR Documents（linux_intel での build 手順）  
  https://academeia.github.io/AkaiKKR_Documents/linux_intel  


## 1. AkaiKKR とは何か（ごく簡単に）

- KKR 法（Korringa–Kohn–Rostoker 法）＋ CPA（Coherent Potential Approximation）を用いた  
  グリーン関数ベースの第一原理コード。
- 不規則合金・不純物系・スピン分極系など、周期性が崩れた系に強い。
- 公式サイト（利用登録・ダウンロード）：  
  https://kkr.issp.u-tokyo.ac.jp/  


## 2. 事前準備（Ubuntu 側）

Ubuntu に以下が入っていることを確認する。

- Fortran コンパイラ（`gfortran` か Intel oneAPI `ifort` など）
- `make`
- 基本的なビルドツール

例えば、パッケージとしては：

- `gfortran`
- `build-essential`
- `git`（必要に応じて）

（実際に導入するときは、それぞれ `sudo apt install gfortran build-essential` などでインストールする）


## 3. AkaiKKR のダウンロード（公式サイトから）

1. ブラウザで  
   `https://kkr.issp.u-tokyo.ac.jp/` にアクセスする。
2. 「新規アカウント登録」ページから必要事項を入力し、アカウントを作成する。  
3. 登録したメールアドレスにパスワードが届くので確認する。
4. `https://kkr.issp.u-tokyo.ac.jp/jp/download/` にログインし、  
   最新版の AkaiKKR（例：`cpa2021v01.tgz` など）をダウンロードする。

ダウンロードしたファイルは、例えば以下のような場所に置いておく：

- `~/Downloads/AkaiKKR/cpa2021v01.tgz`  
- （バージョンごとにフォルダを分けておくと管理しやすい）

---

## 4. 作業ディレクトリの構成方針

バージョンごとにディレクトリを分ける例：

- メインディレクトリ：`~/AkaiKKR`
- その下に日付やバージョンでサブディレクトリを作る：

  - `~/AkaiKKR/2021xx/`  
  - その中に展開された `cpa2021` ディレクトリが入るイメージ

例えば：

- `~/AkaiKKR/2021xx/cpa2021/` の中にソースコード一式が存在する。


## 5. アーカイブの展開

1. 作業ディレクトリを決める（例：`~/AkaiKKR/2021xx`）。
2. ダウンロードした `.tgz` ファイル（例：`cpa2021v01.tgz`）をそこにコピーする。
3. 端末で作業ディレクトリに移動し、アーカイブを展開する。  

   - 実際のコマンド例（イメージ）  
     - `mkdir ~/AkaiKKR`  
     - `mkdir ~/AkaiKKR/2021xx`  
     - `cd ~/AkaiKKR/2021xx`  
     - `cp ~/Downloads/AkaiKKR/cpa2021v01.tgz .`  
     - `tar zxvf cpa2021v01.tgz`  

4. 展開後、`cpa2021` などのディレクトリができるので、そこに移動する。  
   - `cd cpa2021`

（バージョン名はダウンロードしたファイルに合わせて読み替える）


## 6. ビルド（コンパイル）の流れ

AkaiKKR Documents（linux_intel）で示されている基本的なビルド手順は以下の通り。  

1. 作業ディレクトリ（例：`~/AkaiKKR/2021xx/cpa2021`）にいることを確認する。
2. 連続して以下の `make` を実行する（`specx` がメイン実行ファイル）：

   - `make`  
   - `make gpd`  
   - `make spc`  

3. ビルドが成功すると、以下の実行ファイルが生成される：

   - `specx`（メインの KKR/CPA 計算プログラム）
   - `gpd`（ポテンシャル関連のポスト処理）
   - `spc`（スペクトル関連のポスト処理）

### 6.1 Fortran コンパイラの変更（必要な場合）

- デフォルトの Makefile は `gfortran` あるいは `f77` を前提としている場合がある。
- Intel oneAPI を使う場合は、Makefile 内のコンパイラ指定を

  - `FC = ifort`  
  - または `FC = mpiifort`

  のように書き換え、最適化オプションも環境に応じて修正する。

※ 具体的な最適化フラグは、AkaiKKR Documents や利用している計算環境の推奨設定を参照する。


## 7. 動作確認（テスト計算）

AkaiKKR Documents では、ビルドしたディレクトリで簡単なテストが紹介されている。  

1. `specx` と入力ファイルが同じディレクトリにあることを確認する。
2. 例として、鉄（Fe）のテスト入力ファイル `in/fe` を用いる場合：

   - 入力ファイルの場所：`in/fe`  
   - 実行例：`./specx < in/fe > out_fe`

3. 実行が正常終了し、`out_fe` に出力が生成されていればインストールは成功していると考えられる。

（入力ファイルのフォーマットや意味は、AkaiKKR のマニュアルとチュートリアル PDF を参照）


## 8. 実行ファイルの配置と PATH 設定

毎回ビルドディレクトリに移動しなくてもよいように、  
`specx` / `gpd` / `spc` を自分の `bin` ディレクトリにまとめておくと便利。

1. ホームディレクトリ以下に `~/bin` がなければ作成する。
2. `specx` などを `~/bin` にコピーする：

   - `cp specx ~/bin/`  
   - `cp gpd ~/bin/`  
   - `cp spc ~/bin/`  

3. `~/bin` を `PATH` に通す設定が `.bashrc` または `.zshrc` に入っているか確認する：

   - `export PATH="$HOME/bin:$PATH"`

4. 新しいシェルを開くか、`source ~/.bashrc` などでシェル設定を読み込み直す。

これで、どのディレクトリからでも

- `specx < infile > outfile`

のように AkaiKKR を実行できるようになる。


## 9. 参考：入力ファイル生成ツールとの連携

- 近年は、`cif2x`（cif2cell 後継）などの構造変換ツールが  
  AkaiKKR 用の入力ファイル生成に対応している。  
- CIF 形式の結晶データから自動的に AkaiKKR の入力を作成できるため、  
  実務では「cif2x → AkaiKKR」というパイプラインを構築することが多い。


## 10. まとめ

- AkaiKKR のインストールはおおまかに

  1. 公式サイトでアカウント作成 → ソースコード（`.tgz`）を入手  
  2. Ubuntu 上で Fortran コンパイラ・`make` を準備  
  3. アーカイブを展開し、`make` → `make gpd` → `make spc` でビルド  
  4. 簡単なテスト入力で `specx` の動作確認  
  5. 実行ファイルを `~/bin` などに置き、`PATH` を通す

- 詳細なオプションや高度な使い方は、AkaiKKR Documents や  
  講習会資料（PDF）を併せて参照しながら環境に合わせて調整する。

