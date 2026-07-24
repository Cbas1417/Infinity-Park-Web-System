from django.contrib import admin
from .models import Airport

@admin.register(Airport)
class AirportAdmin(admin.ModelAdmin):
    # Columns to be displayed in the list
    list_display = ('id', 'name', 'IATA_code', 'country', 'city')
    # searchable fields 
    search_fields = ('name', 'IATA_code', 'country', 'city')
    # side filters
    list_filter = ('country',)
