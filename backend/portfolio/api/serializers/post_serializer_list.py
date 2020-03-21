from rest_framework import serializers
from portfolio.models import Post


class PostSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'image', 'date', 'likes')