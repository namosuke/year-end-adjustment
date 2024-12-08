import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "「年末」を「調整」してくれるアプリ" },
    {
      name: "description",
      content:
        "このアプリでは「年末」を「調整」できます。※年末調整ではありません。",
    },
  ];
}

export default function Home() {
  return (
    <main>
      <header className="bg-sky-200 h-36">
        <h1>「年末」を「調整」してくれるアプリ</h1>
      </header>
      <div className="w-fit mx-auto p-5 leading-7">
        <p>
          このアプリでは「年末」を「調整」できます。
          <br />
          ※年末調整ではありません。
        </p>
        <p>好きな日をクリックして年末にしてみよう！</p>
      </div>
    </main>
  );
}
