import { Map } from 'immutable';

export const TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN';
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';

export const initialState = new Map({
  isDropdownOpen: false,
  isDrawerOpen: false
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DROPDOWN:
      return state.set('isDropdownOpen', !state.get('isDropdownOpen'));
    case TOGGLE_DRAWER:
      console.log("toggle drawer ", state.get('isDrawerOpen'));
      return state.set('isDrawerOpen', !state.get('isDrawerOpen'));
    default:
      return state;
  }
}

export const toggleDropdown = () => (
  {
    type: TOGGLE_DROPDOWN,
  }
);

export const toggleDrawer = () => (
  {
    type: TOGGLE_DRAWER,
  }
);
