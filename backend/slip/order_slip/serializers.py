from rest_framework import serializers
from .models import Order, OrderItem

class OrderSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    class Meta:
        model = Order
        fields = (
            'id',
            'no',
            'slip_date',
            'delivery_date',
            'shopping_date',
            'delivery_place_code',
            'storehouse_code',
            'global_rate',
            'charger_code',
            'receiver_code',
            'exhibition_code',
            'dealer_code',
            'status',
            'update_date',
            'items'
        )
    def get_items(self, obj):
        items  = OrderItem.objects.filter(order=obj).order_by('-id')
        return OrderItemSerializer(items, many=True).data

class OrderItemSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    product_name = serializers.SerializerMethodField()
    max_cost = serializers.SerializerMethodField()
    min_cost = serializers.SerializerMethodField()
    max_price = serializers.SerializerMethodField()
    min_price = serializers.SerializerMethodField()
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
            'profit'
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
        return int(obj.product.max_cost) * obj.quantity
    
    def get_min_price(self, obj):
        return obj.product.min_cost * obj.quantity