from api.models import *
from api.serializers import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions
from django.db.models import F, CharField
from django.db.models.functions import Cast


class PatientOverviewActions(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, uuid=None, *args, **kwargs):
        
        page = int(request.query_params.get('page', 0))
        page = 0 if page < 0 else page
        
        page_size = int(request.query_params.get('page_size', 10))
        
        filters = {}
        order_key = request.query_params.get('order', None)
        order_by = '-name'
        
        if order_key:
            order_by = request.query_params.get('dir', '') + order_key
        
        if uuid is None:       
            data = (
                patient.objects.values('uuid', 'name', 'latest_visit').
                filter(**filters).
                order_by(order_by)
            )

            count = len(data)
            data = data[page*page_size: (page+1)*page_size]

            if len(data) > 0:
                response = {'data': data, 'meta': {'count': count, 'page_size': page_size, 'page': page},}
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response({'data': "No data found with filters"}, status=status.HTTP_404_NOT_FOUND)

        return Response("", status=status.HTTP_404_NOT_FOUND)


    def delete(self, request, uuid=None, *args, **kwargs):

        if patient.objects.filter(uuid=uuid).exists():
            data = patient.objects.get(uuid=uuid).delete()
            return Response({'data': 'Success'}, status=status.HTTP_200_OK)
            
        return Response({'data': "Record not found"}, status=status.HTTP_404_NOT_FOUND)
