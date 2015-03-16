from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework.routers import DefaultRouter

from snippets.urls import router


urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'tutorial_1.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^admin/', include(admin.site.urls)),

    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls',namespace='rest_framework')),

)
