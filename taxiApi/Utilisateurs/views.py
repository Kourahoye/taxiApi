from rest_framework import mixins, generics
from rest_framework.request import Request
from .serializers import TokenSerialiser, UtilisateurSerializer
from django.contrib.auth.hashers import make_password
from .models import Utilisateur
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from rest_framework.response import Response

class UtilisateurGenericAPIView(
    generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    queryset = Utilisateur.objects.prefetch_related('modified_by','created_by')
    serializer_class = UtilisateurSerializer

    
    def get(self, request, pk=None):
        if pk:
            return self.retrieve(request,pk)
        return self.list(request)

    def post(self, request):
        request.data['password'] = make_password(request.data['password'])
        response = self.create(request)
        return response

    def put(self, request, pk=None):
        if request.data['password']:
            request.data['password'] = make_password(request.data['password'])
        response = self.partial_update(request, pk)
        return response

    def delete(self, request, pk=None):
        response = self.destroy(request, pk)
        return response


class JwtToken(TokenObtainPairView):
    serializer_class = TokenSerialiser
    
    def post(self, request: Request, *args, **kwargs) -> Response:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token = serializer.validated_data['access']
        user_serializer = UtilisateurSerializer(user)
        
        return Response({
            'token': str(token),
            'user': user_serializer.data
        })

class JwtTokenRefresh(TokenRefreshView):
    pass

# class Login(APIView):
#     parser_classes = [permissions.IsAuthenticated]
    
#     def post(self, request):
#         try:
#             refresh_token = request.data["refresh"]
#             return Response(status=status.HTTP_205_RESET_CONTENT)
#         except Exception as e:
#             return Response(status=status.HTTP_400_BAD_REQUEST)

