from django.db import models
from django.contrib.auth.models import AbstractUser
from regex import T

class User(AbstractUser):
  image= models.ImageField(upload_to='users__images', blank=True, null=True)
  