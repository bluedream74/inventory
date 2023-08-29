from django.contrib import admin
from .models import Factory

class FactoryAdmin(admin.ModelAdmin):
    list_display =('code', 'name', 'tel', 'phone')

admin.site.register(Factory, FactoryAdmin)
