const express = require('express');
const app = express();
const crypto = require('crypto');
const PORT = process.env.PORT  || 3001;

const products = [
    {
        "id": 1,
        "name": "Microphone",
        "price": 400,
        "quantity": 4,
        "active": true
      },
      {
        "id": 2,
        "name": "Keyboard",
        "price": 29,
        "quantity": 10,
        "active": true
      },
      {
        "id": 3,
        "name": "headphones",
        "price": 40,
        "quantity": 4,
        "active": "false"
      }
]
app.use(express.json());

app.get( '/', (req, res) => {
    console.log("GET request received");
    res.send('Hello World! testing!!')} 
);

app.get('/products', (req, res) => {
    res.json(products)
})

app.post('/products', (req, res) => {
    const {name, price, quantity, active} = req.body //ensure no extra fields will be added
    if(!name || !price || !quantity){
        return res.status(422).json({error:'Missing required field'});
    }
    const id = Math.max(...products.map(product=> product.id)) + 1;
    products.push({id, name, price, quantity, active});
    res.status(201).json(req.body);
})

app.get( '/products/:id', (req,res)=> {
    const product = products.find((item) => item.id === req.params.id)
    if (!product) {
        return res.status(404).json({message: 'The requested resource does not exist.'})
    } else {
        res.status(200).json(product)
    }
})

app.put( "/products/:id", (req, res) => {
    const product = products.find(item => item.id == req.params.id);
    if (!product) {return res.status(404).json("Product with the given ID is not available.")}
    const {name, price, quantity, active} = req.body;
    if(name) product.name = name;
    if(price) product.price = price;
    if(typeof quantity !== 'undefined'){
        if(Number.isInteger(parseInt(quantity)) && parseInt(quantity) >= 0)
            product.quantity = parseInt(quantity);
        else return res.status(400).json("Quantity must be a positive integer.");
    }
    if(active != null) product.active = active;
    
    res.status(200).json(product);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});