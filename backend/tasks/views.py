from django.shortcuts import get_object_or_404, render
from rest_framework.viewsets import ViewSet
from .models import Task
from .serializers import TaskSerializer
from rest_framework import status
from rest_framework.response import Response

class TaskViewSet(ViewSet):
    
    def list(self, request):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)  
    
    def create(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            {"message": "Task Created Successfully"}, 
            serializer.errors, 
            status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk: int | None  = None):
        task = get_object_or_404(Task, pk=pk)        
        serializer = TaskSerializer(task)
        return Response(serializer.data)
    
    def update(self, request, pk: int | None = None):
        task = get_object_or_404(Task, pk=pk)
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({"message": "Task updated"}, serializer.errors, status.HTTP_400_BAD_REQUEST)
    
    def partial_update(self, request, pk: int | None = None):
        """ Toggle completed  status """
        task = get_object_or_404(Task, pk=pk)
        task.completed = not task.completed # edit the task status only 
        task.save()
        serializer = TaskSerializer(task)
        return Response(serializer.data)
    
    def destroy(self, request, pk: int | None = None):
        task = get_object_or_404(Task, pk=pk)
        task.delete()
        return Response(
            {"message": "Task Successfully deleted."},
            status=status.HTTP_204_NO_CONTENT
            )
    
    def filter_by_name(self, request):
        "wasnt able to complete huhu"
        pass