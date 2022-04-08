const template = document.querySelector('#item_template');

var cart = localStorage.getItem('cart');
cart = JSON.parse(cart);
console.log(cart)

function updateCart(cart){
    const template = document.querySelector('#item_template');
    const cartItems = document.querySelector('#cart__items');

    cartItems.innerHTML = '';

    if(cart == null || cart.length === 0){
        document.querySelector('.cart').innerHTML = '<h3 style="text-align: center">Votre panier est vide</h3>';
        return;
    }
    
    var totaleCart = 0;
    var totaleQuantity = 0

    cart.forEach(item => {
        const itemModel = document.importNode(template.content, true);
        itemModel.querySelector('.cart__item').setAttribute('data-id', item.id)
        itemModel.querySelector('.color').innerText = item.color
        itemModel.querySelector('h2').innerText = item.title
        itemModel.querySelector('img').setAttribute('src', item.image)
        itemModel.querySelector('.price').innerHTML = item.totalePrice + ' €'
        let quantityInput = itemModel.querySelector('input')
        quantityInput.addEventListener('change', function(event){
            console.log('teste')
            updateProductCart(item.id,event.target.value)
            
        })
        let deleteInput = itemModel.querySelector('.deleteItem')
        deleteInput.addEventListener('click', function(){
            deleteProductCart(item.id)
        })
        quantityInput.setAttribute('value',item.quantity)
         
        document.querySelector('#cart__items').appendChild(itemModel);

        const itemQuantity = parseInt(item.quantity);
        totaleCart += item.totalePrice * itemQuantity;
        totaleQuantity = totaleQuantity + itemQuantity;
    });


    document.querySelector('#totalQuantity').innerHTML = totaleQuantity;
    document.querySelector('#totalPrice').innerHTML = totaleCart;

    localStorage.setItem('cart', JSON.stringify(cart));
}
function updateProductCart(productId,quantity){    
    const element = (product) => product.id == productId
    const index = cart.findIndex(element)
    cart[index].quantity = quantity
    document.querySelector('[data-id="'+productId+'"]').remove()
    updateCart(cart)
    console.log(cart.find(product => product.id == productId))
}
updateCart(cart)


function deleteProductCart(productId){

    document.querySelector('[data-id="'+productId+'"]').remove()
    updateCart(cart.filter(element => element.id !== productId))
    // console.log(cart.find(product => product.id == productId))
}



//création numéro de commande
const cartForm = document.querySelector('.cart__order__form');
cartForm.addEventListener('submit',function(event){
    event.preventDefault()
    const formData = new FormData(cartForm)    
    console.log(JSON.stringify(Object.fromEntries(formData)))
    const products = [];
    cart.forEach(element => {
        products.push(element.id)
    })
    fetch('http://localhost:3000/api/products/order',{
        method: 'POST', 
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body:JSON.stringify({
            
            contact: {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                address: formData.get('address'),
                city: formData.get('city'),
                email: formData.get('email'),
            },
            products: products 
        })
    }).then(response => response.json())    
    .then(data =>{
        window.location.href = 'confirmation.html?orderId='+data.orderId
    })    
})