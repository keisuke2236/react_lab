// レイヤー 1/3
function Button({ handleClick, children }: { handleClick: () => void, children: React.ReactNode }) {
  return (
    <button onClick={handleClick}>
      {children}
    </button>
  )
}

// レイヤー 2/3 画像アップロードボタン
function UploadButton({ text }: { text: string }) {
  function onUpload() {
    console.log(`${text}画像アップロードしております`)
  }

  return (
    <Button handleClick={onUpload}>
      {text}アップロードボタン
    </Button>
  )
}

// レイヤー 2/3 他の処理をするボタン
function PlayButton({ text }: { text: string }) {
  function onPlay() {
    console.log(`${text}を再生してます`)
  }

  return (
    <Button handleClick={onPlay}>
      {text}再生ボタン
    </Button>
  )
}

function DeleteButton({ text }: { text: string }) {
  return (
    <Button handleClick={() => { console.log(`${text}を削除しました`) }}>
      {text}コンテンツを削除しました。
    </Button>
  )
}

function Toolbar({ contents }: { contents: string[] }) {
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
