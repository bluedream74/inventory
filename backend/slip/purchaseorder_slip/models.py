from django.db import models
from product_register.models import Product
from size_register.models import Size
from color_register.models import Color
# Create your models here.
class Purchaseorder(models.Model):
    no = models.CharField(max_length=30)
    slip_date = models.DateField()
    delivery_date = models.DateField()
    cost_category = models.CharField(max_length=30)
    factory_code = models.CharField(max_length=30)
    storehouse_code = models.CharField(max_length=30)
    charger_code = models.CharField(max_length=30)
    status = models.CharField(max_length=10)
    other = models.CharField(max_length=200, null=True)
    update_date = models.DateField(auto_now=True, null=True)


class PurchaseorderItem(models.Model):
    row_id = models.CharField(max_length=200, default='', null=True)
    purchaseorder = models.ForeignKey(Purchaseorder, on_delete=models.CASCADE, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    size = models.ForeignKey(Size, on_delete=models.CASCADE, null=True)
    color = models.ForeignKey(Color, on_delete=models.CASCADE, null=True)
    quantity = models.FloatField(default=0)
    unit = models.CharField(max_length=10)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    class Meta:
        ordering=['-date_created']