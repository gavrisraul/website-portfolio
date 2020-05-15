from django.db import models


class Email(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    subject = models.CharField(max_length=50)
    message = models.TextField()
    client_ip = models.CharField(max_length=30, unique=True)
    count = models.IntegerField()
    date_send = models.DateTimeField()

    def __str__(self):
        return self.email + self.client_ip

    class Meta:
        db_table = 'email'
        app_label= 'portfolio'