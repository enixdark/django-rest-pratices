from django import forms
from models import User
class InvitationForm(forms.Form):
	email = forms.CharField(widget=forms.TextInput(attrs={'size': 32, 
		'placeholder': 'Email Address of Friend to invite.',
		'class':'form-control search-query'}))

class RegisterForm(forms.ModelForm):
	password = forms.CharField(widget=forms.PasswordInput(attrs={'size': 32, 
		'placeholder': 'Password',
		'class':'form-control'}))

	class Meta:
		model = User
		fields = ('username','email')
        # error_messages = {
        #     NON_FIELD_ERRORS: {
        #         'unique_together': "%(User)s's %(email)s are not unique.",
        #     }
        # }
	# username = forms.CharField(widget=forms.TextInput(attrs={'size': 32, 
	# 	'placeholder': 'Username',
	# 	'class':'form-control'}))
	# email = forms.CharField(widget=forms.TextInput(attrs={'size': 32, 
	# 	'placeholder': 'Email',
	# 	'class':'form-control'}))
	
