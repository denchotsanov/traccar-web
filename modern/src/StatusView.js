import t from './common/localization'
import React from 'react';
import { useSelector } from 'react-redux';
import { formatPosition } from './common/formatter';

const StatusView = ({ deviceId, onShowDetails }) => {
  const device = useSelector(state => state.devices.items[deviceId]);
  const position = useSelector(state => state.positions.items[deviceId]);

  const handleClick = e => {
    e.preventDefault();
    onShowDetails(position.id);
  };

  return (
    <>
      <b>{t('deviceStatus')}:</b> {formatter(device.status, 'status')}<br />
      <b>{t('sharedLocation')}:</b> {formatter(position, 'latitude')} {formatter(position, 'longitude')}<br />
      <b>{t('positionSpeed')}:</b> {formatter(position.speed, 'speed')}<br />
      <b>Last Update:</b> {formatter(position.fixTime, 'timeAgo')}<br />
      <b>{t('positionCourse')}:</b> {formatter(position.course, 'course')}<br />
      <b>{t('positionDistance')}:</b> {formatter(position.attributes.totalDistance, 'distance')}<br />
      {position.attributes.batteryLevel &&
        <><b>{t('positionBattery')}:</b> {formatPosition(position.attributes.batteryLevel, 'batteryLevel')}<br /></>
      }
      <a href="#" onClick={handleClick}>{t('sharedShowDetails')}</a>
    </>
  );
};

export default StatusView;
