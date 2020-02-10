from rest_framework import serializers
from portfolio.models import Hero, Links, Email


class HeroSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = (
            'id', 'name', 'surname', 'hero_image', 'hero_profession',
            'resume_label', 'trademarks')


class HeroSerializerRetrieve(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = ('surname',)


class LinksSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Links
        fields = ('id', 'url', 'label')

class EmailSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = ('name', 'subject', 'email', 'message')
