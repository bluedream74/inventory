from django.contrib import admin
from .models import Product, Size, Color, Season, Brand, Item, Material, Delivery, Charger, Exhibition, \
Dealer, IncomingDepartment, OriginCountry

class ProductAdmin(admin.ModelAdmin):
    list_display = ('image_url', 'image_mode', 'name', 'code', 'part_number')
admin.site.register(Product, ProductAdmin)

class SizeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'code')
admin.site.register(Size, SizeAdmin)

class ColorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'code')
admin.site.register(Color, ColorAdmin)

admin.site.register(Season)
admin.site.register(Brand)
admin.site.register(Item)
admin.site.register(Material)
admin.site.register(Delivery)
admin.site.register(Charger)
admin.site.register(Exhibition)
admin.site.register(Dealer)
admin.site.register(IncomingDepartment)
admin.site.register(OriginCountry)
