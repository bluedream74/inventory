from django.contrib import admin
from .models import Season

class SeasonAdmin(admin.ModelAdmin):
    list_display =('code', 'name')

admin.site.register(Season, SeasonAdmin)
# Register your models here.
