from django.db import models

# Create your models here.
class Purchase(models.Model):
    no = models.CharField(max_length=30)
    slip_date = models.DateField()
    delivery_date = models.DateField()
    crash_credit = models.CharField(max_length=30)
    cost_category = models.CharField(max_length=30)
    factory_code = models.CharField(max_length=30)
    storehouse_code = models.CharField(max_length=30)
    charger_code = models.CharField(max_length=30)
    purchaseorder_no = models.CharField(max_length=20, null=True)
    other = models.CharField(max_length=200, null=True)
    update_date = models.DateField(auto_now=True, null=True)


class PurchaseItem(models.Model):
    row_id = models.CharField(max_length=200, default='', null=True)
    purchase = models.ForeignKey(Purchase, on_delete=models.CASCADE, null=True)
    product_code = models.CharField(max_length=30)
    product_name = models.CharField(max_length=30)
    product_part_number = models.CharField(max_length=30)
    size_code = models.CharField(max_length=30)
    color_code = models.CharField(max_length=30)
    quantity = models.FloatField(default=0)
    unit = models.CharField(max_length=10)
    max_cost = models.FloatField(default=0)
    min_cost = models.FloatField(default=0)
    max_price = models.FloatField(default=0)
    min_price = models.FloatField(default=0)
    other = models.CharField(max_length=200)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    class Meta:
        ordering=['-date_created']