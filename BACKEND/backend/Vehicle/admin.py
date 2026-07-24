from django.contrib import admin
from .models import Vehicle

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('id_vehicle', 'plate_number', 'car_make', 'car_model', 'car_color')
    search_fields = ('plate_number', 'car_make', 'car_model', 'car_color')
    list_filter = ('car_make', 'car_model')
