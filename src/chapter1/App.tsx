export default function App() {
  let hoge: string = 'hoge';
  let piyo: boolean = true;
  let fuga: number = 1;
  let foo: object = { key: 'value' };
  let bar: any = 'bar';

  interface User {
    name: string;
    age: number;
  }

  class User {
    name: string;
    age: number;

    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }

    happyBirthday(): number {
      this.age++;
      console.log(`${this.name}さん、${this.age}歳のお誕生日おめでとう！`);
      return this.age;
    }
  }

  let user: User = new User('Taro', 30);

  return (
    <>
      <h1>User</h1>
      <p>{user.name}さん {user.age}歳</p>
      <p>Happy Birthday! {user.happyBirthday()}歳になりました</p>
    </>
  );
}
