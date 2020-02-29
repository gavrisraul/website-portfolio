from django.urls import path

from portfolio.api.views import (
    HeroListView, LinksListView, PostListView,
    PostRetrieveView, EmailListView
)


urlpatterns = [
    path('hero/', HeroListView.as_view()),
    path('post/', PostListView.as_view()),
    path('post/<pk>/', PostRetrieveView.as_view()),
    path('links/', LinksListView.as_view()),
    path('send_email', EmailListView.as_view()),
]