# Generated by Django 4.2.16 on 2024-11-15 13:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rating', '0002_alter_form_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='form',
            old_name='status',
            new_name='is_template',
        ),
    ]
