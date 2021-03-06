from django.shortcuts import render
from django.template.loader import render_to_string
from django.views.generic import View
from django.http import (HttpResponse, HttpResponseRedirect)
from models import (User, UserFollowers, Invitation)
from forms import (InvitationForm, RegisterForm)
import hashlib
from django.conf import settings
from django.template import (Context, RequestContext)
from django.core.mail import EmailMultiAlternatives
from django.contrib.auth import logout
# Create your views here.

class UserRedirect(View):
	def get(self, request):
		return HttpResponseRedirect('/tweets/user/' + request.user.username)

class Invite(View):

	@staticmethod
	def generate_invite_code(email):
		secret = settings.SECRET_KEY
		if isinstance(email, unicode):
			email = email.encode('utf-8')
			activation_key = hashlib.sha1(secret + email).hexdigest()
			return activation_key

	def get(self, request):
		params = dict()
		success = request.GET.get('success')
		email = request.GET.get('email')
		invite = InvitationForm()
		params["invite"] = invite
		params["success"] = success
		params["email"] = email
		return render(request, 'invite.html', params)

	def post(self, request):
		form = InvitationForm(request.POST)
		if form.is_valid():
			email = form.cleaned_data['email']
			subject = 'Invitation to join MyTweet App'
			sender_name = request.user.username
			sender_email = request.user.email
			invite_code = Invite.generate_invite_code(email)
			link = 'http://%s/users/invite/accept/%s/' % (settings.SITE_HOST, invite_code)
			context = Context({"sender_name": sender_name, "sender_email": sender_email, "email": email, "link": link})
			invite_email_template = render_to_string('partials/_invite_email_template.html', context)
			msg = EmailMultiAlternatives(subject, invite_email_template,
			settings.EMAIL_HOST_USER, [email], cc=[settings.EMAIL_HOST_USER])
			user = User.objects.get(username=request.user.username)
			invitation = Invitation()
			invitation.email = email
			invitation.code = invite_code
			invitation.sender = user
			invitation.save()
			success = msg.send()
			return HttpResponseRedirect('/users/invite?success='+str(success) +'&email='+email)

class InviteAccept(View):
	def get(self,request,code):
		return HttpResponseRedirect('/users/register?code=' + code)

class Register(View):
	def get(self, request):
		params = dict()
		registration_form = RegisterForm()
		code = request.GET.get('code')
		params['code'] = code
		params['form'] = registration_form
		return render(request, 'registration/register.html', params)

	def post(self,request):
		form = RegisterForm(request.POST)
		params = dict()
		if form.is_valid():
			# username = form.cleaned_data['username']
			# email = form.cleaned_data['email']
			password = form.cleaned_data['email']
			try:
				user = User.objects.get(email = email)
			except:
				form = form.save(commit = False)
				form.set_password(password)
				form.save()
				logout(request.user)
				return HttpResponseRedirect("/login")
		code = request.GET.get('code')
		params['code'] = code
		params['form'] = form
		return render(request, 'registration/register.html', params)


