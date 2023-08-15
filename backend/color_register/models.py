from django.db import models

class Color(models.Model):
    code = models.CharField(max_length=50, default='')
    name = models.CharField(max_length=50, default='')
# Create your models here.
