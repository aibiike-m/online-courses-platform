from django.urls import path
from wishlists import views

app_name = "wishlists"
urlpatterns = [
    path("wishlist_add/<slug:course_slug>/", views.wishlist_add, name="wishlist_add"),
    path("wishlist_change/<slug:course_slug>/",views.wishlist_change,name="wishlist_change",
    ),
    path("wishlist_remove/<int:wishlist_id>/",views.wishlist_remove,name="wishlist_remove",),
    path("wishlist_remove_selected/", views.wishlist_remove_selected, name="wishlist_remove_selected"),

]
