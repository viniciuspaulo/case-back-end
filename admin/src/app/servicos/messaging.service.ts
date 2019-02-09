// import { Injectable }          from '@angular/core';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { AngularFireAuth }     from 'angularfire2/auth';
// import * as firebase from 'firebase';

// import 'rxjs/add/operator/take';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject'
// import { RestService } from './rest.service';
// import { GenericUtil } from '../util/GenericUtil';

// @Injectable()
// export class MessagingService  extends GenericUtil {

//   id:string;
//   mensagensPush:any;
//   currentMessage = new BehaviorSubject(null)

//   constructor(
//     public rest:RestService,
//     private db: AngularFireDatabase, 
//     private afAuth: AngularFireAuth) { 
//       super();
    
//       try{
//         this.mensagensPush = firebase.messaging();
//       }catch(e){}
//   }


//   updateToken(token) {
//     let dados = {
//       _id : this.id,
//       tokenFirebase : token
//     }
//     this.rest.post(`firebase/token`,dados)    
//   }

//   getPermission(token) {
//     if ('serviceWorker' in navigator) {
//       try {
//         this.id = token;
//         this.mensagensPush.requestPermission()
//         .then(() => {
//           return this.mensagensPush.getToken()
//         })
//         .then(token => {
//           this.updateToken(token)
//         })
//         .catch((err) => {});
//       } catch (e) {
//         console.log('Unable to Request PUSH Permission', e);
//       }
//     }
//   }

//     receiveMessage() {
//       if ('serviceWorker' in navigator) {
//         try {
//         this.mensagensPush.onMessage((payload) => {
//           this.currentMessage.next(payload)
//         });
//       }catch(e){}
//       }else{}
//     }
// }