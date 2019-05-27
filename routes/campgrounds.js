var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
//
router.get("/", function(req, res) {
	//Get all the data from db
	// res.render("campgrounds", {campgrounds: campgrounds});
	
	Campground.find({}, function(err, allCampgrounds) {
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds:allCampgrounds});
		}	
	});		
});

//CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var price = req.body.price;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	
	var newCampground = {name: name, price: price, image: image, description: description, author: author};
	// campgrounds.push(newCampground);
	//Create the campground and save to the DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			console.log(newlyCreated);
			res.redirect("/campgrounds");
		}
	});
	
});


//NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});
///show the info of the specific item
router.get("/:id", function(req, res){
	
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			console.log(foundCampground);
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});

});
//EDIT CAMPGROUND ROUTE==========================
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	//is user logged in ?
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});
	});
	
	
	
});

//UPDATE==========================================
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	//find and update 	
	//redirect
	
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
	
	
});

//DELETE ROUTE========================================
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});


module.exports = router;