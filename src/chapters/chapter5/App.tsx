import { useContext } from 'react';
import { ChapterContext } from '../../lib/ChapterContext';
import { sculptureList } from './data';
import { useState } from 'react';

// 以下2つの定義は、このコンポーネントの設定なのでここで定義して良い
const contentsLength = sculptureList.length;
const maxIndex = contentsLength - 1;

export default function App() {
  // Hooksの中で使う関数は、関数名をuseから始め、関数のTopレベルでしか定義できない
  const [index, setIndex] = useState(0);
  const [showDetailIndex, setShowDetailIndex] = useState(Array(contentsLength).fill(false));
  const chapter = useContext(ChapterContext);

  function handleNextClick() {
    if (index >= maxIndex) { return setIndex(0); }
    setIndex(index + 1);
  }

  function handleBeforeClick() {
    if (index <= 0) { return setIndex(maxIndex); }
    setIndex(index - 1);
  }

  function handleShowDetailIndexChange() {
    const result = [...showDetailIndex];
    result[index] = !showDetailIndex[index]
    setShowDetailIndex(result)
  }

  const sculpture = sculptureList[index];
  const isDisplay = showDetailIndex[index];

  return (
    <>
      <h1>Chapter {chapter}</h1>
      <h3>({index + 1} of {sculptureList.length})</h3>
      <button onClick={handleBeforeClick}>前のコンテンツ</button>
      <button onClick={handleNextClick}>次のコンテンツ</button>

      <h2><i>{sculpture.name}</i> 作者： {sculpture.artist}</h2>

      <img src={sculpture.url} alt={sculpture.alt} />
      <br />

      現在{index + 1}番目のコンテンツは {showDetailIndex[index] ? '表示' : '非表示'} です <br />
      <button onClick={handleShowDetailIndexChange}>
        {isDisplay ? '表示' : '非表示状態'} 切り替え
      </button><br />
      <p> {isDisplay && sculpture.description} </p>
    </>
  );
}
