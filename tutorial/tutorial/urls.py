from django.conf.urls import patterns, include, url
from django.contrib import admin
from quickstart.urls import router

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'tutorial.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    # url(r'^admin/', include(admin.site.urls)),
    url('^',include(router.urls)),
    url('^api-auth$',include('rest_framework.urls',namespace='rest_framework'))
)
