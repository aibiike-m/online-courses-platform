from django.urls import path
from users import views

app_name = "users"
urlpatterns = [
    path("login/", views.login, name="login"),
    path("registration/", views.registration, name="registration"),
    path("profile/", views.profile, name="profile"),
    path("users-wishlist/", views.users_wishlist, name="users_wishlist"),
    path("profile-settings/", views.profile_settings, name="profile_settings"),
    path("logout/", views.logout, name="logout"),
]
