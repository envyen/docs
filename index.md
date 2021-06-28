---
title: posts
has_children: true
nav_order: 1
has_toc: false
---

{% for post in site.posts %}
<h2> <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a> </h2>
<span>{{ post.date | date_to_string }}</span>
{% for tags in post.tags %}<small class="fs-1 d-inline btn btn-green">{{tags}}</small>{% endfor %}
<p>{{ post.excerpt }}</p>
{% endfor %}

