{% assign array = site.categories.[portfolio] %}
{% unless array == empty %}
<div id="selected-work" class="section">
	<h2 class="section-title">Selected Work</h2>
	<a href="/portfolio/" class="btn-more">more &raquo;</a>
	{% for post in site.categories.[portfolio] limit: 4 %}
		<li class="{% cycle 'odd', 'even' %}">
			<a href="#">
				<img src="/resources/{{ post.image }}" alt="" title="{{ post.title }}"/>
				<span>{{ post.title }}</span>
			</a>
		</li>
	{% endfor %}
	</ul>
</div><!-- end: #recent-work -->
{% endunless %}