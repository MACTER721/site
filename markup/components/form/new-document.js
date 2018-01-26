class DocumentDownload {
    constructor(wrapper) {
        // html elements
        this.wrapper = wrapper;
        this.input = wrapper.querySelector('input');
        this.title = wrapper.querySelector('.document-download__add');
        this.deleteBtn = wrapper.querySelector('.document-download__delete');
        this.clearBtn = wrapper.querySelector('.document-download__clear');

        // внутренние переменные
        this._defaultTitle = this.title.innerHTML;
        this._template = this.wrapper.cloneNode(true);
        this._multiple = eval(this.wrapper.getAttribute('data-multiple'));

        // массив, с подписчиками
        this._subscribes = [];

        // биндинг контекста в методы
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.clear = this.clear.bind(this);

        // инициализация
        this.init();
    }

    // метод для удобного создания элементов
    create(type, props) {
        const element = document.createElement(type);

        for (let prop in props) {
            switch (prop) {
                case 'text':
                    element.textContent = props[prop];
                    break;
                case 'html':
                    element.innerHTML = props[prop];
                    break;
                default:
                    element.setAttribute(prop, props[prop]);
                    break;
            }
        }
        return element;
    }

    // метод для удобного удаления элементов
    remove(element) {
        if (element.parentNode !== null)
            element.parentNode.removeChild(element);
    }

    // инициалзация
    init() {
        this.hadlers();
    }

    // вешаем обработчики
    hadlers() {
        this.input.addEventListener('change', this.add, true);
        this.deleteBtn.addEventListener('click', this.delete, true);
        this.clearBtn.addEventListener('click', this.clear, true);
    }

    // метод, вызываемый при добавлении файла
    add() {
        // записываем название файла
        this.name = this.input.files[0].name;

        // если нужно несколько инпутов - создаем клон
        if (this._multiple) {
            // новый клон
            let clone = this.wrapper.parentNode.appendChild(this._template);
            // инициализация класса для клона
            new DocumentDownload(clone);
            // передаем нужный эвент, что бы он вызвался у нужных подписчиков
            this.dispatch('clone', clone)
        }
    }

    // вызывает нужную функцию при срабатывании эвента
    dispatch(name, data) {
        this._subscribes.forEach(element => {
            // если подписчик подписан на тот эвент который мы передали - вызываем функцию
            if(element.name == name) {
                element.callback(data)
            }
        })
    }

    // добавляем "подписчиков" в массив
    subscribe(name, callback) {
        this._subscribes.push({
            name,
            callback
        })


        // this._subscribes.push({
        //     name: name,
        //     callback: callback
        // })
    }

    // удаление текущего wrapper
    delete() {
        this.remove(this.wrapper)
    }

    // очищение инпута
    clear() {
        this.title.innerHTML = this._defaultTitle
        this.input.value = ''
    }

    // установка названия файла в html
    set name(name) {
        this.title.innerHTML = name;
    }

    // получение текущего названия файла
    get name() {
        return this.title.textContent;
    }
}



let documentField = document.querySelector('.document-download');
let doc = new DocumentDownload(documentField)

doc.subscribe('clone', element => {
    console.log('here!', element)
})


