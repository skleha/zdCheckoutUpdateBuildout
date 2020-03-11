import { connect } from "react-redux";
import { withRouter } from "react-router";
import SupportConfirm from "./SupportConfirm";
import { fetchCurrentPlan, fetchPreviousPlan } from "../../actions/support_actions";

const mapStateToProps = state => ({
  currentPlan: state.support.currentPlan,
  previousPlan: state.support.previousPlan
});

const mapDispatchToProps = dispatch => ({
  fetchPreviousPlan: () => dispatch(fetchPreviousPlan())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SupportConfirm));
