// class GoodsItem {
//     constructor(name = 'title', price = 'price') {
//         this.name = name
//         this.price = price
//     }
//     render(list = [{ name: 'title', price: 'price' }]) {
//         list.map((item) => {
//             let x = document.querySelector('.goods-list')
//             let b = document.createElement('div')
//             b.className = 'goods-item'
//             b.innerHTML = `<h3>${item.name}</h3><p>${item.price}</p>`
//             x.appendChild(b)
//         })
//     }
// }

// const listOfItems = [
//     { name: 'Shirt', price: 150 },
//     { name: 'Socks', price: 15 },
//     { name: 'Jacket', price: 26 },
//     { name: 'Shoes', price: 124 },
// ]

// const List = new GoodsItem

// List.render(listOfItems)

class GoodsItem {
    picked = false
    constructor(item /*= { name = 'name', price = 'price', key = 0 }*/) {
        this.name = item.name
        this.price = item.price
        this.key = item.key
    }
    render() {
        const commonItem = document.createElement('div')
        commonItem.innerHTML = `<div class='goods-item'><h3>${this.name}</h3><p>${this.price}</p></div>`
        const pushToCartBtn = document.createElement('button')
        pushToCartBtn.className = `${this.key.toString()}`
        pushToCartBtn.onclick = (e) => {
            if (!List.goods[e.target.className].picked) {
                List.goods[e.target.className].picked = true
                Cart.fetchGoods(List.goods[e.target.className])
            } else {
                Cart.addPresItem(e)
            }
        }
        pushToCartBtn.innerText = 'В корзину'
        commonItem.appendChild(pushToCartBtn)
        return commonItem
    }
}

class GoodsList {
    constructor() {
        this.goods = []
    }
    fetchGoods() {
        this.goods = [
            { key: 0, name: 'Shirt', price: 150, picked: false },
            { key: 1, name: 'Socks', price: 15, picked: false },
            { key: 2, name: 'Jacket', price: 26, picked: false },
            { key: 3, name: 'Shoes', price: 124, picked: false },]
    }
    render() {
        let listHtml = ''
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good)
            listHtml = goodItem.render()
            document.querySelector('.goods-list').appendChild(listHtml)
        })
    }
}
class CartItem {
    picked = false
    count = 1
    sum = 0
    constructor(item) {
        this.name = item.name
        this.price = item.price
        this.key = item.key
    }
    render() {
        this.picked = 'true'
        this.count = this.count++
        this.sum = this.price * this.count
        const commonItem = document.createElement('div')
        commonItem.innerHTML = `<div class='cart-item'><h3>${this.name}</h3><p>price = ${this.price}</p><p class="sum${this.key}">sum = ${this.sum}</p><p class="count${this.key}">count = ${this.count}</p><p>${this.picked}</p></div>`
        const pullFromCartBtn = document.createElement('button')
        pullFromCartBtn.className = `remove-${this.key}`
        pullFromCartBtn.onclick = (e) => {
            console.log(e)
        }
        pullFromCartBtn.innerText = 'Удалить'
        commonItem.appendChild(pullFromCartBtn)
        return commonItem
    }
}

class CartList {
    constructor() {
        this.goods = []
    }
    fetchGoods(item) {
        this.render(item)
    }
    addPresItem(e) {
        for (let i = 0; i < this.goods.length; i++) {
            if (e.target.className == this.goods[i].key) {
                const sum = document.querySelector(`.sum${e.target.className}`)
                this.goods[i].sum = this.goods[i].price * ++this.goods[i].count
                sum.innerText = 'sum = ' + this.goods[i].sum
                const count = document.querySelector(`.count${e.target.className}`)
                count.innerText = 'count = ' + this.goods[i].count
            }
        }
    }
    render(item) {
        const cartGoodItem = new CartItem(item)
        this.goods.push(cartGoodItem)
        console.log(this.goods)
        document.querySelector('.cart').appendChild(cartGoodItem.render())
    }
}

const List = new GoodsList()
const Cart = new CartList()
List.fetchGoods()
List.render()