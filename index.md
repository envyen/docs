---
has_children: true
nav_order: 1
has_toc: false
title: articles
---

<div class="datatable-begin"></div>

| :------- | :------------------------------------- | -----------: |
{% for post in site.posts %}|{{ post.date | date_to_string }} | <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a> | {% for tags in post.tags %} <small class="fs-1 d-inline btn">{{tags}}</small> {% endfor %} |
{% endfor %}

<div class="datatable-end"></div>

