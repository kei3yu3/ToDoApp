# 開発・コーディング規約 (Contributing Guidelines)

このプロジェクトのコード品質とデザインの一貫性を保つため、機能追加や修正を行う際は以下のルールに従ってください。

## 1. スタイリング規約 (Tailwind CSS & UIデザイン)
* **インラインスタイルの禁止**: `style={{ ... }}` によるスタイル指定は行わず、すべて Tailwind CSS のユーティリティクラスを使用してください。
* **グラスモーフィズムの統一**: パネルやカード要素を作成する際は、原則として以下のすりガラス風クラスをベースにしてください。
  * 基本パネル: `bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl shadow-sm`
  * 入力フォーム類: `bg-white/60 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300/50`
* **アイコンの実装**: OSやブラウザによる表示差異を防ぐため、絵文字（✎, 🗑など）は使用せず、`stroke="currentColor"` を指定したインラインSVGを使用してください。

## 2. React / TypeScript コーディング規約
* **コンポーネントの定義とエクスポート**: `App.tsx` を除き、コンポーネントはアロー関数＋名前付きエクスポート（`export const ComponentName = ...`）で統一してください。
* **型定義（TypeScript）**:
  * `any` 型の使用は禁止します。
  * アプリ全体で共有する型（`Task` など）は `src/types.ts` に定義し、コンポーネント固有の `Props` は各ファイル内で `type Props = { ... }` として定義してください。
  * 型のみをインポートする際は `import type { ... }` を使用してください。
* **イベントハンドラの命名規則**:
  * 親から子へ渡すPropsの関数名: `on` + 動詞（例: `onAddTask`, `onDeleteTask`）
  * コンポーネント内部で処理する関数名: `handle` + 動詞（例: `handleSubmit`, `handleSave`）

## 3. ディレクトリ構成と状態管理
* **ディレクトリ分け**: コンポーネントは役割ごとに `src/components/layout/`（画面枠組み）や `src/components/tasks/`（タスク機能）などのフォルダに分けて配置してください。
* **状態の管理場所**: タスクデータやフィルター状態など、複数コンポーネントに関わるStateは `App.tsx`（またはレイアウトの親）で一元管理し、子コンポーネントにはProps経由で渡してください。

## 4. Git コミットルール
* 1つのコミットには1つの目的（機能追加、バグ修正、デザイン調整など）のみを含めてください。
* コミットメッセージは「何をしたか」がひと目で分かる簡潔な日本語で記述してください（例: `編集機能の追加`、`全体のTailwind化とグラスモーフィズムの適用`）。