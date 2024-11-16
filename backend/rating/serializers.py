from rest_framework import serializers
from .models import *

class FormSerializer(serializers.ModelSerializer):
    form = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Form
        fields = "__all__"
    
    def create(self, validated_data):
        id = validated_data.get('form')
        if id:
            form = Form.objects.get(id=id)
            form_clone = form.make_clone()
            form_clone.is_template = False
            form_clone.name = validated_data.get('name') or form_clone.name
            form_clone.description = validated_data.get('description') or form_clone.description
            form_clone.save()

            categories = Category.objects.filter(form=form)
            for category in categories:
                category_clone = category.make_clone()
                category_clone.form = form_clone
                category_clone.save()

                topics = Topic.objects.filter(category=category)
                for topic in topics:
                    topic_clone = topic.make_clone()
                    topic_clone.category = category_clone
                    topic_clone.save()

                    questions = Question.objects.filter(topic=topic)
                    for question in questions:
                        question_clone = question.make_clone()
                        question_clone.topic = topic_clone
                        question_clone.save()

            return form_clone
        else:
            raise ValueError("Form data is required")


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = "__all__"

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class AnswerSerializer(serializers.ModelSerializer):
    answers = serializers.JSONField(write_only=True, required=False)
    class Meta:
        model = Answer
        fields = "__all__"

    def create(self, validated_data):
        answers = validated_data.get('answers', {})
        form_id = self.context.get('request').data.get('form')
        form = Form.objects.get(id=form_id)
        for question_id, response in answers.items():
            question = Question.objects.get(id=question_id)
            Answer.objects.create(question=question, response=response, form=form)
        return answers

