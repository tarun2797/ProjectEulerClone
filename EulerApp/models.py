from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    solved_qs = models.TextField(max_length=500,blank=True)

class Question(models.Model):
    title = models.CharField(max_length=30)
    description = models.TextField(max_length=500)
    answer = models.CharField(max_length=30)
    difficulty = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
'''
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        # instance is the user model being saved.
        Profile.objects.create(user=instance)
'''
'''
This method is invoked when an User instance is created.
If an User object is created , this method creates Profile Object.
It is both used for creating and saving of Profile object 
'''
'''@receiver(post_save, sender=User)
def update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()
'''