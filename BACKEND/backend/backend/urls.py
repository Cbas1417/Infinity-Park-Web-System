from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('Airport/', include('Airport.urls')),
    path('Bill/', include('Bill.urls')),
    path('Booking/', include('Booking.urls')),
    path('Role/', include('Role.urls')),
    path('Service/', include('Service.urls')),
    path('User/', include('User.urls')),
    path('Vehicle/', include('Vehicle.urls')),
    path('Assignments/', include('Assignments.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)