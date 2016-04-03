from django.shortcuts import (render, redirect)
from django.template.loader import render_to_string
from django.http import (HttpResponse, HttpResponseRedirect)
from django.views.generic import View
from user_profiles.models import (User, UserFollowers)
from models import (Tweet, HashTag)
from forms import (TweetForm, SearchForm)
from django.template import (Context, RequestContext)
import json
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.paginator import Paginator

class Index(View):
	def get(self, request):
		params = {}
		params['name'] = "Django"
		return render(request, 'base.html', params)
	def post(self,request):
		return HttpResponse("I am called post")

class UserProfile(LoginRequiredMixin, View):
	# login_url = '/login/'
    # redirect_field_name = 'redirect_to'
	def get(self, request, username):
		params = dict()
		user = User.objects.get(username = username)
		form = TweetForm(initial = {'country': 'Vietname'})
		tweets = Tweet.objects.filter(user = user).order_by('-created_date')
		params['tweets'] = tweets
		params['profile'] = user
		params['form'] = form
		return render(request, 'user_profile.html', params)

class Profile(LoginRequiredMixin, View):
	# login_url = '/login/'
    # redirect_field_name = 'redirect_to'
	def get(self, request, username):
		params = dict()
		user = User.objects.get(username = username)
		# import ipdb; ipdb.set_trace()
		if user.id == request.user.id:
			return HttpResponseRedirect('/users/profile')
		try:
			user_follower = UserFollowers.objects.get(user = user)
		except:
			user_follower = None
		if user_follower and user_follower.followers.filter(username = request.user.username).exists():
			params['following'] = True
		else:
			params['following'] = False
		form = TweetForm(initial = {'country': 'Vietname'})
		search_form = SearchForm()
		tweets = Tweet.objects.filter(user = user).order_by('-created_date')
		
		paginator = Paginator(tweets, TWEET_PER_PAGE)
		page = request.GET.get('page')
		try:
			tweets = paginator.page(page)
		except PageNotAnInteger:
			tweets = paginator.page(1)
		except EmptyPage:
			tweets = paginator.page(paginator.num_pages)
		params['tweets'] = tweets
		params['profile'] = user
		params['search'] = search_form
		params['form'] = form
		return render(request, 'other_profile.html', params)

	def post(self, request, username):
		follow = request.POST['follow']
		user = User.objects.get(username = request.user.username)
		user_profile = User.objects.get(username = username)
		user_follower, status = UserFollowers.objects.get_or_create(user = user_profile)
		if follow == 'true':
			user_follower.followers.add(user)
		else:
			user_follower.followers.remove(user)
		return HttpResponse(json.dumps(""), content_type = "application/json")

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

class MostFollowedUser(View):
	def get(self, request):
		user_followers = UserFollowers.objects.order_by("-count")
		params = dict()
		params['user_followers'] = user_followers
		return render(request, 'users.html', params)