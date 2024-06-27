from django.urls import path

from contrat.views import ContratGenericAPIView, getContract


urlpatterns = [
    path('',ContratGenericAPIView.as_view()),
    path('<int:pk>/',ContratGenericAPIView.as_view()),
    path('chauffeur/<int:pk>/',getContract),
]
