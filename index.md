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
{% assign rawtags = "" %}
{% assign tags = "" %}
{% for tag in post.tags %}
   {% if tag != "" %}
	    {% unless tags contains tag %}
         {% assign tags = tags | append:tag | append:'|'  %}
	    {% endunless %}
	 {% endif %}
{% endfor %}
{% assign tags = tags | split:'|' | sort %}
{% for tag in tags %}
<small class="fs-1 d-inline btn"><a href="#{{ tag | slugify }}"> {{ tag }} </a>&nbsp</small>
{% endfor %}
<hr/>
<br/>
{% endfor %}

