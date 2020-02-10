from django.db import models


class Hero(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=10)
    surname = models.CharField(max_length=10)
    hero_image = models.CharField(max_length=100)
    hero_profession = models.CharField(max_length=30)
    resume_label = models.CharField(max_length=10)
    trademarks = models.CharField(max_length=30)

    def __str__(self):
        return self.surname

class Links(models.Model):
    id = models.IntegerField(primary_key=True)
    url = models.CharField(max_length=100)
    label = models.CharField(max_length=20)

    def __str__(self):
        return self.label

class Email(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    subject = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    message = models.TextField()