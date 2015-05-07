FROM ruby:2.1.6
MAINTAINER Yevgeniy Brikman <jim@ybrikman.com>

# Install Node.js
RUN apt-get update
RUN apt-get install -y nodejs

# Install Jekyll
RUN gem install jekyll

# Copy the Gemfile and Gemfile.lock into the image and run bundle install in a
# way that will be cached
WORKDIR /tmp 
ADD Gemfile Gemfile
ADD Gemfile.lock Gemfile.lock
RUN bundle install 

# Copy source and install Gems
RUN mkdir -p /src
VOLUME ["/src"]
WORKDIR /src
ADD . /src

# Jekyll runs on port 4000 by default
EXPOSE 4000

# Have to force "watch" and "polling" as inotify doesn't work via Docker
CMD ["bundle", "exec", "jekyll", "serve", "--drafts"]