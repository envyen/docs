---
title: docs
has_children: true
nav_order: 1
has_toc: false
---

# Index

<ul class="posts">
   {% for post in site.posts %}
      <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>
   {% endfor %}
</ul>
