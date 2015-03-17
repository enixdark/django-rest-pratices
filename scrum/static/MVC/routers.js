(function($,Backbone,_,app){
	var AppRouter = Backbone.Router.extend({
		routes:{
			'':'home'
		},
		initialize:function(options){
			this.contentElement = '#content';
			this.current = null;
			this.header = new app.views.HeaderView();

			$('body').prepend(this.header.el);
			this.header.render();
			Backbone.history.start();
		},
		home:function(){
			var view;
			view = new app.views.HomepageView({el:this.contentElement});
			this.render(view);

		},
		render:function(view){
			if(this.current){
				this.current.undelegateEvents();
				this.current.$el = $();
				this.current.remove();
			}
			this.current = view;
			this.current.render();
		},
		route:function(route,name,callback){
			var login;
			var callback = callback || this[name];
			console.log(callback);
			callback = _.wrap(callback,function(original){
				var args = _.without(arguments,original);
				if(app.session.authenticated()){
					original.apply(this,args);
				}
				else{
					$(this.contentElement).hide();
					login = new app.views.LoginView();
					$(this.contentElement).after(login.el);
					login.on('done',function(){
						this.header.render();
						$(this.contentElement).show();
						orginal.applly(this,args);
					},this);
					login.render();
				}
			});
			return Backbone.Router.prototype.route.apply(this,[route,name,callback]);

		},

	});

	app.router = AppRouter;
})(jQuery,Backbone,_,app);


