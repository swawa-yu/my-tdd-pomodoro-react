import React, { useEffect, useState } from 'react';

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


const App: React.VFC = () => {
  const [state, setState] = React.useState<State>({
    timeLeft: TIMER_LENGTH.work,
    isTimerOn: false,
    timerMode: "work"
  });
  const [timer, setTimer] = React.useState<NodeJS.Timeout | undefined>();

  const timerCount = () => {
    setState((state) => {
      if (state.timeLeft <= 0) {
        state = toggleTimerMode(state);
      }
      return { ...state, timeLeft: state.timeLeft - 1 };
    });
  };

  const onButtonClick = () => {
    setState((state) => {
      timer && clearInterval(timer);
      if (state.isTimerOn) {
        return {
          ...state,
          timeLeft: TIMER_LENGTH.work,
          timerMode: "work",
          isTimerOn: false,
        };
      }
      setTimer(setInterval(() => {
        timerCount();
      }, 1000));
      return { ...state, isTimerOn: true };
    });
  };

  React.useEffect(() => {
    return () => {
      timer && clearInterval(timer);
    };
  }, [timer]);

  const toggleTimerMode = (state: State): State => {
    const timerMode: TimerMode = state.timerMode === "work" ? "break" : "work";
    return {
      ...state,
      timerMode,
      timeLeft: TIMER_LENGTH[timerMode],
    };
  };

  return (
    <>
      <div data-testid="timeLeft">{secondToMMSS(state.timeLeft)}</div>
      <button data-testid="timerButton" onClick={onButtonClick}>
        {state.isTimerOn ? "停止" : "開始"}
      </button>
      <div data-testid="timerMode">
        {state.timerMode === "work" ? "作業" : "休憩"}
      </div>
    </>
  )
}

export default App;