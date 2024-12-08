import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Route } from "./+types/home";
import classNames from "classnames";

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
      <Calendar />
    </main>
  );
}

function Calendar() {
  const [date, setDate] = useState<{
    year: number;
    month: number;
  }>();
  useEffect(() => {
    const now = new Date();
    setDate({
      year: now.getFullYear(),
      month: now.getMonth() + 1,
    });
  }, []);
  const cells = useMemo(() => {
    if (!date) return [];
    const firstDay = new Date(date.year, date.month - 1, 1);
    const lastDay = new Date(date.year, date.month, 0);
    const days = Array.from({ length: lastDay.getDate() }, (_, i) => i + 1);
    const firstDayOfWeek = firstDay.getDay();
    const lastDayOfWeek = lastDay.getDay();
    const firstWeek = Array.from({ length: firstDayOfWeek }, () => 0);
    const lastWeek = Array.from({ length: 6 - lastDayOfWeek }, () => 0);
    return [...firstWeek, ...days, ...lastWeek];
  }, [date]);
  const [yearEnds, setYearEnds] = useState<
    {
      month: number;
      day: number;
      random: number;
    }[]
  >([{ month: 12, day: 31, random: 0.2 }]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const cellAnimationEnd = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    document.body.classList.remove("animate-shake");
    void document.body.offsetWidth;
    document.body.classList.add("animate-shake");
  }, []);

  if (!date) return null;
  return (
    <div className="overflow-hidden">
      <audio src="/stamp.mp3" ref={audioRef} />
      <div className="relative mx-auto w-96 max-w-full pb-2 flex items-center">
        <button
          type="button"
          className="border-2 py-1 px-2 text-gray-500 border-slate-400 active:bg-slate-100 rounded-full absolute left-0 leading-none"
          onClick={() => {
            const now = new Date();
            setDate({
              year: now.getFullYear(),
              month: now.getMonth() + 1,
            });
          }}
        >
          今日
        </button>
        <div className="flex w-fit items-center gap-1 mx-auto">
          <button
            type="button"
            className="rounded-full p-2 active:bg-gray-100"
            onClick={() => {
              setDate({
                year: date.year - (date.month === 1 ? 1 : 0),
                month: date.month === 1 ? 12 : date.month - 1,
              });
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <span className="text-2xl font-bold">{date.month}</span>
            <span className="text-lg font-bold ml-1">月</span>
          </div>
          <button
            type="button"
            className="rounded-full p-2 active:bg-gray-100"
            onClick={() => {
              setDate({
                year: date.year + (date.month === 12 ? 1 : 0),
                month: date.month === 12 ? 1 : date.month + 1,
              });
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto pb-12">
        <div className="grid grid-cols-7 border-gray-400 border-t border-l max-w-96 mx-auto min-w-[340px]">
          {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
            <div
              key={day}
              className="text-center border-gray-400 border-r border-b"
            >
              <span
                className={classNames(
                  "text-sm",
                  day === "土" && "text-blue-500",
                  day === "日" && "text-red-500"
                )}
              >
                {day}
              </span>
            </div>
          ))}
          {cells.map((day, i) => (
            <button
              key={`${date.month}_${day}_${i}`}
              type="button"
              className={classNames(
                "border-gray-400 border-r border-b aspect-square relative active:bg-gray-50",
                day === 0 && "bg-gray-100",
                date.year === new Date().getFullYear() &&
                  date.month === new Date().getMonth() + 1 &&
                  day === new Date().getDate() &&
                  "bg-yellow-100"
              )}
              disabled={day === 0}
              onClick={() => {
                if (
                  yearEnds.some(
                    (yearEnd) =>
                      yearEnd.month === date.month && yearEnd.day === day
                  )
                ) {
                  setYearEnds(
                    yearEnds.filter(
                      (yearEnd) =>
                        yearEnd.month !== date.month || yearEnd.day !== day
                    )
                  );
                } else {
                  setYearEnds([
                    ...yearEnds,
                    { month: date.month, day, random: Math.random() },
                  ]);
                }
              }}
            >
              {day !== 0 && (
                <>
                  <div
                    className={classNames(
                      "absolute top-0 left-0.5 text-sm",
                      i % 7 === 6 && "text-blue-500",
                      i % 7 === 0 && "text-red-500"
                    )}
                  >
                    {day}
                  </div>
                  {yearEnds.some(
                    (yearEnd) =>
                      yearEnd.month === date.month && yearEnd.day === day
                  ) && (
                    <div
                      className="absolute bottom-0 right-0 rounded-full border-red-500 border-2 w-[88%] aspect-square animate-stamp z-10 pointer-events-none"
                      style={{
                        transform: `rotate(${
                          -25 +
                          50 *
                            (yearEnds.find(
                              (yearEnd) =>
                                yearEnd.month === date.month &&
                                yearEnd.day === day
                            )?.random ?? 0)
                        }deg)`,
                      }}
                      onAnimationEnd={cellAnimationEnd}
                    >
                      <div className="relative size-full">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500">
                          <p className="text-xs -mb-1 mt-0.5">2024</p>
                          <p className="text-md font-extrabold whitespace-nowrap">
                            年末
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
