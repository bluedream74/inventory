from django.db import models

class Factory(models.Model):
    code = models.CharField(max_length=50, default='')
    name = models.CharField(max_length=50, default='')
    tel = models.CharField(max_length=50, default='', null=True)
    phone = models.CharField(max_length=50, default='', null=True)
# Create your models here.
