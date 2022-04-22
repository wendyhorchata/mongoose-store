const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const ejs = require('ejs')


//Index
router.get('/store', (req, res) => {
	console.log('yay it got hit')
	try{
		 Product.find({}, (err, products) => {
		if (err) console.log(err);
		ejs.renderFile('./views/index.ejs', {allProducts: products}, {}, function (err, str) {
			if (err) console.log(err);
				if (err) res.sendStatus(500)
			else res.send(str)
		})
	}) } catch (err) {console.error (err) }
})

// New
router.get('/store/new', (req, res) => {
	ejs.renderFile('./views/new.ejs', {}, {}, function (err, str) {
		if (err) console.log(err);
		if (err) res.sendStatus(500)
		else res.send(str)
	})
});

//Show
router.get('/store/:id', (req, res) => {
	Product.findById(req.params.id, (err, product) => {
		if (err) console.log(err);
		ejs.renderFile('./views/show.ejs', {productObj: product,}, {}, function (err, str) {
			if (err) console.log(err);
				if (err) res.sendStatus(500)
			else res.send(str)
		}) 
	});
});

//Create
router.post('/store', (req, res) => {
	Product.create(req.body, (err, product) => {
		if (err) console.log(err);
		console.log(product);
		res.redirect('/store');
	});
});

//Delete
router.delete('/store/:id', (req, res) => {
	Product.findByIdAndRemove(req.params.id, (err, product) => {
		if (err) console.log(err);
		console.log(product);
		res.redirect('/store');
	});
});

//Edit
router.get('/store/:id/edit', (req, res) => {
	Product.findById(req.params.id, (err, product) => {
		if (err) console.log(err);
		ejs.renderFile('./views/edit.ejs', {productObj: product,}, {}, function (err, str) {
			if (err) console.log(err);
				if (err) res.sendStatus(500)
			else res.send(str)
		}) 
	});
});

//Buy
router.put('/store/:id/buy', (req, res) => {
	Product.findById(req.params.id, (err, product) => {
		if (err) console.log(err);
		let originQty = product.qty;

		Product.findByIdAndUpdate(
			req.params.id,
			{ qty: originQty - req.body.qty },
			{ new: true },
			(err, product) => {
				if (err) console.log(err);
				console.log(product);
				res.redirect('/store/' + req.params.id);
			}
		);
	});
});

//Update
router.put('/store/:id', (req, res) => {
	Product.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true },
		(err, product) => {
			if (err) console.log(err);
			console.log(product);
			res.redirect('/store/' + req.params.id);
		}
	);
});


module.exports = router