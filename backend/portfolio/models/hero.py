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

    class Meta:
        db_table = 'hero'
        app_label= 'portfolio'