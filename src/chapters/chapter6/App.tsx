import AddTask from './AddTask';
import TaskList from './TaskList';

// Taskのデータ（Tasks）とデータ（Reducer）を提供するためのコンテキストをインポート
import TasksProviders from './TasksProviders';

export default function App() {
  return (
    <TasksProviders>
      <h1>今日の予定</h1>
      <AddTask />
      <TaskList />
    </TasksProviders>
  );
}
