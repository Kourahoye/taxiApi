from django.http import JsonResponse
from rest_framework import mixins, generics
from .serializers import ContratSerializer
from .models import Contrat
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

class ContratGenericAPIView(
    generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    queryset = Contrat.objects.all()
    serializer_class = ContratSerializer
    
    def get(self, request, pk=None):
        if pk:
            return self.retrieve(request,pk)
        return self.list(request)

    def post(self, request):
        if request.data['date_debut'] > request.data['date_fin']:
            return Response({'error':'La date debut vient avant la date fin'},status=status.HTTP_400_BAD_REQUEST)
        
        if request.data['montant_initial'] < request.data['montant_journalier']:
            return Response({'error':'La montant initial doit etre superieur au montant journalier'},status=status.HTTP_400_BAD_REQUEST)
    
        response = self.create(request)
        return response

    def put(self, request, pk=None):
        response = self.partial_update(request, pk)
        return response

    def delete(self, request, pk=None):
        response = self.destroy(request, pk)
        return response


def getContract(request,pk):
    contrat = Contrat.objects.filter(chauffeur=pk)
    serializer = ContratSerializer(contrat, many=True)
    return JsonResponse(serializer.data,safe=False)