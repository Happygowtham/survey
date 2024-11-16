from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend


class FormViewSet(viewsets.ModelViewSet):
    queryset = Form.objects.all().order_by('created_date')
    serializer_class = FormSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['is_template', 'is_published']
    

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    

class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    authentication_classes = [] 
    permission_classes = [] 
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['form']
    

class FormListView(APIView):
    authentication_classes = [] 
    permission_classes = []

    def get(self, request, *args, **kwargs):
        category_list = []
        form_id = kwargs.get('form_id')
        for category in Category.objects.filter(form_id=form_id):
            category_obj = {
                "id": category.id,
                "name": category.name,
                "topics": [],
            }
            for topic in category.topics.all():
                topic_obj = {
                    "id": topic.id,
                    "name": topic.name,
                    "questions": []
                }
                for question in topic.questions.all():
                    topic_obj["questions"].append({
                        "id": question.id,
                        "text": question.text,
                    })
                category_obj["topics"].append(topic_obj)
            category_list.append(category_obj)
        return Response(category_list)

