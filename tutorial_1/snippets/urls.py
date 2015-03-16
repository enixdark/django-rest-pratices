from django.conf.urls import url
from snippets import views

urlpatterns = [
    url(r'^snippets/$', views.SnippetList.as_view(),name='SnippetList'),
    url(r'^snippets/(?P<pk>[0-9]+)/$', views.SnippetDetail.as_view(),name='SnippetDetail'),
]
