import Toast from "react-native-root-toast";
import { THEME } from "../../../theme";

function ErrorToast(message: string): any {
    return Toast.show(message, {
        visible: true,
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        delay: 0,
        animation: true,
        textColor: '#fff',
        backgroundColor: '#ba000d'
    });
}

function InfoToast(message: string): any {
    return Toast.show(message, {
        visible: true,
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        delay: 0,
        animation: true,
        textColor: '#fff',
        backgroundColor: '#388e3c'
    });
}

export {
    ErrorToast,
    InfoToast
};