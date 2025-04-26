from atexit import register
from django import template

from wishlists.models import Wishlist


register = template.Library()

@register.simple_tag()
def user_wishlists(request):
  return Wishlist.objects.filter(user=request.user)