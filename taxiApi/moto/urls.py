from django.urls import path

from moto.views import MotoGenericAPIView, moto


urlpatterns = [
    path('',MotoGenericAPIView.as_view()),
    path('freemotos/',moto),
    path('<int:pk>/',MotoGenericAPIView.as_view()),
]
