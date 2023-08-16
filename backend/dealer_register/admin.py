from django.contrib import admin
from .models import Dealer

class DealerAdmin(admin.ModelAdmin):
    list_display =('code', 'name', 'due_date', 'phone', 'address')

admin.site.register(Dealer, DealerAdmin)