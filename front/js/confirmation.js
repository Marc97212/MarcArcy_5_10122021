var URLSearchParam = new URLSearchParams(window.location.search)
document.querySelector('#orderId').innerText = URLSearchParam.get('orderId')
