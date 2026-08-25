
const cardContainer = document.querySelector("#card-container")

async function fetchProducts() {

    try {
        const response = await fetch('https://fakestoreapi.com/products')
        const products = await response.json()

        products.map((product, index) => {
            console.log(product)
            const productCard = document.createElement("div");
            productCard.classList.add("card")
            productCard.innerHTML = `
           
           <div class="image-container">
           <img src="${product.image}" alt="">
           </div>

           <div class="content">
           <h1>${product.title}</h1>
           <h2>${product.price}</h2>
           <p>${product.description}</p>
           <button>
           Add to Cart
           </button>
           </div>
           `

            cardContainer.appendChild(productCard)
        })
    } catch (error) {
        console.log(`Error is: $(error)`)
    }
}
fetchProducts()







