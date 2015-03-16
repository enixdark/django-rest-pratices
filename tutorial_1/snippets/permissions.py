from rest_framework import permissions

class IsOwnerOrReadonly(permissions.BasePermission):

	def has_object_permission(self,request,view,obj):

		# import ipdb; ipdb.set_trace()
		if request.method in permissions.SAFE_METHODS:
			return True

		return obj.owner == request.user
