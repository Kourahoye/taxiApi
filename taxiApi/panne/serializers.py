from rest_framework import serializers

from panne.models import Panne



class PanneSerializer(serializers.ModelSerializer):
    created_by_name = serializers.SerializerMethodField()
    modified_by_name = serializers.SerializerMethodField()
    moto_numero_serie = serializers.SerializerMethodField()
    
    
    class Meta:
        model = Panne
        fields = '__all__'

    def get_created_by_name(self,obj):
        return obj.created_by.username
    
    def get_modified_by_name(self,obj):
        return obj.modified_by.username
    def get_moto_numero_serie(self,obj):
        return obj.moto.numero_serie

