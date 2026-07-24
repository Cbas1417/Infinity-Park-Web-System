from django.urls import path
from .views import GetPost, GetPutDel

urlpatterns = [
    path('bills/', GetPost.as_view(), name='bill-list'),
    path('bills/<int:pk>/', GetPutDel.as_view(), name='bill-detail'),
]
