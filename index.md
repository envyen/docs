---
title: posts
has_children: true
nav_order: 1
has_toc: false
---

{% for post in site.posts %}
<h2> <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a> </h2>
<span>{{ post.date | date_to_string }}</span><br/>
<p>{{ post.excerpt }}</p>
<hr/>
{% for tags in post.tags %} 
<small class="fs-1 d-inline btn"><a href="{{ site.baseurl }}/posts/tags/#{{ tags | slugify }}">{{ tags }}</a></small> 
{% endfor %}
<hr/>
<br/>
{% endfor %}

