(function($,Backbone,_,app){


	var BaseModel = Backbone.Model.extend({
		url:function(){
			var links = this.get('links');
			var url = links && links.self;
			if(!url){
				url = Backbone.Model.prototype.url.call(this);
			}
			return url;
		}
	});

	var BaseCollection = Backbone.Collection.extend({
		parse:function(response){
			this._next = response.next;
			this._previous = response.previous;
			this._count = response.count;
			return response.results || [];
		},
		getOrFetch:function(id){
			var result = $.Deferred();
			var model = this.get(id);
			if(!model){
				model = this.push({id:id});
				model.fetch({
					success:function(model,response,options){
						result.resolve(model);
					},
					error:function(model,response,options){
						result.reject(model.response);
					}
				});
			}
			else{
				result.resolve(model);
			}
			return result;
		}
	})
	app.models.Sprint = BaseModel.extend({});
	app.models.Task = BaseModel.extend({});
	app.models.User = BaseModel.extend({
		idAttributemodel:'username'
	});

	app.collections.ready = $.getJSON(app.apiRoot);
	app.collections.ready.done(function(data){
		app.collections.Sprint = BaseCollection.extend({
			model:app.models.Sprint,
			url:data.sprints
		});
		app.sprints = new app.collections.Sprint();

		app.collections.Task = BaseCollection.extend({
			model:app.models.Task,
			url:data.tasks
		});
		app.tasks = new app.collections.Task();

		app.collections.User = BaseCollection.extend({
			model:app.models.User,
			url:data.users
		});
		app.users = new app.collections.User();
	});
})(jQuery,Backbone,_,app)
