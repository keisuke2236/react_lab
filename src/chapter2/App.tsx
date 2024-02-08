function Button({ handleClick, children }) {
  return (
    <button onClick={handleClick}>
      {children}
    </button>
  )
}

// メソッド系、次に低レイヤーで 2/3
// function UploadButton(object) { console.log(object) }
// {text: 'アップロードする'} を引数として受け取っているので
// デストラクチャリングして text の値を抜き取っている
function UploadButton({ text }) {
  // コンポーネント内の関数はイベントハンドラと呼ばれ、onXXで始まるのが一般的
  function onUpload() {
    console.log(`${text}画像アップロードしております`)
  }

  return (
    // onClick である必要はなく onXXをこのボタンの概念に基づいて変更して良い
    <Button handleClick={onUpload}>
      {text}アップロードボタン
    </Button>
  )
}

// レイヤー 2/3 他の処理をするボタン
function PlayButton({ text }) {
  function onPlay() {
    console.log(`${text}を再生してます`)
  }

  return (
    <Button handleClick={onPlay}>
      {text}再生ボタン
    </Button>
  )
}

function DeleteButton({ text }) {
  return (
    <Button handleClick={() => { console.log(`${text}を削除しました`) }}>
      {text}コンテンツを削除しました。
    </Button>
  )
}

function Toolbar({ contents }) {
  return (
    contents.map((content, index) => (
      <div key={index} style={marginTop10Px()}>
        <UploadButton text={content} /><br />
        <PlayButton text={content} /><br />
        <DeleteButton text={content} /><br />
      </div>
    ))
  )
}

// 最上位コンポーネント 3/3
export default function App() {
  const contents = ['1個目', '2個目', '3個目', '4個目']

  return (
    <>
      <Toolbar contents={contents} />
    </>
  )
}

function marginTop10Px() {
  return { marginTop: '10px' }
}
