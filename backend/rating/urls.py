from rest_framework import routers
from .viewsets import *
from django.urls import path,include


router = routers.DefaultRouter()
router.register(r'forms', FormViewSet)
router.register(r'category', CategoryViewSet)
router.register(r'topics', TopicViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'answer', AnswerViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('form-data/<int:form_id>/', FormListView.as_view()),
]