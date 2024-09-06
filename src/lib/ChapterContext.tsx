// ChapterContext.tsx:
import { createContext } from 'react';

const query = new URLSearchParams(window.location.search);
export const ChapterContext = createContext(query.get('chapter') || 'default');
