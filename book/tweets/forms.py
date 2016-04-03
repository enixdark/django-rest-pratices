from django import forms

class TweetForm(forms.Form):
	text = forms.CharField(widget=forms.Textarea(attrs={'rows': 1, 'cols': 85,
		'class':'form-control', 'placeholder': 'Post a new Tweet'}), max_length=160)
	country = forms.CharField(widget = forms.HiddenInput(attrs={'value':'Vietname'}),initial = "Vietnam")

class SearchForm(forms.Form):
	query = forms.CharField(label = 'Enter a keyword to search for.', widget = forms.TextInput(
		attrs = {'size': 32, 'class':'form-control'}))
