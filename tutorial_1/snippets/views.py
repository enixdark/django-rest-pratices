from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer,UserSerializer
from rest_framework import mixins,generics
from django.contrib.auth.models import User
from rest_framework import permissions
from .permissions import IsOwnerOrReadonly
# from django.views.generic import View
# class JSONResponse(HttpResponse):
# 	def __init__(self,data,**kwargs):
# 		content = JSONRenderer().render(data)
# 		kwargs['content_type'] = 'application/json'
# 		super(JSONResponse,self).__init__(content,**kwargs)


class SnippetList(generics.ListCreateAPIView):

	queryset = Snippet.objects.all()
	serializer_class = SnippetSerializer

	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
	def perform_create(self,serializer):
		serializer.save(owner=self.request.user)



class SnippetDetail(generics.RetrieveUpdateDestroyAPIView):
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadonly,)
	queryset = Snippet.objects.all()
	serializer_class = SnippetSerializer

class UserList(generics.ListAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer
