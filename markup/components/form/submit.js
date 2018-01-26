class Submit {
    constructor(wrapper) {
        this.wrapper = wrapper;
        this.elements = this.wrapper.querySelectorAll('input, textarea, select');
        this.button = document.querySelector('button')
        this.form = document.getElementById('form')
        this.btnValid = document.getElementById('valid')

        this.formValidate = this.formValidate.bind(this)
        this.collector = this.collector.bind(this)
        this.send = this.send.bind(this)

        this.formValid = true;

        this.fromData = new FormData();
        this.init()
    }

    init() {
        this.handlers()
    }

    handlers() {
        this.button.addEventListener('click', this.formValidate, true)
        // this.button.addEventListener('click', this.send, true)
        // this.button.addEventListener('click', this.collector, true)
    }

    formValidate() {
        this.formValid = true;

        this.elements.forEach(element => {
            this.input = element

            if (!this.input.value) {
                console.log(this.input)
                this.formValid = false;
                this.input.style.border = '1px solid red'
                // let textValid = document.createElement('div')
                // textValid.style.color = 'red'
                // textValid.innerHTML = 'Заполните поле'
                // this.input.appendChild(textValid)
            } else {
                this.input.style.border = '1px solid #ddd'
            }
        })

        if(this.formValid === true) {
            this.collector()
        } else {
            alert('Заполните поля')
        }
    }

    collector() {

        this.elements.forEach(element => {
            this.input = element

            let inputsName = this.input.getAttribute('name')

            switch(this.input.type){
                case 'radio':
                    if(this.input.checked){
                        this.fromData.append(inputsName, this.input.checked)
                    }
                    break;
                default:
                    this.fromData.append(inputsName, this.input.value)
            }


        })

        this.send()

    }

    send() {

        // $.ajax('http://kameas.ru/', {
        //     method: "GET",
        //     data: 123
        // }).done(data => {
        //     console.log(data)
        // })

        fetch('http://kameas.ru/', {
            method: 'POST',
            body: this.fromData
        }).then(function(response) {
            alert('Форма отправлена')
            return response.text()
        }).then(function(data) {
            console.log(data)
        })

    }

}

let form = document.querySelector('.form-pay');
let formElem = new Submit(form);
