from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.
class User(models.Model):
    first_name = models.CharField(max_length=12, blank=False, null=False)
    last_name = models.CharField(max_length=20, blank=False, null=False)

class Skill(models.Model):
    name = models.CharField(max_length=20, blank=False, null=False, unique=True)

class UserSkill(models.Model):
    pass

class Room(models.Model):
    name = models.CharField(max_length=24, blank=False, null=False)
    duration = models.FloatField(blank=False)

    def get_admins(self):
        return Teammate.objects.filter(is_admin=True)

    def __str__(self):
        return self.name + ':' + self.id


class Teammate(models.Model):
    display_name = models.CharField(max_length=20, blank=False, unique=True)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    is_admin = models.BooleanField(default=False)
    temp_user = models.BooleanField(default=False)

    def validate_unique(self, *args, **kwargs) -> None:
        super().validate_unique(*args, **kwargs)
        if self.__class__.objects.filter(user=self.user, room=self.room):
            raise ValidationError(
                message=f'Team member with username {self.user.first_name} already exists in room {self.room.name}:{self.room.id}',
                code='unique_together'
            )

    def __str__(self):
        return self.room.name + ':' + self.display_name


class Story(models.Model):
    pass

class Task(models.Model):
    pass

class Timeline(models.Model):
    pass

