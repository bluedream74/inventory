from django.db import models
from product_register.models import Product
from size_register.models import Size
from color_register.models import Color
from slip.order_slip.models import Order, OrderItem
# Create your models here.
class Sale(models.Model):
    no = models.CharField(max_length=30)
    spenden_no = models.CharField(max_length=30)
    slip_date = models.DateField()
    expected_shipping_date = models.DateField()
    arrival_date = models.DateField()
    invoice_date = models.DateField()
    shipping_date  = models.DateField()
    cash_credit = models.CharField(max_length=30, null=True)
    delivery_code = models.CharField(max_length=30)
    storehouse_code = models.CharField(max_length=30)
    global_rate = models.FloatField(default=0)
    charger_code = models.CharField(max_length=30)
    maker_code = models.CharField(max_length=30)
    exhibition_code = models.CharField(max_length=30)
    dealer_code = models.CharField(max_length=30, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)
    status = models.CharField(max_length=10)
    other = models.CharField(max_length=200, null=True)
    update_date = models.DateField(auto_now=True, null=True)


class SaleItem(models.Model):
    row_id = models.CharField(max_length=200, default='', null=True)
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    size = models.ForeignKey(Size, on_delete=models.CASCADE, null=True)
    color = models.ForeignKey(Color, on_delete=models.CASCADE, null=True)
    quantity = models.FloatField(default=0)
    unit = models.CharField(max_length=10)
    rate = models.FloatField(default=0)
    cost = models.FloatField(default=0)
    price = models.FloatField(default=0)
    orderItem = models.ForeignKey(OrderItem, on_delete=models.CASCADE, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    class Meta:
        ordering=['-date_created']