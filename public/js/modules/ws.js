
    import * as busSingleton from './bus';

    export class Ws {
        constructor() {
            this.bus = busSingleton.getInstance();
            this.host = window.location.host;
            if (Ws.__instance) {
                return Ws.__instance;
            }

            const address = `${window.location.protocol.replace('http', 'ws')}//${this.host}/ws`;
            this.ws = new WebSocket(address);
            this.ws.onopen = (event) => {
                console.log(`WebSocket on address ${address} opened`);
                console.dir(this.ws);

                this.ws.onmessage = this.handleMessage.bind(this);

                this.ws.onclose = () => {
                    console.log('WebSocket closed');
                };
            };

            Ws.__instance = this;
        }

        handleMessage(event) {
            const messageText = event.data;

            try {
                const message = JSON.parse(messageText);
                this.bus.emit(message.type, message.payload);
            } catch (err) {
                console.error('smth went wront in handleMessage: ', err);
            }
        }

        send(type, payload) {
            this.ws.send(JSON.stringify({type, payload}));
        }
    }


