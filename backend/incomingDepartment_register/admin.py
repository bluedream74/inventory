from django.contrib import admin
from .models import incomingDepartment

class IncomingDepartmentAdmin(admin.ModelAdmin):
    list_display = ('code','name','phone', 'address','due_date')

admin.site.register(incomingDepartment, IncomingDepartmentAdmin)

# Register your models here.
