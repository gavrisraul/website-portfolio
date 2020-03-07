from django.db import models


class Hero(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=10)
    surname = models.CharField(max_length=10)
    hero_image = models.CharField(max_length=100)
    hero_profession = models.CharField(max_length=30)
    hero_description = models.TextField()
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
    #  id = models.IntegerField(primary_key=True)
    email = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=50)
    subject = models.CharField(max_length=50)
    message = models.TextField()
    client_ip = models.CharField(max_length=30, unique=True)
    count = models.IntegerField()
    date_send = models.DateTimeField()

    def __str__(self):
        return self.email + self.client_ip


class Post(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=100)
    text = models.TextField()
    image = models.CharField(max_length=300)
    date = models.DateField()
    likes = models.CharField(max_length=20, default='0')

    def __str__(self):
        return self.title

class PostLikes(models.Model):
    id = models.IntegerField(primary_key=True)
    client_ip = models.CharField(max_length=30)

    def __str__(self):
        return self.client_ip
