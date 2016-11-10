 // set up the main template the the router will use to build pages
Router.configure({
  layoutTemplate: 'layout'
});


  // Prevent unauthorized access
  Router.onBeforeAction(function () {
    if (!Meteor.user()) {
      this.render("navbar", {to:"navbar"});
      this.render("AccessDenied");
    } else
    {
      this.next();
    }
  });


// specify the top level route, the page users see when they arrive at the site
	Router.route('/', function () {
		this.render("navbar", {to:"navbar"});
		this.render("home", {to:"main"});
		this.render("navbar-bottom", {to:"footer"}); 
	});

	Router.route('/blog', function () {
		this.render("navbar", {to:"navbar"});
		this.render("blog", {to:"main"});
 		this.render("navbar-bottom", {to:"footer"});  
	});


	Router.route('/news', function () {
		this.render("navbar", {to:"navbar"});
		this.render("news", {to:"main"});
 		this.render("navbar-bottom", {to:"footer"});  
	});

	Router.route('/contact', function () {
		this.render("navbar", {to:"navbar"});
		this.render("contact", {to:"main"});
 		this.render("navbar-bottom", {to:"footer"});  
	});

	Router.route('/about', function () {
		this.render("navbar", {to:"navbar"});
		this.render("about", {to:"main"});
 		this.render("navbar-bottom", {to:"footer"});  
	});


