const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jackets', price: 350 },
    { title: 'Shoes', price: 250 },
    { title: 'Snickers', price: 350 },
]

const renderGoodsItem = (title = 'item', price = 'price') => {
    return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`
}

const renderGoodsList = (list = [{ title: 'Item', price: 'price' }]) => {

    document.querySelector(".goods-list").innerHTML += list.map(item => renderGoodsItem(item.title, item.price)).join(' ')
}

renderGoodsList(goods)
