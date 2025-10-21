from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=128)
    description = serializers.CharField(allow_blank=True, required=False)
    completed = serializers.BooleanField(default=False)
    created_at = serializers.DateTimeField(read_only=True)
    
    def create(self, validated_data):
        return Task.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        """_summary_
        This method validates if there is value on field and apply it on instance of the field
        Args:
            instance (_type_): _description_
            validated_data (_type_): _description_

        Returns:
            _type_: _description_
        """
        instance.title = validated_data.get("title", instance.title)
        instance.description = validated_data.get("description", instance.description)
        instance.completed = validated_data.get("completed", instance.completed)
        instance.save()
        return instance