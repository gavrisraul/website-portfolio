from portfolio.models import Email
from rest_framework import serializers


class EmailSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = (
            'id', 'name', 'subject', 'email', 'message',
            'client_ip', 'count', 'date_send'
        )
