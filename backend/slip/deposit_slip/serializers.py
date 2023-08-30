from rest_framework import serializers
from .models import Deposit, DepositItem
from datetime import datetime
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
            'sale_no',
            'update_date',
            'items'
        )
    def get_items(self, obj):
        items  = DepositItem.objects.filter(deposit=obj).order_by('-id')
        return DepositItemSerializer(items, many=True).data

class DepositItemSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    class Meta:
        model = DepositItem
        fields = (
            'id',
            'deposit_category',
            'deposit_price',
            'deposit_date',
            'other'
        )
    def get_id(self, obj):
        return obj.row_id