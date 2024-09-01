import { useContext } from 'react';
import { ChapterContext } from '../../lib/ChapterContext';
import { useState, useEffect } from 'react';

export default function App() {
  const chapter = useContext(ChapterContext);
  const time: Date = useTime();
  return (
    <>
      <h1>Chapter {chapter}</h1>
      <Clock time={time.toLocaleTimeString()} />
    </>
  );
}

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return time;
}

function Clock({ time }: { time: string }) {
  return (
    <>
      <h1>{time}</h1>
      <input />
    </>
  )
}
