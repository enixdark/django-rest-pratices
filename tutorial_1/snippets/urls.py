from django.conf.urls import url
from snippets import views
from rest_framework.urlpatterns import format_suffix_patterns
urlpatterns = [
    url(r'^snippets/$', views.SnippetList.as_view(),name='SnippetList'),
    url(r'^snippets/(?P<pk>[0-9]+)/$', views.SnippetDetail.as_view(),name='SnippetDetail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
