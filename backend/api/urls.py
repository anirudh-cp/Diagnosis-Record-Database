from django.urls import path

from .Views.patients import *

urlpatterns = [
    path('patient', PatientOverviewActions.as_view()),
    path('patient/<uuid:uuid>', PatientOverviewActions.as_view()),
]
