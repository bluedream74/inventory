from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.ImageField(required=False)
    class Meta:
        model = Product
        fields = ('id', 'image_url', 'image_mode', 'code', 'part_number', 'name', 'ancient_time', 'price')