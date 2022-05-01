---
title: posts
has_children: true
nav_order: 1
has_toc: false
---

<style>

.card{
    border-radius: 4px;
    box-shadow: 0 6px 10px rgba(0,0,0,.04), 0 0 6px rgba(0,0,0,.02);
    transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
    padding: 14px 80px 18px 36px;
    margin-bottom: 10px;
}

.card:hover{
    transform: scale(1.01);
    box-shadow: 0 10px 20px rgba(0,0,0,.08), 0 4px 8px rgba(0,0,0,.04);
}

.card h3{
    font-weight: 100;
}

.card img{
    position: absolute;
    top: 20px;
    right: 15px;
    max-height: 120px;
}

.card-3{
    background-repeat: no-repeat;
    background-position: right;
    /*background-size: 80px;*/
}

</style>

{% for post in site.posts %}
<div class="card card-3" style="background-image: url('{{- post.thumbnail | relative_url -}}');">
<h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a> </h3>
<small class="fs-1 d-inline btn btn-blue">{{ post.date | date: "%b %-d, %Y" }}</small>
{% for tags in post.tags %} 
<small class="fs-1 d-inline btn">{{tags}}</small> 
{% endfor %}
<p>{{ post.excerpt }}</p>
</div>
{% endfor %}
