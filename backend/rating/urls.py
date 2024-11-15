from rest_framework import routers
from .viewsets import *


router = routers.DefaultRouter()
router.register(r'forms', FormViewSet)
router.register(r'category', CategoryViewSet)
router.register(r'topics', TopicViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'answer', AnswerViewSet)

urlpatterns = router.urls
