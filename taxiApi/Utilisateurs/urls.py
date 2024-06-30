from django.urls import path

from .views import JwtToken, UtilisateurGenericAPIView,JwtTokenRefresh, chauffeurs


urlpatterns = [
    path('',UtilisateurGenericAPIView.as_view()),
    path('chauffeurs/',chauffeurs),
    path('allChauffeurs/',chauffeurs),
    path('<int:pk>/',UtilisateurGenericAPIView.as_view()),
    path('login/', JwtToken.as_view()),
    path('refresh/', JwtTokenRefresh.as_view())
]