from django.contrib import admin
from .models import Entrust

class EntrustAdmin(admin.ModelAdmin):
    list_display =('code', 'name', 'phone', 'address')

admin.site.register(Entrust, EntrustAdmin)

# Register your models here.
