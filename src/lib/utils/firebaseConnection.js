import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import React, { useEffect } from 'react';

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


    navigator.serviceWorker.getRegistration('./firebase-messaging-sw.js')
        .then((registration) => {
            if (registration) {
                console.log('SW ya estaba registrado');
            } else {
                navigator.serviceWorker.register('./firebase-messaging-sw.js')
                    .then((reg) => {
                        console.log('SW registrado');
                    })
                    .catch((err) => {
                        console.log('Error al registrar el SW', err);
                    });
            }
        });

    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Permiso de notificación concedido.');
        } else {
            console.log('Permiso de notificación denegado.');
        }
    })

    getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY }).then((currentToken) => {
        if (currentToken) {
            console.log('Token:', currentToken);
        } else {
            console.log('Sin token disponible. Solicita permiso para generar uno.');
        }
    });


    onMessage(messaging, (payload) => {        
        new Notification(payload.notification.title, {
            body: payload.notification.body,
            icon: payload.notification.icon,
        });
        console.log('Mensaje recibido. ', payload);
    });

}
