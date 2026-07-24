from django.urls import path
from .views import GetPost, GetPutDel

urlpatterns = [
    path('assignments/', GetPost.as_view(), name='assignment-list'),
    path('assignments/<int:pk>/', GetPutDel.as_view(), name='assignment-detail'),
]
