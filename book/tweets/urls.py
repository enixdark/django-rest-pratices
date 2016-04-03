from django.conf.urls import (patterns, include, url)
from django.contrib import admin
from views import (Index, Profile, PostTweet, Search, HashTagCloud)

admin.autodiscover()

urlpatterns = patterns('',
	url(r'^$',Index.as_view()),
	url(r'^user/(\w+)/$', Profile.as_view()),
	url(r'^user/(\w+)/post/$', PostTweet.as_view()),
	url(r'^hashTag/(\w+)/$', HashTagCloud.as_view()),
	url(r'^search/$', Search.as_view())
)