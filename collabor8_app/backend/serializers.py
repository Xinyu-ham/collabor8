from rest_framework import serializers
from .models import User, Room, Teammate, Skill, TeammateSkill, \
    Story, Task, TaskRequirement, Timeline, Assignment

class GetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name')

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name')


class GetRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'name', 'duration', 'admin')


class GetTeammateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teammate
        fields = ('id', 'display_name', 'room_id', 'user_id', 'temp_user')


class GetSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ('id', 'name', 'room_id')


class GetTeammateSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeammateSkill
        fields = ('id', 'teammate_id', 'skill_id')


class GetStorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ('id', 'title', 'description', 'room_id')
