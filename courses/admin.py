from django.contrib import admin

from courses.models import Categories, Courses

@admin.register(Categories)
class CategoriesAdmin(admin.ModelAdmin):
  prepopulated_fields = {
    'slug' : ('name',)
  }

@admin.register(Courses)
class CoursesAdmin(admin.ModelAdmin):
  prepopulated_fields = {
    'slug' : ('name',)
  }


