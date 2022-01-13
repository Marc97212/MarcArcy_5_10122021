
var searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');

/* index */
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

        var formData = new FormData(Form)
        