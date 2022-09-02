from rest_framework import generics, status
from .models import User, Room
from .serializers import GetUserSerializer, CreateUserSerializer, GetRoomSerializer, CreateRoomSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class GetUserView(APIView):
    lookup_url_kwarg = 'id'
    serializer_class = GetUserSerializer

    def get(self, request, format=None):
        user_id = request.GET.get(self.lookup_url_kwarg)
        if user_id is not None:
            users = User.objects.filter(id=user_id)
            if len(users) > 0:
                data = GetRoomSerializer(users[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room ID'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'ID parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)

class CreateUserView(APIView):
    serializer_class  = CreateUserSerializer

    def post(self, request, format=None):
        # session = self.request.session
        # if not session.exists(session.session_key):
        #     session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')

            user = User(first_name=first_name, last_name=last_name)
            user.save()

            return Response(GetUserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class GetAllRoomsView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = GetRoomSerializer

class GetRoomView(generics.ListAPIView):
    lookup_url_kwarg = 'id'
    serializer_class = GetRoomSerializer

    def get(self, request, format=None):
        room_id = request.GET.get(self.lookup_url_kwarg)
        if room_id is not None:
            rooms = Room.objects.filter(id=room_id)
            if len(rooms) > 0:
                data = GetRoomSerializer(rooms[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room ID'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'ID parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

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

            return Response(GetRoomSerializer(room).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)