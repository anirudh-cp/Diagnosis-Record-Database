from rest_framework import serializers
from .models import *

class patientSerializer(serializers.ModelSerializer):
    class Meta:
        model = patient
        fields = '__all__'

class drugSerializer(serializers.ModelSerializer):
    class Meta:
        model = drug
        fields = '__all__'

class pastTreatmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = pastTreatments
        fields = '__all__'

class workupExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = workupExam
        fields = '__all__'
        
class workupTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = workupTest
        fields = '__all__'

class microbioTestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = microbioTests
        fields = '__all__'

class microbioExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = microbioExam
        fields = '__all__'

class historySerializer(serializers.ModelSerializer):
    class Meta:
        model = history
        fields = '__all__'

class followUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = followUp
        fields = '__all__'

class appointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = appointment
        fields = '__all__'
