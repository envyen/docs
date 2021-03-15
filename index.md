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

### tags

<div>
{% assign tags = site.tags | sort %}
{% for tag in tags %}
    <a href="/tags/{{ tag | first | slugify }}/" style="font-size: {{ tag | last | size  |  times: 4 | plus: 80  }}%">
<small class="fs-1 d-inline btn btn-green">{{ tag[0] | replace:'-', ' ' }} ({{ tag | last | size }})</small></a>
{% endfor %}
</div>

