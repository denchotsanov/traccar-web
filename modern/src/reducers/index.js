const initialState = {
  server:null,
  session: null,
  devices: [],
  positions: [],
  events: [],
  drivers:[],
  groups:[],
  geofences:[],
  calendars:[],
  maintenance:[],
  computed:[],
  commandTypes:[],
  commands:[],
  notificationTypes:[],
  notifications:[],
  notificator:[],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_DEVICES':
      return Object.assign({}, {
        ...state,
        devices: [...action.devices]
      });
    case 'UPDATE_POSITIONS':
      return Object.assign({}, {
        ...state,
        positions: [...action.positions]
      });
    case 'UPDATE_SERVER':
        return Object.assign({}, {
              ...state,
              server: action.server
            });
    case 'UPDATE_GROUPS':
        return Object.assign({}, {
              ...state,
              groups: [...action.groups]
            });
    case 'UPDATE_SESSION':
        return Object.assign({}, {
              ...state,
              session: action.session
            });

    default:
      return state;
  }
}

export default rootReducer
