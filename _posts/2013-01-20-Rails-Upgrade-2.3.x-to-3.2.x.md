---
layout: post
title: Rails upgrade 2.3.x to 3.2.x
author: MaisaSolutions
---

Install Rails Upgrade plugin 

<div class="highlight"><pre><code class="bash"><span class="nv">$ </span>ruby script/plugin install git://github.com/rails/rails_upgrade.git
</code></pre>
</div>

Then check for files list which we need to change

<div class="highlight"><pre><code class="bash"><span class="nv">$ </span>rake rails:upgrade:check
</code></pre>
</div>

This should give you an idea of the manual changes that need to be done, but you'll probably want to upgrade some of those automatically.  The fastest way to do this is to run "rails ." , which will simply generate a new app on top of your existing code.  But this generation also has the effect of replacing some existing files, some of which you might not want to replace.  

<span class="side_heading_color">Backup files</span>
 
<div class="highlight"><pre><code class="bash"><span class="nv">$ </span>rake rails:upgrade:backup
</code></pre>
</div>
    
That will backup files you've probably edited that will be replaced in the upgrade; if you finish the upgrade and find that you don't need the old copies, just delete them.  Otherwise, copy their contents back into the new files or run one of the following upgraders...
 
<span class="side_heading_color">Routes upgrade</span>
 
To generate a new routes file from your existing routes file, simply run the following Rake task:
 
<div class="highlight"><pre><code class="bash"><span class="nv">$ </span>rake rails:upgrade:routes
</code></pre>
</div>
    
This will output a new routes file that you can copy and paste or pipe into a new, Rails 3 compatible config/routes.rb.
 
<span class="side_heading_color">Gemfile generator</span> 
 
Creating a new Gemfile is as simple as running:
 
<div class="highlight"><pre><code class="bash"><span class="nv">$ </span>rake rails:upgrade:gems
</code></pre>
</div>
    
This task will extract your config.gem calls and generate code you can put into a bundler compatible Gemfile.
 
<span class="side_heading_color">Configuration generator</span>

<div class="highlight"><pre><code class="bash"><span class="nv">$ </span>rake rails:upgrade:configuration</code></pre>
</div>
 
Much of the configuration information that lived in environment.rb now belongs in a new file named config/application.rb; use the following task to generate code you can put into config/application.rb from your existing config/environment.rb

<h3 class="gray">Comments</h3>

<div>
<div id="disqus_thread" aria-live="polite"><noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
</div>
</div>

<script type="text/javascript">
	var disqus_shortname = 'maisa';
	// var disqus_developer = 1;
	var disqus_identifier = 'http://maisaengineering.github.com/Rails-Upgrade-2.3.x-to-3.2.x/';
	var disqus_url = 'http://maisaengineering.github.com/Rails-Upgrade-2.3.x-to-3.2.x/';
	var disqus_script = 'embed.js';
	(function () {
	var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
	dsq.src = 'http://' + disqus_shortname + '.disqus.com/' + disqus_script;
	(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	}());
</script>