(function () {

    'use strict';

    class Http {
        static Get(adress, callback) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', adress, true);
            xhr.withCredentials = true;

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (+xhr.status !== 200) {
                    return callback(xhr, null);
                }

                const responce = JSON.parse(xhr.responseText);
                callback(null,responce);
            };
            xhr.send();
        }

        static Post(adress, body, callback) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', adress, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader('Content-type', 'aplication/json; charset=utf8');
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (+xhr.status !== 200) {
                    return callback(xhr, null);
                }

                const responce = JSON.parse(xhr.responseText);
                callback(null,responce);
            };
            xhr.send(JSON.stringify(body));
        }
    }
    window.Http = Http;
})();