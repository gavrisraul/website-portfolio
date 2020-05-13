from django.db import models


class Portfolio(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    portfolio_image = models.CharField(max_length=100)
    portfolio_description = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'portfolio'
        app_label= 'portfolio'