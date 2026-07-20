from django.urls import path
from .views import GetPost, GetPutDel

urlpatterns = [
    path('airports/', GetPost.as_view(), name='airport-list'),
    path('airports/<int:pk>/', GetPutDel.as_view(), name='airport-detail'),
]
