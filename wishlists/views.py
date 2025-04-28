from django.http import JsonResponse
from django.shortcuts import redirect, render


from courses.models import Courses
from wishlists.models import Wishlist


def wishlist_add(request, course_slug):
    course = Courses.objects.get(slug=course_slug)
    if request.user.is_authenticated:
        if not Wishlist.objects.filter(user=request.user, course=course).exists():
            Wishlist.objects.create(user=request.user, course=course)
    return redirect(request.META['HTTP_REFERER'])
def wishlist_change(request, course_slug):
  ...
def wishlist_remove(request, wishlist_id):
    wishlist = Wishlist.objects.get(id=wishlist_id)
    wishlist.delete()
    return redirect(request.META["HTTP_REFERER"])


def wishlist_remove_selected(request):
    if request.method == "POST":
        wishlist_ids = request.POST.getlist("wishlist_ids")
        Wishlist.objects.filter(id__in=wishlist_ids, user=request.user).delete()
        return JsonResponse({"success": True})
    return JsonResponse({"success": False}, status=400)
