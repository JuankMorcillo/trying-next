import JsSIP from 'jssip';

export default function SipPhone() {

    const recievingCall = document.getElementById('recievingCall');
    const recievingCallIcon = document.getElementById('recievingCallIcon');
    const buttonAnswer = document.getElementById('answerButton');
    const buttonEnd = document.getElementById('endButton');
    const ringtone = document.getElementById('ringtone');
    buttonEnd.style.display = 'block';
    buttonAnswer.style.display = 'block';
    const audio = document.getElementById('remoteAudio');
    let currentSession = null;

    const socket = new JsSIP.WebSocketInterface(process.env.NEXT_PUBLIC_SIP_WSS);
    const configuration = {
        sockets: [socket],
        uri: process.env.NEXT_PUBLIC_SIP_URI,
        password: process.env.NEXT_PUBLIC_SIP_PASSWORD,
        session_timers: false
    };

    const ua = new JsSIP.UA(configuration);
    ua.start();

    ua.on('registered', () => {
        console.log('Registrado');
    });

    ua.on('disconnected', () => {
        statusText.textContent = 'Estado: 🔌 Desconectado';
    });

    ua.on('newRTCSession', function (data) {
        const session = data.session;

        if (data.originator === 'remote') {
            console.log('Llamada entrante');
            ringtone.play();
            currentSession = session;
            recievingCall.classList.add('vibrating');
            recievingCallIcon.classList.add('vibrating');
            buttonAnswer.style.display = 'block';

            buttonAnswer.onclick = () => {
                session.answer({
                    mediaConstraints: { audio: true, video: false }
                });

                ringtone.pause();

                session.connection.addEventListener('track', (e) => {
                    audio.srcObject = e.streams[0];
                });
                onCall = true;
                buttonAnswer.classList.remove('vibrating');
                recievingCall.classList.remove('vibrating');
                recievingCallIcon.classList.remove('vibrating');
                buttonAnswer.style.display = 'none';
                buttonEnd.style.color = 'white';
                buttonEnd.style.display = 'block';

                if (session.isEstablished()) {
                    buttonEnd.onclick = () => {
                        onCall = false;
                        session.terminate();
                        buttonAnswer.style.display = 'none';
                        buttonEnd.style.display = 'none';
                    };
                }

            };
        }

        session.on('ended', () => {
            console.log('Llamada finalizada');
            recievingCall.classList.remove('vibrating');
            recievingCallIcon.classList.remove('vibrating');
            buttonAnswer.style.display = 'none';
            buttonEnd.style.display = 'none';
            ringtone.pause();
        });

        session.on('failed', () => {
            console.log('Llamada fallida o colgada');
            ringtone.pause();
            recievingCall.classList.remove('vibrating');
            recievingCallIcon.classList.remove('vibrating');
            buttonAnswer.style.display = 'none';
            buttonEnd.style.display = 'none';
        });

        session.on('accepted', () => {
            console.log('Llamada aceptada');
        });

    });

}


