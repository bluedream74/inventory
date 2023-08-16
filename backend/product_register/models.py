from django.db import models
import os
import datetime
from django.conf import settings
# Create your models here.
def generate_custom_filename(instance, filename):
    current_datetime = datetime.datetime.now()
    filename = f"image_{current_datetime.strftime('%Y%m%d_%H%M%S')}.jpg"
    return os.path.join(settings.PRODUCT_ROOT, filename)

class Product(models.Model):
    image_url = models.ImageField(upload_to=generate_custom_filename, null=True)
    image_mode = models.CharField(max_length=50)
    code = models.CharField(max_length=100)
    part_number = models.CharField(max_length=100)
    name =models.CharField(max_length=100)
    ancient_time = models.CharField(max_length=50)
    price = models.FloatField()

    def __str__(self) -> str:
        return self
    


