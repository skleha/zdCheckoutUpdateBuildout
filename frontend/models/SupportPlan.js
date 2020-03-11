

class SupportPlan {

  constructor(plan, name, seats, cost) {
    this.plan = plan;
    this.name = name;
    this.seats = seats;
    this.cost = cost;
  }

  setPlan(plan) {
    this.plan = plan;
  }

  setName(name) {
    this.name = name;
  }

  setSeats(seats) {
    this.seats = seats;
  }

  setCost(cost) {
    this.cost = cost;
  }
}

export default SupportPlan;
