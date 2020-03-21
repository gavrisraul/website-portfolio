from portfolio.models import Post
from rest_framework.generics import ListAPIView
from portfolio.api.serializers import PostSerializerList


class PostListView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializerList