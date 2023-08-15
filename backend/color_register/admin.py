from django.contrib import admin
from .models import Color

class ColorAdmin(admin.ModelAdmin):
    list_display =('code', 'name')

admin.site.register(Color, ColorAdmin)
# Register your models here.
