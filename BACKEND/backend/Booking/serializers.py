from rest_framework import serializers
from .models import Booking, BookingServices

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = "__all__"

class BookingServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingServices
        fields = "__all__"
