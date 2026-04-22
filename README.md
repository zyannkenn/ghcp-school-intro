# ghcp-school-intro

神山まるごと高専の紹介ページ（非公式サンプル）を GitHub Pages で公開するリポジトリです。

## サイト構成

| ファイル | ページ |
|---|---|
| `index.html` | トップ（ヒーロー + 学びの3柱 + 概要） |
| `about.html` | 学校紹介（理念・設立背景・特色） |
| `curriculum.html` | カリキュラム（3軸 + タイムライン + 科目一覧） |
| `campus-life.html` | キャンパスライフ（寮生活・行事・ギャラリー） |
| `access.html` | アクセス（地図・交通手段） |
| `assets/css/style.css` | 共通スタイル（配色変数・コンポーネント） |
| `assets/js/main.js` | 共通スクリプト（メニュー・アニメーション・ライトボックス） |

## GitHub Pages の公開設定

1. リポジトリの **Settings → Pages** を開く
2. **Source** を `Deploy from a branch` に設定
3. **Branch** を `main` / `/(root)` に設定して **Save**
4. `https://zyannkenn.github.io/ghcp-school-intro/` でアクセス可能になります

## ローカルで確認する方法

```bash
python3 -m http.server 8000
# → http://localhost:8000/ で確認
```

---

## コミットを取り消すコマンド

```bash
# 直前のコミットを取り消し（変更は残す）
git reset --soft HEAD~1

# 直前のコミットを取り消し（変更を作業ツリーに戻す）
git reset --mixed HEAD~1

# 直前のコミットを完全に取り消し（変更も削除）
git reset --hard HEAD~1

# 履歴を残して打ち消す（共有ブランチ向け）
git revert HEAD
```