from django.db import models
from django.contrib.auth.models import User
from Booking.models import Booking


class Bill(models.Model):
    id_bill = models.AutoField(primary_key=True)
    service_provider = models.CharField(blank=True, null=True, max_length=200)
    pay_status = models.CharField(blank=True, null=True, max_length=200)
    id_booking = models.ForeignKey(Booking, on_delete=models.CASCADE)
 


    def __str__(self):
        return self.id_bill
    
    class Meta:
        db_table='bill'
        verbose_name='Bill'
        verbose_name_plural='Bills'
