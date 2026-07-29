from django.urls import path
from .views import GetPost, GetPutDel, BookingServicesGetPost, BookingServicesGetPutDel

urlpatterns = [
    path('booking/', GetPost.as_view(), name='booking-list'),
    path('booking/<int:pk>/', GetPutDel.as_view(), name='booking-detail'),
    path('booking-services/', BookingServicesGetPost.as_view(), name='bookingservices-list'),
    path('booking-services/<int:pk>/', BookingServicesGetPutDel.as_view(), name='bookingservices-detail'),
]