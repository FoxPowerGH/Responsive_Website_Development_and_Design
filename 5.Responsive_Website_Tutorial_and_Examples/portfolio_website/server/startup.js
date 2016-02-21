// start up script that creates some users for testing
Meteor.startup(function(){
  if(Meteor.users.find().count() === 0){
    Accounts.createUser({
      username: 'admin',
      email: 'admin@admin.com',
      password: 'password',
      roles: 'blogAdmin'
    });
  }
});