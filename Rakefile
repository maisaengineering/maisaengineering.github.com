require 'rake'

desc "Compile CSS files"
task :css do
  puts "Merging CSS"

  `rm assets/stylesheets/stylesheet.css`
  `rm assets/stylesheets/stylesheet.css`

  %W{font-awesome syntax skeleton base layout}.each do |file|
    `cat .assets/stylesheets/#{file}.css >> .assets/stylesheets/temp.css`
  end

  # `mv ./static/css/temp.css ./static/css/style.css`
  `yuicompressor ./static/css/temp.css > .assets/stylesheets/stylesheet.css`

  puts 'CSS dumped to .assets/stylesheets/stylesheet.css'
end

desc "Deploy site"
task :deploy do
  Rake::Task['css'].execute
  puts 'Comitting generated CSS'
  `git add assets/stylesheets/stylesheet.css`
  `git commit -m 'Compressed CSS for deploy'`

  puts "Pushing to Github"
  `git push origin master`
end

task "Serve"
task :serve do
  Rake::Task['css'].execute

  `open http://localhost:4000`
  `jekyll --serve --no-pygments`
end
