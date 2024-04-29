const express = require('express');
const app = express();
const crypto = require('crypto');
const PORT = process.env.PORT  || 3001;

const products = [
    {
        "id": "2dd520bd-cd04-48a9-b4c7-efde62683aef",
        "name": "Microphone",
        "price": 400,
        "quantity": 4,
        "active": true
      },
      {
        "id": "2dd520bd-cd04-48a9-b4c7-efde62683adk",
        "name": "Keyboard",
        "price": 29,
        "quantity": 10,
        "active": true
      },
      {
        "id": "2dd520bd-cd04-48a9-b4c7-efde62683ada",
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
    const id = crypto.randomUUID();
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});