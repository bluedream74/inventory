from django.contrib import admin
from .models import Charger

class ChargerAdmin(admin.ModelAdmin):
    list_display =('code', 'name', 'phone', 'address')

admin.site.register(Charger, ChargerAdmin)
