from django.shortcuts import render
from django.views.generic import View
from django.http import (HttpResponse, HttpResponseRedirect)
from models import (User, UserFollowers)
# Create your views here.

class UserRedirect(View):
	def get(self, request):
		return HttpResponseRedirect('/tweets/user/' + request.user.username)

