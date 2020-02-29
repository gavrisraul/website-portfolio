from rest_framework import serializers
from portfolio.models import Hero, Links, Email, Post


class HeroSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = (
            'id', 'name', 'surname', 'hero_image', 'hero_profession',
            'hero_description', 'resume_label', 'trademarks')


class LinksSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Links
        fields = ('id', 'url', 'label')


class EmailSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = (
            'name', 'subject', 'email', 'message',
            'client_ip', 'count', 'date_send'
        )


class PostSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'image', 'date')


class PostSerializerRetrieve(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'image', 'text')
