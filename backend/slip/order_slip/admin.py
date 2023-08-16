from django.contrib import admin
from .models import Order, OrderItem

class OrderAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Order._meta.fields]

class OrderItemAdmin(admin.ModelAdmin):
    list_display = [field.name for field in OrderItem._meta.fields]

admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)