import React, { Suspense, useContext } from 'react';
import { ChapterContext } from './ChapterContext';
import './App.css';

function App() {
  const chapter = useContext(ChapterContext);

  // 例：http://localhost:5174/?chapter=1
  const ChapterComponent = React.lazy(() =>
    import(`./Chapter${chapter}/App`)
      .then(module => ({ default: module.default }))
      .catch(error => {
        console.error("インポートエラー:", error);
        return {
          default: () =>
            <div>チャプターの読み込みに失敗しました。
              <br />{error.message}
            </div>
        };
      })
  );

  return (
    <div>
      <ChapterContext.Provider value={chapter}>
        <Suspense fallback={<div>読み込み中{chapter}...</div>}>
          <ChapterComponent />
        </Suspense>
      </ChapterContext.Provider>
    </div>
  );
}

export default App;
