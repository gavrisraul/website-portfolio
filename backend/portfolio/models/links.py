from django.db import models


class Links(models.Model):
    id = models.IntegerField(primary_key=True)
    url = models.CharField(max_length=100)
    label = models.CharField(max_length=20)

    def __str__(self):
        return self.label

    class Meta:
        db_table = 'links'
        app_label= 'portfolio'