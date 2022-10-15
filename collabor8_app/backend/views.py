from http import HTTPStatus
from rest_framework import generics, status
from .models import User, Room
from .serializers import UserSerializer, RoomSerializer
from authentication.serializers import UserCreateSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.sites.shortcuts import get_current_site
import requests, json
from authentication.models import UserAccount

# Create your views here.
class UserView(APIView):
    lookup_url_kwarg = 'id'
    serializer_class = UserSerializer
    user_account_serializer_class = UserCreateSerializer

    def get(self, request, format=None):
        user_id = request.GET.get(self.lookup_url_kwarg)
        if user_id is not None:
            users = User.objects.filter(id=user_id)
            if len(users) > 0:
                data = self.serializer_class(users[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room ID'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'ID parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        print(request.data)
        if serializer.is_valid():
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')
            data = {
                'email': request.data.get('user_account').get('email'),
                'password': request.data.get('user_account').get('password'),
                're_password': request.data.get('user_account').get('password')
            }
            print(data)
            user_account_serializer = self.user_account_serializer_class(data=data)

            if user_account_serializer.is_valid():
                response = requests.post(f'http://{get_current_site(request).domain}/auth/users/', data=data)
                if response.status_code == 201:
                    email = data['email']
                    user_account = UserAccount.objects.filter(email=email)[0]
                else:
                    return Response({'Bad Request': response.text}, status=response.status_code)
            else:
                return Response({'Bad Request': user_account_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

            user = User(first_name=first_name, last_name=last_name, user_account=user_account)
            user.save()

            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class GetAllRoomsView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class GetRoomView(APIView):
    lookup_url_kwarg = 'code'
    serializer_class = RoomSerializer

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code is not None:
            rooms = Room.objects.filter(code=code)
            if len(rooms) > 0:
                data = RoomSerializer(rooms[0]).data
                data['is_admin'] = self.request.session.session_key == rooms[0].admin
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room ID'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'ID parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)

class CreateRoomView(APIView):
    serializer_class = RoomSerializer

    def post(self, request, format=None):
        session = self.request.session
        if not session.exists(session.session_key):
            session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            deadline = serializer.data.get('deadline')
            admin = session.session_key

            room = Room(name=name, deadline=deadline, admin=admin)
            room.save()
            data = RoomSerializer(room).data
            return Response(data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class JoinRoomView(APIView):
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code:
            rooms = Room.objects.filter(code=code)
            if len(rooms):
                return Response({
                    "message": "joined room"
                }, status=status.HTTP_200_OK)
            return Response({
                "message": "invalid code"
            }, status=status.HTTP_404_NOT_FOUND)
        return Response({
                "message": "empty code"
            }, status=status.HTTP_400_BAD_REQUEST)