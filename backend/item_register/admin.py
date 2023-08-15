from django.contrib import admin
from .models import Item

class ColorAdmin(admin.ModelAdmin):
    list_display =('code', 'name')

admin.site.register(Item, ColorAdmin)
# Register your models here.
