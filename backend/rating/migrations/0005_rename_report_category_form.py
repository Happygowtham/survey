# Generated by Django 4.2.16 on 2024-11-15 14:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rating', '0004_category_form_created_date_topic_question_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='category',
            old_name='report',
            new_name='form',
        ),
    ]
