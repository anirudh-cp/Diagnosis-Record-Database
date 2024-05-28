from django.contrib import admin
from .models import *

admin.site.register(patient)
admin.site.register(appointment)
admin.site.register(pastTreatments)
admin.site.register(drug)
admin.site.register(workupExam)
admin.site.register(workupTest)
admin.site.register(microbioExam)
admin.site.register(microbioTests)
admin.site.register(history)
admin.site.register(followUp)