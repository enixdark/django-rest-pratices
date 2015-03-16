from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from django.views.generic import View
class JSONResponse(HttpResponse):
	def __init__(self,data,**kwargs):
		content = JSONRenderer().render(data)
		kwargs['content_type'] = 'application/json'
		super(JSONResponse,self).__init__(content,**kwargs)


class SnippetList(View):
	def get(self,request):
		snippets = Snippet.objects.all()
		serializer = SnippetSerializer(snippets,many=True)
		return JSONResponse(serializer.data)

	@csrf_exempt
	def post(self,request):
		data = JSONParser().parse(request)
		serializer = SnippetSerializer(data=data)
		if serializer.is_valid():
			serializer.save()
			return JSONResponse(serializer.data,status=201)
		return JSONResponse(serializer.errors,status=400)


class SnippetDetail(View):
	def get(self,request,pk):
		try:
			snippet = Snippet.objects.get(pk=pk)
		except Snippet.DoesNotExits:
			return HttpResponse(status=404)
		serializer = SnippetSerializer(snippet)
		return JSONResponse(serializer.data)

	@csrf_exempt
	def put(self,request,pk):
		try:
			snippet = Snippet.objects.get(pk=pk)
		except Snippet.DoesNotExits:
			return HttpResponse(status=404)

		data = JSONParser().parse(request)
		serializer.SnippetSerializer(snippet,data=data)
		if serializer.is_valid():
			serializer.save()
			return JSONResponse(serializer.data)
		return JSONResponse(serializer.errors,status=400)

	@csrf_exempt
	def delete(self,request,pk):
		try:
			snippet = Snippet.objects.get(pk=pk)
		except Snippet.DoesNotExits:
			return HttpResponse(status=404)
		snippet.delete()
		return HttpResponse(status=204)

