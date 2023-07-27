from rest_framework import serializers
from .models import Product, Size, Color, Season, Brand, Item, Material, Delivery, Charger, Exhibition, \
Dealer, IncomingDepartment, OriginCountry, Storehouse, Customer, Deposittype

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'id',
            'name',
            'code',
            'image_url',
            'image_mode',
            'part_number',
            'ancient_time',
            'price'
        )

class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ('id', 'name', 'code')

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ('id', 'name', 'code')

class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = ('id', 'name', 'code')

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ('id', 'name', 'code', 'name_export')

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'name', 'code')

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ('id', 'name', 'code')

class DeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = Delivery
        fields = ('id', 'name', 'code')

class ChargerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Charger
        fields = ('id', 'name', 'code', 'phone', 'address')

class ExhibitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exhibition
        fields = ('id', 'name', 'code')

class DealerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dealer
        fields = ('id', 'name', 'code', 'due_date', 'phone', 'address')

class IncomingDepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncomingDepartment
        fields = ('id', 'name', 'code', 'due_date', 'phone', 'address')

class OriginCountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = OriginCountry
        fields = ('id', 'name', 'code')

class StorehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storehouse
        fields = ('id', 'code', 'name', 'phone', 'address')

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'code', 'name', 'phone', 'address')

class DeposittypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deposittype
        fields = ('id', 'code', 'name')