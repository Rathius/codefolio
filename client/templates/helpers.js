Template.login.events({
    'submit .login-user': function(event){
        var username = event.target.username.value;
        var password = event.target.password.value;
        
        Meteor.loginWithPassword(username, password, function(err){
            if(err){
                var username = event.target.username.value;
                var password = event.target.password.value;
                FlashMessages.sendError(err.reason);
            } else {
                FlashMessages.sendSuccess("You are now logged in");
                Router.go('/admin/projects');
            }
        });
        
        event.target.username.value = "";
        event.target.password.value = "";
        
        return false;
    }
});

Template.layout.events({
    'click .logout-user': function(event){
        Meteor.logout(function(err){
            if(err){
                FlashMessages.sendError(err.reason);
            } else {
                FlashMessages.sendSuccess("You are logged out");
                Router.go('/');
            }
        });
        
        // prevent submit
        return false;
    }
});

Template.registerHelper('formatDate', function(date){
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
});

Template.registerHelper('getSiteTitle', function(date){
    return "Codefolio";
});

Template.registerHelper('getAdminName', function(date){
    return "John Doe";
});

Template.registerHelper('getAdminImage', function(date){
    return '/assets/img/user.png';
});

