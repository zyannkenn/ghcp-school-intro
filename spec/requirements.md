# Requirements: 神山まるごと高専 紹介サイト ミニマル和風リニューアル

## 概要
既存5ページ構成（index / about / curriculum / campus-life / access）を維持したまま、
CSS全面差し替えとHTML整理により「ミニマル和風・森の中」のUIへリニューアルし、
GitHub Pages（main/root ブランチデプロイ）で公開する。

## ユーザーストーリー

### US-1: 訪問者としてサイトの世界観を直感的に感じたい
神山まるごと高専の紹介サイトを訪れた初見の訪問者として、ページを開いた瞬間に
「静謐・自然・和の余白感」を感じ取り、学校の雰囲気を視覚的に理解したい。

### US-2: 訪問者として全ページを一貫したデザインで回遊したい
各ページ（理念・カリキュラム・学生生活・アクセス）を閲覧する訪問者として、
ヘッダー・フッター・見出し・余白のトーンが統一されたまま回遊でき、情報を迷わず得たい。

### US-3: モバイル利用者として快適に閲覧したい
スマートフォン（375px 幅）から大型ディスプレイ（1440px 幅）まで、
どの端末でもレイアウト崩れなく情報を読み取りたい。

### US-4: 運用者としてPagesに最小コストで公開・更新したい
リポジトリオーナーとして、ビルドツールやActionsを導入せず、
main ブランチのルートから GitHub Pages で公開したい。

### US-5: 訪問者として本サイトが非公式であることを認識したい
サイトが公式ではなくサンプルであることをフッターで明示的に確認し、
必要に応じて公式サイトへ遷移したい。

## 受け入れ基準（EARS 記法）

### R-1 デザイントーン
- **R-1.1**: THE SYSTEM SHALL 見出しに明朝体（Shippori Mincho）、本文に Noto Sans JP を適用する。
- **R-1.2**: THE SYSTEM SHALL カラーパレットとして深緑 `#2d4a2b` / 若葉 `#6b8e4e` / セージ `#a8c090` / 和紙ベージュ `#f5ecd7` / クリーム `#faf6ee` / 木目 `#8b6f47` / 樹皮 `#5c4a30` / 朱アクセント `#b34d3a` を CSS カスタムプロパティとして定義する。
- **R-1.3**: THE SYSTEM SHALL 朱色アクセントをリンク hover と注記記号のみに限定使用する（CTA は深緑系で統一）。

### R-2 ページ構成
- **R-2.1**: THE SYSTEM SHALL 既存の5ページ（`index.html` / `about.html` / `curriculum.html` / `campus-life.html` / `access.html`）を維持する。
- **R-2.2**: THE SYSTEM SHALL 各ページで共通のヘッダー・フッター・ナビゲーション構造を保つ。
- **R-2.3**: WHEN 訪問者がナビゲーションからページ遷移するとき, THE SYSTEM SHALL 相対パスで全ページへ解決する。

### R-3 和モチーフ
- **R-3.1**: THE SYSTEM SHALL サイトロゴ横に葉の SVG マークを表示する。
- **R-3.2**: THE SYSTEM SHALL 主要セクションの区切りに亀甲紋（kikko）または細線 SVG を使用する。
- **R-3.3**: WHERE 和モチーフを挿入する場合, THE SYSTEM SHALL 画像ファイルを追加せず、インライン SVG と CSS のみで実装する。
- **R-3.4**: THE SYSTEM SHALL セクション区切り装飾を主要セクションに限定し、装飾過多を回避する。

### R-4 ページ別スタイル
- **R-4.1**: THE SYSTEM SHALL `index.html` の3本柱カードを縦罫見出しスタイルで表示する。
- **R-4.2**: THE SYSTEM SHALL `about.html` の設立背景を年表風レイアウトで表示する。
- **R-4.3**: THE SYSTEM SHALL `curriculum.html` のタイムラインを年輪モチーフの縦軸で表示する。
- **R-4.4**: THE SYSTEM SHALL `campus-life.html` の各セクション間を亀甲紋で区切り、既存の lightbox JS を維持する。
- **R-4.5**: THE SYSTEM SHALL `access.html` の交通手段を行燈（あんどん）枠のカードで表示する。

### R-5 レスポンシブ
- **R-5.1**: WHILE ビューポート幅が 375px〜1440px の範囲にあるとき, THE SYSTEM SHALL レイアウト崩れなく全コンテンツを表示する。
- **R-5.2**: WHEN モバイル幅で表示されたとき, THE SYSTEM SHALL 既存のハンバーガーメニュー JS を正常に動作させる。

### R-6 GitHub Pages 公開
- **R-6.1**: THE SYSTEM SHALL リポジトリ直下に `.nojekyll` を配置し、Jekyll 処理を回避する。
- **R-6.2**: THE SYSTEM SHALL main ブランチの root から GitHub Pages を公開する（Actions は不採用）。
- **R-6.3**: WHEN 公開 URL `https://zyannkenn.github.io/ghcp-school-intro/` にアクセスされたとき, THE SYSTEM SHALL CSS / JS / 画像 / 内部リンクを相対パスで正しく解決する。
- **R-6.4**: THE SYSTEM SHALL `README.md` に Pages 公開手順と公開 URL 記載枠、非公式注記を含める。

### R-7 非公式表記
- **R-7.1**: THE SYSTEM SHALL フッターに「非公式の紹介サンプル」注記と公式サイトへのリンクを表示する。

### R-8 品質
- **R-8.1**: WHEN 全ページを DevTools Network パネルで読み込んだとき, THE SYSTEM SHALL 404 エラーを発生させない。
- **R-8.2**: THE SYSTEM SHALL Lighthouse Accessibility スコア 90 以上を達成する（コントラスト・alt 属性・見出し階層）。

### R-9 スコープ外
- **R-9.1**: IF 画像ファイルの自前調達・新規ページ追加・ビルドツール導入・カスタムドメイン・i18n が要求された場合, THEN THE SYSTEM SHALL それらを本タスクのスコープ外として扱う。

## 依存関係・制約
- 既存 HTML 構造・`assets/js/main.js`（ハンバーガー / フェードイン / lightbox）は流用前提。
- 画像は Unsplash URL を継続使用（差し替えは別タスク）。
- プロジェクトサイト（サブパス `/ghcp-school-intro/`）配信を前提に全パスは相対指定。

## Confidence Score
**92%** — 既存 5 ページ構成・既存 CSS 変数・既存 JS を流用する差分リニューアルであり、要件が明確で範囲も限定。未確定は SVG 装飾の具体的パターン選定のみ（design フェーズで確定）。
