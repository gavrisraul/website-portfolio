from django.db import models


class Post(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=100)
    text = models.TextField()
    image = models.CharField(max_length=300)
    date = models.DateField()
    likes = models.CharField(max_length=20, default='0')

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'post'
        app_label= 'portfolio'