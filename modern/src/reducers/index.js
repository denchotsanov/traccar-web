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
    case 'ADD_DEVICES':
      return Object.assign({}, {
          ...state,
          devices: [...action.devices]
    });
    case 'UPDATE_DEVICES':
        return Object.assign({}, {
            ...state,
            devices: state.devices.map(device => device.id === action.devices[0].id ? action.devices[0] : device)
      });
    case 'UPDATE_POSITIONS':
      let updatePositions = [];
      if(state.positions.length > 0 ) {
        updatePositions = state.positions.map(position => position.deviceId === action.positions[0].deviceId ? action.positions[0] : position)
      } else {
        updatePositions = [...action.positions];
      }
      return Object.assign({}, {
        ...state,
        positions: updatePositions
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
