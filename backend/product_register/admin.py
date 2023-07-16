from django.contrib import admin
from .models import Product

# Register your models here.

class ProductAdmin(admin.ModelAdmin):
    list_display =('image_url', 'image_mode', 'code', 'part_number', 'name', 'ancient_time', 'price')

admin.site.register(Product, ProductAdmin)