var searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');

fetch('http://localhost:3000/api/products/' + id)
.then(response => response.json())
.then(product => {
    document.querySelector('#title').innerText = product.name
    document.querySelector('#price').innerText = product.price
    document.querySelector('#description').innerText = product.description
    document.querySelector('.item__img img').setAttribute('src', product.imageUrl)
    document.querySelector('#colors').setAttribute('src',product.colors)
})

const buttunAddToCart = document.querySelector("#addToCart")
buttunAddToCart.addEventListener("click",addToCart)


function addToCart(){
    
    // localStorage.setItem('cart',teste)
    var selectColor = document.getElementById('colors'); 
    var color = selectColor.options[selectColor.selectedIndex].text;
    var quantity = document.getElementById('quantity').value;
    var title = document.querySelector('#title').innerText;
    var price = document.querySelector('#price').innerText
    if (quantity > 0 && color !== "--SVP, choisissez une couleur --"){
        var item = newItem(title,price,color,quantity)
        var cart = localStorage.getItem('cart');
        console.log(cart)
    }
   
    console.log('teste',item)
}
function newItem(title,price,color,quantity){
    var totalePrice = price * quantity;
    var item = {
        title:title,
        totalePrice:totalePrice,
        price:price,
        color:color,
        quantity:quantity
    };
    return item;
}
function addItem(item){
    var cart = localStorage.getItem('cart');
    if(cart == null){
        cart = JSON.stringify([item]);
        localStorage.setItem('cart',cart)
        
    }else{
        
    }
}
