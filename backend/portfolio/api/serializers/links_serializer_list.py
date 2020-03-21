from portfolio.models import Links
from rest_framework import serializers


class LinksSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Links
        fields = ('id', 'url', 'label')