const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
const getLimits = (limits, user) => limits?.[user] ?? 0;

const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();
  return value <= getLimits(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
  // budget.push({ value: -value, description, user: cleanUser });
};
const newBudget = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
console.log(newBudget);
const newBudget1 = addExpense(
  newBudget,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget2 = addExpense(newBudget1, spendingLimits, 200, 'Stuff', 'Jay');
console.log(newBudget2);

const checkExpenses = function (state, limits) {
  return state.map(function (entry) {
    return entry.value < -getLimits(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry;
  });
  // for (const entry of newBudget2) {
  //   if (entry.value < -getLimits(entry.user)) entry.flag = 'limit';
  // }
};
const finalBudget = checkExpenses(newBudget2, spendingLimits);
console.log(finalBudget);

const logBigExpenses = function (state, bigLimit) {
  // let output = '';
  // for (const entry of budget)
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)}  / ` : '';

  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  console.log(bigExpenses);
};
logBigExpenses(finalBudget, 500);
