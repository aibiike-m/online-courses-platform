from django.shortcuts import redirect, render


from courses.models import Courses
from wishlists.models import Wishlist



def wishlist_add(request, course_slug):
    course = Courses.objects.get(slug=course_slug)
    if request.user.is_authenticated:
        if not Wishlist.objects.filter(user=request.user, course=course).exists():
            Wishlist.objects.create(user=request.user, course=course)
    return redirect(request.META['HTTP_REFERER'])
def wishlist_change(requst, course_slug):
  ...
def wishlist_remove(requst, course_slug):
  ...
