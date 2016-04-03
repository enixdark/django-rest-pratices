from django.shortcuts import (render, redirect)
from django.template.loader import render_to_string
from django.http import (HttpResponse, HttpResponseRedirect)
from django.views.generic import View
from user_profiles.models import User
from models import (Tweet, HashTag)
from forms import (TweetForm, SearchForm)
from django.template import (Context, RequestContext)
import json

class Index(View):
	def get(self, request):
		params = {}
		params['name'] = "Django"
		return render(request, 'base.html', params)

	def post(self,request):
		return HttpResponse("I am called post")



class Profile(View):
	def get(self, request, username):
		params = dict()
		user = User.objects.get(username = username)
		tweets = Tweet.objects.filter(user = user)
		params['tweets'] = tweets
		params['user'] = user
		params['form'] = TweetForm()
		return render(request, 'profile.html', params)

class PostTweet(View):
	def post(self, request, username):
		form = TweetForm(self.request.POST)
		if form.is_valid():
			user = User.objects.get(username = username)
			tweet = Tweet(text = form.cleaned_data['text'], user = user,
				country = "Vietname" )#form.cleaned_data['country'])
			tweet.save()
			words = form.cleaned_data['text'].split(" ")
			for word in words:
				hashtag, created = HashTag.objects.get_or_create(name = word[1:])
				hashtag.tweet.add(tweet)
			return HttpResponseRedirect('/tweets/user/%s' % username)
		return redirect(Profile.as_view())

class HashTagCloud(View):

	def get(self, request, hashTag):
		params = dict()
		hashtag = HashTag.objects.get(name = hashTag)
		params['tweets'] = hashTag.tweet
		return render(request, 'hashtag.html', params)

class Search(View):

	def post(self, request):
		form = SearchForm(request.POST)
		import ipdb; ipdb.set_trace()
		if form.is_valid():
			query = form.cleaned_data['query']
			tweets = Tweet.objects.filter(text__icontains = query)
			context = Context({"query": query, "tweets": tweets})
			return_str = render_to_string('partials/_tweet_search.html',context)
			return HttpResponse(json.dumps(return_str), content_type = "application/json")
		else:
			return HttpResponseRedirect("/tweets/search")

	def get(self,request):
		form = SearchForm()
		params = dict()
		params["search"] = form
		return render(request,'search.html',RequestContext(request, params))