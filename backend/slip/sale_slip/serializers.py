from rest_framework import serializers
from .models import Sale, SaleItem
from slip.order_slip.models import Order, OrderItem
class SaleSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    class Meta:
        model = Sale
        fields = (
            'id',
            'no',
            'spenden_no',
            'slip_date',
            'expected_shipping_date',
            'arrival_date',
            'invoice_date',
            'shipping_date',
            'cash_credit',
            'delivery_code',
            'storehouse_code',
            'global_rate',
            'charger_code',
            'maker_code',
            'exhibition_code',
            'dealer_code',  
            'status',
            'order',
            'other',
            'update_date',
            'items'
        )
    def get_items(self, obj):
        items  = OrderItem.objects.filter(order=obj.order).order_by('id')
        return SaleItemSerializer(items, many=True).data

class SaleItemSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    product_name = serializers.SerializerMethodField()
    max_cost = serializers.SerializerMethodField()
    min_cost = serializers.SerializerMethodField()
    max_price = serializers.SerializerMethodField()
    min_price = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    quantity = serializers.SerializerMethodField()
    
    class Meta:
        model = OrderItem
        fields = (
            'id',
            'product',
            'product_name',
            'size',
            'color',
            'quantity',
            'unit',
            'rate',
            'max_cost',
            'max_price',
            'min_cost',
            'min_price',
            'cost',
            'price',
            'status'
        )
    def get_id(self, obj):
        return obj.row_id
    def get_product_name(self, obj):
        return obj.product.name
    
    def get_max_cost(self, obj):
        return int(obj.product.max_cost) 
    
    def get_min_cost(self, obj):
        return obj.product.min_cost
    
    def get_max_price(self, obj):
        quantity = obj.quantity
        if(SaleItem.objects.filter(orderItem=obj.pk)):
            quantity = SaleItem.objects.get(orderItem=obj.pk).quantity
        return int(obj.product.max_cost) * quantity
    
    def get_min_price(self, obj):
        quantity = obj.quantity
        if(SaleItem.objects.filter(orderItem=obj.pk)):
            quantity = SaleItem.objects.get(orderItem=obj.pk).quantity
        return obj.product.min_cost * quantity  
    
    def get_status(self, obj):
        status = 'edit'
        if(SaleItem.objects.filter(orderItem=obj.pk)):
            status = 'save'
        return status
    def get_quantity(self, obj):
        quantity = obj.quantity
        if(SaleItem.objects.filter(orderItem=obj.pk)):
            quantity = SaleItem.objects.get(orderItem=obj.pk).quantity
        return quantity