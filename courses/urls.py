from django.urls import path
from courses import views
app_name = 'courses'
urlpatterns = [
    path('search/', views.catalog, name='search'),
    path('<slug:category_slug>/', views.catalog, name='index'),
    path('course/<slug:course_slug>/', views.course, name='course'),
]