---
title: docs
has_children: true
nav_order: 1
has_toc: false
---

# Index

{% for post in site.posts %}
<div>
    {{ post.date | date_to_string }} &raquo; <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
</div>
{% endfor %}
