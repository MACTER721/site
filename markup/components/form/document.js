class DocumentDownload {
    constructor(wrapper) {
        this.wrapper = wrapper;
        this.parent = document.querySelector( ".wrapper-document" )

        this.input = this.wrapper.querySelector('input')
        this.button = document.querySelector( ".document-download__add" )
        this.title = document.querySelector('.document-download__title')
        this.cloneInput = this.wrapper.querySelector('input')

        this.deleteDocumentButton = this.wrapper.querySelector('.document-delete')

        this.onClick = this.onClick.bind(this)
        // this.onChange = this.onChange.bind(this)
        this.addDoc = this.addDoc.bind(this)
        this.deleteDoc = this.deleteDoc.bind(this)

        this.init()
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

    init() {
        this.handlers()
    }

    handlers() {
        this.button.addEventListener('click', this.onClick, false)
        // this.input.addEventListener('change', this.onChange, true)
        this.wrapper.addEventListener('change', this.addDoc, true)
        this.deleteDocumentButton.addEventListener('click', this.deleteDoc, true)
        console.log(this.deleteDocumentButton)
    }

    onClick() {
        this.wrapper.focus()
    }


    addDoc() {

        if(this.input.value != '') {

            let newWrapInput = this.create('div', {
                class: 'document-download'
            })

            this.parent.appendChild(newWrapInput)

            let cloneWrapInput = this.wrapper.cloneNode(true)
            newWrapInput.appendChild(cloneWrapInput)

            this.cloneInput = cloneWrapInput.querySelector( "input" )

            cloneWrapInput.querySelector(".document-download__title").innerHTML = 'Документ выбран'
            cloneWrapInput.querySelector(".document-download__add").innerHTML = this.cloneInput.value

            this.deleteDocumentButton = cloneWrapInput.querySelector(".document-delete")
            this.deleteDocumentButton.innerHTML = 'Удалить'

            this.input.value = ''

            let length = 9;
            let id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, length);

            this.input.id = id
        } else {
            cloneWrapInput.querySelector(".document-download__add").innerHTML = this.cloneInput.value
        }
    }

    deleteDoc() {

        console.log('tyt')
        // this.parent.querySelector(".document-download").innerHTML = ''

    }
    // onChange() {

    //     if(this.input.value != '') {
    //         this.button.innerHTML = this.input.value
    //         this.title.innerHTML = 'Документ выбран'
    //     } else {
    //         this.button.innerHTML = '<div class="document-download__add">Перетащите или<span> загрузите документ</span></div>'
    //         this.title.innerHTML = 'Выбрать документ'
    //     }

    // }


}



let documentField = document.querySelectorAll('.document-download__wrap');

documentField.forEach(element => {
    let download = new DocumentDownload(element);
})


// .innerHTML = '<div>123</div>'
// .appendChild(document.createElement('div'))
