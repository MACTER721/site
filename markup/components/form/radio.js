// class ValidRadio {
//     constructor(wrapper) {
//         this.wrapper = wrapper;

//         this.input = this.wrapper.querySelector('input')
//         this.button = document.querySelector('button')

//         this.onInput = this.onInput.bind(this)
//         this.init()
//     }

//     init() {
//         this.handlers()
//     }

//     handlers() {
//         this.input.addEventListener('click', this.onInput, true)
//     }

//     onInput() {

//         if(this.input.getAttribute('data-yes') == 'true') {
//             this.button.style.backgroundColor = '#1a991a'
//             this.button.disabled = false;
//         } else{
//             this.button.style.backgroundColor = '#9e9e9e'
//             this.button.disabled = true;
//             this.wrapper.style.display = 'none'
//         }



//     }

// }

// let wrapRadio = document.querySelectorAll('.radio-controller');

// wrapRadio.forEach(element => {
//     let radio = new ValidRadio(element);
// })

let form = document.querySelector('.form-pay');
let radioButtons = form.querySelectorAll('[type="radio"]');
let button = form.querySelector('.form-pay__button-submit');
let validValue = 'valid';

let toggleButton = (event) => {
    let currentButton = event.currentTarget

    if(currentButton.value == validValue && currentButton.checked) {
        button.removeAttribute('disabled')
    } else {
        button.setAttribute('disabled', true)
    }
}

radioButtons.forEach(element => {
    element.addEventListener('change', toggleButton)
})
