class Slider {
    constructor(maxValue, currentValue, input) {

        this.maxValue = maxValue;
        this.currentValue = currentValue;
        this.input = input;
        this.wrapper = this.input.parentElement;

        this.up = this.up.bind(this)
        this.down = this.down.bind(this)
        this.move = this.move.bind(this)
        this.onInput = this.onInput.bind(this)
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
        this.wrapper.classList.add('slider');

        this.dragArea = this.create('div', {
            class: 'slider__drag-area'
        })

        this.arrow = this.create('div', {
            class: 'slider__arrow'
        })

    }

    init() {
        this.render();

        this.wrapper.appendChild(this.dragArea)

        this.dragArea.appendChild(this.arrow)

        this.handlers()
        this.reformatText()
        this.onInput()
    }

    get coords() {
        const box = this.wrapper.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    handlers() {
        this.arrow.addEventListener('mousedown', this.down)

        this.input.addEventListener('input', this.onInput)
    }

    onInput() {
        let inputValue = this.input.value.replace(/,/g, "");
        let percentRevers = inputValue * 100 / this.maxValue;

        this.arrow.style.left = `calc(${percentRevers > 100 ? 100 : percentRevers}% - 8px)`;
        this.reformatText()
    }

    down() {
        document.addEventListener('mousemove', this.move)
        document.addEventListener('mouseup', this.up)
    }

    up() {
        document.removeEventListener('mousemove', this.move)
        document.removeEventListener('mouseup', this.up)
    }

    move(e) {
        let position = e.pageX - this.coords.left

        // курсор ушёл вне слайдера
        if (position < 0) {
            position = 0;
        }

        let maxRight = this.wrapper.offsetWidth - this.arrow.offsetWidth;

        // курсор ушёл вне слайдера
        if (position > maxRight) {
            position = maxRight;
        }

        let percent = position * 100 / maxRight;
        let percentValue = this.maxValue * percent / 100;

        this.input.value = percentValue.toFixed(0);
        this.arrow.style.left = position + 'px';


        this.reformatText()
    }

    reversed(e) {
        return e.split("").reverse().join("")
    }

    reformatText() {
        let value = this.input.value;
        value = value.toString().replace(/,/g, "");
        value = this.reversed(value);
        value = value.toString().replace(/.../g, function(e) {
            return e + ",";
        });
        value = this.reversed(value);
        value = value.toString().replace(/^,/, "");
        this.input.value = value;

    }

}


let textInput = document.getElementById('priceVal');

let slider = new Slider(10000000, textInput.value, textInput);
slider.init();


// //получить значение из инпута
// var textInput = document.getElementById('priceVal');

// var sliderElem = document.getElementById('slider');
// var thumbElem = sliderElem.children[0];

// var thumbCoords;
// var shiftX;
// var sliderCoords = getCoords(sliderElem);

// var maxValue = 10000000;

// function move(e) {

//     //  вычесть координату родителя, т.к. position: relative
//     var newLeft = e.pageX - shiftX - sliderCoords.left;

//     // курсор ушёл вне слайдера
//     if (newLeft < 0) {
//         newLeft = 0;
//     }

//     var newRight = sliderElem.offsetWidth - thumbElem.offsetWidth;

//     if (newLeft > newRight) {
//         newLeft = newRight;
//     }

//     var percent = newLeft * 100 / newRight;
//     var percentValue = maxValue * percent / 100;
//     // textInput.value = percentValue.toFixed(0) + ' $';
//     textInput.value = percentValue.toFixed(0);
//     reformatText(textInput)

//     thumbElem.style.left = newLeft + 'px';
// }

// thumbElem.addEventListener('mousedown', e => {

//     thumbCoords = getCoords(thumbElem);
//     shiftX = e.pageX - thumbCoords.left;

//     document.addEventListener('mousemove', move)

//     document.addEventListener('mouseup', e => {
//         document.removeEventListener('mousemove', move)
//     })

//     return false; // disable selection start (cursor change)

// })


// thumbElem.addEventListener('dragstart', e => {
//     return false;
// })

// function getCoords(elem) { // кроме IE8-
//     var box = elem.getBoundingClientRect();

//     return {
//         top: box.top + pageYOffset,
//         left: box.left + pageXOffset
//     };
// }


// String.prototype.reverse = function() {
//     return this.split("").reverse().join("");
// }

// function reformatText(input) {
//     var x = input.value;
//     x = x.replace(/,/g, ""); // Strip out all commas
//     x = this.reverse(x);
//     x = x.replace(/.../g, function(e) {
//         return e + ",";
//     }); // Insert new commas
//     x = x.reverse();
//     x = x.replace(/^,/, ""); // Remove leading comma
//     input.value = x;
// }

// textInput.addEventListener('input', e => {

//     var inputValue = textInput.value.replace(/,/g, "");

//     var percentRevers = inputValue * 100 / maxValue;

//     console.dir(thumbElem)

//     thumbElem.style.left = `calc(${percentRevers > 100 ? 100 : percentRevers}% - 8px)`;

//     reformatText(textInput);
// })
















// let inputs = document.querySelectorAll('.input-wrap')

// inputs.forEach(element => {
//     let input = element.querySelector('input')

//     input.addEventListener('focus', event => {
//         element.classList.add('input-wrap_is_focus')
//     });

//     input.addEventListener('blur', event => {
//         element.classList.remove('input-wrap_is_focus')
//     })
// })
