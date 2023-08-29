from django.contrib import admin
from .models import Delivery

class DeliveryAdmin(admin.ModelAdmin):
    list_display =('code', 'name', 'tel', 'phone')

admin.site.register(Delivery, DeliveryAdmin)
