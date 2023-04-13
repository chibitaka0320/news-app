export const TimeFormatte = (dt) => {
  const date = new Date(dt * 1000); // UNIX UTC時間をミリ秒に変換して、Dateオブジェクトを作成

  const hours = date.getUTCHours(); // 時間を取得
  const minutes = date.getUTCMinutes(); // 分を取得
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return formattedTime;
};

export const DateFormatte = (dt) => {
  const date = new Date(dt * 1000); // UNIX UTC時間をミリ秒に変換して、Dateオブジェクトを作成

  const month = date.getUTCMonth() + 1; // 月を取得 (0から始まるため、+1する)
  const day = date.getUTCDate();
  const formattedDate = `${month}/${day}`; // フォーマットされた日付を作成
  return formattedDate;
};
