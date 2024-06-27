from rest_framework import mixins, generics
from .serializers import PanneSerializer
from .models import Panne
from rest_framework.permissions import IsAuthenticated

class PanneGenericAPIView(
    generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    queryset = Panne.objects.prefetch_related('created_by','modified_by','moto')
    serializer_class = PanneSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        if pk:
            return self.retrieve(request,pk)
        return self.list(request)

    def post(self, request):
        response = self.create(request)
        return response

    def put(self, request, pk=None):
        response = self.partial_update(request, pk)
        return response

    def delete(self, request, pk=None):
        response = self.destroy(request, pk)
        return response
