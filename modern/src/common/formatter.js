import moment from 'moment';
import t from '../common/localization';

export const formatPosition = (value, key) => {
  if (value != null && typeof value === 'object') {
    value = value[key];
  }
  switch (key) {
    case 'fixTime':
    case 'deviceTime':
    case 'serverTime':
      return moment(value).format('LLL');
    case 'timeAgo':
      if(!moment(value).isValid()){
        return value
      }
      if(moment().subtract(1,'day').isBefore(moment(value))){
        return moment(value).fromNow();
      } else {
        return moment(value).format('LLL');
      }
    case 'latitude':
    case 'longitude':
      return value.toFixed(5);
    case 'speed':
      return (value * 1.852).toFixed(0) + ' km/h'
    case 'course':
      return value.toFixed(1);
    case 'batteryLevel':
      return value + '%';
    default:
      if (typeof value === 'number') {
        return formatNumber(value);
      } else if (typeof value === 'boolean') {
        return formatBoolean(value);
      } else {
        return value;
      }
  }
}

export const formatBoolean = (value) => {
  return value ? t('sharedYes') : t('sharedNo');
}

export const formatNumber = (value, precision = 1) => {
  return Number(value.toFixed(precision));
}
