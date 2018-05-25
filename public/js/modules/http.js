export class HttpModule {

    constructor(){
        this.noop = () => null;
        this.baseUrl = '';
    }
    static doGet({url = '/', callback = this.noop} = {}) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', this.baseUrl + url, true);
        xhr.onreadystatechange =  () => {
            if (xhr.readyState != 4) {
                return;
            }
            if (xhr.status === 200) {
                const responseText = xhr.responseText;
                try {
                    const response = JSON.parse(responseText);

                    if (!response['success']) {
                        callback(response['status'], response);
                        return;
                    }
                    callback(null, response);
                } catch (err) {
                    console.error('doGet error: ', err);
                    callback(err);
                }
            } else {
                callback(xhr);
            }
        };
        xhr.withCredentials = true;
        xhr.send();
    }

    static doPost({url = '/', callback = this.noop, data = {}} = {}) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', this.baseUrl + url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) {
                return;
            }
            if (xhr.status < 300) {
                const responseText = xhr.responseText;
                try {
                    const response = JSON.parse(responseText);

                    if (!response['success']) {
                        callback(response['status'], response);
                        return;
                    }
                    callback(null, response);
                } catch (err) {
                    console.error('doPost error: ', err);
                    callback(err);
                }
            } else {
                callback(xhr);
            }
        };
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.withCredentials = true;
        xhr.send(JSON.stringify(data));
    }
}
