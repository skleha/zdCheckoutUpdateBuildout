
export const hasSubscriptionChanged = (selectedPlan, currentPlan) => {
  const hasPlanChanged = selectedPlan.plan !== currentPlan.plan;
  const hasSeatsChanged = Number(selectedPlan.seats) !== Number(currentPlan.seats);
  const hasCostChanged = selectedPlan.cost !== currentPlan.cost;
  return { hasPlanChanged, hasSeatsChanged, hasCostChanged }
};

export const validSeatNum = num => {
  const typeConvertedNum = Number(num);
  return Number(typeConvertedNum).isInteger && typeConvertedSeatNum > 0;
}
