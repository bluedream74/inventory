from django.contrib import admin
from .models import Deposittype

class DeposittypeAdmin(admin.ModelAdmin):
    list_display = ('code', 'name')

admin.site.register(Deposittype, DeposittypeAdmin)

# Register your models here.
