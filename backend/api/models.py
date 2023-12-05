from django.db import models
import uuid


class test_model(models.Model):
    
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image = models.ImageField(null=True, blank=True, upload_to=r'images/')
    files = models.FileField(null=True, blank=True, upload_to=r'files/')
    
    def __str__(self):
        return f'{self.uuid}'
