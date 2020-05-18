from rest_framework import serializers
from portfolio.models import Post


class PostSerializerRetrieve(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'image', 'text', 'likes', 'date')