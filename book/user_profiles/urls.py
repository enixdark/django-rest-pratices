from django.conf.urls import (patterns, include, url)
from django.contrib import admin
from views import (UserRedirect, Invite, InviteAccept, Register)
admin.autodiscover()

urlpatterns = patterns('',
	url(r'^login/$', 'django.contrib.auth.views.login'),
	url(r'^logout/$', 'django.contrib.auth.views.logout'),
	url(r'^profile/$', UserRedirect.as_view()),
	url(r'^invite/$', Invite.as_view()),
	url(r'^invite/accept/(\w+)/$', InviteAccept.as_view()),
	url(r'^register/$', Register.as_view())
)