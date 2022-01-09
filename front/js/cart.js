const template = document.querySelector('#item_template');
var cart = localStorage.getItem('cart');
cart = JSON.parse(cart);
var totaleCart = 0;
var totaleQuantity = 0
cart.forEach(item => {
    const itemModel = document.importNode(template.content, true);
    itemModel.querySelector('.color').innerText = item.color
    itemModel.querySelector('h2').innerText = item.title
    itemModel.querySelector('img').setAttribute('src', item.image)
    itemModel.querySelector('.price').innerHTML = item.totalePrice + ' €'
    itemModel.querySelector('input').setAttribute('value',item.quantity) 
    document.querySelector('#cart__items').appendChild(itemModel);
    totaleCart = totaleCart + item.totalePrice;
    totaleQuantity = totaleQuantity + item.quantity;
});
document.querySelector('#totalQuantity').innerHTML = totaleQuantity;
document.querySelector('#totalPrice').innerHTML = totaleCart;






