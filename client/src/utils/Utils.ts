export const generateRandomString = function (length: number) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// Check if two dates are within an hour of each other
export const timesWithinHour = (_date1: Date, _date2: Date) => {
  const isSameDay =
    _date1.getDate() === _date2.getDate() &&
    _date1.getMonth() === _date2.getMonth() &&
    _date1.getFullYear() === _date2.getFullYear();

  const timeDifference = Math.abs(_date1.getTime() - _date2.getTime());
  return isSameDay && timeDifference < 3600000;
};
