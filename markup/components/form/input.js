class InputController {
    constructor(wrapper) {
        this.wrapper = wrapper;

        this.input = this.wrapper.querySelector('input, textarea, select')
        this.onInput = this.onInput.bind(this)
        this.blur = this.blur.bind(this)
        this.focus = this.focus.bind(this)

        this.init()
    }

    init() {
        this.handlers()
        this.onInput()
    }

    handlers() {
        this.input.addEventListener('focus', this.focus, true)
        this.input.addEventListener('blur', this.blur, true)

        this.input.addEventListener('input', this.onInput, true)
        this.input.addEventListener('change', this.onInput, true)
    }

    focus() {
        this.wrapper.classList.add('input-wrap_has_focus')
    }

    blur() {
        this.wrapper.classList.remove('input-wrap_has_focus')
    }

    onInput() {
        if(!this.input.value == '') {
            this.wrapper.classList.add('input-wrap_has_value')
        } else {
            this.wrapper.classList.remove('input-wrap_has_value')
        }
    }
}

let inputWraps = document.querySelectorAll('.input-wrap');

inputWraps.forEach(element => {
    let focus = new InputController(element);
})

// Заменить значение и вызвать эвент
// $0.value = 123
// var event = new Event('change')
// $0.dispatchEvent(event)
