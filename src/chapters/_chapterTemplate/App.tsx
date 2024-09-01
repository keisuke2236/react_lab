import { useContext } from 'react';
import { ChapterContext } from '../../lib/ChapterContext';

export default function App() {
  const chapter = useContext(ChapterContext);
  return (
    <>
      <h1>Chapter {chapter}：Reactのライフサイクル</h1>
      <div className="flex flex-wrap justify-center items-center gap-4 p-4">
        <div className="flex-grow basis-1/2 md:basis-1/3 lg:basis-1/4 p-4 m-2">
          {/* コンテンツ */}
        </div>
      </div>
    </>
  );
}
