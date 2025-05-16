import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

export default function firebaseConnection() {
    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    };

    const app = initializeApp(firebaseConfig);

    const messaging = getMessaging(app);

    navigator.serviceWorker.register('./firebase-messaging-sw.js')
        .then((registration) => {
            console.log('SW registrado');
        })
        .catch((err) => {
            console.log('Error al registrar el SW', err);
        });

    getToken(messaging, { vapidKey: "BFrl5OEjPG9ITHSkgIDp59iu3uWMwPZuWTcAAN5stMSqiHzK7XdbEBWOEOVhqtSTnO0QTsDiH4cNKhln3f00jFo" }).then((currentToken) => {
        if (currentToken) {
            console.log('Token:', currentToken);
        } else {
            console.log('Sin token disponible. Solicita permiso para generar uno.');
        }
    });

    onMessage(messaging, (payload) => {
        Notification(payload.notification.title, {
            body: payload.notification.body,
            icon: payload.notification.icon,
        });
        console.log('Mensaje recibido. ', payload);
    })

}
