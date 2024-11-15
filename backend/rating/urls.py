from rest_framework import routers
from .viewsets import FormViewSet


router = routers.DefaultRouter()
router.register(r'forms', FormViewSet)

urlpatterns = router.urls
