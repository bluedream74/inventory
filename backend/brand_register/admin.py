from django.contrib import admin
from .models import Brand

class BrandAdmin(admin.ModelAdmin):
    list_display =('code', 'name', 'name_export')

admin.site.register(Brand, BrandAdmin)
# Register your models here.
