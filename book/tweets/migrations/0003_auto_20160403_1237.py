# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-03 12:37
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0002_hashtag'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tweet',
            old_name='created_data',
            new_name='created_date',
        ),
    ]
