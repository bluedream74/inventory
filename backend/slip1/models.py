from django.db import models

# Create your models here.
class OrderSlip(models.Model):
    STATUS_CHOICES = (
        ('発注済み', '発注済み'),
        ('売上転送済み', '売上転送済み'),
        ('取置転送済み', '取置転送済み'),
    )

    no = models.CharField(max_length=30)
    slip_date = models.DateField()
    delivery_date = models.DateField()
    shopping_date = models.DateField()
    delivery_place_code = models.CharField(max_length=30)
    storehouse_code = models.CharField(max_length=30)
    global_rate = models.FloatField(default=0)
    charger_code = models.CharField(max_length=30)
    receiver_code = models.CharField(max_length=30)
    exhibition_code = models.CharField(max_length=30)
    status = models.CharField(choices=STATUS_CHOICES, max_length=10)
    product_code = models.CharField(max_length=30)
    product_name = models.CharField(max_length=30)
    product_part_number = models.CharField(max_length=30)
    size_code = models.CharField(max_length=30)
    color_code = models.CharField(max_length=30)
    quantity = models.FloatField(default=0)
    unit = models.CharField(max_length=10)
    rate = models.FloatField(default=0)
    max_cost = models.FloatField(default=0)
    max_price = models.FloatField(default=0)
    min_cost = models.FloatField(default=0)
    min_price = models.FloatField(default=0)
    cost = models.FloatField(default=0)
    price = models.FloatField(default=0)
    profit = models.FloatField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    class Meta:
        ordering=['-date_created']


  