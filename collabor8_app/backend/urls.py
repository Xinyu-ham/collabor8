from django.urls import path
from .views import UserView, GetAllRoomsView, GetRoomView, CreateRoomView, JoinRoomView

urlpatterns = [
    path('user', UserView.as_view()),
    path('room', GetAllRoomsView.as_view()),
    path('get-room', GetRoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('join-room', JoinRoomView.as_view())
]
