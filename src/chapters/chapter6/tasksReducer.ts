// Action は Reducer に依存する型なので tasksReducer.ts に定義する
export type Action = {
  id: number;
  type: string;
  text: string;
  done: boolean;
}

export type Tasks = Task[];

export type Task = {
  id: number;
  text: string;
  done: boolean;
}

export const initialTasks: Tasks = [
  { id: 0, text: '大根を買いに行く', done: true },
  { id: 1, text: '牛乳を飲む', done: false },
  { id: 2, text: '大阪の情報を調べる', done: false }
];

// ActionType はあえて日本語で書いてます。
// return 時の型情報を持たせたい
export function tasksReducer(tasks: Tasks, action: Action): Tasks | never {
  switch (action.type) {
    case '追加': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }

    case '変更': {
      return tasks.map(task => {
        if (task.id === action.id) {
          return { ...task, text: action.text, done: action.done }
        } else {
          return task;
        }
      });
    }

    case '削除': {
      return tasks.filter(task => task.id !== action.id);
    }

    default: {
      throw Error(action.type + 'というアクションは見つかりませんでした');
    }
  }
}
