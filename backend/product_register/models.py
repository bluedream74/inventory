from django.db import models

# Create your models here.
class Product(models.Model):
    image_url = models.CharField(max_length=250)
    image_mode = models.CharField(max_length=50)
    code = models.CharField(max_length=100)
    part_number = models.CharField(max_length=100)
    name =models.CharField(max_length=100)
    ancient_time = models.CharField(max_length=50)
    price = models.FloatField()

    def __str__(self) -> str:
        return self.name
    


