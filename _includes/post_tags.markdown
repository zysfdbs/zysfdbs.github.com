<div id="popular-tags" class="section">	
	<h2 class="section-title">Post Tags</h2>
	<ul>
		{% for tag in page.tags %}
			<li><a href="/tags/{{ tag | replace:' ', '-' | downcase  }}" name="{{ tag | replace:' ','-' | downcase }}">{{ tag }}</a></li>
		{% endfor %}
	</ul>
</div>