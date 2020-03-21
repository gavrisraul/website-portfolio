from django.db import models


class PostLikes(models.Model):
    id = models.AutoField(primary_key=True)
    post_liked = models.IntegerField()
    client_ip = models.CharField(max_length=30)

    def __str__(self):
        return self.client_ip
    
    class Meta:
        db_table = 'postlikes'
        app_label= 'portfolio'