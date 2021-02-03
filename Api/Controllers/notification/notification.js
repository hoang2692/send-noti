var admin = require ('firebase-admin');
var serviceAccount = require ('./key.json');
admin.initializeApp ({
    credential: admin.credential.cert (serviceAccount),
  });
let Notification = {
  sendToAll: async (req, res) => {
    var registrationToken = 'cBeG1B0qRoyYcheX1DBwGd:APA91bGNFw764S4m_QRS19PkFH-le9A-4UyCf02924ZpkYGqprtVVhc9uxRiAHQJ3DhB_C4ndd_8wX4mkFGsHVeUiLSzojEGOCYmwQCFpOBM9xkYT08xFMHSRaRQcpLtUkY5lbKFqcHb';
    var message = {
        notification: {
            body: req.body.text,
          },
          android: {
            notification: {
                channelId: 'channel-id',
                sound: 'sound.mp3'
            }
          },
      token: registrationToken,
    };
    
    // Send a message to the device corresponding to the provided
    // registration token.
    admin
      .messaging ()
      .send (message)
      .then (response => {
        // Response is a message ID string.
        res.status(200).send('Success')
      })
      .catch (error => {
        console.log ('Error sending message:', error);
      });
  },
};

module.exports = Notification;
