from portfolio.models import Post
from rest_framework.generics import ListAPIView
from rest_framework import permissions

from portfolio.api.serializers import PostSerializerList


class PostListView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    queryset = Post.objects.all()
    serializer_class = PostSerializerList