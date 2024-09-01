import React, { Suspense, useContext, useState, useEffect } from 'react';
import { ChapterContext } from './ChapterContext';

const ConsoleLogInterceptor: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [width, setWidth] = useState<string>("600px");

  const WidthChangeButton: React.FC<{ width: string }> = ({ width }) => (
    <button onClick={() => setWidth(width)} className="mb-2 p-1 pt-0 pb-0 mr-1">{width}</button>
  );

  useEffect(() => {
    const originalConsoleLog = console.log;
    console.log = (...args: any[]) => {
      setLogs(prevLogs => [...prevLogs, args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' ')]);
      originalConsoleLog.apply(console, args);
    };

    return () => {
      console.log = originalConsoleLog;
    };
  }, []);

  return (
    <div className="fixed top-0 right-0 h-full bg-gray-500 p-2 overflow-auto" style={{ width }}>
      <h2 className="text-lg font-bold mb-2">Console Logs</h2>
      <WidthChangeButton width="1000px" />
      <WidthChangeButton width="800px" />
      <WidthChangeButton width="600px" />
      <WidthChangeButton width="400px" />
      <WidthChangeButton width="200px" />
      <div className="rounded-md bg-black mb-2 p-2">
        {logs.map((log, index) => (
          <div key={index} className="mb-1 font-mono text-sm">{log}</div>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const chapter = useContext(ChapterContext);
  const ChapterComponent = React.lazy(() =>
    import(`./Chapter${chapter}/App`)
      .then(module => ({ default: module.default }))
      .catch(error => {
        console.error("インポートエラー:", error);
        return {
          default: () => (
            <div className="text-red-500">
              チャプターの読み込みに失敗しました。
              <br />{error.message}
            </div>
          )
        };
      })
  );

  return (
    <div className="flex h-screen">
      <div className="w-4/10 p-8 overflow-auto">
        <ChapterContext.Provider value={chapter}>
          <Suspense fallback={<div className="text-center">読み込み中{chapter}...</div>}>
            <ChapterComponent />
          </Suspense>
        </ChapterContext.Provider>
      </div>
      <ConsoleLogInterceptor />
    </div>
  );
};

export default App;
