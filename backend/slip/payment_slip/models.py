from django.db import models

# Create your models here.
class Payment(models.Model):
    no = models.CharField(max_length=30)
    slip_date = models.DateField()
    supplier_code = models.CharField(max_length=30)
    last_payment_date = models.DateField(max_length=30)
    last_payment = models.CharField(max_length=30)
    expected_date = models.DateField()
    remain_payment = models.CharField(max_length=30)
    purchase_no = models.CharField(max_length=20, null=True)
    other = models.CharField(max_length=200)
    update_date = models.DateField(auto_now=True, null=True)


class PaymentItem(models.Model):
    row_id = models.CharField(max_length=200, default='', null=True)
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, null=True)
    payment_category = models.CharField(max_length=30)
    payment_price = models.CharField(max_length=30)
    payment_date = models.DateField()
    other = models.CharField(max_length=200)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    class Meta:
        ordering=['-date_created']