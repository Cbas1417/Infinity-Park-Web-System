from django.db import models
from django.contrib.auth.models import User
from Airport.models import Airport
from User.models import User
from Vehicle.models import Vehicle
from Service.models import Service

class Booking(models.Model):
    id_booking = models.AutoField(primary_key=True)
    datetime_checkin = models.DateTimeField(max_length=100)
    datetime_checkout = models.DateTimeField(max_length=100)
    associated_flight = models.CharField(blank=True, null=True, max_length=200)
    status_booking = models.CharField(blank=True, null=True, max_length=200)
    id_airport = models.ForeignKey(Airport, on_delete=models.CASCADE)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)


    def __str__(self):
        return self.id_booking
    
    class Meta:
        db_table='booking'
        verbose_name='Booking'
        verbose_name_plural='bookings'

class BookingServices(models.Model):
    id_bookingservices = models.AutoField(primary_key=True)
    id_service = models.ForeignKey(Service, on_delete=models.CASCADE)
    id_booking = models.ForeignKey(Booking, on_delete=models.CASCADE)
    aplied_price = models.FloatField(max_length=100)


    def __str__(self):
        return self.id_bookingservices
    
    class Meta:
        db_table='booking-service'
        verbose_name='Booking-Service'
        verbose_name_plural='Bookings-Services'