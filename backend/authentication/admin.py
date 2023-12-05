from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *


class user_admin(UserAdmin):
    list_display = ('uuid', 'email', 'phone', 'name',)
    search_fields = ('email', 'phone', 'name')
    ordering = ('email', 'phone', 'name',)
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()
    add_fieldsets = (
    (None, {
        'classes': ('wide',),
        'fields': ('email', 'password1', 'password2'),
    }),
)


admin.site.register(user, user_admin)
