from rest_framework import mixins, generics
from .serializers import MotoSerializer
from .models import Moto
from rest_framework.permissions import IsAuthenticated


class MotoGenericAPIView(
    generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin, mixins.DestroyModelMixin):
    queryset = Moto.objects.prefetch_related('created_by','modified_by')
    serializer_class = MotoSerializer
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
