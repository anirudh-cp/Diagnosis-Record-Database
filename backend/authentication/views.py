from .models import user
from .serializers import RegistrationUserSerializer, CustomTokenObtainPairSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework import status, permissions

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView


@api_view(['POST', ])
@permission_classes([IsAuthenticated])
def registration_view(request):
    if request.method == 'POST':
        data = {}

        email = request.data.get('email')

        if validate_user(email) != None:
            data['response'] = 'That email is already in use.'
            return Response(data, status=status.HTTP_409_CONFLICT)

        # Check for existence of group, if it exists verify that only an admin can create the user
        destinationGroup = None
        if 'destinationGroup' in request.data:
            # Get group name of user who made request and check for credentials
            groupOrigin = request.user.groups.values_list('name', flat=True)
            if not any(item in ('admin',) for item in groupOrigin):
                data['response'] = 'Cannot create new user unless admin.'
                return Response(data, status=status.HTTP_401_UNAUTHORIZED)
            destinationGroup = request.data['destinationGroup']
        else:
            return Response("Provide auth level of user to be created", status=status.HTTP_400_BAD_REQUEST)

        serializer = RegistrationUserSerializer(data=request.data)
        
        if serializer.is_valid():
            account = serializer.save(destinationGroup=destinationGroup, 
                                      name=request.data['name'],
                                      phone=request.data['phone'])
            data['response'] = 'Successfully registered new user.'
            # data['email'] = account.email
            data['permission_groups'] = list(account.groups.values_list('name', flat=True))
            data['uuid'] = account.uuid
            
            return Response(data, status=status.HTTP_201_CREATED)    
        else:
            data = serializer.errors
            
            return Response(data, status=status.HTTP_400_BAD_REQUEST)


def validate_user(email):
    try:
        accountObj = user.objects.get(email=email)
    except user.DoesNotExist:
        return None

    if accountObj != None:
        return email


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request):
        context = {}

        email = request.data.get('email')
        password = request.data.get('password')

        # If user existence and auth credentials,  return JWT
        # If user existence and bad credentials, return None, increment passWrongCount
        # Else return None.

        userObj = user.objects.filter(email=email)

        if userObj:
            userObj = userObj[0]

            account = authenticate(email=email, password=password)
            if account:
                serializer = self.get_serializer(data=request.data)
                if serializer.is_valid():
                    return Response(serializer.validated_data, status=status.HTTP_200_OK)
                else:
                    return Response({'respones': 'Serialization error'}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                context = {'response': 'Bad credentials'}
                # userObj.passWrongCount += 1
                # if userObj.passWrongCount >= 3:
                #     userObj.passWrongCount = 0
                #     userObj.status = "locked"
                # userObj.save()
                return Response(context, status=status.HTTP_401_UNAUTHORIZED)
        else:
            # FIXME: Secuity vulnerablity, can check if account exists because of message
            context = {'response': 'User does not exist'}
            return Response(context, status=status.HTTP_404_NOT_FOUND)


class BlacklistTokenUpdateView(APIView):
    
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)        
        