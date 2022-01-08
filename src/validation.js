///добавить поис по корзине

export default class Validation {
    constructor(component, regExp) {
        this.component = document.querySelector(`.${component}`)
        this.regExp = regExp
        this.listener()
    }
    listener() {
        console.log(this.component)
        this.component.addEventListener('input', () => this.checkTyping())
        this.component.addEventListener('focus', this.paint)
        this.component.addEventListener('blur', this.paint)
    }
    checkTyping() {
        const comp = this.component
        if (comp.value.match(this.regExp)) {
            if (comp.value.length === comp.value.match(this.regExp).join('').length) {
                comp.style.background = 'lightgreen';
                comp.style.border = '2px solid green'
            } else {
                comp.style.background = 'pink'
                comp.style.border = '2px solid red'
            }
        } else {
            comp.style.background = 'pink'
            comp.style.border = '2px solid red'
        }
    }
    paint(e) {
        (e.target.style.background)
            ? e.target.style.background = ''
            : e.target.style.background = 'pink'
    }
}


// const form = document.querySelector('.name')

// form.addEventListener('input', checkTyping)

// form.addEventListener('focus', paint)

// form.addEventListener('blur', paint)

// function checkTyping(e) {
//     if (form.value.match(nameRe)) {
//         if (form.value.length === form.value.match(nameRe).length) {
//             e.target.style.background = 'lightgreen';
//             e.target.style.border = '2px solid green'
//         } else {
//             e.target.style.background = 'pink'
//             e.target.style.border = '2px solid red'
//         }
//     } else {
//         e.target.style.background = 'pink'
//         e.target.style.border = '2px solid red'
//     }
// }

// const tel = document.querySelector('.tel')

// tel.addEventListener('input', checkTypingTel)

// tel.addEventListener('focus', paint)

// tel.addEventListener('blur', paint)

// function checkTypingTel(e) {
//     if (tel.value.match(telRe)) {
//         if (tel.value.length === tel.value.match(telRe).length) {
//             e.target.style.background = 'lightgreen';
//             e.target.style.border = '2px solid green'
//         } else {
//             e.target.style.background = 'pink'
//             e.target.style.border = '2px solid red'
//         }
//     } else {
//         e.target.style.background = 'pink'
//         e.target.style.border = '2px solid red'
//     }
// }

// const email = document.querySelector('.email')

// email.addEventListener('input', checkTypingEmail)

// email.addEventListener('focus', paint)

// email.addEventListener('blur', paint)

// function checkTypingEmail(e) {
//     if (email.value.match(emailRe)) {
//         if (email.value.length === email.value.match(emailRe)[0].length) {
//             e.target.style.background = 'lightgreen';
//             e.target.style.border = '2px solid green'
//         } else {
//             e.target.style.background = 'pink'
//             e.target.style.border = '2px solid red'
//         }
//     } else {
//         e.target.style.background = 'pink'
//         e.target.style.border = '2px solid red'
//     }
// }


// function paint(e) {
//     (e.target.style.background)
//         ? e.target.style.background = ''
//         : e.target.style.background = 'pink'
// }

// console.log('Dinislam'.match(/[\S][a-z]/gi))

// console.log('dinislam'.replace('a', '111'))