import os
import json
import pytz
import requests
from django.utils import timezone
from django.db import connection
from django.core.serializers import serialize
from rest_framework.response import Response
from rest_framework import permissions


from portfolio.models import Email
from rest_framework.generics import ListAPIView
from portfolio.api.serializers import EmailSerializerList


class EmailListView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    queryset = Email.objects.all()
    serializer_class = EmailSerializerList
    email = Email()

    def get(self, request, format=None):
        client_ip = requests.get('https://jsonip.com')
        client_ip = json.loads(client_ip.text)['ip']
        return Response(serialize(
            'json',
            self.get_queryset().filter(client_ip=client_ip), fields=(
                'client_ip', 'email', 'count', 'date_send')))

    def post(self, request):
        self.email.name = request.data['name']
        self.email.subject = request.data['subject']
        self.email.email = request.data['email']
        self.email.message = request.data['message']
        self.email.client_ip = request.data['client_ip']
        self.email.count = request.data['count']
        self.email.date_send = timezone.now()
        if self.email.email:
            try:
                self.email.save()
            except Exception:
                cursor = connection.cursor()
                cursor.execute(f"INSERT IGNORE INTO email VALUES ({self.email.email}, {self.email.name}, {self.email.subject}, {self.email.message}, {self.email.client_ip}, {self.email.count}, {self.email.date_send})")
        from_name = f'From Name: {str(request.data["name"])}'
        msg = str(request.data["message"])
        msg = "\n".join([from_name, msg])
        import smtplib

        try:
            server = smtplib.SMTP('smtp.gmail.com:587')
            server.ehlo()
            server.starttls()
            server.login(os.environ.get('EMAIL'), os.environ.get('EMAIL_PASSWORD'))
            message = 'Subject: {}\n\n{}'.format(str(request.data['subject']), request.data['email'] + "\n" + msg)
            server.sendmail(os.environ.get('EMAIL'), os.environ.get('EMAIL'), message)
            server.quit()
            print("Success: Email sent!")
        except:
            print("Email failed to send.")

        return Response()
