import colors from 'colors';
import moment from 'moment';

const getCurrentTime = () => moment().format('YYYY-MM-DD hh:mm:ss');

exports.red = (...str) => {
  str.forEach((e) => {
    console.log(colors.red(getCurrentTime(), e));
  });
};

exports.green = (...str) => {
  str.forEach((e) => {
    console.log(colors.green(getCurrentTime(), e));
  });
};

exports.yellow = (...str) => {
  str.forEach((e) => {
    console.log(colors.yellow(getCurrentTime(), e));
  });
};

exports.grey = (...str) => {
  str.forEach((e) => {
    console.log(colors.grey(getCurrentTime(), e));
  });
};

exports.gray = (...str) => {
  str.forEach((e) => {
    console.log(colors.gray(getCurrentTime(), e));
  });
};
