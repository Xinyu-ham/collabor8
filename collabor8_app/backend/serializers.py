from rest_framework import serializers
from .models import User, Room, Teammate, Skill, TeammateSkill, \
    Story, Task, TaskRequirement, Timeline, Assignment
from authentication.serializers import UserCreateSerializer


class UserSerializer(serializers.ModelSerializer):
    user_account = UserCreateSerializer(required=True)
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'user_account')
        read_only_fields = ('id',)
    

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'name', 'deadline', 'admin', 'code')
        read_only_fields = ('id', 'admin', 'code')


class TeammateSerializer(serializers.ModelSerializer):
    room = RoomSerializer(required=True)
    class Meta:
        model = Teammate
        fields = ('id', 'display_name', 'room', 'user', 'temp_user')
        read_only_fields = ('id',)


class SkillSerializer(serializers.ModelSerializer):
    room = RoomSerializer(required=True)
    class Meta:
        model = Skill
        fields = ('id', 'name', 'room')
        read_only_fields = ('id', 'name')


class TeammateSkillSerializer(serializers.ModelSerializer):
    teammate = TeammateSerializer(required=True)
    skill = SkillSerializer(required=True)
    class Meta:
        model = TeammateSkill
        fields = ('id', 'teammate', 'skill')
        read_only_field = ('id',)


class StorySerializer(serializers.ModelSerializer):
    room = RoomSerializer(required=True)
    class Meta:
        model = Story
        fields = ('id', 'title', 'description', 'room')
        read_only_fields = ('id',)
