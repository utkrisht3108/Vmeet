const moment = require('moment');

function formatMessage(message, username) {
  return {
    message,
    username,
    time: moment().utcOffset('+05:30').format('h:mm a'),
  };
}

module.exports = formatMessage;
