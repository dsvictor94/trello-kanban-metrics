
const CREATE_ACTIONS = ['createCard', 'moveCardToBoard', 'updateCard'];

export const calculateThroughput = (list, actions, {starts, ends, tag, member}) => {
  actions = actions
    .filter((a) => CREATE_ACTIONS.includes(a.type))
    .filter((a) => a.data.list.id === list);

  const first = new Date(actions[0].date);
  const last = new Date(actions[actions.length - 1].date);
  const count = actions.length;

  return (count - 1) / days_between(first, last);
};

function days_between(date1, date2) {
  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;

  // Convert both dates to milliseconds
  const date1_ms = date1.getTime();
  const date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  const difference_ms = Math.abs(date1_ms - date2_ms);

  // Convert back to days and return
  return Math.round(difference_ms / ONE_DAY);
}
