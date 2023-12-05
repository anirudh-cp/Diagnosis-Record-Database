from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, Group
import uuid


class user_manager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Users must have an email')

        user = self.model(
            uuid=uuid.uuid4(),
            email=email,
        )
        
        user.set_password(password)
        user.save(using=self._db)
        return user


    def create_superuser(self, email, password):
        user = self.create_user(
            email=email,
            password=password,
        )
        
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class user(AbstractBaseUser):
    # 320 Characters is the max len of a email.
    
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=320, default='', unique=True, null=False)
    phone = models.CharField(max_length=15)
    name = models.CharField(max_length=150, default='')
    
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    groups = models.ManyToManyField(Group)

    USERNAME_FIELD = 'email'

    objects = user_manager()

    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return self.is_staff

    def has_module_perms(self, app_label):
        return True


