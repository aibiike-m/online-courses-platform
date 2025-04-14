from django.db import models

class Categories(models.Model):
  name = models.CharField(max_length=150, unique=True)
  slug = models.SlugField(max_length=200, unique=True, blank=True, null=True)

  class Meta:
    db_table = 'category'

  def __str__(self):
     return self.name

class Courses(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True) 
    image = models.ImageField(upload_to='courses_images', blank=True, null=True)
    # mentor = models.ForeignKey('users.User', on_delete=models.CASCADE)
    mentor = models.CharField(max_length=80, blank=True, null=True)
    # description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(default=0.00, max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    is_popular = models.BooleanField(default=False)
    category = models.ForeignKey(to=Categories, on_delete=models.CASCADE)

    class Meta:
        db_table = "course"
        # ordering = ('id',)

    def __str__(self):
        return self.name

    def sell_price(self):
        if self.discount and 0 < self.discount <= 100:
            price = float(self.price) if not isinstance(self.price, (int, float)) else self.price
            return round (price - (price * float(self.discount) / 100, 2))
        return self.price

    @property
    def formatted_price(self):
        try:
            price = float(self.price)
            return f"${price:.2f}"
        except (TypeError, ValueError):
            return "$0.00"

    @property
    def formatted_sell_price(self):
        try:
            sell_price = float(self.sell_price)
            return f"${sell_price:.2f}"
        except (TypeError, ValueError):
            return "$0.00"


# class Course(models.Model):
#     title = models.CharField(max_length=200)
#     mentor = models.ForeignKey('users.User', on_delete=models.CASCADE)
#     description = models.TextField()
#     price = models.DecimalField(max_digits=10, decimal_places=2)
#     created_at = models.DateTimeField(auto_now_add=True)
#     is_popular = models.BooleanField(default=False)

# class Module(models.Model):
#     course = models.ForeignKey(Course, on_delete=models.CASCADE)
#     title = models.CharField(max_length=100)
#     order = models.PositiveIntegerField()

# class Review(models.Model):
#     course = models.ForeignKey(Course, on_delete=models.CASCADE)
#     user = models.ForeignKey('users.User', on_delete=models.CASCADE)
#     rating = models.PositiveIntegerField()
#     text = models.TextField()
