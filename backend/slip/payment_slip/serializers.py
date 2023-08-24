from rest_framework import serializers
from .models import Payment, PaymentItem
from datetime import datetime
class PaymentSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    class Meta:
        model = Payment
        fields = (
            'id',
            'no',
            'slip_date',
            'supplier_code',
            'last_payment_date',
            'last_payment',
            'expected_date',
            'remain_payment',
            'other',
            'update_date',
            'items'
        )
    def get_items(self, obj):
        items  = PaymentItem.objects.filter(payment=obj).order_by('-id')
        return PaymentItemSerializer(items, many=True).data

class PaymentItemSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    class Meta:
        model = PaymentItem
        fields = (
            'id',
            'payment_category',
            'payment_price',
            'payment_date',
            'other'
        )
    def get_id(self, obj):
        return obj.row_id