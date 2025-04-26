from django.db import models

from courses.models import Courses
from users.models import User

class WishlistQuerySet(models.QuerySet):
  def total_price(self):
    return sum(wishlist.course.sell_price() for wishlist in self)

class Wishlist(models.Model):
  user = models.ForeignKey(to=User, on_delete=models.CASCADE)
  course = models.ForeignKey(to=Courses, on_delete=models.CASCADE)
  session_key = models.CharField(max_length=32, null=True, blank=True)
  created_timestamp = models.DateTimeField(auto_now_add=True)

  class Meta:
    db_table = 'wishlist'

  objects = WishlistQuerySet().as_manager()

  def __str__(self):
    return f'Wishlist {self.user.username} | Course {self.course.name}'
  
  