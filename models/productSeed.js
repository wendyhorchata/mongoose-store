require('dotenv').config();
const Products = require('./products')
const mongoose = require('mongoose')
mongoose.connect (process.env.DATABASE_URL)

const productSeedData = [
    {
      name: 'Beans',
      description: 'A small pile of beans. Buy more beans for a big pile of beans.',
      img: 'https://imgur.com/LEHS8h3.png',
      price: 5,
      qty: 99
    }, {
      name: 'Bones',
      description: 'It\'s just a bag of bones.',
      img: 'https://imgur.com/dalOqwk.png',
      price: 25,
      qty: 0
    }, {
      name: 'Bins',
      description: 'A stack of colorful bins for your beans and bones.',
      img: 'https://imgur.com/ptWDPO1.png',
      price: 7000,
      qty: 1
    }
  ]

    const productSeed = () => {
    productSeedData.forEach((product, index) => {
    const instance = new Products();
    instance.name=product.name
    instance.description=product.description
    instance.img=product.img
    instance.price=product.price
    instance.qty=product.qty
    instance.save(() => {
  if(index == productSeedData.length - 1) {
    process.exit ()
  }
    })
  })
  }
 
  mongoose.connection
  .on("connected", () => { console.log("Connected to mongoose!")
  productSeed()
})
  .on("close", () => { console.log("mongoose disconnected") })
  .on("error", (error) => { console.log(error) });
  