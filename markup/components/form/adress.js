class Adress {
    constructor(currentValue, input) {

        this.currentValue = currentValue;
        this.input = input;
        this.wrapper = this.input.parentElement;
        this.zipInput = document.querySelector(this.input.getAttribute('data-target'));

        this.onInput = this.onInput.bind(this)
        this.onSelect = this.onSelect.bind(this)

        this.blur = this.blur.bind(this)

    }

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

    render() {
        this.wrapper.classList.add('adress');

        this.divWrap = this.create('div', {
            class: 'wrap-adress-list'
        })

        this.ul = this.create('ul', {
            class: 'adress-list'
        })
    }

    init() {
        this.render();
        this.wrapper.appendChild(this.divWrap)
        this.divWrap.appendChild(this.ul)

        this.handlers()
        // this.onInput()
    }

    handlers() {
        this.input.addEventListener('input', this.onInput)
        this.ul.addEventListener('click', this.onSelect)

        this.input.addEventListener('blur', this.blur, true)
    }

    onInput() {

        this.divWrap.style.display = 'block'
        let inputValue = this.input.value
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'http://kladr-api.ru/api.php?oneString=true&limit=10&query=' + inputValue, true);
        xhr.send(null);

        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                // обработать ошибку
                console.log( 'Ошибка' + xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found

            } else {

                let json = JSON.parse(xhr.responseText);
                let cityJson = json.result

                this.ul.innerHTML = '';

                cityJson.forEach(element => {

                    this.ul.appendChild(this.create('li', {
                        text: element.fullName,
                        'data-zip': element.zip ? element.zip : '' // добавить аттрибут data-zip, его значение - пришедший тебе zip
                    }))

                })
            }
        }


    }

    onSelect(e) {
        let currentLi = e.target;
        let currentZip = currentLi.getAttribute('data-zip')

        this.input.value = currentLi.textContent

        if (this.zipInput && currentZip) {
            this.zipInput.value = currentZip
            let event = new Event('change')
            this.zipInput.dispatchEvent(event)
        }


        this.divWrap.style.display = 'none'
    }

    blur() {

        if(this.input.value == 0 && this.input.value == '') {
            this.divWrap.style.display = 'none'
        }
    }

}

let adressInput = document.getElementById('adressVal');
let adress = new Adress(adressInput.value, adressInput);
adress.init();
