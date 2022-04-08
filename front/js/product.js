var searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');

fetch('http://localhost:3000/api/products/' + id)
.then(response => response.json())
.then(product => {
    document.querySelector('#title').innerText = product.name
    document.querySelector('#price').innerText = product.price
    document.querySelector('#description').innerText = product.description
    document.querySelector('.item__img img').setAttribute('src', product.imageUrl)
    var selectColors = document.getElementById('colors')  
    for (const element of product.colors) {
        console.log(element);
        var opt = document.createElement("option");
        opt.setAttribute("value", element);
        var itmText = document.createTextNode(element);
        opt.appendChild(itmText);
        selectColors.appendChild(opt);
    }   
   document.querySelector('.item article').setAttribute('data-id', product._id)
})

const buttunAddToCart = document.querySelector("#addToCart")
buttunAddToCart.addEventListener("click",addToCart)


function addToCart(){
    
    // localStorage.setItem('cart',teste)
    var id = document.querySelector('.item article').getAttribute('data-id')
    var selectColor = document.getElementById('colors'); 
    var color = selectColor.options[selectColor.selectedIndex].text;
    var quantity = document.getElementById('quantity').value;
    var title = document.querySelector('#title').innerText;
    var price = document.querySelector('#price').innerText
    if (quantity > 0 && color !== "--SVP, choisissez une couleur --"){
        var item = newItem(id,title,price,color,quantity)
        addItem(item);        
    }
    console.log('teste',item)
}
function newItem(id,title,price,color,quantity){
    var totalePrice = price * quantity;
    var item = {
        id:id,
        title:title,
        totalePrice:totalePrice,
        price:price,
        color:color,
        quantity:parseInt(quantity),
        image:document.querySelector('.item__img img').getAttribute('src')
    };
    return item;
}
function addItem(item){
    var cart = localStorage.getItem('cart');
    if(cart !== null){     
        cart = JSON.parse(cart);        
        var temoin = false;
        for (const key in cart){
            if(item.title == cart[key].title && item.color == cart[key].color){
                cart[key].quantity = cart[key].quantity + item.quantity;
                cart[key].totalePrice = cart[key].totalePrice + item.totalePrice;
                temoin = true;
                break;
            }
        }
        if (temoin == false){
            cart.push(item);
        }

    }else{
        cart = [item];
    }    
    console.log(cart)
    // localStorage.removeItem('cart')
    localStorage.setItem('cart',JSON.stringify(cart));    
}
