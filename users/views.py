from django.contrib.auth.decorators import login_required
from django.contrib import auth, messages
from django.http import HttpResponseRedirect
from django.shortcuts import redirect, render
from django.template import context
from django.urls import reverse


from users.forms import ProfileForm, UserLoginForm, UserRegistrationForm
from wishlists.models import Wishlist

def login(request):
    if request.method == 'POST':
        form = UserLoginForm(data=request.POST)
        if form.is_valid():
            username = request.POST["username"]
            password = request.POST["password"]
            user = auth.authenticate(username=username, password=password)
            if user:
                auth.login(request, user)
                messages.success(request, "You have successfully logged into your account.")

                redirect_page = request.POST.get("next", None)
                if redirect_page and redirect_page != reverse("user:logout"):
                    return HttpResponseRedirect(request.POST.get('next'))
                return HttpResponseRedirect(reverse("main:index"))

    else:
        form = UserLoginForm()
    context = {
        'title': 'Authorization',
        'form' : form,
    }
    return render(request, 'users/login.html', context)

def registration(request):
    if request.method == 'POST':
        form = UserRegistrationForm(data=request.POST)
        if form.is_valid():
            form.save()
            user = form.instance
            auth.login(request, user)
            messages.success(request, "You have successfully registered and logged into your account.")
            return HttpResponseRedirect(reverse('main:index'))

    else:
        form = UserRegistrationForm()
    context = {
    'title': 'Registration',
    'form': form,
    }
    return render(request, 'users/registration.html', context)


@login_required
def profile(request):
    active_tab = request.GET.get("tab", "courses")
    if active_tab not in ["courses", "wishlist", "certificates"]:
        active_tab = "courses"  

    context = {
        "active_tab": active_tab,
    }

    if active_tab == "wishlist":
        context["wishlists"] = Wishlist.objects.filter(
            user=request.user
        ).select_related("course")

    return render(request, "users/profile.html", context)


@login_required
def profile_settings(request):
    if request.method == "POST":
        form = ProfileForm(data=request.POST, instance=request.user, files=request.FILES)
        if form.is_valid():
            form.save()
            messages.success(
                request,
                "You have successfully changed your profile details.",
            )
            if request.POST.get('next', None):
                return HttpResponseRedirect(request.POST.get('next'))
            return HttpResponseRedirect(reverse('user:profile_settings'))

    else:
        form = ProfileForm(instance=request.user)

    context = {
        'title': 'Profile settings',
        'form': form,
    }

    return render(request, "users/profile-settings.html", context)


def users_wishlist(request):
    wishlists = Wishlist.objects.filter(user=request.user)
    context = {
        "active_tab": "wishlist",  
        "wishlists": wishlists,
    }
    return render(
        request,
        "users/users-wishlist.html",
        context
    )


@login_required
def logout(request):
    messages.success(request, "You have logged out of your account.")

    auth.logout(request)
    return redirect(reverse('main:index'))
