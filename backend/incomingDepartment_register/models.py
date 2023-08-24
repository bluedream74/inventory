from django.db import models

class incomingDepartment(models.Model):
    code = models.CharField(max_length=50, default='')
    name = models.CharField(max_length=50, default='')
    phone = models.CharField(max_length=50, default='')
    address = models.CharField(max_length=50, default='')
    due_date = models.CharField( max_length=50, default='')

# Create your models here.
