from django.db import models
from model_clone import CloneMixin

class Form(models.Model, CloneMixin):
    name = models.CharField(max_length=150,null=True,blank=True)
    is_template = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False)
    description = models.TextField(null=True,blank=True)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Category(models.Model, CloneMixin):
    form = models.ForeignKey(Form, on_delete=models.PROTECT, related_name='forms')
    name = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name
    
class Topic(models.Model, CloneMixin):
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='topics')
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
class Question(models.Model, CloneMixin):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='questions')
    text = models.TextField()

    def __str__(self):
        return self.text


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="answers", blank=True, null=True)
    response = models.CharField(max_length=10, choices=[('yes', 'Yes'), ('no', 'No')], blank=True, null=True)
    answered_at = models.DateTimeField(auto_now_add=True)
    form = models.ForeignKey(Form, on_delete=models.PROTECT, related_name='form',blank=True, null=True)

    def __str__(self):
        return self.response
