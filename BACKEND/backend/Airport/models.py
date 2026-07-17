from django.db import models
from django.contrib.auth.models import User

class Airport(models.Model):
    id_airport = models.AutoField(primary_key=True)
    name_airport = models.CharField(max_length=200)
    IATA_code = models.CharField(max_length=3)
    country = models.CharField(blank=True, null=True, max_length=200)
    city = models.CharField(blank=True, null=True, max_length=200)


    def __str__(self):
        return self.name_airport
    
    class Meta:
        db_table='airport'
        verbose_name='Aeropuerto'
        verbose_name_plural='Aeropuertos'
