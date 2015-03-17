
(function($,Backbone,_,app){

	var TemplateView = Backbone.View.extend({
		templateName:'',
		initialize:function(){
			this.template = _.template($(this.templateName).html());
		},
		render:function(){
			var context = this.getContext();
			var html = this.template(context);
			this.$el.html(html);
		},
		getContext:function(){
			return {};
		}
	});

	var FormView = TemplateView.extend({

		id:'login',
		templateName:'#login-template',
		events:{
			'submit form':'submit'
		},
		errorTemplate:_.template('<span class="error"><%- mgs %></span>'),
		submit:function(event){
			event.preventDefault();
			this.form = $(event.currentTarget);
			this.clearErrors();
		},
		showErrors:function(errors){
			_.map(errors,function(fieldErrors,name){
				var field = $(':input[name='+name+']',this.form);
				var label = $('label[for='+field.attr('id')+']',this.form);
				if(label.length === 0){
					label = $('label',this.form).first();
				}
				function appendErrors(mgs){
					label.before(this.errorTemplate({mgs:mgs}));
				}
				_.map(fieldErrors,appendErrors,this)
			},this);
		},
		clearErrors:function(){
			$('.error',this.form).remove();
		},
		serializeForm:function(form){
			return _.object(_.map(form.serializeArray(),function(item){
				return [item.name,item.value];
			}));
		},
		failure:function(xhr,status,error){
			var errors = xhr.responseJSON;
			this.showErrors(errors);
		},
		done:function(event){
			if(event){
				event.preventDefault()
			}
			this.trigger('done');
			this.remove();
		},
		modelFailure:function(model,xhr,options){
			var errors = xhr.responseJSON;
			this.showErrors(errors);
		}

	});

	var NewSprintView = FormView.extend({
		templateName:'#new-sprint-template',
		className:'new-sprint',
		events:_.extend({
			'click button.cancel':'done'
		},FormView.prototype.events),
		submit:function(event){
			var self= this;
			var attributes = {};
			FormView.prototype.submit.apply(this,arguments);
			attributes = this.serializeForm(this.form);
			app.collections.ready.done(function(){
				app.sprints.create(attributes,{
				wait:true,
				success: $.proxy(self.success,self),
				error: $.proxy(self.modelFailure,self)
			});
			});
		},
		success:function(model){
			this.done();
			window.location.hash = '#sprint/' + model.get('id');
		}
	});

	var SprintView = TemplateView.extend({
		templateName:'#sprint-template',
		initialize:function(options){
			var self = this;
			TemplateView.prototype.initialize.apply(this,arguments);
			this.sprintId = options.sprintId;
			this.sprint = null;
			app.collections.ready.done(function(){
				// self.sprint = app.sprints.push({id:self.sprintId});
				// self.sprints.fetch({
				// 	success:function(){
				// 		self.render();
				// 	}
				// })
				app.sprints.getOrFetch(self.sprintId).done(function(sprint){
					self.sprint = sprint;
					self.render();
				}).fail(function(sprint){
					self.sprint = sprint;
					self.sprint.invalid = true;
					self.render();
				});
			});
		},
		getContext:function(){
			return { sprint:this.sprint};
		}
	})

	var HomepageView = TemplateView.extend({
		templateName:'#home-template',
		events:{
			'click button.add': 'renderAddForm'
		},
		initialize:function(options){
			var self = this;
			TemplateView.prototype.initialize.apply(this,arguments);
			app.collections.ready.done(function(){
				var end = new Date();
				end.setDate(end.getDate() - 7);
				end = end.toISOString().replace(/T.*/g,'');
				app.sprints.fetch({
					data:{end_min:end},
					success:$.proxy(self.render,self)
				});
			});
		},
		getContext:function(){
			return {sprints:app.sprints || null }
		},
		renderAddForm:function(event){
			var view = new NewSprintView();
			var link = $(event.currentTarget);
			event.preventDefault();
			link.before(view.el);
			link.hide();
			view.render();
			view.on('done',function(){
				link.show();
			});
		}
	});

	var LoginView = FormView.extend({

		id:'login',
		templateName:'#login-template',
		submit:function(event){
			var data = {};
			event.preventDefault();
			this.form = $(event.currentTarget);
			// data = {
			// 	username:$(':input[name="username"]',this.form).val(),
			// 	password:$('input[name="password"]',this.form).val()
			// }
			data = this.serializeForm(this.form);
			$.post(app.apiLogin,data).success($.proxy(this.loginSuccess,this))
			.fail($.proxy(this.failure,this));
		},
		loginSuccess:function(data){
			app.session.save(data.token);
			this.trigger('login',data.token);
			window.location = '/';
		}
	});

	var HeaderView = TemplateView.extend({
		tagName:'header',
		templateName:'#header-template',
		events:{
			'click a.logout':'logout'
		},
		getContext:function(){
			return {
				authenticated:app.session.authenticated()
			};
		},
		logout:function(event){
			event.preventDefault();
			app.session.delete();
			window.location = '/';
		}
	});






	app.views.HeaderView = HeaderView;
	app.views.LoginView = LoginView;
	app.views.HomepageView = HomepageView;
	app.views.SprintView = SprintView;
})(jQuery,Backbone,_,app);
