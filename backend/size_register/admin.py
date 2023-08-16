from django.contrib import admin
from .models import Size

class SizeAdmin(admin.ModelAdmin):
    list_display =('code', 'name')

admin.site.register(Size, SizeAdmin)
# Register your models here.
