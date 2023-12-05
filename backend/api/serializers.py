from rest_framework import serializers
from .models import *


class test_modelSerializer(serializers.ModelSerializer):
    class Meta:
        model = test_model
        fields = '__all__'
    