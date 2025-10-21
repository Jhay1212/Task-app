from django.db import models
from django.utils.translation import gettext_lazy as _
from accounts.models import CustomUser as User
from django.utils.text import slugify


class Task(models.Model):
    user_id = models.ForeignKey(
        User,
        related_name="tasks", 
        on_delete=models.CASCADE, 
        null=True, blank=True)

    title = models.CharField(_("title"), max_length=128)
    slug = models.SlugField(_(""), unique=True, null=True, blank=True) # for better url mapping and filtering 
    description = models.TextField(_("Description"), null=True)
    completed = models.BooleanField(_("Is Completed"), default=False)
    created_at = models.DateTimeField(_("Time Created"), auto_now_add=True)
    
    
    def save(self, *args, **kwargs):
        """ automatically add value to slug whenever saving and title is valid"""
        if not self.slug and self.title:
            self.slug = slugify(self.title)
        return super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title