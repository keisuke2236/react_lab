import React, { Suspense, useContext } from 'react';
import { ChapterContext } from './lib/ChapterContext';
import { ConsoleLogViewer } from './lib/ConsoleLogViewer';

export const App: React.FC = () => {
  const chapter = useContext(ChapterContext);
  const ChapterComponent = React.lazy(() =>
    import(`./chapters/Chapter${chapter}/Chapter${chapter}`).catch(() => ({
      default: () => (
        <div className="text-red-500">チャプターの読み込みに失敗しました。</div>
      ),
    })),
  );

  return (
    <div className="flex h-screen">
      <div className="w-full p-4 overflow-auto mb-8">
        <ChapterContext.Provider value={chapter}>
          <Suspense
            fallback={<div className="text-center">読み込み中{chapter}...</div>}
          >
            <ChapterComponent />
          </Suspense>
        </ChapterContext.Provider>
      </div>
      <ConsoleLogViewer />
    </div>
  );
};
