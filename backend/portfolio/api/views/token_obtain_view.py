from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions
from portfolio.api.serializers import MyTokenObtainPairSerializer

class ObtainTokenPairWithColorView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    serializer_class = MyTokenObtainPairSerializer