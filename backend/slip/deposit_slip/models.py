from django.db import models

# Create your models here.
class Deposit(models.Model):
    no = models.CharField(max_length=30)
    slip_date = models.DateField()
    dealer_code = models.CharField(max_length=30)
    last_invoice_date = models.DateField(max_length=30)
    last_invoice = models.CharField(max_length=30)
    expected_date = models.DateField()
    remain_invoice = models.CharField(max_length=30)
    other = models.CharField(max_length=200)
    update_date = models.DateField(auto_now=True, null=True)


class DepositItem(models.Model):
    row_id = models.CharField(max_length=200, default='', null=True)
    deposit = models.ForeignKey(Deposit, on_delete=models.CASCADE, null=True)
    deposit_category = models.CharField(max_length=30)
    deposit_price = models.CharField(max_length=30)
    deposit_date = models.DateField()
    other = models.CharField(max_length=200)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    class Meta:
        ordering=['-date_created']