import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from 'react-aria-components';

type LogEntry = { id: string; content: string; timestamp: number };
type Width = '1000px' | '800px' | '600px' | '400px' | '200px';

// biome-ignore lint/suspicious/noControlCharactersInRegex: <explanation>
const stripAnsi = (str: string) => str.replace(/\u001b\[.*?m/g, '');
const isValidLog = (log: string) => {
  const stripped = stripAnsi(log).trim();
  return (
    stripped !== '' && !stripped.startsWith('%s') && !stripped.endsWith('%s')
  );
};

export const ConsoleLogViewer: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [width, setWidth] = useState<Width>('600px');
  const pendingLogsRef = useRef<Set<LogEntry>>(new Set());
  const timeoutIdRef = useRef<number | null>(null);

  const addLog = useCallback((newLog: string) => {
    // biome-ignore lint/complexity/noForEach: <explanation>
    newLog
      .split('\n')
      .filter(isValidLog)
      .forEach((line) => {
        pendingLogsRef.current.add({
          id: `${Date.now()}-${Math.random()}`,
          content: stripAnsi(line),
          timestamp: Date.now(),
        });
      });

    if (timeoutIdRef.current !== null) clearTimeout(timeoutIdRef.current);

    timeoutIdRef.current = window.setTimeout(() => {
      setLogs((prevLogs) =>
        [...prevLogs, ...Array.from(pendingLogsRef.current)].sort(
          (a, b) => a.timestamp - b.timestamp,
        ),
      );
      pendingLogsRef.current.clear();
      timeoutIdRef.current = null;
    }, 100);
  }, []);

  useEffect(() => {
    const originalConsoleLog = console.log;
    console.log = (...args: unknown[]) => {
      addLog(
        args
          .map((arg) =>
            typeof arg === 'object' ? JSON.stringify(arg) : String(arg),
          )
          .join(' '),
      );
      originalConsoleLog.apply(console, args);
    };

    return () => {
      console.log = originalConsoleLog;
      if (timeoutIdRef.current !== null) clearTimeout(timeoutIdRef.current);
    };
  }, [addLog]);

  return (
    <div
      className="fixed top-0 right-0 h-full bg-gray-800 text-white p-4 overflow-auto"
      style={{ width }}
    >
      <h2 className="text-xl font-bold mb-4">Console Logs</h2>
      <div className="mb-4">
        {(['1000px', '800px', '600px', '400px', '200px'] as const).map((w) => (
          <Button
            key={w}
            onPress={() => setWidth(w)}
            className="mr-2 mb-2 px-3 py-1 bg-blue-500 text-white rounded"
          >
            {w}
          </Button>
        ))}
      </div>
      <div
        className="rounded-lg bg-black p-4 overflow-y-auto"
        style={{ height: 'calc(100% - 100px)' }}
      >
        {logs.map(({ id, content }) => (
          <div key={id} className="mb-2 font-mono text-sm">
            {content}
          </div>
        ))}
      </div>
    </div>
  );
};
