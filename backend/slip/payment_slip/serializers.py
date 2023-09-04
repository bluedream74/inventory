from rest_framework import serializers
from .models import Payment, PaymentItem
from slip.purchase_slip.models import PurchaseItem
from datetime import datetime, date
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
            'purchase',
            'other',
            'update_date',
            'items'
        )
    def get_items(self, obj):
        items  = PurchaseItem.objects.filter(purchase=obj.purchase).order_by('id')
        return PaymentItemSerializer(items, many=True).data

class PaymentItemSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    payment_category = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    payment_price = serializers.SerializerMethodField()
    payment_date = serializers.SerializerMethodField()
    other = serializers.SerializerMethodField()
    class Meta:
        model = PurchaseItem
        fields = (
            'id',
            'payment_category',
            'payment_price',
            'payment_date',
            'other',
            'status'
        )
    def get_id(self, obj):
        return obj.row_id
    def get_payment_category(self, obj):
        return str(obj.purchase.slip_date) + '/' + str(int(obj.product.max_cost) * obj.quantity)
    def get_payment_price(self, obj):
        payment_price = int(obj.product.max_cost) * obj.quantity
        if(PaymentItem.objects.filter(purchaseItem=obj.pk)):
            payment_price = PaymentItem.objects.get(purchaseItem=obj.pk).payment_price
        return payment_price
    def get_payment_date(self, obj):
        payment_date = date.today().strftime('%Y-%m-%d')
        if(PaymentItem.objects.filter(purchaseItem=obj.pk)):
            payment_date = PaymentItem.objects.get(purchaseItem=obj.pk).payment_date
        return payment_date
    def get_other(self, obj):
        other = ''
        if(PaymentItem.objects.filter(purchaseItem=obj.pk)):
            other = PaymentItem.objects.get(purchaseItem=obj.pk).other
        return other
    def get_status(self, obj):
        status = 'edit'
        if(PaymentItem.objects.filter(purchaseItem=obj.pk)):
            status = 'save'
        return status