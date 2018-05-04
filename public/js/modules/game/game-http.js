import {HttpModule} from '../http';


export default class GameHttp {
    static getSet(numberOfQuestions, theme) {
        return new Promise(function (resolve, reject) {
            HttpModule.doGet({
                url: '/set/get?questions=' + numberOfQuestions + '&theme=' + theme,
                callback(err, response) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(response);
                }
            });
        });
    }

    static checkAnswer(questionId, answerNum) {
        return new Promise(function (resolve, reject) {
            HttpModule.doGet({
                url: '/answer/check?question=' + questionId + '&answer=' + answerNum,
                callback(err, response) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(response);
                }
            });
        });
    }
}