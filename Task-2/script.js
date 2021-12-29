const calctip = function (billvalue) {
  return billvalue >= 50 && billvalue <= 300
    ? billvalue * 0.15
    : billvalue * 0.2;
};
const bills = [125, 555, 44];
const tips = [calctip(bills[0]), calctip(bills[1]), calctip(bills[2])];

const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
console.log(bills, tips, totals);
