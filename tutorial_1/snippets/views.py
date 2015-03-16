from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from rest_framework import mixins,generics
# from django.views.generic import View
class JSONResponse(HttpResponse):
	def __init__(self,data,**kwargs):
		content = JSONRenderer().render(data)
		kwargs['content_type'] = 'application/json'
		super(JSONResponse,self).__init__(content,**kwargs)


class SnippetList(mixins.ListModelMixin,mixins.CreateModelMixin,
					generics.GenericAPIView):

	quereset = Snippet.objects.all()
	serializer_class = SnippetSerializer

	def get(self,request,*args,**kwargs):

		return self.list(request,*args,**kwargs)

	def post(self,request,*args,**kwargs):
		return self.create(request,*args,**kwargs)

class SnippetDetail(mixins.RetrieveModelMixin,
					mixins.UpdateModelMixin,
					mixins.DestroyModelMixin,
					generics.GenericAPIView):

	queryset = Snippet.objects.all()
	serializer_class = SnippetSerializer


	def get(self,request,*args,**kwargs):
		return self.retrieve(request,*args,**kwargs)

	def put(self,request,pk,format=None):
		return self.update(request,*args,**kwargs)

	def delete(self,request,pk):
		return self.destroy(request,*args,**kwargs)

