import React, { useState } from 'react';


/** タイマーモード */
type TimerMode = "work" | "break";

/** タイマーの長さ */
type TimerLength = number;
const TIMER_LENGTH: { [key in TimerMode]: TimerLength } = { work: 25 * 60, break: 5 * 60 };

interface State {
  timeLeft: number;
  isTimerOn: boolean;
  timerMode: TimerMode;
}

/**
 * 秒の数値をMM:SS形式の文字列に変換します。
 * @param {number} second 秒
 * @returns MM:SS形式の文字列
 */
const secondToMMSS = (second: number) => {
  const MM =
    second >= 10 * 60
      ? Math.floor(second / 60).toString()
      : second >= 1 * 60
        ? "0" + Math.floor(second / 60).toString()
        : "00";
  const SS = second % 60 >= 10 ? second % 60 : "0" + (second % 60);
  return MM + ":" + SS;
};

const App: React.VFC = () => {
  const [state, setState] = useState<State>({
    timeLeft: TIMER_LENGTH.work,
    isTimerOn: false,
    timerMode: "work",
  });
  return (
    <div>
      <div data-testid="timeLeft">25:00</div>
      <button data-testid="timerButton">
        {state.isTimerOn ? "停止" : "開始"}</button>
      <div data-testid="timerMode">
        {state.timerMode === "work" ? "作業" : "休憩"}
      </div>
    </div>
  )
}

export default App;