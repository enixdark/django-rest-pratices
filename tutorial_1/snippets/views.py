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


class SnippetList(generics.ListCreateAPIView):

	quereset = Snippet.objects.all()
	serializer_class = SnippetSerializer



class SnippetDetail(generics.RetrieveUpdateDestroyAPIView):

	queryset = Snippet.objects.all()
	serializer_class = SnippetSerializer




