from django.db import models
class Storehouse(models.Model):
    code = models.CharField(max_length=50, default='')
    name = models.CharField(max_length=50, default='')
    phone = models.CharField(max_length=20, default='')
    address = models.CharField(max_length=200, default='')
# Create your models here.
