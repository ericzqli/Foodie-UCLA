var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next){
	if(req.isAuthenticated()){
		
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("/campgrounds");
			} else {
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You don't have permission");
					res.redirect("back");
				}

			}
			});
	} else {
		req.flash("error", "You need to be logged in "); 
		res.redirect("back");
	}


};





middlewareObj.checkCampgroundOwnership = function checkCampgroundOwnership(req, res, next){
	if(req.isAuthenticated()){
		
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "Campgroud not found");
				res.redirect("/campgrounds");
			} else {
				if(!foundCampground){
					req.flash("error", "Item not found");
					return res.redirect("back");
				}
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You don't have permission!");
					res.redirect("back");
				}

			}
			});
			} else {
				req.flash("error", "You need to be logged in to do that!");
				res.redirect("back");
			}

};



middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash("error", "You need to log in to do that!");
		res.redirect("/login");
	}
};



module.exports = middlewareObj;