import moment from 'moment';
import t from '../common/localization';

const formatValue = (key, value) => {
  switch (key) {
    case 'fixTime':
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
        return Number(value.toFixed(1));
      } else if (typeof value === 'boolean') {
        return value ? t('sharedYes') : t('sharedNo');
      } else {
        return value;
      }
  }
}

export default (object, key) => {
  if (object != null && typeof object == 'object') {
    return formatValue(key, object[key]);
  } else {
    return formatValue(key, object);
  }
};
