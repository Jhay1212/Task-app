from django.test import TestCase

from django.test import TestCase
from .models import Task

class TaskModelTest(TestCase):

    def test_task_creation_and_slug(self):
        # Create a task without user
        task = Task.objects.create(
            title="My First Task",
            description="This is a test task."
        )

        self.assertEqual(task.title, "My First Task")
        self.assertEqual(task.description, "This is a test task.")
        self.assertEqual(task.completed, False)  # default value

        self.assertEqual(task.slug, "my-first-task")

    def test_task_str_method(self):
        task = Task.objects.create(title="Another Task")
        self.assertEqual(str(task), "Another Task")
