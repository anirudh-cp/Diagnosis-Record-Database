from django.urls import path

from .views import *
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    
    # path('user', UserActions.as_view()),
    # path('user/<uuid:uuid>', UserActions.as_view()),
    
    path('user/login', CustomTokenObtainPairView.as_view()),
    path('user/logout', BlacklistTokenUpdateView.as_view()),
    path('user/register', registration_view),
    
    path('token', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/blacklist', BlacklistTokenUpdateView.as_view()),
    
]
