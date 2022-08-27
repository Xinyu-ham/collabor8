from rest_framework import serializers
from .models import User, Room, Teammate, Skill, TeammateSkill, \
    Story, Task, TaskRequirement, Timeline, Assignment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name')


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'name', 'duration')


class TeammateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teammate
        fields = ('id', 'display_name', 'room_id', 'user_id', 'is_admin', 'temp_user')


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ('id', 'name', 'room_id')


class TeammateSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeammateSkill
        fields = ('id', 'teammate_id', 'skill_id')


class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ('id', 'title', 'description', 'room_id')
