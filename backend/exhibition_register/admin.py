from django.contrib import admin
from .models import Exhibition

class ExhibitionAdmin(admin.ModelAdmin):
    list_display =('code', 'name')

admin.site.register(Exhibition, ExhibitionAdmin)

