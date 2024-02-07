import React, { Suspense, useState, useEffect } from 'react';
import './App.css';

function App() {
  let query = new URLSearchParams(window.location.search);
  let chapter = query.get('chapter') || 'default';

  // 例：http://localhost:5174/?chapter=1
  const ChapterComponent = React.lazy(
    () => import(`./Chapter${chapter}/App`).catch(() => (
      { default: () => <div>Chapter not found.</div> })
    )
  );

  return (
    <div>
      <Suspense fallback={<div>Loading chapter...</div>}>
        <ChapterComponent />
      </Suspense>
    </div>
  );
}

export default App;
