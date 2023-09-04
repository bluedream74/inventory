from rest_framework import serializers
from .models import Deposit, DepositItem
from slip.sale_slip.models import Sale, SaleItem
from datetime import date
class DepositSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    class Meta:
        model = Deposit
        fields = (
            'id',
            'no',
            'slip_date',
            'dealer_code',
            'last_invoice_date',
            'last_invoice',
            'expected_date',
            'remain_invoice',
            'other',
            'sale',
            'update_date',
            'items'
        )
    def get_items(self, obj):
        items  = SaleItem.objects.filter(sale=obj.sale).order_by('id')
        return DepositItemSerializer(items, many=True).data

class DepositItemSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    deposit_category = serializers.SerializerMethodField()
    state = serializers.SerializerMethodField()
    deposit_price = serializers.SerializerMethodField()
    deposit_date = serializers.SerializerMethodField()
    other = serializers.SerializerMethodField()
    class Meta:
        model = SaleItem
        fields = (
            'id',
            'deposit_category',
            'deposit_price',
            'deposit_date',
            'other',
            'state'
        )
    def get_id(self, obj):
        return obj.row_id
    def get_deposit_category(self, obj):
        return str(obj.sale.slip_date) + '/' + str(int(obj.product.max_cost) * obj.quantity)
    def get_deposit_price(self, obj):
        deposit_price = int(obj.product.max_cost) * obj.quantity
        if(DepositItem.objects.filter(saleItem=obj.pk)):
            deposit_price = DepositItem.objects.get(saleItem=obj.pk).deposit_price
        return deposit_price
    def get_deposit_date(self, obj):
        deposit_date = date.today().strftime('%Y-%m-%d')
        if(DepositItem.objects.filter(saleItem=obj.pk)):
            deposit_date = DepositItem.objects.get(saleItem=obj.pk).deposit_date
        return deposit_date
    def get_other(self, obj):
        other = ''
        if(DepositItem.objects.filter(saleItem=obj.pk)):
            other = DepositItem.objects.get(saleItem=obj.pk).other
        return other
    def get_state(self, obj):
        state = 'edit'
        if(DepositItem.objects.filter(saleItem=obj.pk)):
            state = 'save'
        return state