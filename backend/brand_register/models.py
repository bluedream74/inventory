from django.db import models

# Create your models here.
class Brand(models.Model):
    code = models.CharField(max_length=50, default='')
    name = models.CharField(max_length=50, default='')
    name_export = models.CharField(max_length=50, default='')
