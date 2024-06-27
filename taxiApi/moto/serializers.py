from django.conf import settings
from rest_framework import serializers
from .models import  Moto


class MotoSerializer(serializers.ModelSerializer):
    created_by_name = serializers.SerializerMethodField()
    modified_by_name = serializers.SerializerMethodField()
    def get_created_by_name(self,obj):
        return obj.created_by.username
    
    def get_modified_by_name(self,obj):
        return obj.modified_by.username
    class Meta:
        model = Moto
        fields = '__all__'
        
    


