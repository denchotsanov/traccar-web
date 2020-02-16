export const addDevices = devices => ({
  type: 'ADD_DEVICES',
  devices
});
export const updateDevices = devices => ({
  type: 'UPDATE_DEVICES',
  devices
});

export const updatePositions = positions => ({
  type: 'UPDATE_POSITIONS',
  positions
});

export const updateEvents = events => ({
  type: 'UPDATE_EVENTS',
  events
});

export const updateServer = server => ({
  type: 'UPDATE_SERVER',
  server
});

export const updateGroups = groups => ({
  type: 'UPDATE_GROUPS',
  groups
});

export const updateSession = session => ({
  type: 'UPDATE_SESSION',
  session
});

export const convertDateTime = function(time,tz) {
    var date = new Date(time);
    var timeOptions = {
        hour12: false,
        timezone: tz
        };
    return date.toLocaleString('bg-BG',timeOptions)
};
