

Template.layout.rendered=function() {
    $('#projectDate').datepicker();
}

Template.add_project.events({
    'submit .add_project_form': function(event){
        var name = event.target.name.value;
        var projectDate = event.target.projectDate.value;
        var client = event.target.client.value;
        var type = event.target.type.value;
        var description = event.target.description.value;
        var file = $('#projectImage').get(0).files[0];
                
        // Insert Project
        if(file){
			fsFile = new FS.File(file);

			ProjectImages.insert(fsFile, function(err, result){
				if(!err){
					var projectImage = '/cfs/files/ProjectImages/'+result._id;

					Projects.insert({
						name: name,
                        description: description,
                        type: type,
                        client: client,
                        projectDate: projectDate,
                        projectImage: projectImage
					});
				}
			});
		} else {
			var projectImage = '/img/noimage.png';

			Projects.insert({
				name: name,
                description: description,
                type: type,
                client: client,
                projectDate: projectDate,
                projectImage: projectImage
			});
		}
                
        FlashMessages.sendSuccess("Project Added");
        Router.go('/admin/projects');
        
        // Prevent Submit
        return false;
    }
});


Template.edit_project.events({
    'submit .edit_project_form': function(event){
        var name = event.target.name.value;
        var projectDate = event.target.projectDate.value;
        var client = event.target.client.value;
        var type = event.target.type.value;
        var description = event.target.description.value;
        var file = $('#projectImage').get(0).files[0];
        
        
        if(file){
			fsFile = new FS.File(file);

			ProjectImages.update(fsFile, function(err, result){
				if(!err){
					var projectImage = '/cfs/files/ProjectImages/'+result._id;

					// Update Project
                    Projects.update({
                        _id: this._id
                    },{
                        $set:{
                            name: name,
                            description: description,
                            type: type,
                            client: client,
                            projectDate: projectDate,
                            projectImage: projectImage
                        }
                    });
                }
            });
		} else {
			Projects.update({
                _id: this._id
            },{
                $set:{
                    name: name,
                    description: description,
                    type: type,
                    client: client,
                    projectDate: projectDate,
                }
            });
		}
                
        FlashMessages.sendSuccess("Project Added");
        Router.go('/admin/projects');
        
        // Prevent Submit
        return false;
    }
});

Template.list_projects.events({
    'click .delete_project': function(event){
        if(confirm("Are you sure?")){
            Projects.remove(this._id);
            FlashMessages.sendSuccess("Project Deleted");
            
            // Prevent submit
            return false;
        }
    }
});
