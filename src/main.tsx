import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './lib/index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error('正常に読み込めませんでした。');
}
