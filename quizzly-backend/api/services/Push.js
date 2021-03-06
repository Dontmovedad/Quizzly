/**
 *  Push.js
 *
 *  @description  :: Push notification service
 *  @methods      :: send(deviceIds, data, callback)
 *
 */
var apn = require('apn');
var settings = sails.config.pushSettings;
var apnProvider = new apn.Provider(settings.apn.options);
var fetch = require('node-fetch')

module.exports = {
  send: function(deviceIds, data, callback) {
    sails.log.debug('apnProvider', apnProvider);
    var note = new apn.Notification();
    note.expiry = (Math.floor(Date.now() / 1000) + 3600) * settings.apn.data.expiry;
    note.badge = settings.apn.data.badge;
    note.sound = settings.apn.data.sound;
    note.alert = data.title || settings.apn.data.defaultAlert;
    note.payload = data;
    note.topic = settings.apn.data.topic;

    return apnProvider.send(note, deviceIds).then(callback);

  },

  pushToSection(section, data, callback) {
    fetch("https://fcm.googleapis.com/fcm/send", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'key=AIzaSyCi-33Fx7ZqOiVldLt5y4DoScZKwMzpHpE',

      },
      body: JSON.stringify({
        "to": "/topics/" + section.id,
        "data": {
          "message": "["+section.id+"] "+data.title,
	  "section": section,
	  "questionKey": data.questionKey,
          "type": data.type
        }
      }),
    });
    return Section.findOne({id: section.id}).populate('students').exec(function(err, section){
      if(err || !section){
        sails.log.debug('section', section);
        return sails.log.error('pushToSection', err);
      }

      var studentIds = section.students.map(student => student.id);
      sails.log.debug('studentIds', studentIds);
      var result = Device.pushToDevicesFromStudentIds(studentIds, data, callback);
      result = 10;
      sails.log.debug('result', result);
      sails.log.debug('result JSON', JSON.stringify(result, {}, 4));
      return result;
    });

  }
};

