var searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');

fetch('http://localhost:3000/api/products/' + id)
.then(response => response.json())
.then(product => {
    document.querySelector('#title').innerText = product.name
    document.querySelector('#price').innerText = product.price
    document.querySelector('#description').innerText = product.description
    document.querySelector('.item__img img').setAttribute('src', product.imageUrl)
})

fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(products => {
            const template = document.querySelector('#product-template');

            products.forEach(product => {
                // cree un object document. Pour faire des recherches dessus
                const item = document.importNode(template.content, true);

                item.querySelector('a').setAttribute('href', 'product.html?id='+product._id)
                item.querySelector('h3').innerText = product.name
                item.querySelector('img').setAttribute('src', product.imageUrl)
                item.querySelector('p').innerHTML = product.description

                document.querySelector('#items').appendChild(item);
            });
        })