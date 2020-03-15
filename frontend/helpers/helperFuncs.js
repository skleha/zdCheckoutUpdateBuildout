
export const hasSubscriptionChanged = (selectedSub, currentSub) => {
  const hasPlanChanged = selectedSub.plan !== currentSub.plan;
  const hasSeatsChanged = Number(selectedSub.seats) !== Number(currentSub.seats);
  const hasCostChanged = selectedSub.cost !== currentSub.cost;
  return { hasPlanChanged, hasSeatsChanged, hasCostChanged }
};

export const validateSeatNum = seats => {
  const typeConvertedSeats = Number(seats);
  return Number.isInteger(typeConvertedSeats) && typeConvertedSeats > 0;
}
