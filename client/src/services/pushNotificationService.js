import icon from "../assets/favicon.ico";

export const sendNotification = (message) => {

    const options = {
        body: message,
        icon: icon
    };
     //new Notification('New Message!', options);

    // Puedes agregar eventos para manejar la interacción con la notificación
    /*notification.onclick = function () {
        console.log('La notificación fue clicada');
    };*/
}