from rest_framework import serializers
from .models import CustomUser as User
from tasks.serializers import TaskSerializer


class UserSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ["username", "email", "tasks"]