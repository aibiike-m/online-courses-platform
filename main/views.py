from django.shortcuts import render
from courses.models import Categories

def index(request):
  context = {
    'title' : 'Home',
  }
  return render(request, 'main/index.html', context)

