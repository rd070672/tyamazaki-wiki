# VASPのインストール方法

作成日：2025年11月17日

## Phonopy のインストール手順

i.  公式サイト: https://phonopy.github.io/phonopy/install.html  
ii. `git clone https://github.com/phonopy/phonopy.git`  
iii.`cd vasp.6.5.1/phonopy`  
iv. `sudo apt update`  
v.  `sudo apt install -y python3-venv python3-pip`  
vi. `python3 -m venv ~/venv-phonopy`  
vii.`source ~/venv-phonopy/bin/activate`  
viii.`pip install . -vvv`  
ix. システム Python には一切触らず、`~/venv-phonopy` の中だけに phonopy（と依存パッケージ）が入ります。  
x.  以後、phonopy を使うときは  
    - `source ~/venv-phonopy/bin/activate`  
    - `phonopy --version`  # 動作確認
