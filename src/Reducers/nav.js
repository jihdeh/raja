import AppNavigator from '../navigator';

const initialNavState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams('Landing'));


export default (state = initialNavState, action) =>
  AppNavigator.router.getStateForAction(action, state);
