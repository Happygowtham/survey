from django.db import models

class Form(models.Model):
    name = models.CharField(max_length=150)
    is_template = models.BooleanField(default=False)
    description = models.TextField(null=True,blank=True)

    def __str__(self):
        return self.name

