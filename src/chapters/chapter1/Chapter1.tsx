import { useContext } from 'react';
import { ChapterContext } from '../../lib/ChapterContext';

export default function App() {
  const chapter = useContext(ChapterContext);
  return (
    <>
      <h1 className="text-2xl font-bold mb-4" id={`chapter-${chapter}-title`}>
        Chapter {chapter}：チャプタータイトル
      </h1>
      <div className="flex flex-wrap justify-center items-center gap-4 p-4">
        <>
          コンテンツがレンダリングされるたびに実行されるので
          どんどんConsoleの表示内容が増えていきますよね。
          {console.log('Hello, world!')}
        </>
      </div>
    </>
  );
}
