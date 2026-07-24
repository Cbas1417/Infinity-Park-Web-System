from django.db import models
from django.contrib.auth.models import User
from .models import User

class Vehicle(models.Model):
    id_vehicle = models.AutoField(primary_key=True)
    plate_number = models.IntegerField(max_length=200)
    car_make = models.CharField(max_length=3)
    car_model = models.CharField(blank=True, null=True, max_length=200)
    car_color = models.CharField(blank=True, null=True, max_length=200)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.plate_number
    
    class Meta:
        db_table='vehicle'
        verbose_name='Vehiculo'
        verbose_name_plural='Vehiculos'