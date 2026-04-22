# ghcp-school-intro

神山まるごと高専の紹介ページ（**非公式の紹介サンプル**）を GitHub Pages で公開するリポジトリです。

> ⚠️ 本サイトは学習目的で制作した非公式サンプルであり、公式の発信ではありません。最新・正確な情報は [公式サイト](https://kamiyama.ac.jp/) をご確認ください。

## デザインコンセプト

**ミニマル和風・森の中** — 静謐・自然光・余白を基調に、明朝体（Shippori Mincho）と和紙ベージュ、朱色の控えめなアクセントで構成。和モチーフ（葉・亀甲紋・年輪）はインラインSVGで実装。

## サイト構成

| ファイル | ページ |
|---|---|
| `index.html` | トップ（ヒーロー + 学びの3柱 + 概要） |
| `about.html` | 学校紹介（理念・設立背景・特色） |
| `curriculum.html` | カリキュラム（3軸 + タイムライン + 科目一覧） |
| `campus-life.html` | キャンパスライフ（寮生活・行事・ギャラリー） |
| `access.html` | アクセス（地図・交通手段） |
| `assets/css/style.css` | 共通スタイル（ミニマル和風） |
| `assets/js/main.js` | 共通スクリプト（メニュー・アニメーション・ライトボックス） |
| `.nojekyll` | GitHub Pages で Jekyll 処理を無効化 |
| `spec/` | 要件・設計・タスク（Spec-Driven Workflow 成果物） |

## 公開 URL

- https://zyannkenn.github.io/ghcp-school-intro/

## GitHub Pages の公開設定

1. リポジトリの **Settings → Pages** を開く
2. **Source** を `Deploy from a branch` に設定
3. **Branch** を `main` / `/(root)` に設定して **Save**
4. 数分後、上記 URL でアクセス可能になります
5. 本リポジトリには `.nojekyll` が含まれるため、Jekyll ビルドはスキップされます

## ローカルで確認する方法

```bash
python3 -m http.server 8000
# → http://localhost:8000/ で確認
```

## Spec / 設計ドキュメント

- [spec/requirements.md](spec/requirements.md) — 要件（EARS 記法）
- [spec/design.md](spec/design.md) — デザイントークン・コンポーネント・アーキテクチャ
- [spec/tasks.md](spec/tasks.md) — 実装タスクと検証チェックリスト

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