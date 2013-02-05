---
layout: post
title: Getting started with git
author: MaisaSolutions
---

<span class="sub_heading">Global configuration file</span>

Git allows you to store global settings in the .gitconfig file. This file is located in the user home directory. Git stores the committer and author of a change in each commit.

<span class="sub_heading">User Configuration </span>

Configure your user and email for Git via the following command. 


<div class="highlight"><pre><code class="bash"><span class="nv">$ </span>git config --global user.name "<span class="no">Your Name Here</span>"
<span class="c"># Sets the default name for git to use when you commit</span>
<span class="nv">$ </span>git config --global user.email "<span class="no">your_email@youremail.com</span>"
<span class="c"># Sets the default email for git to use when you commit</span>
</code></pre>
</div>

<span class="sub_heading">Getting started with Git</span>

Fire up a terminal, and type (replace Rails_app with name of the your application):

<div class="highlight"><pre><code class="bash"><span class="nv">$ </span>rails new Rails_app</code></pre></div>

Afterwards, navigate into this new directory by typing:

<div class="highlight"><pre><code class="bash"><span class="nv">$ </span>cd Rails_app</code></pre></div>

Initialize Git inside this directory by typing:

<div class="highlight"><pre><code class="bash"><span class="nv">$ </span>git init</code></pre></div>

Create a new file by typing:

<div class="highlight"><pre><code class="bash"><span class="nv">$ </span>touch README</code></pre></div>

Add this file to the repository by typing:

<div class="highlight"><pre><code class="bash"><span class="nv">$ </span>git add README</code></pre></div>

Now, let's make a change to this file, by writing something to it

<div class="highlight"><pre><code class="bash"><span class="nv">$ </span>echo "Hello, is this on Github?!" > README</code></pre></div>

Now, we need to commit. Committing is a small message of what you just did:

<div class="highlight"><pre><code class="bash"><span class="nv">$ </span>git commit -m 'Initial commit'</code></pre></div>

Next, we need to add the online Github repository (the origin)

<div class="highlight"><pre><code class="bash"><span class="nv">$ </span>git remote add origin git@github.com:User/Rails_app.git</code></pre></div>

And finally, let's push it to Github.

<div class="highlight"><pre><code class="bash"><span class="nv">$ </span>git push origin master</code></pre></div>

Now you've added your first file to Github! Continue to learn more about how to work with Git.


<h2 class="gray">Comments</h2>

<div>
<div id="disqus_thread" aria-live="polite"><noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
</div>
</div>

<script type="text/javascript">
	var disqus_shortname = 'maisa';
	// var disqus_developer = 1;
	var disqus_identifier = 'http://maisaengineering.github.com/Getting-started-with-git/';
	var disqus_url = 'http://maisaengineering.github.com/Getting-started-with-git/';
	var disqus_script = 'embed.js';
	(function () {
	var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
	dsq.src = 'http://' + disqus_shortname + '.disqus.com/' + disqus_script;
	(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	}());
</script>


