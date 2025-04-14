from re import search
from tkinter import N
from django.core.paginator import Paginator
from django.shortcuts import get_list_or_404, render

from courses.utils import q_search
from .models import Categories, Courses

def catalog(request, category_slug=None):

    page = request.GET.get('page', 1)
    ratings = ratings = request.GET.getlist("rating")
    duration = request.GET.get('duriation')
    categories_filter = request.GET.get('category')
    query = request.GET.get('q') 


    if category_slug == 'all-categories':
        courses_list = Courses.objects.all()
    elif query:
        courses_list = q_search(query)
    else:
        courses_list = get_list_or_404(Courses.objects.filter(category__slug=category_slug))

    if ratings:
        courses = courses.filter(rating__in=ratings)

    if categories_filter:
        courses = courses.filter(category__slug__in=categories_filter)

    paginator = Paginator(courses_list, 2)
    current_page = paginator.page(int(page))

    context = {
        "title": "All courses",
        "courses": current_page,
        "slug_url": category_slug,
        "current_filters": request.GET,
        "categories": Categories.objects.all(),
    }
    return render(request, "courses/catalog.html", context)


def course(request, course_slug):
    course = Courses.objects.get(slug=course_slug)
    context = {
        'course' : course,
    }
    return render(request, "courses/course.html", context)
