from django.urls import path

from .views import JwtToken, UtilisateurGenericAPIView,JwtTokenRefresh


urlpatterns = [
    path('',UtilisateurGenericAPIView.as_view()),
    path('<int:pk>/',UtilisateurGenericAPIView.as_view()),
    path('login/', JwtToken.as_view()),
    path('refresh/', JwtTokenRefresh.as_view())
]