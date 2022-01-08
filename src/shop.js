
import Validation from "./validation"

import '../src/style.css'

class Item {
    name
    price
    id
    constructor(item) {
        this.name = item.name
        this.price = item.price
        this.id = item.id
    }
}

class List {
    list = []
    constructor() {

    }
    add(item) {
        const presentItem = this.list.find((listItem) => {
            return listItem.name === item.name
        })

        if (presentItem) {
            presentItem.count += 1
        } else {
            this.list.push(item)
        }

    }
}

class CatalogItem extends Item {
    _cartInstance = []
    constructor(item, CartInstance) {
        super(item)
        this._cartInstance = CartInstance

    }
    renderHTML() {
        const wrapperOfItem = document.createElement('div')
        wrapperOfItem.className = `item__inner item__${this.id}`

        const imgItem = document.createElement('img')
        imgItem.className = `item__img${this.id} img`
        imgItem.src = "./pic.png"

        const itemName = document.createElement('p')
        itemName.className = `item__name item__${this.id}`
        itemName.innerHTML = `${this.name}`

        const itemPrice = document.createElement('p')
        itemPrice.className = `item__price item__${this.id}`
        itemPrice.innerHTML = `${this.price}`

        const addToCartButton = document.createElement('button')
        addToCartButton.className = `button item__btn${this.id}`
        addToCartButton.innerHTML = 'добавить'
        addToCartButton.onclick = () => {
            document.querySelector('.cart').innerHTML = ''
            this._cartInstance.add(new CartItem(this, this._cartInstance))
            this._cartInstance.renderCart()
        }

        wrapperOfItem.appendChild(imgItem)
        wrapperOfItem.appendChild(itemName)
        wrapperOfItem.appendChild(itemPrice)
        wrapperOfItem.appendChild(addToCartButton)
        return wrapperOfItem
    }
}

class CatalogList extends List {
    _cartInstance
    _pageCounter = 1
    _findeItem = []
    constructor(CartList) {
        super()
        this.list = []
        this._cartInstance = CartList
        this.fetchListFromJSON()
    }
    fetchListFromJSON() {
        if (this.list.length == 0) {
            this.renderMoreButton()
        }
        const listOfFetchItems = fetch(`/database/database${this._pageCounter}.json`)
        return listOfFetchItems
            .then(res => {
                return res.json()
            })
            .then(data => {
                this._pageCounter++
                this.list = this.list.concat(data.data.map(cur => {                                             // concat добавить new JSON items к существующему массиву
                    return new CatalogItem(cur, this._cartInstance)
                }))
                this.renderList(this.list)
            })
            .catch(e => console.log(e))
    }
    renderList(list) {
        document.querySelector('.catalog').innerHTML = ''
        const searchBtn = document.querySelector('.search-btn')
        searchBtn.onclick = () => this.findItemFunc()
        list.map(list => {
            document.querySelector('.catalog').appendChild(list.renderHTML())
        })
    }
    renderMoreButton() {
        const moreButton = document.createElement('div')
        moreButton.innerHTML = `<button class="button button-fetch" >Загрузить еще</button>`
        moreButton.onclick = () => this.fetchListFromJSON()
        document.querySelector('body').appendChild(moreButton)
    }
    findItemFunc() {
        const regExp = new RegExp(document.querySelector('.search').value, 'i')
        console.log(regExp)
        console.log(this.list)
        this._findeItem = this.list.filter(item => {
            return item.name.match(regExp)
        })
        this.renderList(this._findeItem)
    }
}

class CartItem extends Item {
    count
    summ
    _cartInstance = []
    constructor(item, CartInstance) {
        super(item)
        this.count = 1
        this.summ = item.price
        this._cartInstance = CartInstance
    }
    renderCartItem() {
        const wrapperCartItem = document.createElement('div')
        wrapperCartItem.className = `cart-item item-${this.id}`

        const subButton = document.createElement('button')
        subButton.className = 'button button-subAdd sub'
        subButton.innerHTML = '-'
        subButton.onclick = () => this.subItemFromCart()

        const paragraph = document.createElement('p')
        paragraph.innerHTML = `${this.name} x ${this.count}`
        paragraph.ondblclick = () => this.remItemFromCart()

        const addButton = document.createElement('button')
        addButton.className = 'button button-subAdd add'
        addButton.innerHTML = '+'
        addButton.onclick = () => this.addItemFromCart()

        wrapperCartItem.appendChild(subButton)
        wrapperCartItem.appendChild(paragraph)
        wrapperCartItem.appendChild(addButton)

        return wrapperCartItem
    }
    subItemFromCart() {
        if (this.count == 1) {
            this._cartInstance.list = this._cartInstance.list.filter(item => item.name != this.name)
            this._cartInstance.renderCart()
        }

        if (this.count > 1) {
            this.count--
            this._cartInstance.renderCart()
        }

    }
    addItemFromCart() {
        this.count++
        this._cartInstance.renderCart()
    }
    remItemFromCart() {
        this._cartInstance.list = this._cartInstance.list.filter(item => item.name != this.name)
        this._cartInstance.renderCart()
    }
}

class CartList extends List {
    list = []
    cartOptions = {
        summOfAllCart: 0,
        removeAllButton: false
    }
    constructor(item) {
        super(item)
        this.addShowCartListButton()
    }

    addShowCartListButton() {
        const cartButton = document.querySelector('.cart__button')

        cartButton.onclick = () => {

            const cartList = document.querySelector('.cart');

            cartList.classList.toggle('shown')

            if (this.list.length == 0) {
                cartList.innerHTML = 'пусто'
            }
        }
    }
    renderCart() {
        document.querySelector('.cart').innerHTML = ''
        if (this.list.length == 0) {
            document.querySelector('.cart').innerHTML = 'пусто'
        }
        this.list.forEach(cartItem => {
            document.querySelector('.cart').appendChild(cartItem.renderCartItem())
        })
    }
}

const mainCartList = new CartList()
const mainList = new CatalogList(mainCartList);


const nameRe = /\p{Alpha}/giu
const telRe = /\d/g
const emailRe = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/gi

const name = new Validation('name', nameRe)
const tel = new Validation('tel', telRe)
const email = new Validation('email', emailRe)