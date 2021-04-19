---
title: 
has_children: true
nav_order: 1
has_toc: false
---

![]({{ 'upload/art-lasovsky-8XddFc6NkBY-unsplash.jpg' | relative_url }})


<div class="datatable-begin"></div>




| :------- | :------------------------------------- | -----------: |
{% for post in site.posts %}|{{ post.date | date_to_string }} | <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a> | {% for tags in post.tags %} <small class="fs-1 d-inline btn"><a href="{{ site.baseurl }}/posts/tags/#{{ tags | slugify }}">{{ tags }}</a></small> {% endfor %} |
{% endfor %}

<div class="datatable-end"></div>



* * *
	
<small>photo by <a href="https://unsplash.com/@artlasovsky">Art Lasovsky</a> on <a href="https://unsplash.com">Unsplash</a></small>
