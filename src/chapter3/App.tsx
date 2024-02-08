import { useContext } from 'react';
import { ChapterContext } from '../ChapterContext';

export default function App() {
  const chapter = useContext(ChapterContext);
  return (
    <>
      <h1>Chapter {chapter}</h1>
    </>
  );
}
