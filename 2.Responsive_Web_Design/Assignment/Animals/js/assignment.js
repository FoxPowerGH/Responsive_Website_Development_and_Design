// put your javascript code here

Handlebars.registerHelper('toLowerCase', function(str) {
  return str.toLowerCase();
});


var templates =  {
    navbar: null,
    breadcrumb: null,
    group: null,
    animal: null
}
var selected =  {
    group: 0,
    animal: 0
}
var breadcrumbs = [];



function showTemplate(template, data, _tagId, callback){

    var tagId = _tagId || '#content';
    $(tagId).html(template(data));
    if(callback){
	callback();
    }
}

function activeTab(e){

    $('.nav-tabs .active').removeClass('active');
    $(e.currentTarget).addClass('active');
}

function updateBreadcrumbs(id, name, category){

    var breadcrumb = {	    
	id : id,
	name: name,
	category: category
    };
    
    breadcrumbs [(category == 'group')?0:1] = breadcrumb;

    if(category == 'group' && breadcrumbs.length >1){
	breadcrumbs.pop();
    }

}


function onNavbarClick(e){

    activeTab(e);

    selected.group = $(e.currentTarget).data('id');

    updateBreadcrumbs(selected.group, $(e.currentTarget).data('name'), 'group');

    showTemplate(templates.breadcrumb,
		 breadcrumbs,
		 "#breadcrumb");

    showTemplate(templates.group, 
		 animals_data.category[selected.group], 
		 null, 
		 onGroupShown);
}

function onBreadcrumbShown(){

    $('#breadcrumb ol a.group').click(function(e){
	$('.navbar-tab').get(selected.group).click()
    });

}

function onGroupShown(){

    $('.thumbnail.group').click(function(e){
	selected.animal = $(e.currentTarget).data('id');

	updateBreadcrumbs(selected.animal, $(e.currentTarget).data('name'), 'animal');

        showTemplate(templates.breadcrumb,
		     breadcrumbs,
		     "#breadcrumb", onBreadcrumbShown);

	var auxAnimal = animals_data.category[selected.group].animals[selected.animal];
	var animal = {
	    name: auxAnimal.name,
	    description: auxAnimal.description,
	    images : [auxAnimal.image1, auxAnimal.image2]
	};

	showTemplate(templates.animal, animal, null, onAnimalShown);
    });
}

function onAnimalShown(){

    $('.thumbnail').click(function(e){
	showTemplate(templates.modal, $(e.currentTarget).data('src'), '#modal-container', function(e){
	    $('#image-modal').modal('show');
	});
    });
}


function onSearchKeyPressed(e){

    if(e.which == 13){

	var searchText = $('#searchbox').val();
	var filteredData = [{
	    name: 'Search "' + searchText  + '" result in ' + animals_data.category[selected.group].name,
	    animals: doSearch(searchText, animals_data.category[selected.group])
	}];

	showTemplate(templates.group, filteredData[0], null, onGroupShown);

    }

}

function doSearch(searchText, cat){

    var result = [];
    cat.animals.forEach(function(an){
	if ((an.name.search(searchText) > -1 || an.description.search(searchText)) > -1) {
	    result.push(an);
	}
    });
    return result;
}


$(document).ready(function(){

    templates.navbar = Handlebars.compile(
        $('#navbar-template').html()
    ); 

    templates.breadcrumb = Handlebars.compile(
	$('#breadcrumb-template').html()
    );

    templates.group = Handlebars.compile(
	$('#group-template').html()
    );

    templates.animal = Handlebars.compile(
	$('#animal-template').html()
    );

    templates.modal = Handlebars.compile(
	$('#modal-template').html()
    );

    showTemplate(templates.navbar, animals_data, '#navbar');

    $('.navbar-tab').click(function(e){onNavbarClick(e)});    
    $('.navbar-tab').get(0).click()

    $('#searchbox').keypress(function (e) {
	onSearchKeyPressed(e);
    });

});
