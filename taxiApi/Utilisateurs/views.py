from django.db.models import Q,Count,Case,IntegerField,When
from django.http import JsonResponse
from rest_framework import mixins, generics
from rest_framework.request import Request
from contrat.models import Contrat
from .serializers import TokenSerialiser, UtilisateurSerializer
from django.contrib.auth.hashers import make_password
from .models import Utilisateur
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class UtilisateurGenericAPIView(
    generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    queryset = Utilisateur.objects.prefetch_related('modified_by','created_by')
    serializer_class = UtilisateurSerializer
    permission_classes = [IsAuthenticated]
    
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

def chauffeurs(request):
    has_no_contract = Utilisateur.objects.filter(contrat__isnull=True,type_utlisateur='chauffeur').distinct()
    #has_fished_contract = Utilisateur.objects.filter(contrat__etat='en_cours',type_utlisateur='chauffeur').distinct()
    has_fished_contract = Utilisateur.objects.annotate(not_finished=Count(Case(When(Q(contrat__etat__in=['en_cours']),then=1),output_field=IntegerField()))).filter(not_finished=0,type_utlisateur='chauffeur')
    chauffeurs_free = has_fished_contract | has_fished_contract
    serializer = UtilisateurSerializer(chauffeurs_free,many = True)
    return JsonResponse(serializer.data,safe=False)

def allChauffeur(request):
    chauffeurs = Utilisateur.objects.filter(type_utlisateur='chauffeur')
    serializer = UtilisateurSerializer(chauffeurs)
    return JsonResponse(serializer,safe=False)
