import { useContext } from 'react';
import { ChapterContext } from '../../lib/ChapterContext';

export default function App() {
  const chapter = useContext(ChapterContext);
  return (
    <>
      <h1 className="text-2xl font-bold mb-4" id={`chapter-${chapter}-title`}>
        Chapter {chapter}：チャプタータイトル
      </h1>
      <div className="flex gap-2 p-4 flex-col">
        <>
          <p>src/chapters/chapter1/Chapter1.tsxを開いてください</p>
          <p>以下のようにConsole.logを実行すると右側にログが表示されます</p>
          <p>console.log('Hello, world!')</p>
          {console.log('Hello, world!')}
        </>
      </div>
    </>
  );
}
