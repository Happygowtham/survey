# Generated by Django 4.2.16 on 2024-11-16 04:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rating', '0005_rename_report_category_form'),
    ]

    operations = [
        migrations.AddField(
            model_name='form',
            name='is_published',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='answer',
            name='question',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='rating.question'),
        ),
        migrations.AlterField(
            model_name='answer',
            name='response',
            field=models.CharField(blank=True, choices=[('yes', 'Yes'), ('no', 'No')], max_length=10, null=True),
        ),
    ]