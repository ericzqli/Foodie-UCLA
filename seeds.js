var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

 
var data = [
    {
        name: "Chaoyue", 
        image: "https://p.nanrenwo.net/uploads/allimg/190102/8515-1Z1021Z136.jpg",
        description: "crum"
    },
    
];
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        // console.log("removed campgrounds!");
        //  //add a few campgrounds
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground){
        //         if(err){
        //             console.log(err)
        //         } else {
        //             console.log("added a campground");
        //             //create a comment
        //             Comment.create(
        //                 {
        //                     text: "This place is great, but I wish there was internet",
        //                     author: "Homer"
        //                 }, function(err, comment){
        //                     if(err){
        //                         console.log(err);
        //                     } else {
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("Created new comment");
        //                     }
        //                 });
        //         }
        //     });
        // });
    }); 
    //add a few comments
}


// function seedDB(){
// 	Campground.remove({}, function(err){
// 		if(err){
// 			console.log(err);
// 		} 
// 		console.log("removed!");
// 		data.forEach(function(seed){
// 		Campground.create(seed, function(err, campground){
// 			if(err){
// 				console.log(err);
// 			} else {
// 				console.log("added a campground");
// 				Comment.create(
// 					{	text: "This place is great!",
// 						author:"Homer"
// 					}, function(err, comment){
// 						if(err) {
// 							console.log(err);
// 						} else {
// 							campground.comments.push(comment);
// 							campground.save();
// 							console.log("created a new comment");
// 						}
						
// 					});
// 			}
// 		});
// 	});
// });
		
// }
 
module.exports = seedDB;