from django.db import models
import uuid

from authentication.models import user

class patient(models.Model):
    
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
        ('Prefer not to say', 'Prefer not to say'),
    ]

    uuid = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150, default='')
    date_of_birth = models.DateField()
    gender = models.CharField(
        max_length=20, choices=GENDER_CHOICES, default='Other',)
    address = models.TextField(null=True, blank=True)
    primary_contact = models.CharField(max_length=15)
    secondary_contact = models.CharField(max_length=15, blank=True, null=True)
    latest_visit = models.DateTimeField()

    def __str__(self):
        return f'{self.name}'


class drug(models.Model):
    
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    dosage = models.CharField(max_length=255)
    frequency = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    

class pastTreatments(models.Model):
    
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description = models.TextField()
    medications = models.ManyToManyField(drug)
    
    def __str__(self):
        return self.uuid
    

class workupTest(models.Model):
    
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    results = models.TextField()
    remarks = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.uuid


class workupExam(models.Model):
    
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    results = models.TextField()
    remarks = models.TextField(blank=True, null=True)
    tests = models.ManyToManyField(workupTest)

    def __str__(self):
        return self.uuid

    
class microbioTests(models.Model):
    
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    datestamp = models.DateTimeField()
    sample = models.CharField(max_length=255)
    smears = models.CharField(max_length=255)
    results = models.TextField()
        
    def __str__(self):
        return self.uuid


class microbioExam(models.Model):
    
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.CharField(max_length=255)
    examination = models.TextField()
    tests = models.ManyToManyField(microbioTests)
        
    def __str__(self):
        return self.uuid


class history(models.Model):
    
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description = models.TextField()
    trauma = models.BooleanField(default=False)
    trauma_cause = models.TextField(blank=True, null=True)
    duration = models.DurationField(blank=True, null=True)
    
    def __str__(self):
        return self.uuid


class followUp(models.Model):
    
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(user, on_delete=models.CASCADE)
    datetime_stamp = models.DateTimeField(auto_now_add=True)
    anterior_segment_desc = models.TextField()
    treatment = models.ManyToManyField(drug)
    photos = models.ImageField(upload_to=r'follow_up_photos/', blank=True, null=True)

    def __str__(self):
        return self.uuid


class appointment(models.Model):

    uuid = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(user, on_delete=models.SET_NULL, null=True)
    datetime_stamp = models.DateTimeField(auto_now_add=True)
    patient = models.ForeignKey(patient, on_delete=models.CASCADE)
    
    past_treatments = models.ForeignKey(pastTreatments, on_delete=models.SET_NULL, null=True)
    workup = models.ForeignKey(workupExam, on_delete=models.SET_NULL, null=True)
    microbio_exam = models.ForeignKey(microbioExam, on_delete=models.SET_NULL, null=True)
    history = models.ForeignKey(history, on_delete=models.SET_NULL, null=True)
    
    follow_up = models.ManyToManyField(followUp)

    def __str__(self):
        return f'{self.user}-{self.patient}'
