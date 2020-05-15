from rest_framework_simplejwt import views as jwt_views
from django.urls import path

from portfolio.api.views import (
    HeroListView, LinksListView, PostListView,
    PostRetrieveView, EmailListView, ObtainTokenPairWithColorView,
    CustomUserCreate, LogoutAndBlacklistRefreshTokenForUserView,
    PortfolioListView, PostListViewAdmin, PortfolioListViewAdmin,
    EmailListViewAdmin, DummyView
)


urlpatterns = [
    path('hero/', HeroListView.as_view()),
    path('post/', PostListView.as_view()),
    path('post/<pk>/', PostRetrieveView.as_view()),
    path('links/', LinksListView.as_view()),
    path('send_email/', EmailListView.as_view()),
    path('portfolio/', PortfolioListView.as_view()),
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('token/obtain/', ObtainTokenPairWithColorView.as_view(), name='token_obtain'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist'),

    path('admin_email/', EmailListViewAdmin.as_view()),
    path('admin_post/', PostListViewAdmin.as_view()),
    path('admin_portfolio/', PortfolioListViewAdmin.as_view()),
    path('admin_dummy/', DummyView.as_view()),
]