/**
 * 秒の数値をMM:SS形式の文字列に変換します。
 * @param {number} second 秒
 * @returns MM:SS形式の文字列
 */
export const secondToMMSS = (second: number) => {
    const MM =
        second >= 10 * 60
            ? Math.floor(second / 60).toString()
            : second >= 1 * 60
                ? "0" + Math.floor(second / 60).toString()
                : "00";
    const SS = second % 60 >= 10 ? second % 60 : "0" + (second % 60);
    return MM + ":" + SS;
};
