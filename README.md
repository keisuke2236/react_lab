# Usage

```sh 
npm install
npm run dev
```

URLを開く  

```
http://localhost:5173/?chapter=1
```

src/chapters/_chapterTemplate をコピーし chapter1 など命名

http://localhost:5173/?chapter=1 フォルダ名と同様のgetパラメータをつけてアクセス

Console.logの表示があります、サイズ調整はボタンで可能です。

## ワンコマンドセットアップ
chapter 数字 を入れるだけでコピーしてURLを表示し、vscodeで開きます。
最後3行がURLを表示し、vscodeで開き、ブラウザも開く処理なので不要であればコメントアウト。
bash.rc | zsh.rc に入れても良い。

```zsh
function chapter() {
  if [[ ! $1 =~ ^[0-9]+$ ]]; then echo "Usage: copychap <number>"; return 1; fi
  cp -R src/chapters/_chapterXX src/chapters/chapter$1 &&
  mv src/chapters/chapter$1/ChapterXX.tsx src/chapters/chapter$1/Chapter$1.tsx &&
  sed -i '' "s/XX/$1/g" src/chapters/chapter$1/Chapter$1.tsx &&
  echo "http://localhost:5173/?chapter=$1"
  open "http://localhost:5173/?chapter=$1"
  code "src/chapters/chapter$1/Chapter$1.tsx"
}

chapter 1
```


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
