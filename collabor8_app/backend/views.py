from rest_framework import generics, status
from .models import User
from .serializers import GetUserSerializer, CreateUserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class GetUserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = GetUserSerializer

class CreateUserView(APIView):
    serializer_class  = CreateUserSerializer

    def post(self, request, format=None):
        # session = self.request.session
        # if not session.exists(session.session_key):
        #     session.create()
        serializer = self.serializer(data=request.data)
        if serializer.is_valid():
            first_name = serializer_class .data.get('first_name')
            last_name = serializer_class .data.get('last_name')

            user = User(first_name=first_name, last_name=last_name)
            user.save()

            return Response(GetUserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

