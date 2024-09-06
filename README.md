# React を学ぶ時にデバッグして遊べるリポジトリ
React + TypeScript + Vite + Bun + React Aria + biome + Tailwind

このプロジェクトは、高速で効率的な開発体験を提供するBunをJavaScriptランタイムおよびパッケージマネージャーとして使用し
React Ariaを活用してアクセシビリティに優れたUIコンポーネントを構築します。また、Biomeを使用してコードの品質とフォーマットを管理しています。

## セットアップと使用方法

### 前提条件: Bunのインストール

Bunは高速なJavaScriptランタイムおよびパッケージマネージャーです。以下のコマンドでインストールできます：

```bash
curl -fsSL https://bun.sh/install | bash
```

### 基本的な使い方

1. 依存関係のインストール:
   ```sh
   bun install
   ```

2. 開発サーバーの起動:
   ```sh
   bun run dev
   ```

3. ブラウザでアクセス:
   ```
   http://localhost:5173/?chapter=1
   ```

### リンターとフォーマッター (Biome)

このプロジェクトではBiomeをリンターとフォーマッターとして使用しています。Biomeは高速で設定が簡単なコード品質ツールです。

コードの品質を維持するために、以下のコマンドを使用します：

```sh
bun run lint    # Biomeリンターの実行
bun run format  # Biomeフォーマッターの実行
```

Biomeの設定は `biome.json` ファイルで管理されています。必要に応じてこのファイルを編集し、プロジェクトの要件に合わせてカスタマイズできます。

## チャプターの作成と管理

1. `src/chapters/_chapterTemplate` をコピーし、`chapter1` などの名前に変更します。
2. フォルダ名と同じGETパラメータをURLに付けてアクセスします（例：`http://localhost:5173/?chapter=1`）。
3. Console.logの表示が可能で、サイズ調整ボタンも用意されています。

### ワンコマンドセットアップ

以下の関数を `.bashrc` または `.zshrc` に追加すると、チャプターの作成が簡単になります：

```zsh
function chapter() {
  if [[ ! $1 =~ ^[0-9]+$ ]]; then echo "使い方: chapter <数字>"; return 1; fi
  cp -R src/chapters/_chapterXX src/chapters/chapter$1 &&
  mv src/chapters/chapter$1/ChapterXX.tsx src/chapters/chapter$1/Chapter$1.tsx &&
  sed -i '' "s/XX/$1/g" src/chapters/chapter$1/Chapter$1.tsx &&
  echo "http://localhost:5173/?chapter=$1"
  open "http://localhost:5173/?chapter=$1"
  code "src/chapters/chapter$1/Chapter$1.tsx"
}
```

使用例:
```
chapter 1
```

これにより、テンプレートのコピー、名前の変更、VSCodeでの開封、ブラウザでの表示が自動で行われます。

## プロジェクトの構成

- **Vite**: 高速な開発サーバーとビルドツール
- **React**: ユーザーインターフェース構築のためのライブラリ
- **TypeScript**: 型安全なJavaScriptの上位集合
- **Bun**: 高速なJavaScriptランタイムとパッケージマネージャー
- **React Aria**: アクセシブルなUIコンポーネント作成のためのフックライブラリ
- **Biome**: 高速で設定が簡単なJavaScriptツールチェーン（リンター、フォーマッター）

## Bunに関する注意点

- `.bun` ディレクトリがキャッシュと依存関係の管理に使用されます。`.gitignore` に追加してください。
- `bun.lockb` というバイナリのロックファイルが生成されます。これはバージョン管理に含めるべきです。
- TypeScriptプロジェクトの場合、`tsconfig.json` に `"types": ["bun-types"]` を追加してBunの型定義を利用できます。

## React Ariaの使用

https://react-spectrum.adobe.com/react-aria/index.html

Adobeが開発するUIライブラリで、簡単に使えるのでちょっと良さげなパーツ入れたい時に便利。

このプロジェクトではReact Ariaを使用して、アクセシブルなUIコンポーネントを作成します。主要なパッケージとして以下を使用しています：

```
react-aria-components
```

これにより、アクセシビリティに配慮したインタラクティブなUIを簡単に実装できます。

例えば、ボタンコンポーネントを作成する場合：

```tsx
import { Button } from 'react-aria-components';

function MyButton(props) {
  return (
    <Button {...props}>
      {props.children}
    </Button>
  );
}
```

React Ariaの詳細な使用方法については、[公式ドキュメント](https://react-spectrum.adobe.com/react-aria/)を参照してください。

## CSS
css は Tailwind を採用してます。

## Console Log Viewer

このプロジェクトには、カスタムのコンソールログビューアが含まれています。以下の特徴があります：

- リアルタイムでのコンソールログの表示
- ANSIエスケープシーケンスの適切な処理
- ログのフィルタリングと重複排除
- 表示幅の調整機能

Console Log Viewerの使用方法や詳細については、関連するコンポーネントのドキュメントを参照してください。
