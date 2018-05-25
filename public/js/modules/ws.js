import {HttpModule} from './http';
import * as busSingletone from './bus';
import * as UserSingletone from '../services/user-singletone';


export class Ws {
    constructor() {
        let address = HttpModule.baseUrl;
        if (address.indexOf('https') !== -1) {
            address = address.replace('https', 'wss');
        } else {
            address = address.replace('http', 'ws');
        }
        address += '/play-game';
        console.log('Address to WS: ' + address);

        this.wsAddress = address;
        this.ws = new WebSocket(address);

        this.ws.onopen = (event) => {
            console.log('Successful open ws!');
            this.ws.onmessage = this.handleMessage.bind(this);
            const user = UserSingletone.getInstance().getUser();
            console.dir(user);
            this.send('MESSAGES_JOINGAME', user.login);
            this.ws.onclose = () => {
                console.log('WebSocket closed');
            };
        };
    }

    handleMessage(event) {
        const messageText = event.data;
        try {
            const message = JSON.parse(messageText);
            console.log(message);
            const bus = busSingletone.getInstance();
            bus.emit(message.event, message.payload);
        } catch (err) {
            console.error('smth went wrong in handleMessage: ', err);
        }
    }

    send(event, payload) {
        let GameMessage = {payload: payload};
        GameMessage.event = event;
        this.ws.send(JSON.stringify(GameMessage));
    }

    close() {
        this.ws.close();
    }
}