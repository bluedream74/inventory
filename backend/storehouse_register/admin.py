from django.contrib import admin
from .models import Storehouse

class StorehouseAdmin(admin.ModelAdmin):
    list_display =('code', 'name', 'phone', 'address')

admin.site.register(Storehouse, StorehouseAdmin)
