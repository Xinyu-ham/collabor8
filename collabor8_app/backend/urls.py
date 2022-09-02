from django.urls import path
from .views import GetUserView, CreateUserView, GetAllRoomsView, GetRoomView, CreateRoomView

urlpatterns = [
    path('user', GetUserView.as_view()),
    path('sign-up', CreateUserView.as_view()),
    path('room', GetAllRoomsView.as_view()),
    path('get-room', GetRoomView.as_view()),
    path('create-room', CreateRoomView.as_view())
]
