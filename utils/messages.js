const moment = require('moment');

function formatMessage(message, username) {
  return {
    message,
    username,
    time: moment().format('h:mm a'),
  };
}

module.exports = formatMessage;
