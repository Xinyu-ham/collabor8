from django.db import models
from django.core.exceptions import ValidationError
from authentication.models import UserAccount
import string, random

def generate_room_code():
    k = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=k))
        if Room.objects.filter(code=code).count() == 0:
            break
    return code

# Create your models here.
class User(models.Model):
    first_name = models.CharField(max_length=12, blank=False, null=False)
    last_name = models.CharField(max_length=20, blank=False, null=False)
    user_account = models.ForeignKey(UserAccount, on_delete=models.CASCADE, blank=True, null=True)
    status = models.CharField(max_length=12, default='pending', blank=False, null=False)

class Room(models.Model):
    name = models.CharField(max_length=24, blank=False, null=False)
    deadline = models.DateTimeField(blank=False, null=False)
    # admin = models.OneToOneField('Teammate', related_name='Teammate', on_delete=models.SET_NULL, blank=True, null=True, unique=False)
    admin = models.CharField(max_length=50, null=True)
    code = models.CharField(max_length=6, default=generate_room_code, unique=True)

    def get_admins(self):
        return self.admin

    def __str__(self):
        return self.name + ':' + self.id


class Teammate(models.Model):
    display_name = models.CharField(max_length=20, blank=False, unique=True)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, blank=False, null=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    temp_user = models.BooleanField(default=False)

    def validate_unique(self, *args, **kwargs) -> None:
        super().validate_unique(*args, **kwargs)
        if self.__class__.objects.filter(user=self.user, room=self.room):
            raise ValidationError(
                message=f'Team member with username {self.user.first_name} already exists in room {self.room.name}:{self.room.id}',
                code='unique_together'
            )

    def __str__(self):
        return self.room.name + ': ' + self.display_name


class Skill(models.Model):
    name = models.CharField(max_length=20, blank=False, null=False)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, blank=False, null=False)


class TeammateSkill(models.Model):
    teammate = models.ForeignKey(Teammate, on_delete=models.CASCADE, null=False, blank=False)
    skill = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)

    def validate_unique(self, *args, **kwargs) -> None:
        super().validate_unique(*args, **kwargs)
        if self.__class__.objects.filter(user=self.user, room=self.room):
            raise ValidationError(
                message=f'Team member with username {self.user.first_name} already exists in room {self.room.name}:{self.room.id}',
                code='unique_together'
            )

    def __str__(self):
        return self.teammate.display_name + ': ' + self.skill.name


class Story(models.Model):
    title = models.CharField(max_length=50, blank=False, null=False, unique=True)
    description = models.CharField(max_length=500, blank=False, null=False)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, null=False, blank=False)


class Task(models.Model):
    title = models.CharField(max_length=50, blank=False, null=False)
    story = models.ForeignKey(Story, on_delete=models.CASCADE, null=False, blank=False)
    description = models.CharField(max_length=500, blank=False, null=False)
    estimated_hours = models.IntegerField(blank=True, null=True)


class TaskRequirement(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, null=False, blank=False)
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, null=False, blank=False)

class Timeline(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, null=False, blank=False)

class Assignment(models.Model):
    timeline = models.ForeignKey(Timeline, on_delete=models.CASCADE, null=False, blank=False)
    teammate = models.ForeignKey(Teammate, on_delete=models.CASCADE, null=False, blank=False)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, null=False, blank=False)

