var express 	= require("express");
var app 		= express();
var bodyParser	= require("body-parser");
var mongoose 	= require("mongoose");
var Campground  = require("./models/campground");
var Comment 	= require("./models/comment");
var seedDB      = require("./seeds");
var passport 	= require("passport");
var LocalStrategy = require("passport-local");
var User  		= require("./models/user");
var methodOverride = require("method-override");
var flash = require("connect-flash");



//REQUIRING ROUTES=========================================
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");





mongoose.connect("mongodb+srv://liziqi1997:liziqi1997@cluster0-zr8zn.mongodb.net/test?retryWrites=true", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true})); // bodyParser usually has this line

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
// seedDB();
//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again",
	resave: false,
	saveUninitialized: false
}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
//==========================


app.listen(process.env.PORT || 3000, function(req, res) {
	console.log("Yelp Camp started");
});