(function () {

    const modules = {};
    const factories = {};

    /**
     * Получить модуль по его имени
     * @param {string} name - имя модуля
     * @return {*|null}
     */
    window.require = function (name) {
        return modules[name] || factories[name] && (modules[name] = factories[name](require)) || null;
    };

    /**
     * Задать модуль по имени
     * @param {string} name - имя модуля
     * @param {function} factory - функция-конструктор модуля
     */
    window.define = function (name, factory) {
        factories[name] = factory;
    };

})();