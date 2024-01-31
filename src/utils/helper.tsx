import moment from "moment";

export const checkDays = (start: any) => {
  let timeNow = new Date();
  let timeRemaining = (timeNow - start) / 1000; // Waktu dalam detik
console.log(start)
  if (timeRemaining < 24 * 3600) {
    // Kurang dari 24 jam sejak proses dimulai.
    return 'kurang';
  } else if (timeRemaining >= 24 * 3600 && timeRemaining < 48 * 3600) {
    // Lebih dari atau sama dengan 24 jam, tapi kurang dari 48 jam sejak proses dimulai.
    return 'antara';
  } else if (timeRemaining >= 48 * 3600) {
    // Lebih dari atau sama dengan 48 jam sejak proses dimulai.
    return 'lebih';
  }

  // Default: Tidak ada kondisi yang terpenuhi
  return 'tidak diketahui';
};
export const reformatDate = valueDate => {
  if (valueDate) {
    const formatYears = moment(valueDate).format('YYYY');
    const formatMonth = moment(valueDate).format('MM');
    const formatDay = moment(valueDate).format('DD');
    const formatHours = moment(valueDate).format('HH');
    const minutes = moment(valueDate).format('mm');
    return new Date(
      formatYears,
      formatMonth - 1,
      formatDay,
      formatHours,
      minutes,
      0,
      0,
    );
  }
  return new Date();
};