const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];
const printforecast = function (arr) {
  let str = ' ';
  for (let i = 0; i < arr.length; i++) {
    str += `${arr[i]}°c in ${i + 1} days... `;
  }
  console.log(`...` + str);
};
printforecast(data1);
