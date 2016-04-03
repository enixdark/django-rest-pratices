from django.conf.urls import (patterns, include, url)
from django.contrib import admin
from views import (UserRedirect)
admin.autodiscover()

urlpatterns = patterns('',
	url(r'^login/$', 'django.contrib.auth.views.login'),
	url(r'^logout/$', 'django.contrib.auth.views.logout'),
	url(r'^profile/$', UserRedirect.as_view()),
)