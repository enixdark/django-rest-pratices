
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
		}

	});

	var HomepageView = TemplateView.extend({
		templateName:'#home-template',
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
	})
	app.views.HeaderView = HeaderView;
	app.views.LoginView = LoginView;
	app.views.HomepageView = HomepageView;
})(jQuery,Backbone,_,app);
