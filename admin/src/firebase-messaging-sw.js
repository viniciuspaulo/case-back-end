
if ('serviceWorker' in navigator) {
 
  // importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
  // importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');


  // try{
  //   firebase.initializeApp({    
  //     "apiKey": "AIzaSyDiA0fzyPX78fQ1n6pqnAvkYTTFHlCpY60",
  //     "authDomain": "tookad-176b2.firebaseapp.com",
  //     "databaseURL": "https://tookad-176b2.firebaseio.com",
  //     "storageBucket": "tookad-176b2.appspot.com",
  //     'messagingSenderId': '935965500001'
  //   });
  
  //   const messaging = firebase.messaging();
  
  //   messaging.setBackgroundMessageHandler(function(payload) {
  //     // console.log('Received background message ', payload);
  //     // here you can override some options describing what's in the message; 
  //     // however, the actual content will come from the Webtask
  //     const notificationOptions = {
  //       icon: '/assets/layout/images/logo.png'
  //     };
  //     return self.registration.showNotification(notificationTitle, notificationOptions);
  //   });
  // }catch(e){}
  
}