---
title: posts
has_children: true
nav_order: 1
has_toc: false
---

# Posts

{% for post in site.posts %}
<h3>#{{ forloop.length | minus: forloop.index0 }} <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a> </h3>

<div>

<small class="fs-1 d-inline btn btn-blue">{{ post.date | date: "%b %-d, %Y" }}</small>
{% for tags in post.tags %} 
<small class="fs-1 d-inline btn">{{tags}}</small> {% endfor %}

</div>

<p>{{ post.excerpt }}</p>
{% endfor %}

