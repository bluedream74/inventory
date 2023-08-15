from django.contrib import admin
from .models import Material

class MaterialAdmin(admin.ModelAdmin):
    list_display =('code', 'name')

admin.site.register(Material, MaterialAdmin)
# Register your models here.
