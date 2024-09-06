# React + TypeScript + Vite + Bun プロジェクト

このプロジェクトは、高速で効率的な開発体験を提供するBunをJavaScriptランタイムおよびパッケージマネージャーとして使用しています。

## セットアップと使用方法

### 前提 bun の install
npm の早い version です、入れましょう。

```
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

### リンターとフォーマッター

コードの品質を維持するために、以下のコマンドを使用します：

```sh
bun run lint    # リンターの実行
bun run format  # フォーマッターの実行
```

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

使用例
```
chapter 1
```

これにより、テンプレートのコピー、名前の変更、VSCodeでの開封、ブラウザでの表示が自動で行われます。

## プロジェクトの構成

- **Vite**: 高速な開発サーバーとビルドツール
- **React**: ユーザーインターフェース構築のためのライブラリ
- **TypeScript**: 型安全な JavaScript の上位集合
- **Bun**: 高速な JavaScript ランタイムとパッケージマネージャー

## Bunに関する注意点

- `.bun` ディレクトリがキャッシュと依存関係の管理に使用されます。`.gitignore` に追加してください。
- `bun.lockb` というバイナリのロックファイルが生成されます。これはバージョン管理に含めるべきです。
- TypeScriptプロジェクトの場合、`tsconfig.json` に `"types": ["bun-types"]` を追加してBunの型定義を利用できます。


# React Ariaの使用
このプロジェクトではReact Ariaを使用して、アクセシブルなUIコンポーネントを作成します。主要なパッケージとして以下をインストールしています

```
@react-aria/interactions
@react-aria/focus
@react-stately/toggle
```

これらのパッケージを使用して、アクセシビリティに配慮したインタラクティブなUIを簡単に実装できます。

例えば、ボタンコンポーネントを作成する場合  

```
tsxCopyimport { useButton } from '@react-aria/button';
import { useRef } from 'react';

function Button(props) {
  let ref = useRef();
  let { buttonProps } = useButton(props, ref);
  
  return (
    <button {...buttonProps} ref={ref}>
      {props.children}
    </button>
  );
}
```

React Ariaの詳細な使用方法については、公式ドキュメントを参照してください。
