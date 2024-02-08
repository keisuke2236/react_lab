import React, { Suspense, useContext } from 'react';
import { ChapterContext } from './ChapterContext';
import './App.css';

function App() {
  const chapter = useContext(ChapterContext);

  // 例：http://localhost:5174/?chapter=1
  const ChapterComponent = React.lazy(
    () => import(`./Chapter${chapter}/App`).catch(() => (
      { default: () => <div>Chapter not found.</div> })
    )
  );

  return (
    <div>
      <ChapterContext.Provider value={chapter}>
        <Suspense fallback={<div>Loading chapter{chapter}...</div>}>
          <ChapterComponent />
        </Suspense>
      </ChapterContext.Provider>
    </div>
  );
}

export default App;
