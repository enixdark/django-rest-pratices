import os
import json
from django.conf import settings
from django.http import Http404
from django.shortcuts import render
from django.template import Template,Context
from django.utils._os import safe_join
from django.template.loader_tags import BlockNode
def get_page_or_404(name):
	"""return page content"""
	try:
		file_path = safe_join(settings.SITE_PAGES_DIRECTORY,name)
	except ValueError:
		raise Http404("Page not Found")
	else:
		print file_path
		if not os.path.exists(file_path):
			raise Http404("Page not Exits")
	with open(file_path,'r') as f:
		page = Template(f.read())
	meta = None

	for i,node in enumerate(list(page.nodelist)):
		if isinstance(node,BlockNode) and node.name == 'context':
			meta = page.nodelist.pop(i)
			break
	page._meta = meta
	return page


def page(request,slug="index"):
	"""Render the request page"""
	file_name = '{}.html'.format(slug)
	page = get_page_or_404(file_name)
	# page =""
	# import ipdb; ipdb.set_trace()
	context = {
		'slug':slug,
		'page':page,
	}
	if page._meta is not None:
		meta = page._meta.render(Context())
		extra_meta = json.loads(meta)
		context.update(extra_meta)
	return render(request,"page.html",context)


